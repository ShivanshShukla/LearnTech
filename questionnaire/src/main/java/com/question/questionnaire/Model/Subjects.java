package com.question.questionnaire.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questionnaire")
public class Subjects {
    private String subjectCode;
    private String subject;
    private long totalQuestions;

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public long gettotalQuestions() {
        return totalQuestions;
    }

    public void settotalQuestions(Long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

}
