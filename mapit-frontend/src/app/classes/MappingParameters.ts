export class MappingParameters {

  email: String;
  preset: String;
  repMin: number;
  stopChain: number;
  maxIntron: number;
  maxFrag: number;
  bandwidths: String;
  minNumMin: number;
  minChainScore: number;
  minSecondToPrim: number;
  atMostSecond: number;
  skipSelfAndDual: boolean;

  constructor(email: String, preset: String, repMin: number, stopChain: number, maxIntron: number,
              maxFrag: number, bandwidths: String, minNumMin: number, minChainScore: number, minSecondToPrim: number,
              atMostSecond: number, skipSelfAndDual: boolean) {
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
}

