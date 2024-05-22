package com.question.questionnaire.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.question.questionnaire.Model.PdfFiles;
import com.question.questionnaire.Repository.PdfFileRepository;

@Service
public class FileStorageService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PdfFileRepository pdfFileRepository;

    public String storeFile(MultipartFile file) throws IOException {
        PdfFiles pdfFile = new PdfFiles();
        pdfFile.setName(file.getOriginalFilename());
        pdfFile.setContent(file.getBytes());

        PdfFiles savedFile = pdfFileRepository.save(pdfFile);
        return savedFile.getId(); // Return the ID of the saved file
    }

    public Optional<PdfFiles> getFileByName(String fileName) {
        return pdfFileRepository.findByName(fileName);
    }

    public Optional<PdfFiles> getFileById(String fileId) {
        return pdfFileRepository.findById(fileId);
    }

    public List<Document> listFiles() {
        GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
        GridFSFindIterable files = gridFSBucket.find();

        List<Document> fileList = new ArrayList<>();
        for (GridFSFile file : files) {
            Document doc = new Document();
            doc.append("filename", file.getFilename());
            doc.append("length", file.getLength());
            doc.append("uploadDate", file.getUploadDate());
            fileList.add(doc);
        }
        return fileList;
    }
}
