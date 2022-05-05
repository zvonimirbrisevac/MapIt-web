import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";

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

    formData.append('email', this.mappingForm.get('email')?.value)
    formData.append('referenceFile', this.mappingForm.get('referenceFile')?.value);
    formData.append('queryFiles', this.mappingForm.get('queryFiles')?.value);
    formData.append('preset', this.mappingForm.get('preset')?.value);
    formData.append('repMin', this.mappingForm.get('repMin')?.value);
    formData.append('stopChain', this.mappingForm.get('stopChain')?.value);
    formData.append('maxIntron', this.mappingForm.get('maxIntron')?.value);
    formData.append('maxFrag', this.mappingForm.get('maxFrag')?.value);
    formData.append('bandwidths', this.mappingForm.get('bandwidths')?.value);
    formData.append('minNumMin', this.mappingForm.get('minNumMin')?.value);
    formData.append('minChainScore', this.mappingForm.get('minChainScore')?.value);
    formData.append('minSecondToPrim', this.mappingForm.get('minSecondToPrim')?.value);
    formData.append('atMostSecond', this.mappingForm.get('atMostSecond')?.value);
    formData.append('skipSelfAndDual', this.mappingForm.get('skipSelfAndDual')?.value);

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    this.service.sendMappingForm(formData).subscribe();
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
