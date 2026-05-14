package com.bulkprocessingapi.backend.config;

import com.bulkprocessingapi.backend.auth.AuthService;
import com.bulkprocessingapi.backend.auth.Role;
import com.bulkprocessingapi.backend.auth.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            AuthService authService,
            UserRepository userRepository
    ) {

        return args -> {

            boolean adminExists =
                    userRepository.findByUsername("admin").isPresent();

            if (!adminExists) {

                authService.createUser(
                        "admin",
                        "admin123",
                        Role.ADMIN
                );
            }

            boolean userExists =
                    userRepository.findByUsername("user").isPresent();

            if (!userExists) {

                authService.createUser(
                        "user",
                        "user123",
                        Role.USER
                );
            }

        };
    }
}