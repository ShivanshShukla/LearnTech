package com.question.questionnaire.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.question.questionnaire.Model.PdfFile;

public interface PdfFileRepo extends JpaRepository<PdfFile, Long> {

}
