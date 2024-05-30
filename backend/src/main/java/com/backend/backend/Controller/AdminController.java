package com.backend.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.backend.Model.Admin;
import com.backend.backend.Services.AdminServices;

@RestController
@RequestMapping("/backend/api/admin")
public class AdminController {

    @Autowired
    private AdminServices adminServices;

    @GetMapping(value = { "/", "/home" })
    public String home() {
        return "Welcome to Admin Home";
    }

    @PostMapping("/signup")
    public ResponseEntity<String> saveAdminDetails(@RequestBody Admin admin) {
        try {
            adminServices.saveAdmin(admin);
            return ResponseEntity.ok("Admin data saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Admin details cannot be saved");
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<Admin> getAdminByUsername(@RequestParam String username) {
        try {
            Admin admin = adminServices.findByUserName(username);
            return ResponseEntity.ok(admin);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(null);
        }
    }
}
