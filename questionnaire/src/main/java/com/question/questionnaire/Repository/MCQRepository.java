package com.question.questionnaire.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.question.questionnaire.Model.MCQQuestion;

public interface MCQRepository extends MongoRepository<MCQQuestion, String> {

    List<MCQQuestion> findBySubject(String subject);

    void deleteBySubject(String subject);

    List<MCQQuestion> findBySubjectCode(String subjectCode);

    MCQQuestion findMcqQuestionById(String id);
}