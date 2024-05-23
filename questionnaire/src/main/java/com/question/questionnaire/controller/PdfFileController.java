package com.question.questionnaire.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.question.questionnaire.Model.PdfFile;
import com.question.questionnaire.Service.PdfService;

@Controller
public class PdfFileController {
    @Autowired
    private PdfService pdfFileService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/upload")
    public String uploadPDFFile(@RequestParam("file") MultipartFile file, Model model) {
        try {
            pdfFileService.savePDFFile(file);
            String extractedText = pdfFileService.extractTextFromPDF(file);
            model.addAttribute("message", "File uploaded successfully!");
            model.addAttribute("extractedText", extractedText);
        } catch (IOException e) {
            model.addAttribute("message", "File upload failed: " + e.getMessage());
        }
        return "index";
    }

    @GetMapping("/view/{id}")
    public String viewPDFFile(@PathVariable Long id, Model model) {
        PdfFile pdfFile = pdfFileService.getPDFFile(id);
        if (pdfFile != null) {
            model.addAttribute("pdfFile", pdfFile);
        } else {
            model.addAttribute("message", "PDF file not found.");
        }
        return "view-pdf";
    }
}
