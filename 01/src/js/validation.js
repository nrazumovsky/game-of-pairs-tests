import { cvv, expirationDate, number } from 'card-validator';
import * as emailValidator from 'email-validator';
import Inputmask from 'inputmask';

export function validateCardNumber(str) {
  const validationLengths = number(str, {
    lengths: [16, 17, 18, 19],
  });
  return validationLengths.isValid;
}

export function validateExpirationDate(str) {
  const validation = expirationDate(str);
  return validation.isValid;
}

export function validateCVV(str) {
  const cvvVerification = cvv(str);
  return cvvVerification.isValid;
}

export function validateEmail(str) {
  return emailValidator.validate(str);
}

