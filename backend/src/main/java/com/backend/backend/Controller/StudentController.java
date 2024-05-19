package com.backend.backend.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Student;
import com.backend.backend.Services.StudentServices;

@RestController
@RequestMapping("/learntech/student")
public class StudentController {
    private final StudentServices studentServices;

    @Autowired
    public StudentController(StudentServices studentServices) {
        this.studentServices = studentServices;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        Optional<Student> existingStudent = studentServices.findByEmailId(student.getEmailId());
        if (existingStudent.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Student with this email already exists");
        }

        String result = studentServices.addStudent(student);
        return ResponseEntity.ok(result);
    }

}
