package seminar.process_runner;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ProcessRunner {

    private static final String alignOutputFilesPath = "output_files/sam_files";
    private static final String mappingOutputFilesPath = "output_files/paf_files";
    private static final String processesStreamsPath = "processes_streams";
    private static final String minimap2Path = "/home/zvonimir/Desktop/minimap2/minimap2";

    public static void createDirectories() {
        try {
            Files.createDirectories(new File(alignOutputFilesPath).toPath());
            Files.createDirectories(new File(mappingOutputFilesPath).toPath());
            Files.createDirectories(new File(processesStreamsPath).toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {

        System.out.println("ProcessRunner started with args:");
        for (String s : args) {
            System.out.print(s);
        }
        System.out.println();
        createDirectories();

        String type = args[args.length - 1];
        String email = args[args.length - 2];

        String ext = null;
        File folder = null;
        if (type.equals("MAPPING")) {
            ext = ".paf";
            folder = new File(mappingOutputFilesPath);
        } else if (type.equals("ALIGN")) {
            ext = ".sam";
            folder = new File(alignOutputFilesPath);
        }

        String localDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy-HH-mm-ss-SSS"));
        File[] listOfFiles = folder.listFiles();
        int id = listOfFiles.length + 1;
        File outputFile = new File(folder + "/" + type + "_" + id + "_" + localDateTime + ext);
        File errorFile = new File(processesStreamsPath + "/" + type + "_" + id + "_" + localDateTime
                + "_stream.log");
        try {
            errorFile.createNewFile();
            outputFile.createNewFile();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        List<String> commands = new ArrayList<>();
        commands.add(minimap2Path);
        for (int i = 0; i < args.length - 2; i++)
            commands.add(args[i]);

        ProcessBuilder pb = new ProcessBuilder(commands);
        pb.redirectOutput(outputFile);
        pb.redirectError(errorFile);
        Process process = null;
        int status;
        System.out.println("About to start process:");
        for  (String s: commands) {
            System.out.print(s + " ");
        }
        System.out.println();
        try {
            process = pb.start();
            status = process.waitFor();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }



    }
}
