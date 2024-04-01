import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isIntervalValid(start: string, end: string): boolean {
  if(start == '' || end == '') return false;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate <= endDate;
}

export function socialSecurityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isSocialSecurityValid(control.value) ? null : { socialSecurity: { value: control.value } };
  };
}

export function isSocialSecurityValid(socialSecNumber: string): boolean {
  //if empty or not containing 9 digits
  if (!socialSecNumber || !/^\d{9}$/.test(socialSecNumber)) {
    return false;
  }
  const digitArray = socialSecNumber.split('');

  //the last digit to int
  const checkDigit = parseInt(digitArray[8]);

  //calculate checksum
  var sum = 0;
  for(var i = 0; i < digitArray.length - 1; i++){
    const digit = parseInt(digitArray[i]);
    sum += i % 2 == 0 ? 3 * digit : 7 * digit;
  }
  return sum % 10 == checkDigit;
}

export function formatSocialSecurity(socialSecurity: string) {
  const groups = socialSecurity.match(/.{1,3}/g);
  if (groups) {
    return groups.join('-');
  }
  return socialSecurity;
}

export function formatDate(dateString: string) {
  const parts = dateString.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  const formattedDate = `${year}. ${month}. ${day}.`;

  return formattedDate;
}
