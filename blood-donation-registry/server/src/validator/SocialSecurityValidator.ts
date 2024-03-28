import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsSocialSecurityValid', async: false })
export class SocialSecurityConstraint implements ValidatorConstraintInterface {
  validate(socialSecNumber: string, args: ValidationArguments) {
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
    console.log(sum);
    return sum % 10 == checkDigit;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Érvénytelen tajszám.';
  }
}
