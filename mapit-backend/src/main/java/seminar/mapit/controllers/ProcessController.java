package seminar.mapit.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import seminar.mapit.dto.process.ProcessRequestDTO;
import seminar.mapit.services.ProcessService;

@Controller
@RequestMapping(value = "/process")
public class ProcessController {

    private final static Logger logger = LoggerFactory.getLogger(ProcessController.class);
    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @GetMapping(value = "/{processId}")
    public ResponseEntity getProcess(@PathVariable long processId) {
        logger.info("Fetching process info...");

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity createProcess(@RequestBody ProcessRequestDTO request) {
        logger.info("Processing new request for process...");

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
