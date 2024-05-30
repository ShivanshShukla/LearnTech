package com.backend.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.DTO.LogoutRequest;
import com.backend.backend.Model.Student;
import com.backend.backend.Model.StudentLoginForm;
import com.backend.backend.Model.StudentResponse;
import com.backend.backend.Services.StudentServices;

@RestController
@RequestMapping("/backend/learntech/students")
public class StudentController {

    @Autowired
    private StudentServices studentService;

    @PostMapping("/signup")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        String result = studentService.addStudent(student);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody StudentLoginForm studentLoginForm) {
        try {
            String authenticationResult = studentService.authenticateStudent(studentLoginForm.getEmail(),
                    studentLoginForm.getPassword());
            if ("User not found".equals(authenticationResult) || "Incorrect password".equals(authenticationResult)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authenticationResult);
            }
            Student student = studentService.findByEmailId(studentLoginForm.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            studentService.setActiveStatus(student.getId(), true);

            return ResponseEntity.ok(new StudentResponse(student.getFirstName(), student.getLastName(),
                    student.getEmailId(), student.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutStudent(@RequestBody LogoutRequest logoutRequest) {
        try {
            studentService.setActiveStatus(logoutRequest.getStudentId(), false);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
