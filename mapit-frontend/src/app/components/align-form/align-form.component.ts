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
  matching = new FormControl(null);
  mismatch = new FormControl(null);
  gapOpen = new FormControl(null);
  gapExt = new FormControl(null);
  zDrop = new FormControl(null);
  minPeakDP = new FormControl(null);
  findGTAG = new FormControl(null);

  parametersMode: string;

  constructor(fb: FormBuilder) {
    this.alignForm = fb.group({
      matching: this.matching,
      mismatch: this.mismatch,
      gapOpen: this.gapOpen,
      gapExt: this.gapExt,
      zDrop: this.zDrop,
      minPeakDP: this.minPeakDP,
      findGTAG: this.findGTAG
    });
  }

  // @ViewChild('fileInput') fileInput: ElementRef;
  // fileAttr = 'Choose File';
  // uploadFileEvt(file: any) {
  //   if (file.target.files && file.target.files[0]) {
  //     if (this.fileAttr == 'Choose File') {
  //       this.fileAttr = '';
  //     }
  //     Array.from(file.target.files).forEach((file: any) => {
  //       this.fileAttr += file.name + ' - ';
  //     });
  //     console.log("Evo filea.");
  //   } else {
  //     this.fileAttr = 'Choose File';
  //   }
  // }
  fileName: string;
  onFileSelected(event: Event) {

    // @ts-ignore
    if (event.target.files[0]) {
      // @ts-ignore
      const file:File = event.target.files[0];
      this.fileName = file.name;

      // const formData = new FormData();
      //
      // formData.append("thumbnail", file);
      // upload$.subscribe();
    }

  }

  console() {
    console.log(this.parametersMode);
  }
}
