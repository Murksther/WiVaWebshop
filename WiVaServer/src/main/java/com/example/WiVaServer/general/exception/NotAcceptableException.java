package com.example.WiVaServer.general.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class NotAcceptableException extends RuntimeException {
    private String resourceName;
    private String fieldName;
    private int maximumValue;

    public NotAcceptableException( String resourceName, String fieldName, int maximumValue) {
        super(String.format("%s : %s has not enough available. Max allowed: %s", resourceName, fieldName, maximumValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.maximumValue = maximumValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public int getMaximumValue() {
        return maximumValue;
    }
}
