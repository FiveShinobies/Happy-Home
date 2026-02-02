package com.backend.happyhome.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow ALL origins (even with credentials)
        config.setAllowedOriginPatterns(List.of("*"));

        // ✅ Allow ALL HTTP methods
        config.setAllowedMethods(List.of("*"));

        // ✅ Allow ALL headers
        config.setAllowedHeaders(List.of("*"));

        // ✅ Allow cookies, Authorization headers, etc.
        config.setAllowCredentials(true);

        // (Optional but helpful)
        config.setMaxAge(3600L);

        config.setExposedHeaders(List.of("Role" , "Authorization"));
        
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
