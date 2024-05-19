package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByEmailId(String emailId);
}