package com.backend.happyhome.aspect;

import java.time.LocalDateTime;

import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.backend.happyhome.audit.AuditAction;
import com.backend.happyhome.audit.annotation.Audit;
import com.backend.happyhome.audit.model.AuditLog;
import com.backend.happyhome.repository.AuditRepository;

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class LoggingAspect {

	private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);
	private static final int MAX_ERROR_LENGTH = 1000;
	
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private AuditRepository repo;

	@Around("execution(* com.backend.happyhome.service..*(..))")
	public Object logMethod(ProceedingJoinPoint jp) throws Throwable{

		//returns authenticated principal or request token
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		//method started at time
		long start = System.currentTimeMillis();
		boolean success = true;
		//console method name-> classname.methodname format
		log.info("--> Entering {}",jp.getSignature().toShortString());

		Object result;
		try {
			//executes the method
			result = jp.proceed();

			//if method runs without an error or exception return object
			return result;
		}catch(Exception ex){
			success = false;
			log.error("Exception occured "+ex);
			throw ex;
		}
		finally {
			//time taken to execute the method
			long time = System.currentTimeMillis() - start;

			//console out method name and time taken for execution of that method
			log.info("<-- Exiting {} took ms", jp.getSignature().toShortString(), time);


			//DB log (action = null and errormessage = null)
			AuditLog entity = new AuditLog();

			String user = (auth != null) ? auth.getName() : "ANONYMOUS";
			entity.setUsername(user);
			String role = (auth != null) ? auth.getAuthorities().toString() : null;
			entity.setRole(role);


			entity.setAction(null);
			entity.setClassName(jp.getTarget().getClass().getSimpleName());
			entity.setMethodName(jp.getSignature().getName());
			entity.setExecutionTimeMs(time);
			entity.setSuccess(success);
			entity.setTimestamp(LocalDateTime.now());

			if(request != null) {
				entity.setRequestUri(request.getRequestURI());
				entity.setHttpMethod(request.getMethod());
				entity.setIpAddress(request.getRemoteAddr());
			}
			repo.save(entity);
		}
	}

	@Around("@annotation(audit)")
	public Object auditMethod(ProceedingJoinPoint jp, Audit audit) throws Throwable{

		AuditLog logEntity = new AuditLog();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		long start = System.currentTimeMillis();
		log.info("--> Entering {}",jp.getSignature().toShortString());


		Object result;
		try {
			result = jp.proceed();

			if(audit.action() == AuditAction.LOGIN) {
				logEntity.setAction(AuditAction.LOGIN_SUCCESS);
			}else {
				logEntity.setAction(audit.action());
			}

			logEntity.setSuccess(true);
			return result;
		}catch(Exception ex) {
			log.error("Exception occured "+ex);

			if(audit.action() == AuditAction.LOGIN) {
				logEntity.setAction(AuditAction.LOGIN_FAILED);
			}

			if(audit.action() == AuditAction.CONSUMER_REGISTERED) {
				logEntity.setAction(AuditAction.CONSUMER_REGISTRATION_FAILED);
			}

			if(audit.action() == AuditAction.VENDOR_REGISTERED) {
				logEntity.setAction(AuditAction.VENDOR_REGISTRATION_FAILED);
			}

			if(audit.action() == AuditAction.BOOKING_CREATED) {
				logEntity.setAction(AuditAction.BOOKING_CANCELLED);
			}

			if(audit.action() == AuditAction.PAYMENT_INITIATED) {
				logEntity.setAction(AuditAction.PAYMENT_FAILED);
			}
			
			String errorMsg = ex.getMessage();
			if (errorMsg != null && errorMsg.length() > MAX_ERROR_LENGTH) {
			    errorMsg = errorMsg.substring(0, MAX_ERROR_LENGTH);
			}

			logEntity.setSuccess(false);
			logEntity.setErrorMessage(errorMsg);
			
			throw ex;
		}finally {


			String user = (auth != null) ? auth.getName() : "ANONYMOUS";
			String role = (auth != null) ? auth.getAuthorities().toString() : null;

			logEntity.setUsername(user);
			logEntity.setRole(role);

			logEntity.setClassName(jp.getTarget().getClass().getSimpleName());
			logEntity.setMethodName(jp.getSignature().getName());

			long time = System.currentTimeMillis() - start;
			log.info("<-- Exiting {} took ms", jp.getSignature().toShortString(), time);
			logEntity.setExecutionTimeMs(time);

			if(request != null) {
				logEntity.setRequestUri(request.getRequestURI());
				logEntity.setHttpMethod(request.getMethod());
				logEntity.setIpAddress(request.getRemoteAddr());
			}
			logEntity.setTimestamp(LocalDateTime.now());

			repo.save(logEntity);
		}


	}



	//	@AfterThrowing(
	//			pointcut="execution(*com.happyhome.service..*(..))",
	//			throwing = "ex"
	//			)
	//	public void logException(Exception ex) {
	//		log.error("Exception occured", ex);
	//	}
}
