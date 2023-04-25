package com.CMPE202.healthclub.exceptions;

import org.springframework.http.HttpStatus;

public class RecordNotFoundException extends CustomException{
    public RecordNotFoundException(String msg){
        super(msg, HttpStatus.BAD_REQUEST);
    }
}
