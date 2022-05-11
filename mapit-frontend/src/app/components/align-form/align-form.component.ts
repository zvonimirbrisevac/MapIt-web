import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from "../../services/service.service";
import {AlignParameters} from "../../classes/AlignParameters";
import {HttpEventType, HttpResponse, HttpStatusCode} from "@angular/common/http";

/** @title Form field with label */
@Component({
  selector: 'app-align-form',
  templateUrl: './align-form.component.html',
  styleUrls: ['./align-form.component.css'],
})
export class AlignFormComponent implements OnInit {

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
  uploadProgress: number;

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
    const file: File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.refFileName = file.name;
      this.referenceFile.setValue(file);
    }
  }

  onQueryFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
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

    formData.append('parameters', new Blob([JSON.stringify(alignParam)], {
      type: 'application/json'
    }));
    formData.append('referenceFile', this.alignForm.get('referenceFile')?.value);
    for (let i = 0; i < this.alignForm.get('queryFiles')?.value.length; i++) {
      formData.append("queryFiles", this.alignForm.get('queryFiles')?.value[i]);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // }
    this.service
      .sendAlignForm(formData)//, this.alignForm.get('referenceFile')?.value, null)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (event.status == HttpStatusCode.Created) {
              console.log(event);
              this.uploadProgress = 0;
            }
          }
        },
        error => {
          console.log(error);
          this.uploadProgress = 0;
        }
      )
  }
}





