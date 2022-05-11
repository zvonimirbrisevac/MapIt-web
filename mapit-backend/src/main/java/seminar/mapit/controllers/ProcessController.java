package seminar.mapit.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seminar.mapit.dto.process.AlignProcessDTO;
import seminar.mapit.dto.process.MappingProcessDTO;
import seminar.mapit.services.ProcessService;

@Controller
public class ProcessController {

    private final static Logger logger = LoggerFactory.getLogger(ProcessController.class);
    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @PostMapping(value = "/align", consumes = { MediaType.APPLICATION_OCTET_STREAM_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE })//, consumes = "multipart/form-data")
    public ResponseEntity createAlignProcess(@RequestParam MultipartFile referenceFile,
                                             @RequestParam MultipartFile[] queryFiles,
                                             @RequestPart AlignProcessDTO parameters) {
        logger.info("Processing new alignment process...");

        processService.startAlignProcess(parameters, referenceFile, queryFiles);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(value = "/mapping", consumes = { MediaType.APPLICATION_OCTET_STREAM_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE })//, consumes = "multipart/form-data")
    public ResponseEntity createMappingProcess(@RequestParam MultipartFile referenceFile,
                                             @RequestParam MultipartFile[] queryFiles,
                                             @RequestPart MappingProcessDTO parameters) {
        logger.info("Processing new mapping process...");

        processService.startMappingProcess(parameters, referenceFile, queryFiles);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
