package com.ragai.rag.controller;

import com.ragai.rag.dto.ApiResponse;
import com.ragai.rag.entity.Document;
import com.ragai.rag.entity.ResponseStructure;
import com.ragai.rag.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("files") MultipartFile[] files) throws IOException {

        if (files == null || files.length == 0)
            return ResponseEntity.badRequest().body("No files provided");
        documentService.upload(files);
        return ResponseEntity.ok("Files Uploaded successfully");
    }

    @GetMapping("/get-all-docs")
    public ResponseEntity<ResponseStructure<List<Document>>> getAllDocuments() {
        List<Document> docs = documentService.getAllDocuments();
        return ApiResponse.success(
                docs,
                "documents fetched successfully",
                HttpStatus.OK
        );
    }

}
