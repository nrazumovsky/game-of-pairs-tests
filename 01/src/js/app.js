import { mount } from 'redom';
import '../css/normalize.css';
import '../css/style.css';
import {
  createAppContainer,
  createCardNumberInput,
  createCvvInput,
  createEmailInput,
  createExpirationInput,
  createForm,
  createFormContainer,
  createSubmitButton,
} from './controls.js';
import {
  validateCardNumber,
  validateCVV,
  validateEmail,
  validateExpirationDate,
} from './validation.js';

let cardIsValid = false;
let expirationIsValid = false;
let cvvIsValid = false;
let emailIsValid = false;

export function renderForm() {
  const formContainer = createFormContainer();
  const appContainer = createAppContainer();
  const form = createForm();

  mount(form, createCardNumberInput());
  mount(form, createExpirationInput());
  mount(form, createCvvInput());
  mount(form, createEmailInput());
  mount(form, createSubmitButton());
  mount(formContainer, form);
  mount(appContainer, formContainer);
  mount(document.body, appContainer);
}

function setCardImage() {
  const cardNumberInput = document.getElementById('card-number-input');
  const firstChar = cardNumberInput.value.charAt(0);
  const cardLogo = document.querySelector('.card-logo');
  if (firstChar === '2') {
    cardLogo.classList.add('card-logo--mir');
    cardIsValid = false;
  }
  if (firstChar === '4') {
    cardLogo.classList.add('card-logo--visa');
    cardIsValid = false;
  }
  if (firstChar === '5') {
    cardLogo.classList.add('card-logo--mastercard');
    cardIsValid = true;
  }
}

function handleCardNumberInput() {
  const inputs = document.querySelectorAll('.input');
  const cardNumberInput = document.getElementById('card-number-input');
  const cardNumberError = document.querySelector('.card-number-error');
  const handleBlur = () => {
    const cardNumber = cardNumberInput.value.trim();
    if (cardNumber === '') {
      cardNumberError.textContent = 'Введите номер карты';
      inputs[0].classList.add('error-field');
      expirationIsValid = false;
    } else if (!validateCardNumber(cardNumber)) {
      cardNumberError.textContent = 'Карты с таким номером нет';
      inputs[0].classList.add('error-field');
      expirationIsValid = false;
    } else {
      cardNumberError.textContent = '';
      inputs[0].classList.remove('error-field');
      expirationIsValid = true;
      setCardImage();
      enableSubmitButton();
    }
  };

  const handleInput = () => {
    cardNumberError.textContent = '';
    inputs[0].classList.remove('error-field');
  };

  cardNumberInput.addEventListener('blur', handleBlur);
  cardNumberInput.addEventListener('input', handleInput);
}

function handleExpirationInput() {
  const inputs = document.querySelectorAll('.input');
  const expirationInput = document.getElementById('expiration-input');
  const expirationError = document.querySelector('.expiration-error');

  const handleBlur = () => {
    const expirationDateValue = expirationInput.value.trim();
    if (expirationDateValue === '') {
      expirationError.textContent = 'Введите дату окончания действия карты';
      inputs[1].classList.add('error-field');
      expirationIsValid = false;
    } else if (!validateExpirationDate(expirationDateValue)) {
      expirationError.textContent = 'Неверная дата';
      inputs[1].classList.add('error-field');
      expirationIsValid = false;
    } else {
      expirationError.textContent = '';
      inputs[1].classList.remove('error-field');
      expirationIsValid = true;
      enableSubmitButton();
    }
  };

  const handleInput = () => {
    expirationError.textContent = '';
    inputs[1].classList.remove('error-field');
  };

  expirationInput.addEventListener('blur', handleBlur);
  expirationInput.addEventListener('input', handleInput);
}

function handldeCVVInput() {
  const inputs = document.querySelectorAll('.input');
  const cvvInput = document.getElementById('cvv-input');
  const cvvError = document.querySelector('.cvv-error');

  const blurHander = () => {
    const cvvInputValue = cvvInput.value.trim();
    if (!validateCVV(cvvInputValue)) {
      cvvError.textContent = 'Введите 3 цифры CVV/CVC кода';
      inputs[2].classList.add('error-field');
      cvvIsValid = false;
    } else {
      cvvError.textContent = '';
      inputs[2].classList.remove('error-field');
      cvvIsValid = true;
      enableSubmitButton();
    }
  };

  const handleInput = () => {
    cvvError.textContent = '';
    inputs[2].classList.remove('error-field');
  };

  cvvInput.addEventListener('blur', blurHander);
  cvvInput.addEventListener('input', handleInput);
}

function handleEmailInput() {
  const inputs = document.querySelectorAll('.input');
  const emailInput = document.getElementById('email-input');
  const emailError = document.querySelector('.email-error');

  const handleBlur = () => {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      emailError.textContent = 'Введите email';
      inputs[3].classList.add('error-field');
      emailIsValid = false;
    } else if (!validateEmail(emailValue)) {
      emailError.textContent = 'Введите email в формате example@mail.com';
      inputs[3].classList.add('error-field');
      emailIsValid = false;
    } else {
      emailError.textContent = '';
      inputs[3].classList.remove('error-field');
      emailIsValid = true;
      enableSubmitButton();
    }
  };

  const handleInput = () => {
    emailError.textContent = '';
    inputs[3].classList.remove('error-field');
  };

  emailInput.addEventListener('blur', handleBlur);
  emailInput.addEventListener('input', handleInput);
}

function enableSubmitButton() {
  const submitButton = document.getElementById('btn');
  cardIsValid && expirationIsValid && cvvIsValid && emailIsValid
    ? submitButton.removeAttribute('disabled')
    : submitButton.setAttribute('disabled', 'disabled');
}

function runApp() {
  renderForm();
  handleCardNumberInput();
  handleExpirationInput();
  handldeCVVInput();
  handleEmailInput();
}

runApp();
