package com.monsha.deca.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.monsha.deca.service.CustomUserDetailsService;

@Configuration
@EnableMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {

    // private final JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomUserDetailsService customUserDetailsService;
    // private final JWTTokenProvider jwtTokenProvider;

    public SecurityConfig(
    // JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          CustomUserDetailsService customUserDetailsService//,
                        //   JWTTokenProvider jwtTokenProvider
                          ) {
        // this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.customUserDetailsService = customUserDetailsService;
        // this.jwtTokenProvider = jwtTokenProvider;
    }

    // @Bean
    // public JWTAuthenticationFilter jwtAuthenticationFilter() {
    //     return new JWTAuthenticationFilter(jwtTokenProvider, customUserDetailsService);
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(List.of("http://localhost:3000"));
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            config.setAllowedHeaders(List.of("*"));
            config.setAllowCredentials(true);
            return config;
        }));

        http.csrf(csrf -> csrf.disable());

        // http.exceptionHandling(exception -> 
        //     exception.authenticationEntryPoint(jwtAuthenticationEntryPoint)
        // );

        http.sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        http.authenticationProvider(authenticationProvider());

        http.authorizeHttpRequests(authz -> authz
            .requestMatchers(SecurityConstants.SIGN_UP_URLS).permitAll()
            .requestMatchers("/api/courses").permitAll()
            .requestMatchers("/api/competitions").permitAll()
            .anyRequest().authenticated()
        );

        // http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return authProvider;
    }
}
