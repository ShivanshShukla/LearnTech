package com.backend.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.MyUser;
import com.backend.backend.Model.Student;
import com.backend.backend.Repository.MyUserRepository;
import com.backend.backend.Services.StudentServices;

@Controller
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private MyUserRepository myUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentServices studentServices;

    @PostMapping("/register/user")
    public String addUser(@RequestBody MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        myUserRepository.save(user);
        return "User saved";
    }

    @GetMapping("/view")
    public String userHomePage() {
        return "userhome";
    }

    @GetMapping("/login")
    public String login() {
        return "customLogin";
    }

    @GetMapping("/{emailId}")
    public ResponseEntity<?> findByEmailId(@PathVariable String emailId) {
        Optional<Student> student = studentServices.findByEmailId(emailId);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addAll")
    public ResponseEntity<String> saveAllStudents(@RequestBody List<Student> students) {
        String result = studentServices.saveAllStudents(students);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudentById(@PathVariable Long id) {
        String result = studentServices.deleteStudentById(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateStudentDetails(@RequestBody Student student) {
        String result = studentServices.updateStudentDetails(student);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllStudents() {
        List<Student> students = studentServices.getAllStudents();
        if (students != null) {
            return ResponseEntity.ok(students);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve students");
        }
    }
}
