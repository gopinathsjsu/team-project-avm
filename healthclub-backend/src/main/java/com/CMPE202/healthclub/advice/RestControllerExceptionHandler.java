package com.CMPE202.healthclub.advice;

import com.CMPE202.healthclub.exceptions.CustomException;
import com.CMPE202.healthclub.exceptions.RecordNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestControllerExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handelMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        });
        return errorMap;
    }
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<Object> handleCustomExceptions(CustomException ex) {
        return new ResponseEntity<>(ex.getMessage(),ex.getStatus());
    }

    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    @ExceptionHandler(Exception.class)
    public String handelIllegalException(Exception ex) {
        return ex.getMessage();

    }
}
