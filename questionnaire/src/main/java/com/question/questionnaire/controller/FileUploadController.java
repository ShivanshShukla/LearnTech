package com.question.questionnaire.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.question.questionnaire.Model.PdfFiles;
import com.question.questionnaire.Service.FileStorageService;

@RestController
@RequestMapping("/upload")
public class FileUploadController {
    @Autowired
    private FileStorageService fileStorageService;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/file")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }

        try {

            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'!");

            return "You successfully uploaded '" + file.getOriginalFilename() + "'!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload '" + file.getOriginalFilename() + "'. Error: " + e.getMessage();
        }
    }

    @PostMapping("/ondatabase")
    public String uploadOnDatabase(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }

        try {
            String fileId = fileStorageService.storeFile(file);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "' with file ID: " + fileId);

            return "You successfully uploaded '" + file.getOriginalFilename() + "' with file ID: " + fileId;
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file '" + file.getOriginalFilename() + "'";
        }
    }

    @GetMapping("/get-by-names")
    public String getPdfByName(@RequestParam String fileName) {
        Optional<PdfFiles> pdfFileOptional = fileStorageService.getFileByName(fileName);
        return pdfFileOptional.map(pdfFile -> "PDF found with name '" + fileName + "':\n" + pdfFile.toString())
                .orElse("PDF with name '" + fileName + "' not found");
    }

    @GetMapping("/get-by-id/{fileId}")
    public String getPdfById(@PathVariable String fileId) {
        Optional<PdfFiles> pdfFileOptional = fileStorageService.getFileById(fileId);
        return pdfFileOptional.map(pdfFile -> "PDF found with ID '" + fileId + "':\n" + pdfFile.toString())
                .orElse("PDF with ID '" + fileId + "' not found");
    }
}
