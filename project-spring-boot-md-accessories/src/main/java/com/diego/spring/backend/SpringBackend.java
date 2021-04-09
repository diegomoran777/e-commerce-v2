package com.diego.spring.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.mercadopago.MercadoPago;


@SpringBootApplication
public class SpringBackend extends SpringBootServletInitializer implements CommandLineRunner {
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(SpringBackend.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringBackend.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		MercadoPago.SDK.setAccessToken("APP_USR-4047535620856855-071412-9fedaeb127c19a881a8db81495ef03ff-179043659");
	}

}
