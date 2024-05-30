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

        dataRequest.setTotalNoOfUsers(String.valueOf(studentService.totalNumbersOfUsers()));
        dataRequest.setNumberOfActiveUsers(String.valueOf(studentService.totalActiveUsers()));

        genderCountMap.put(UserDataRequest.GenderCount.MEN, studentService.totalMaleUsers());
        genderCountMap.put(UserDataRequest.GenderCount.WOMEN, studentService.totalFemaleUsers());
        genderCountMap.put(UserDataRequest.GenderCount.OTHERS, studentService.totalOtherUsers());

        dataRequest.setGenderCounts(genderCountMap);
        model.addAttribute("dataRequest", dataRequest);
        return "view";
    }
}
