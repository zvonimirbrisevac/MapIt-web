import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from "../../services/service.service";
import {AlignParameters} from "../../classes/AlignParameters";

/** @title Form field with label */
@Component({
  selector: 'app-align-form',
  templateUrl: './align-form.component.html',
  styleUrls: ['./align-form.component.css'],
})
export class AlignFormComponent implements OnInit{

  alignForm: FormGroup;
  email = new FormControl(null, [Validators.required, Validators.email]);
  referenceFile = new FormControl(null);
  queryFiles = new FormArray([]);
  preset = new FormControl(null);
  matching = new FormControl(null);
  mismatch = new FormControl(null);
  gapOpen = new FormControl(null);
  gapExt = new FormControl(null);
  zDrop = new FormControl(null);
  minPeakDP = new FormControl(null);
  findGTAG = new FormControl(null);

  queryFileName: string;
  refFileName: string;

  constructor(private fb: FormBuilder, private service: ServiceService) {}

  ngOnInit(): void {
    this.alignForm = this.fb.group({
      email: this.email,
      referenceFile: this.referenceFile,
      queryFiles: this.queryFiles,
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
      this.referenceFile.setValue(file);
      console.log(this.referenceFile.value);
    }
  }

  onQueryFileSelected(event: Event) {
    const target= event.target as HTMLInputElement;
    if (target != null) {
      for (let i = 0; i < target.files!.length; i++) {
        let file: File = target.files![i];
        this.queryFiles.push(new FormControl(file));
        if (this.queryFileName) {
          this.queryFileName = this.queryFileName.concat(", " + file.name);
        } else {
          this.queryFileName = file.name;
        }
      }
      console.log(this.queryFiles.value)
      console.log(this.referenceFile.value);

    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submitAlignForm() {
    const formData = new FormData();

    // let queryFiles = [];
    // for (let control in (this.alignForm.get('queryFiles') as FormArray).controls) {
    //     queryFiles.push((control as unknown as FormControl).value);
    // }

    // console.log('>>>>>>>>>> query files length: ' + queryFiles.length);
    // console.log('>>>>>>>>>>>>>>>> idu query fileovi');
    // for (let i = 0; i < this.alignForm.get('queryFiles')?.value.length; i++) {
    //   console.log(this.alignForm.get('queryFiles')?.value[i]);
    // }
    // //queryFiles.forEach(x => console.log(x + " ,"))
    //
    //
    // console.log('>>>>>>>>>>>>>>>>>> this.alignForm.get(\'queryFiles\')?.value: ')

    console.log(this.alignForm.get('queryFiles')?.value);

    let alignParam: AlignParameters = new AlignParameters(
      this.alignForm.get('email')?.value,
      this.alignForm.get('preset')?.value,
      this.alignForm.get('matching')?.value,
      this.alignForm.get('mismatch')?.value,
      this.alignForm.get('gapOpen')?.value,
      this.alignForm.get('gapExt')?.value,
      this.alignForm.get('zDrop')?.value,
      this.alignForm.get('minPeakDP')?.value,
      this.alignForm.get('findGTAG')?.value
    )

    // formData.append('email', this.alignForm.get('email')?.value);
    formData.append('parameters', new Blob([JSON.stringify(alignParam)], {
      type: 'application/json'
    }));
    formData.append('referenceFile', this.alignForm.get('referenceFile')?.value);
    for(let i = 0; i < this.alignForm.get('queryFiles')?.value.length; i++){
      formData.append("queryFiles", this.alignForm.get('queryFiles')?.value[i]);
    }
    // formData.append('preset', this.alignForm.get('preset')?.value);
    // formData.append('matching', this.alignForm.get('matching')?.value);
    // formData.append('mismatch', this.alignForm.get('mismatch')?.value);
    // formData.append('gapOpen', this.alignForm.get('gapOpen')?.value);
    // formData.append('gapExt', this.alignForm.get('gapExt')?.value);
    // formData.append('zDrop', this.alignForm.get('zDrop')?.value);
    // formData.append('minPeakDP', this.alignForm.get('minPeakDP')?.value);
    // formData.append('findGTAG', this.alignForm.get('findGTAG')?.value);
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    this.service
      .sendAlignForm(formData)//, this.alignForm.get('referenceFile')?.value, null)
      .subscribe(res => console.log(res));
  }


}
