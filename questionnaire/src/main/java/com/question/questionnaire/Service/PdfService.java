package com.question.questionnaire.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.question.questionnaire.Model.PdfFiles;
import com.question.questionnaire.Repository.PdfFileRepository;

@Service
public class PdfService {
    @Autowired
    private PdfFileRepository pdfFileRepository;

    public String readPdf(String fileName) {
        Optional<PdfFiles> pdfFileOptional = pdfFileRepository.findByName(fileName);
        if (pdfFileOptional.isPresent()) {
            PdfFiles pdfFile = pdfFileOptional.get();
            try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfFile.getContent()))) {
                if (!document.isEncrypted()) {
                    PDFTextStripper pdfStripper = new PDFTextStripper();
                    return pdfStripper.getText(document);
                } else {
                    return "PDF is encrypted and cannot be read";
                }
            } catch (IOException e) {
                e.printStackTrace();
                return "Error reading PDF content";
            }
        }
        return "File not found";
    }
}
