import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function socialSecurityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isSocialSecurityValid(control.value) ? null : { socialSecurity: { value: control.value } };
  };
}

export function maxDateValidator(maxDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isDateNotAfter(maxDate, control.value) ? null : { maxDate: { value: control.value } };
  };
}

export function donationFormValidator(control: AbstractControl): ValidationErrors | null {
  const eligible = control.get('eligible');
  const reason = control.get('reason');

  if (eligible && reason) {
    if (eligible.value == false && !reason.value) {
      reason.setErrors({ requiredIfNotEligible: true });
      return { requiredIfNotEligible: true };
    }
  }
  return null;
}

export function isIntervalValid(start: string, end: string): boolean {
  if (start == '' || end == '') return false;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate <= endDate;
}

function isDateNotAfter(maxDateStr: string, examinedDateStr: string): boolean {
  if (examinedDateStr == '') {
    return false;
  }
  const selectedDate: Date = new Date(examinedDateStr);
  const maxDate: Date = new Date(maxDateStr);
  if (selectedDate > maxDate) {
    return false;
  } else {
    return true;
  }
}
function isSocialSecurityValid(socialSecNumber: string): boolean {
  //if empty or not containing 9 digits
  if (!socialSecNumber || !/^\d{9}$/.test(socialSecNumber)) {
    return false;
  }
  const digitArray = socialSecNumber.split('');

  //the last digit to int
  const checkDigit = parseInt(digitArray[8]);

  //calculate checksum
  var sum = 0;
  for (var i = 0; i < digitArray.length - 1; i++) {
    const digit = parseInt(digitArray[i]);
    sum += i % 2 == 0 ? 3 * digit : 7 * digit;
  }
  return sum % 10 == checkDigit;
}
