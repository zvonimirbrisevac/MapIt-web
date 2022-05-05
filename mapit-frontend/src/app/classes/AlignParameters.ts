export class AlignParameters {

  email: string;
  preset: string;
  matching: number;
  mismatch: number;
  gapOpen: string;
  gapExt: string;
  zDrop: string;
  minPeakDP: number;
  findGTAG: string;


  constructor(email: string, preset: string, matching: number, mismatch: number,
              gapOpen: string, gapExt: string, zDrop: string,
              minPeakDP: number, findGTAG: string) {
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
}
