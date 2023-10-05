import { el, mount } from 'redom';

export const createForm = () => {
  return el('form#form');
};

export const createCardNumberInput = () => {
  return el('input#card-number-input.input', {
    type: 'tel',
    maxlength: '23',
    placeholder: 'Номер карты',
  });
};

export const createExpirationInput = () => {
  return el('input#expiration-input.input', {
    type: 'text',
    placeholder: 'ММ/ГГ',
  });
};

export const createCvvInput = () => {
  return el('input#cvv-input.input', {
    type: 'password',
    placeholder: 'CVV/CVC',
  });
};

export const createEmailInput = () => {
  return el('input#email-input.input', {
    type: 'email',
    placeholder: 'Email',
  });
};

export function renderForm() {
  const form = createForm();

  mount(form, createCardNumberInput());
  mount(form, createExpirationInput());
  mount(form, createCvvInput());
  mount(form, createEmailInput());
  mount(document.body, form);

  return form;
}
