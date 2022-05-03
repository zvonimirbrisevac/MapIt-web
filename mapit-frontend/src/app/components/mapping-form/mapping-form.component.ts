import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-mapping-form',
  templateUrl: './mapping-form.component.html',
  styleUrls: ['./mapping-form.component.css']
})
export class MappingFormComponent implements OnInit {

  mappingForm: FormGroup;
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

  constructor(fb: FormBuilder) {
    this.mappingForm = fb.group({
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

  ngOnInit(): void {
  }

}
