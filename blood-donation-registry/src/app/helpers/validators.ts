import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//Validate social security no (TAJ)
//For control
export function socialSecurityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isSocialSecurityValid(control.value) ? null : { socialSecurity: { value: control.value } };
  };
}

//Validate is given date is before or at maxDate
//For control
export function maxDateValidator(maxDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isDateNotAfter(maxDate, control.value) ? null : { maxDate: { value: control.value } };
  };
}

//Validate donation form: if donor is not eligible, there should be a reason, otherwise it is not necessary
//For formgroup (multiple controls)
export function donationFormValidator(control: AbstractControl): ValidationErrors | null {
  const eligible = control.get('eligible');
  const reason = control.get('reason');

  if (eligible && reason && eligible.value == false && !reason.value) {
    return { reasonRequiredIfNotEligible: true };
  }
  return null;
}

export function intervalValidator(control: AbstractControl): ValidationErrors | null {
    const filterBy = control.get('filterBy');
    const start = control.get('startDate');
    const end = control.get('endDate');
    if(filterBy && filterBy.value == 'interval' && start && end){
      //If start is not a valid date
      if(start.value == '') {
        start.setErrors({startInvalid: true});
      }
      //If end is not a valid date
      if(end.value == '') {
        end.setErrors({endInvalid: true});
      }
      //If end is sooner than start
      if(start.value != '' && end.value != '' && !isIntervalValid(start.value, end.value)){
        return { intervalInvalid: true };
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
