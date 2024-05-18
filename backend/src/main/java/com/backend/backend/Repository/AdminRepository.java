package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    public Admin findByUsername(String username);
}
