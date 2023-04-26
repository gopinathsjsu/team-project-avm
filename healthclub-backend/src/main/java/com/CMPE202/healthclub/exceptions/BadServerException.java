package com.CMPE202.healthclub.exceptions;

import org.springframework.http.HttpStatus;

public class BadServerException extends CustomException{
    public BadServerException(String msg){
        super(msg, HttpStatus.BAD_GATEWAY);
    }
}
