package com.question.questionnaire.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.question.questionnaire.Model.Questions;

@Repository
public interface QuestionsRepository extends MongoRepository<Questions, String> {

    List<Questions> findBySubjectCode(String subjectCode);

}
