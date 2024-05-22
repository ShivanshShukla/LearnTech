package com.question.questionnaire.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.question.questionnaire.Model.PdfFiles;

public interface PdfFileRepository extends MongoRepository<PdfFiles, String> {
    Optional<PdfFiles> findByName(String name);
}
