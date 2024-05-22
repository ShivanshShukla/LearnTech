package com.question.questionnaire.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "upload";
    }

    @GetMapping("/db")
    public String untoDatabase() {
        return "database";
    }

}
