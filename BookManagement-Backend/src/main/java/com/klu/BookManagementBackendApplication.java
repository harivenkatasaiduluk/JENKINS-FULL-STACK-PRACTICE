package com.klu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BookManagementBackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BookManagementBackendApplication.class, args);
	}

}
