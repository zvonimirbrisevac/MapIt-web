package seminar.mapit.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seminar.mapit.dto.process.AlignProcessDTO;

import javax.swing.*;
import java.io.*;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ProcessService {

    private final static HashMap<String, String> alignParamsShorts = new HashMap<>() {{
        put("preset", "-ax");
        put("matching", "-A");
        put("mismatch", "-B");
        put("gapOpen", "-O");
        put("gapExt", "-E");
        put("zDrop", "-z");
        put("minPeakDP", "-s");
        put("findGTAG", "-u");
    }} ;

    private static final String refFilesPath = "all_processes/ref_files";
    private static final String queryFilesPath = "all_processes/query_files";

    public static void createDirectories() {
        try {
            Files.createDirectories(new File(refFilesPath).toPath());
            Files.createDirectories(new File(queryFilesPath).toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean startAlignProcess(AlignProcessDTO params, MultipartFile refFile, MultipartFile[] queryFiles) {

        createDirectories();
        String localDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy-HH-mm-ss-SSS"));

        List<String> processRunnerCommands = new ArrayList<>();

        processRunnerCommands.add("java");
        processRunnerCommands.add("-cp");
        processRunnerCommands.add("target/classes");
        processRunnerCommands.add("seminar.process_runner.ProcessRunner");

        if (params.getPreset() != null) {
            processRunnerCommands.add(alignParamsShorts.get("preset"));
            processRunnerCommands.add(params.getPreset());
        } else {
            processRunnerCommands.add("-a");
        }

        String refFileName = refFile.getOriginalFilename();
        File localRefFile = new File(refFilesPath + "/" + localDateTime + "_" + refFileName);
        try {
            OutputStream os = new FileOutputStream(localRefFile);
            os.write(refFile.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        processRunnerCommands.add(localRefFile.getAbsolutePath());
        List<String> queryPaths = new ArrayList<>();
        for (MultipartFile queryFile: queryFiles) {
            String queryFileName = queryFile.getOriginalFilename();
            File localQueryFile = new File(queryFilesPath + "/" + localDateTime + "_" + queryFileName);
            try {
                OutputStream os = new FileOutputStream(localQueryFile);
                os.write(queryFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            processRunnerCommands.add(localQueryFile.getAbsolutePath());
        }


        List<String> paramsCommands = new ArrayList<>();

        if (params.getMatching() != null) {
            paramsCommands.add(alignParamsShorts.get("matching"));
            paramsCommands.add(String.valueOf(params.getMatching()));
        }
        if (params.getMismatch() != null) {
            paramsCommands.add(alignParamsShorts.get("mismatch"));
            paramsCommands.add(params.getMismatch().toString());
        }
        if (params.getGapOpen() != null) {
            paramsCommands.add(alignParamsShorts.get("gapOpen"));
            paramsCommands.add(params.getGapOpen());
        }
        if (params.getGapExt() != null) {
            paramsCommands.add(alignParamsShorts.get("gapExt"));
            paramsCommands.add(params.getGapExt());
        }
        if (params.getzDrop() != null) {
            paramsCommands.add(alignParamsShorts.get("zDrop"));
            paramsCommands.add(params.getzDrop());
        }
        if (params.getMinPeakDP() != null) {
            paramsCommands.add(alignParamsShorts.get("minPeakDP"));
            paramsCommands.add(params.getMinPeakDP());
        }
        if (params.getFindGTAG() != null) {
            paramsCommands.add(alignParamsShorts.get("findGTAG"));
            paramsCommands.add(params.getFindGTAG());
        }

        processRunnerCommands.addAll(paramsCommands);
        processRunnerCommands.add(params.getEmail());
        processRunnerCommands.add("ALIGN");

        System.out.println("Line that will be executed:");
        for (String s: processRunnerCommands) {
            System.out.print(s + " ");
        }
        System.out.println();
        ProcessBuilder pb = new ProcessBuilder(processRunnerCommands);
        try {
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            if (process.waitFor() != 0) {
                System.out.println("Dogodilo se sranje");
            } else {
                System.out.println("Proces se uspješno izvršio");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return true;
    }


}
