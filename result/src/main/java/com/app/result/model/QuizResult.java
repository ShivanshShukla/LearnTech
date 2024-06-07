package com.app.result.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private int totalQuestions;
    private int correctAnswers;
    private int incorrectAnswers;
    private int skippedQuestions;
    private double accuracy;
    private double averageResponseTime;
    private double timePerQuestion;
    private double completionTime;
    private double averageDifficulty;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(int incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    public int getSkippedQuestions() {
        return skippedQuestions;
    }

    public void setSkippedQuestions(int skippedQuestions) {
        this.skippedQuestions = skippedQuestions;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public double getAverageResponseTime() {
        return averageResponseTime;
    }

    public void setAverageResponseTime(double averageResponseTime) {
        this.averageResponseTime = averageResponseTime;
    }

    public double getTimePerQuestion() {
        return timePerQuestion;
    }

    public void setTimePerQuestion(double timePerQuestion) {
        this.timePerQuestion = timePerQuestion;
    }

    public double getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(double completionTime) {
        this.completionTime = completionTime;
    }

    public double getAverageDifficulty() {
        return averageDifficulty;
    }

    public void setAverageDifficulty(double averageDifficulty) {
        this.averageDifficulty = averageDifficulty;
    }

}
