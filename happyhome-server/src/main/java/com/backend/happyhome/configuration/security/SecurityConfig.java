package com.backend.happyhome.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.happyhome.security.JwtFilter;
import com.backend.happyhome.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter, CustomUserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
	
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Enable CORS
            .cors(Customizer.withDefaults())

            // Disable CSRF for APIs (important for React + Axios)
            .csrf(csrf -> csrf.disable())

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // 🔓 PUBLIC ENDPOINTS
                .requestMatchers(
                	"/**",
                    "/payments/**",
                    "/auth/**",
                    "/login",
                    "/error",
                    "/categories",
                    "/signup/**",
                    "/services/**"
                ).permitAll()
                
                .requestMatchers("/consumer/**").hasRole("CONSUMER")
                .requestMatchers("/vendor/**").hasRole("VENDOR")
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // EVERYTHING ELSE NEEDS JWT
                .anyRequest().authenticated()
            )

            // ❌ Disable default login page redirect
            .formLogin(form -> form.disable())

            // Optional: enable basic auth for testing
            .httpBasic(Customizer.withDefaults());
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

   
}
