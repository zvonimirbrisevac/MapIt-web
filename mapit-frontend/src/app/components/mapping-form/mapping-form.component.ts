import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {MappingParameters} from "../../classes/MappingParameters";
import {HttpEventType, HttpResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-mapping-form',
  templateUrl: './mapping-form.component.html',
  styleUrls: ['./mapping-form.component.css']
})
export class MappingFormComponent implements OnInit {

  mappingForm: FormGroup;
  email = new FormControl(null, [Validators.required, Validators.email]);
  referenceFile = new FormControl(null);
  queryFiles = new FormArray([]);
  preset = new FormControl(null);
  repMin = new FormControl(null);
  stopChain = new FormControl(null);
  maxIntron = new FormControl(null);
  maxFrag = new FormControl(null);
  bandwidths = new FormControl(null);
  minNumMin = new FormControl(null);
  minChainScore = new FormControl(null);
  minSecondToPrim = new FormControl(null);
  atMostSecond = new FormControl(null);
  skipSelfAndDual = new FormControl(null);

  queryFileName: string;
  refFileName: string;
  uploadProgress: number;

  constructor(private fb: FormBuilder, private service: ServiceService) {}

  ngOnInit(): void {
    this.mappingForm = this.fb.group({
        email: this.email,
        referenceFile: this.referenceFile,
        queryFiles: this.queryFiles,
        preset: this.preset,
        repMin: this.repMin,
        stopChain: this.stopChain,
        maxIntron: this.maxIntron,
        maxFrag: this.maxFrag,
        bandwidths: this.bandwidths,
        minNumMin: this.minNumMin,
        minChainScore: this.minChainScore,
        minSecondToPrim: this.minSecondToPrim,
        atMostSecond: this.atMostSecond,
        skipSelfAndDual: this.skipSelfAndDual
      }
    )
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

  submitMappingForm() {
    const formData = new FormData();

    let mappingParam: MappingParameters = new MappingParameters(
      this.mappingForm.get('email')?.value,
      this.mappingForm.get('preset')?.value,
      this.mappingForm.get('repMin')?.value,
      this.mappingForm.get('stopChain')?.value,
      this.mappingForm.get('maxIntron')?.value,
      this.mappingForm.get('maxFrag')?.value,
      this.mappingForm.get('bandwidths')?.value,
      this.mappingForm.get('minNumMin')?.value,
      this.mappingForm.get('minChainScore')?.value,
      this.mappingForm.get('minSecondToPrim')?.value,
      this.mappingForm.get('atMostSecond')?.value,
      this.mappingForm.get('skipSelfAndDual')?.value,
    )

    formData.append('parameters', new Blob([JSON.stringify(mappingParam)], {
      type: 'application/json'
    }));
    formData.append('referenceFile', this.mappingForm.get('referenceFile')?.value);
    for (let i = 0; i < this.mappingForm.get('queryFiles')?.value.length; i++) {
      formData.append("queryFiles", this.mappingForm.get('queryFiles')?.value[i]);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // }
    this.service.sendMappingForm(formData)
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
      });
  }


  getRefFileErrorMessage() {
    return 'You must upload reference file';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getQueryFilesErrorMessage() {
    return 'You must upload at least one query file';
  }
}
