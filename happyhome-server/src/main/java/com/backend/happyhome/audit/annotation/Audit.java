package com.backend.happyhome.audit.annotation;

import java.lang.annotation.*;

import com.backend.happyhome.audit.AuditAction;

@Target(ElementType.METHOD) //applicable on methods
@Retention(RetentionPolicy.RUNTIME) //Annotation is available during runtime, JVM can read it via reflection
public @interface Audit{
	AuditAction action();
}