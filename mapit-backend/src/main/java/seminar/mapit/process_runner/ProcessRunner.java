package seminar.mapit.process_runner;

import javax.swing.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProcessRunner {

    public static void main(String[] args) throws IOException, InterruptedException{

        int id = Integer.parseInt(args[args.length - 1]);

        System.out.println();
        System.out.println("Running process id = " + id + "...");

        Files.createDirectories(new File("all_processes").toPath());
        Files.createDirectories(new File("output_files").toPath());
        Files.createDirectories(new File("processes_streams").toPath());
        Files.createDirectories(new File("downloads").toPath());
//
//        File allProcessLog = new File("all_processes/all_process.log");
//        allProcessLog.createNewFile();
//
//        String refFile = args[args.length - 3];
//        String querysFiles = args[args.length - 2];
//        String ext = "";
//        if (type.equals("MINIMAP2_MAPPING") || type.equals("RAM_MAPPING"))
//            ext = ".paf";
//        else if (type.equals("MINIMAP2_ALIGN"))
//            ext = ".sam";
//        else if (type.equals("RAVEN"))
//            ext = ".fasta";
//        else if (type.equals("MINIMAP2_INDEXING"))
//            ext = ".mmi";
//
//        List<String> fileContent = new ArrayList<>(Files.readAllLines(allProcessLog.toPath()));
//        int id = 1;
//        if (!fileContent.isEmpty()) {
//            String lastProcess = fileContent.get(fileContent.size() - 1);
//            int lastId = Integer.parseInt(lastProcess.split(" : ")[0]);
//            id = lastId + 1;
//        }
//        String fileName = type + "_" + Integer.toString(id) + ext;
//        File outputFile = new File("output_files/" + fileName);
//        outputFile.createNewFile();
//        File errorFile = new File("processes_streams/" + fileName.substring(0, fileName.length() - ext.length()) + "_stream.log");
//        errorFile.createNewFile();
//
//        ArrayList<String> commands = new ArrayList<String>();
//        if (!type.equals("MINIMAP2_INDEXING")) {
//            for (int i = 0; i < args.length - 2; i++)
//                commands.add(args[i]);
//            for (String s : querysFiles.split(";"))
//                commands.add(s);
//        } else {
//            commands.add(args[0]);
//            commands.add(args[1]);
//            commands.add(outputFile.getAbsolutePath());
//            for (int i = 2; i < args.length - 1; i++)
//                commands.add(args[i]);
//        }
//
//        ProcessBuilder pb = new ProcessBuilder(commands);
//        pb.redirectError(errorFile);
//        pb.redirectOutput(outputFile);
//        Process process = pb.start();
//        String timeStampStart = new SimpleDateFormat("dd.MM.yyyy. HH:mm:ss").format(new Date());
//
//        final int finalId = id;
//        StringBuilder sb = new StringBuilder();
//        sb.append(Integer.toString(id) + " : ");
////        if (!type.equals(App.PanelType.RAVEN.toString()) && !type.equals(App.PanelType.MINIMAP2_INDEXING.toString()))
////            sb.append(refFile + " : ");
////        else
////            sb.append("- : ");
//        sb.append(querysFiles + " : ");
//        sb.append(outputFile.getAbsolutePath() + " : ");
//        sb.append(timeStampStart + " : ");
//        sb.append("- : ");
//        sb.append(type + " : ");
//        //sb.append(ProcessStates.RUNNING.toString());
//        fileContent.add(sb.toString());
//
//        Files.write(allProcessLog.toPath(), fileContent);
//
//        SwingUtilities.invokeLater(() -> {
//            JOptionPane.showMessageDialog(new JFrame(), "Process running.\n" +
//                            "Process id = " + Integer.toString(finalId),
//                    "Process started", JOptionPane.INFORMATION_MESSAGE);
//        });
//
//        System.out.println("Process " + id +" running...");
//
//        int status = process.waitFor();
//        System.out.println("Procces finished");
//        String timeStampFinish = new SimpleDateFormat("dd.MM.yyyy. HH:mm:ss").format(new Date());
//
//        System.out.println("Output file path: " + outputFile.getAbsolutePath().toString());
//        System.out.println();
//
//        fileContent = new ArrayList<>(Files.readAllLines(allProcessLog.toPath()));
//        for (int i = 0; i < fileContent.size(); i++) {
//            String line = fileContent.get(i);
//            String[] content = line.split(" : ");
//            if (Integer.parseInt(content[0]) == id) {
//                System.out.println("Found id");
//                content[5] = timeStampFinish;
////                if (status == 0)
////                    content[7] = ProcessStates.FINISHED.toString();
////                else
////                    content[7] = ProcessStates.FAILED.toString();
//                fileContent.set(i, String.join(" : ", content));
//                break;
//            }
//        }
//
//        Files.write(allProcessLog.toPath(), fileContent);
//
//        if (status == 0)
//            SwingUtilities.invokeLater(() -> {
//                JOptionPane.showMessageDialog(new JFrame(), "Process finished.\nProcess id = " + Integer.toString(finalId),
//                        "Success", JOptionPane.INFORMATION_MESSAGE);
//            });
//        else
//            SwingUtilities.invokeLater(() -> {
//                JOptionPane.showMessageDialog(new JFrame(), "Process failed.\nProcess id = " + Integer.toString(finalId) + "\n" +
//                                "More about why it failed:\n" + errorFile.getAbsolutePath(),
//                        "Failure", JOptionPane.ERROR_MESSAGE);
//            });

    }
}

