package com.question.questionnaire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.question.questionnaire.Service.PdfService;

@Controller
public class PdfController {
    @Autowired
    private PdfService pdfService;

    @GetMapping("/read-pdf")
    public String readPdf(@RequestParam String fileName) {
        return pdfService.readPdf(fileName);
    }
}
