package com.question.questionnaire.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collation = "pdfFiles")
public class PdfFiles {
    @Id
    private String id;
    private String name;
    private byte[] content;
}
