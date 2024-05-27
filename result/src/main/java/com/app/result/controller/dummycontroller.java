package com.app.result.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class dummycontroller {
    @GetMapping("/")
    public String getMethodName() {
        return new String("Hello world");
    }

}
