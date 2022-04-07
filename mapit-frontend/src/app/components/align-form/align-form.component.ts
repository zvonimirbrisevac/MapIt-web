import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

/** @title Form field with label */
@Component({
  selector: 'app-align-form',
  templateUrl: './align-form.component.html',
  styleUrls: ['./align-form.component.css'],
})
export class AlignFormComponent {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
}
