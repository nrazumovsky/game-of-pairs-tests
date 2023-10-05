import { el } from 'redom';

export const createAppContainer = () => {
  return el('div#app.wrapper');
};

export const createFormContainer = () => {
  return el('div.container');
};

export const createForm = () => {
  return el('form#form');
};

export const createCardNumberInput = () => {
  return el(
    'div.card-input',
    el('label.label', 'Номер карты'),
    el('input#card-number-input.input', {
      type: 'tel',
      maxlength: '23',
    }),
    el('p.alert-message.card-number-error'),
    el('span.card-logo'),
  );
};

export const createExpirationInput = () => {
  return el(
    'div.card-input',
    el('label.label', 'Дата окончания действия карты'),
    el('input#expiration-input.input', {
      type: 'text',
      placeholder: 'ММ/ГГ',
    }),
    el('p.alert-message.expiration-error'),
  );
};

export const createCvvInput = () => {
  return el(
    'div.card-input',
    el('label.label', 'CVV/CVC'),
    el('input#cvv-input.input', {
      type: 'password',
      placeholder: 'CVV/CVC',
    }),
    el('p.alert-message.cvv-error'),
  );
};

export const createEmailInput = () => {
  return el(
    'div.card-input',
    el('label.label', 'Ваш email'),
    el('input#email-input.input', {
      type: 'email',
      placeholder: 'example@mail.com',
    }),
    el('p.alert-message.email-error'),
  );
};

export const createSubmitButton = () => {
  return el(
    'button#btn.btn',
    {
      type: 'submit',
      disabled: true,
    },
    'Оплатить',
  );
};
