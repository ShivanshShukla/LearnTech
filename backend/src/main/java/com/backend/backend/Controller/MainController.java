package com.backend.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping(value = { "/", "/home" })
    public String viewHomePage() {
        return "view";
    }

    @GetMapping("/login")
    public String login() {
        return "customLogin";
    }
}
