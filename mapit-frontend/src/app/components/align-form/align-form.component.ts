import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

/** @title Form field with label */
@Component({
  selector: 'app-align-form',
  templateUrl: './align-form.component.html',
  styleUrls: ['./align-form.component.css'],
})
export class AlignFormComponent {

  alignForm: FormGroup;
  preset = new FormControl(null);
  matching = new FormControl(null);
  mismatch = new FormControl(null);
  gapOpen = new FormControl(null);
  gapExt = new FormControl(null);
  zDrop = new FormControl(null);
  minPeakDP = new FormControl(null);
  findGTAG = new FormControl(null);

  parametersMode: string;
  queryFileName: string;
  refFileName: string;

  constructor(fb: FormBuilder) {
    this.alignForm = fb.group({
      preset: this.preset,
      matching: this.matching,
      mismatch: this.mismatch,
      gapOpen: this.gapOpen,
      gapExt: this.gapExt,
      zDrop: this.zDrop,
      minPeakDP: this.minPeakDP,
      findGTAG: this.findGTAG
    });
  }

  onRefFileSelected(event: Event) {
    const file:File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.refFileName = file.name;
    }
  }

  onQueryFileSelected(event: Event) {
    const target= event.target as HTMLInputElement;
    if (target != null) {
      for (let i = 0; i < target.files!.length; i++) {
        let file: File = target.files![i];
        if (this.queryFileName) {
          this.queryFileName = this.queryFileName.concat(", " + file.name);
        } else {
          this.queryFileName = file.name;
        }
      }
    }
  }

  console() {
    console.log(this.parametersMode);
  }
}
