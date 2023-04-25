package com.CMPE202.healthclub.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;


@Getter
@Setter
public class CustomException extends Exception{
    HttpStatus status;
    public CustomException() {
        super();
    }
    public CustomException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
