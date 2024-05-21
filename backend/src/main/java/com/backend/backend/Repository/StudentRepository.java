package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.backend.Model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByEmailId(String emailId);

    @Query("SELECT COUNT(s) FROM Student s WHERE s.active = true")
    Long countActiveStudents();

    @Query("SELECT COUNT(s) FROM Student s WHERE s.gender = 'male'")
    int countTotalMale();

    @Query("SELECT COUNT(s) FROM Student s WHERE s.gender = 'female'")
    int countTotalFemale();

    @Query("SELECT COUNT(s) FROM Student s WHERE s.gender = 'others'")
    int countTotalOther();

}
