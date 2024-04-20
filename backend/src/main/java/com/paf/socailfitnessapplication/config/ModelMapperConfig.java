package com.paf.socailfitnessapplication.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// ModelMapperConfig.java
@Configuration
public class ModelMapperConfig {

    /**
     * A method that creates and returns a new ModelMapper instance.
     *
     * @return         	an instance of ModelMapper
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        return modelMapper;
    }
}
