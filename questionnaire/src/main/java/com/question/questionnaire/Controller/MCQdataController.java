package com.question.questionnaire.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.question.questionnaire.Model.MCQQuestion;
import com.question.questionnaire.Service.MCQQeustionService;

@RestController
@RequestMapping("/questionnaire")
public class MCQdataController {
    @Autowired
    private MCQQeustionService service;

    @GetMapping("/edit/{id}")
    public MCQQuestion editQuestions(@PathVariable("id") String questionId) {
        MCQQuestion question = service.getQuestionById(questionId);
        return question;
    }
}
