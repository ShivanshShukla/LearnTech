package com.backend.backend.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.backend.backend.DTO.UserDataRequest;
import com.backend.backend.Services.StudentServices;

@Controller
@RequestMapping("/backend")
public class DashboardController {

    @Autowired
    private StudentServices studentService;

    @GetMapping(value = { "/", "/home" })
    public String viewDashboard(Model model) {
        UserDataRequest dataRequest = new UserDataRequest();
        Map<UserDataRequest.GenderCount, Integer> genderCountMap = new HashMap<>();

        try {

            Long totalUsers = studentService.totalNumbersOfUsers();
            Long activeUsers = studentService.totalActiveUsers();
            int maleUsers = studentService.totalMaleUsers();
            int femaleUsers = studentService.totalFemaleUsers();
            int otherUsers = studentService.totalOtherUsers();

            dataRequest.setTotalNoOfUsers(String.valueOf(totalUsers));
            dataRequest.setNumberOfActiveUsers(String.valueOf(activeUsers));
            genderCountMap.put(UserDataRequest.GenderCount.MEN, maleUsers);
            genderCountMap.put(UserDataRequest.GenderCount.WOMEN, femaleUsers);
            genderCountMap.put(UserDataRequest.GenderCount.OTHERS, otherUsers);
            dataRequest.setGenderCounts(genderCountMap);

            model.addAttribute("dataRequest", dataRequest);
        } catch (Exception e) {
            e.printStackTrace();

            model.addAttribute("error", "An error occurred while fetching the dashboard data");
        }

        return "view";
    }
}
