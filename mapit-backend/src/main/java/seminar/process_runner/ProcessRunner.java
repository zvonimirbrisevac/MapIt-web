package seminar.process_runner;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

//        System.out.println("ARgs length: " + args.length);
        System.out.println("ProcessRunner started with args:");
        for (String s : args) {
            System.out.print(s + " ");
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

        String localDateTimeEnd = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy-HH-mm-ss-SSS"));
        if (status == 0) {
            System.out.println("Succesfully finished minimap2 process");
            List<String> analysis;
            if (type == "ALIGN") {
                analysis = getPafAnalysis(outputFile);
            } else if (type == "MAPPING") {
                analysis = getMappingAnalysis(outputFile);
            }
        } else {
            /// u slučaju faila
        }






    }
    public static List<String> getPafAnalysis(File outputFile) {
        long positiveStrand = 0;
        long queryTotalLength = 0;
        long queryTotalStartToEnd = 0;
        double averageQueryCoverage = 0;
        long totalResidueMatches = 0;
        long totalAlignmentBlockLength = 0;
        long totalMappingQuality = 0;
        List<String> content = null;
        try {
            content = new ArrayList<>(Files.readAllLines(outputFile.toPath()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        int fileLength = content.size();
        for (String line : content) {
            String[] pafData = line.split("\t");
            queryTotalLength += Long.parseLong(pafData[1]);
            if (pafData[4].equals("+"))
                positiveStrand++;
            averageQueryCoverage += ((double)Long.parseLong(pafData[3]) - Long.parseLong(pafData[2])) / Long.parseLong(pafData[1]);
            totalResidueMatches += Long.parseLong(pafData[9]);
            totalAlignmentBlockLength += Long.parseLong(pafData[10]);
            totalMappingQuality += Long.parseLong(pafData[11]);
        }

        DecimalFormat df = new DecimalFormat("#######.###");

        DecimalFormat lf = (DecimalFormat) NumberFormat.getInstance(Locale.US);
        DecimalFormatSymbols symbols = lf.getDecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');
        lf.setDecimalFormatSymbols(symbols);

        double queryCoverage = averageQueryCoverage / fileLength;
        double percOriginalStrands = ((double)positiveStrand) / fileLength;
        double averageResidueMatches = ((double) totalResidueMatches) / totalAlignmentBlockLength;
        double averageBlockLength = ((double) totalAlignmentBlockLength) / fileLength;
        double averageMapQuality = ((double) totalMappingQuality) / fileLength;

        return null;
    }

    public static List<String> getMappingAnalysis(File outputFile) {
        long dataSize = 0;
        long totalMapQuality = 0;
        long unmappedSegments = 0;
        long originalSegments = 0;
        long suplementaryAligns = 0;
        long secondaryAligns = 0;
        long properAligns = 0;

        List<String> content = null;
        try {
            content = new ArrayList<>(Files.readAllLines(outputFile.toPath()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        for (String line : content) {
            if (line.startsWith("@"))
                continue;
            dataSize++;
            String[] samData = line.split("\t");
            totalMapQuality += Integer.parseInt(samData[4]);
            int flag = Integer.parseInt(samData[1]);
            boolean properly = (flag & (1 << 1)) != 0;
            if (properly)
                properAligns++;

            boolean unmapped = (flag & (1 << 2)) != 0;
            if (unmapped)
                unmappedSegments++;

            boolean reversed = (flag & (1 << 4)) != 0;
            if (!reversed)
                originalSegments++;

            boolean suplemen = (flag & (1 << 11)) != 0;
            if (suplemen)
                suplementaryAligns++;

            boolean secondary = (flag & (1 << 8)) != 0;
            if (secondary)
                secondaryAligns++;

        }

        DecimalFormat df = new DecimalFormat("##.###");

        DecimalFormat lf = (DecimalFormat) NumberFormat.getInstance(Locale.US);
        DecimalFormatSymbols symbols = lf.getDecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');
        lf.setDecimalFormatSymbols(symbols);

        double properPerc = ((double) properAligns) / dataSize;
        double origPerc = ((double) originalSegments) / dataSize;
        double unmappedPerc = ((double) unmappedSegments) / dataSize;
        double secondPerc = ((double) secondaryAligns) / dataSize;
        double suplementPerc = ((double) suplementaryAligns) / dataSize;
        double averageMapq = ((double) totalMapQuality) / dataSize;

        return null;
    }
}
