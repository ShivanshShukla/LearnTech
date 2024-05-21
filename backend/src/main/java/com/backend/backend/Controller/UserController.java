package com.backend.backend.Controller;

import com.backend.backend.Model.MyUser;
import com.backend.backend.Model.Student;
import com.backend.backend.Repository.MyUserRepository;
import com.backend.backend.Services.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentServices studentServices;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        myUserRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User saved");
    }

    @GetMapping("/students/email/{emailId}")
    public ResponseEntity<?> findByEmailId(@PathVariable String emailId) {
        Optional<Student> student = studentServices.findByEmailId(emailId);
        return student.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/students/{studentId}")
    public ResponseEntity<?> getById(@PathVariable Long studentId) {
        Optional<Student> student = studentServices.getStudentById(studentId);
        return student.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/students")
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
        studentServices.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student saved");
    }

    @PostMapping("/students/batch")
    public ResponseEntity<String> saveAllStudents(@RequestBody List<Student> students) {
        studentServices.saveAllStudents(students);
        return ResponseEntity.status(HttpStatus.CREATED).body("Students saved");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteStudentsByIds(@RequestBody List<Long> ids) {
        studentServices.deleteStudentsByIds(ids);
        return ResponseEntity.ok("Students deleted");
    }

    @PutMapping("/student-update")
    public ResponseEntity<String> updateStudentDetails(@RequestBody Student student) {
        studentServices.updateStudentDetails(student);
        return ResponseEntity.ok("Student updated");
    }

    @GetMapping("/dashboard")
    public String getStudentDashboard(Model model) {
        List<Student> students = studentServices.getAllStudents();
        model.addAttribute("students", students);
        return "userDashboard";
    }

    @GetMapping("/editdashboard")
    public String editStudentDashboard(Model model) {
        List<Student> students = studentServices.getAllStudents();
        model.addAttribute("students", students);
        return "editDashboard";
    }
}
