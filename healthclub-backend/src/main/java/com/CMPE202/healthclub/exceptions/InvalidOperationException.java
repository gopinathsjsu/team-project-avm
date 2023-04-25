package com.CMPE202.healthclub.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidOperationException extends CustomException{
    public InvalidOperationException(String msg){
        super(msg, HttpStatus.FORBIDDEN);
    }
}
