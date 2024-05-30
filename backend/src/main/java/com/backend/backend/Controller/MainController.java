package com.backend.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/backend")
public class MainController {
   
    @GetMapping("/login")
    public String login() {
        return "customLogin";
    }
}
