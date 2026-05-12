package com.bulkprocessingapi.backend.config;

// Importaciones necesarias para Spring Security
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

/*
    @Configuration

    Indica que esta clase contiene configuraciones Spring.
*/
@Configuration
public class SecurityConfig {

    /*
        SecurityFilterChain

        Configura las reglas de seguridad de la aplicación.
    */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                /*
                    Desactiva CSRF temporalmente.

                    Lo hacemos para facilitar pruebas REST
                    durante el desarrollo inicial.
                 */
                .csrf(csrf -> csrf.disable())

                /*
                    Permite acceso libre a todos los endpoints.
                 */
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}