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
@RequestMapping("/backend/users")
public class UserController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentServices studentServices;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody MyUser user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            myUserRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User saved");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user");
        }
    }

    @GetMapping("/students/email/{emailId}")
    public ResponseEntity<?> findByEmailId(@PathVariable String emailId) {
        try {
            Optional<Student> student = studentServices.findByEmailId(emailId);
            return student.map(ResponseEntity::ok)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching student by email");
        }
    }

    @GetMapping("/students/{studentId}")
    public ResponseEntity<?> getById(@PathVariable Long studentId) {
        try {
            Optional<Student> student = studentServices.getStudentById(studentId);
            return student.map(ResponseEntity::ok)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching student by ID");
        }
    }

    @PostMapping("/students")
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
        try {
            studentServices.addStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body("Student saved");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving student");
        }
    }

    @PostMapping("/students/batch")
    public ResponseEntity<String> saveAllStudents(@RequestBody List<Student> students) {
        try {
            studentServices.saveAllStudents(students);
            return ResponseEntity.status(HttpStatus.CREATED).body("Students saved");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving students");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteStudentsByIds(@RequestBody List<Long> ids) {
        try {
            studentServices.deleteStudentsByIds(ids);
            return ResponseEntity.ok("Students deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting students");
        }
    }

    @PutMapping("/student-update")
    public ResponseEntity<String> updateStudentDetails(@RequestBody Student student) {
        try {
            studentServices.updateStudentDetails(student);
            return ResponseEntity.ok("Student updated");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating student");
        }
    }

    @GetMapping("/dashboard")
    public String getStudentDashboard(Model model) {
        try {
            List<Student> students = studentServices.getAllStudents();
            model.addAttribute("students", students);
            return "userDashboard";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Error loading dashboard");
            return "errorPage";
        }
    }

    @GetMapping("/editdashboard")
    public String editStudentDashboard(Model model) {
        try {
            List<Student> students = studentServices.getAllStudents();
            model.addAttribute("students", students);
            return "editStudent";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Error loading edit dashboard");
            return "errorPage";
        }
    }
}
