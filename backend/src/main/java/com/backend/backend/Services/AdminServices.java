package com.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Admin;
import com.backend.backend.Repository.AdminRepository;

@Service
public class AdminServices {
    @Autowired
    private AdminRepository adminRepository;

    public Admin findByUserName(String username) {
        try {
            return adminRepository.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("User not found");
            return null;
        }
    }

    public String saveAdmin(Admin admin) {
        try {
            adminRepository.save(admin);
            return "admin data save successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "admin cannot be saved";
        }
    }
}
