package com.ragai.rag.service;

import com.ragai.rag.constants.ActivityType;
import com.ragai.rag.entity.ActivityLog;
import com.ragai.rag.entity.Document;
import com.ragai.rag.repository.ActivityLogRepository;
import com.ragai.rag.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository repository;
    private final ActivityLogRepository activityLogRepository;
    private final PdfService pdfService;
    private final ChunkService chunkService;

    private static final String UPLOAD_DIR = "uploads/";

    public void upload(MultipartFile[] files) throws IOException {

        Path uploadPath = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadPath);

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue;
            }

            // unique filename (overwrite issue solve)
            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = uploadPath.resolve(uniqueFileName);

            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            Document doc = new Document();
            doc.setFileName(file.getOriginalFilename());
            doc.setFilePath(path.toString());
            doc.setSize(file.getSize());
            doc.setCreatedAt(LocalDateTime.now());

            repository.save(doc);

            String text = pdfService.extractText(path.toString());
            chunkService.createChunks(doc.getId(), text);
        }

        ActivityLog log = new ActivityLog();
        log.setMessage("uploaded " + files.length + " files");
        log.setType(ActivityType.UPLOAD);
        log.setCreatedAt(LocalDateTime.now());

        activityLogRepository.save(log);
    }

    public List<Document> getAllDocuments() {
        return repository.findAll();
    }
}
