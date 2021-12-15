package com.example.projeto04.exceptions;

import com.sun.istack.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @NotNull
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, @NotNull HttpHeaders headers, HttpStatus status, WebRequest request) {
        var statusHttp = status.value();
        var timestamp = LocalDateTime.now();
        var title = "Um ou mais campos estão inválidos, faça o preenchimento correto e tente novamente!";
        var path = request.getDescription(false).substring(5);
        var body = new Response(statusHttp, timestamp, title, path);
        var fields = new ArrayList<Response.Field>();
        for(ObjectError error : ex.getBindingResult().getAllErrors()){

            var name = ((FieldError) error).getField();
            var message = error.getDefaultMessage();

            fields.add(new Response.Field(name, message));
        }
        body.setFields(fields);
        return super.handleExceptionInternal(ex, body, headers, status, request);
    }

    @ExceptionHandler(QuantityException.class)
    public ResponseEntity<Response> handleQuantityException(QuantityException ex, WebRequest request){
        var statusHttp = HttpStatus.BAD_REQUEST;
        var timestamp = LocalDateTime.now();
        var title = ex.getMessage();
        var path = request.getDescription(false).substring(5);
        var body = new Response(statusHttp.value(), timestamp, title, path);

        return ResponseEntity.status(statusHttp).body(body);
    }


}
