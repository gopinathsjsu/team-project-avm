package com.CMPE202.healthclub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class HealthClubApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthClubApplication.class, args);
	}

}
