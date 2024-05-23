package com.question.questionnaire.Service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.question.questionnaire.Model.PdfFile;
import com.question.questionnaire.Repository.PdfFileRepo;

import java.io.IOException;

@Service
public class PdfService {

    @Autowired
    private PdfFileRepo pdfFileRepository;

    public void savePDFFile(MultipartFile file) throws IOException {
        PdfFile pdfFile = new PdfFile();
        pdfFile.setFileName(file.getOriginalFilename());
        pdfFile.setFileData(file.getBytes());
        pdfFileRepository.save(pdfFile);
    }

    public PdfFile getPDFFile(Long id) {
        return pdfFileRepository.findById(id).orElse(null);
    }

    public String extractTextFromPDF(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }
}
