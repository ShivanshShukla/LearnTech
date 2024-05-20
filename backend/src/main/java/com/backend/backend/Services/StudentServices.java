package com.backend.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Student;
import com.backend.backend.Repository.StudentRepository;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Student> findByEmailId(String emailId) {
        return Optional.ofNullable(studentRepository.findByEmailId(emailId));
    }

    public String addStudent(Student student) {
        Optional<Student> existingStudent = findByEmailId(student.getEmailId());
        if (existingStudent.isPresent()) {
            return "Student with this email already exists";
        }
        try {
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            studentRepository.save(student);
            return "Student data saved successfully";
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return "Failed to save student data - integrity violation";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save student data";
        }
    }

    public String saveAllStudents(List<Student> students) {
        try {
            studentRepository.saveAll(students);
            return "All students saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save students data";
        }
    }

    public String deleteStudentById(Long id) {
        try {
            studentRepository.deleteById(id);
            return "Student data deleted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to delete student data";
        }
    }

    public String updateStudentDetails(Student student) {
        try {
            studentRepository.save(student);
            return "Student data updated successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update student data";
        }
    }

    public List<Student> getAllStudents() {
        try {
            return studentRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String authenticateStudent(String emailId, String password) {
        Student student = studentRepository.findByEmailId(emailId);
        if (student == null) {
            return "User not found";
        }

        if (!passwordEncoder.matches(password, student.getPassword())) {
            return "Incorrect password";
        }

        return "Login successful";
    }

}