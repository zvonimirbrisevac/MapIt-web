package seminar.mapit.dto.process;

public class MappingProcessDTO {
//    email: String;
//    preset: String;
//    repMin: number;
//    stopChain: number;
//    maxIntron: number;
//    maxFrag: number;
//    bandwidths: String;
//    minNumMin: number;
//    minChainScore: number;
//    minSecondToPrim: number;
//    atMostSecond: number;
//    skipSelfAndDual: boolean;
    private String email;
    private String preset;
    private Double repMin;
    private Integer stopChain;
    private Integer maxIntron;
    private Integer maxFrag;
    private String bandwidths;
    private Integer minNumMin;
    private Integer minChainScore;
    private Double minSecondToPrim;
    private Integer atMostSecond;
    private Boolean skipSelfAndDual;

    public MappingProcessDTO(String email, String preset, Double repMin, Integer stopChain, Integer maxIntron,
                             Integer maxFrag, String bandwidths, Integer minNumMin, Integer minChainScore,
                             Double minSecondToPrim, Integer atMostSecond, Boolean skipSelfAndDual) {
        this.email = email;
        this.preset = preset;
        this.repMin = repMin;
        this.stopChain = stopChain;
        this.maxIntron = maxIntron;
        this.maxFrag = maxFrag;
        this.bandwidths = bandwidths;
        this.minNumMin = minNumMin;
        this.minChainScore = minChainScore;
        this.minSecondToPrim = minSecondToPrim;
        this.atMostSecond = atMostSecond;
        this.skipSelfAndDual = skipSelfAndDual;
    }

    public String getEmail() {
        return email;
    }

    public String getPreset() {
        return preset;
    }

    public Double getRepMin() {
        return repMin;
    }

    public Integer getStopChain() {
        return stopChain;
    }

    public Integer getMaxIntron() {
        return maxIntron;
    }

    public Integer getMaxFrag() {
        return maxFrag;
    }

    public String getBandwidths() {
        return bandwidths;
    }

    public Integer getMinNumMin() {
        return minNumMin;
    }

    public Integer getMinChainScore() {
        return minChainScore;
    }

    public Double getMinSecondToPrim() {
        return minSecondToPrim;
    }

    public Integer getAtMostSecond() {
        return atMostSecond;
    }

    public Boolean getSkipSelfAndDual() {
        return skipSelfAndDual;
    }
}
