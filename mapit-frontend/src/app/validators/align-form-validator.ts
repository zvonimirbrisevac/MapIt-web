import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function alignValidator(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const refFile = form.get('referanceFile')?.value;
    const queryFiles = form.get('queryfiles')?.value;
    return refFile == null || queryFiles == [] ? {value: "no files"} : null;
    // const forbidden = nameRe.test(control.value);
    // return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
