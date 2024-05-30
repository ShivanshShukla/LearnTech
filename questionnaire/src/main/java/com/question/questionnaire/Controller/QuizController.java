package com.question.questionnaire.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.question.questionnaire.Model.Questions;
import com.question.questionnaire.Model.Subjects;
import com.question.questionnaire.Repository.SubjectRepository;
import com.question.questionnaire.Service.QuestionService;

@RestController
@RequestMapping("/questionnaire")
public class QuizController {

    @Autowired
    private QuestionService service;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/api/questions")
    public List<Questions> getQuestionsBySubjectCode(@RequestParam("subjectCode") String subjectCode) {
        List<Questions> questions = service.findBySubjectCode(subjectCode);
        return questions;
    }

    @GetMapping("/api/subjects")
    public List<Subjects> getAllSubjects() {
        return subjectRepository.findDistinctSubjectsAndCodesWithQuestionCount();
    }

}
