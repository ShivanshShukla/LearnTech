package com.backend.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Student;
import com.backend.backend.Model.StudentLoginForm;
import com.backend.backend.Model.StudentResponse;
import com.backend.backend.Services.StudentServices;

@RestController
@RequestMapping("/learntech/students")
public class StudentController {

    @Autowired
    private StudentServices studentService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        String result = studentService.addStudent(student);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StudentLoginForm loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String email = authentication.getName();
            Student student = studentService.findByEmailId(email).orElse(null);

            if (student != null) {
                StudentResponse userResponse = new StudentResponse(student.getFirstName(), student.getLastName(),
                        student.getEmailId());
                return ResponseEntity.ok(userResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials: " + e.getMessage());
        }
    }

    @GetMapping("/get-first-name")
    public ResponseEntity<String> getFirstName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Student student = studentService.findByEmailId(email).orElse(null);

        if (student != null) {
            return ResponseEntity.ok(student.getFirstName());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
