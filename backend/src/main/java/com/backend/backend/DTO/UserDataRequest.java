package com.backend.backend.DTO;

import java.util.Map;

import lombok.Data;

@Data
public class UserDataRequest {
    private String totalNoOfUsers;
    private String numberOfActiveUsers;
    private Map<GenderCount, Integer> genderCounts;

    public enum GenderCount {
        MEN, WOMEN, OTHERS
    }

    public String getTotalNoOfUsers() {
        return totalNoOfUsers;
    }

    public void setTotalNoOfUsers(String totalNoOfUsers) {
        this.totalNoOfUsers = totalNoOfUsers;
    }

    public String getNumberOfActiveUsers() {
        return numberOfActiveUsers;
    }

    public void setNumberOfActiveUsers(String numberOfActiveUsers) {
        this.numberOfActiveUsers = numberOfActiveUsers;
    }

    public Map<GenderCount, Integer> getGenderCounts() {
        return genderCounts;
    }

    public void setGenderCounts(Map<GenderCount, Integer> genderCounts) {
        this.genderCounts = genderCounts;
    }

}
