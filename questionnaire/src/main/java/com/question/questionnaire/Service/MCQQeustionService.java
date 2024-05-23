package com.question.questionnaire.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.question.questionnaire.Model.MCQQuestion;
import com.question.questionnaire.Repository.MCQRepository;

@Service
public class MCQQeustionService {
    @Autowired
    private MCQRepository repository;

    public void saveQuestion(MCQQuestion question) {
        if (question.getSubjectCode() != null && !question.getSubjectCode().isEmpty()) {
            List<MCQQuestion> questions = repository.findBySubjectCode(question.getSubjectCode());
            if (!questions.isEmpty()) {
                question.setSubject(questions.get(0).getSubject());
            }
        }
        repository.save(question);
    }

    public List<MCQQuestion> getAllQuestionsBySubject(String subject) {
        return repository.findBySubject(subject);
    }

    public void deleteQuestionsBySubject(String subject) {
        repository.deleteBySubject(subject);
    }

    public List<MCQQuestion> getAllQuestionsBySubjectCode(String subjectCode) {
        return repository.findBySubjectCode(subjectCode);
    }
}
