package com.question.questionnaire.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.question.questionnaire.Model.Questions;

public interface QuestionsRepository extends MongoRepository<Questions, String> {

}
