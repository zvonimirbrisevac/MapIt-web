package seminar.mapit.dto.process;

import org.springframework.web.multipart.MultipartFile;

public class AlignProcessDTO {

    private String email;
    private String preset;
    private Integer matching;
    private Integer mismatch;
    private String gapOpen;
    private String gapExt;
    private String zDrop;
    private String minPeakDP;
    private String findGTAG;

    public AlignProcessDTO(String email, String preset, int matching, int mismatch, String gapOpen,
                           String gapExt, String zDrop, String minPeakDP, String findGTAG) {
        this.email = email;
        this.preset = preset;
        this.matching = matching;
        this.mismatch = mismatch;
        this.gapOpen = gapOpen;
        this.gapExt = gapExt;
        this.zDrop = zDrop;
        this.minPeakDP = minPeakDP;
        this.findGTAG = findGTAG;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPreset() {
        return preset;
    }

    public Integer getMatching() {
        return matching;
    }

    public Integer getMismatch() {
        return mismatch;
    }

    public String getGapOpen() {
        return gapOpen;
    }

    public String getGapExt() {
        return gapExt;
    }

    public String getzDrop() {
        return zDrop;
    }

    public String getMinPeakDP() {
        return minPeakDP;
    }

    public String getFindGTAG() {
        return findGTAG;
    }
}
