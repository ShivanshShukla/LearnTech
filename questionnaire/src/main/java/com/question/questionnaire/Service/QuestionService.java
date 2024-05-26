package com.question.questionnaire.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.question.questionnaire.Model.Questions;
import com.question.questionnaire.Repository.QuestionsRepository;

@Service
public class QuestionService {
    @Autowired
    private QuestionsRepository questionRepository;

    public List<Questions> findBySubjectCode(String subjectCode) {
        return questionRepository.findBySubjectCode(subjectCode);
    }
}
