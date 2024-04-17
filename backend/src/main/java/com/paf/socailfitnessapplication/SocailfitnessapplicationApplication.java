package com.paf.socailfitnessapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SocailfitnessapplicationApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocailfitnessapplicationApplication.class, args);
	}

}
