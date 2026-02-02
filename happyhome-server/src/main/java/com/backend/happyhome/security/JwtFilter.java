package com.backend.happyhome.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	 private final JwtUtil jwtUtil;

	    public JwtFilter(JwtUtil jwtUtil) {
	        this.jwtUtil = jwtUtil;
	    }

	    @Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response,
	                                    FilterChain chain)
	            throws ServletException, IOException {

	    	System.out.println("JWT FILTER HIT");
	    	System.out.println("Authorization header = " + request.getHeader("Authorization"));

	    	
	        String authHeader = request.getHeader("Authorization");

	        if (authHeader != null && authHeader.startsWith("Bearer ")) {
	            String token = authHeader.substring(7);
	            Authentication auth = jwtUtil.validateToken(token);

	            if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	                SecurityContextHolder.getContext().setAuthentication(auth);
	            }
	        }

	        chain.doFilter(request, response);
	    }
}
