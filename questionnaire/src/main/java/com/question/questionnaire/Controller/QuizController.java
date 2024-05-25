package com.question.questionnaire.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.question.questionnaire.Model.Questions;
import com.question.questionnaire.Repository.QuestionsRepository;

import java.util.List;

@RestController
public class QuizController {

    @Autowired
    private QuestionsRepository questionRepository;

    @GetMapping("/api/questions")
    public List<Questions> getQuestions(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Questions> questionPage = questionRepository.findAll(pageable);
        return questionPage.getContent();
    }
}
