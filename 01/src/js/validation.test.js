import { renderForm } from './renderDOMTree';
import { validateCardNumber, validateCVV } from './validation.js';

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(validateCardNumber('5228600584507307')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(validateCardNumber('!AAA60058450AAAA')).toBe(false);
});

test('Валидация номера карты не пропускает строку, в которой меньше 18 цифр', () => {
  expect(validateCardNumber('5228600')).toBe(false);
});

test('Валидация номера карты не пропускает строку, в которой больше 18 цифр', () => {
  expect(validateCardNumber('5228600584507307111')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(validateCVV('300')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(validateCVV('30')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(validateCVV('3000')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами', () => {
  expect(validateCVV('!1a')).toBe(false);
});

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email', () => {
  const form = renderForm();
  const inputs = form.querySelectorAll('input');
  const placeholders = Array.from(inputs).map((input) => input.placeholder);

  expect(
    Array.from(inputs).every((input) => input instanceof HTMLInputElement),
  ).toBe(true);

  expect(form.innerHTML).toBe(
    Array.from(inputs)
      .map((input) => input.outerHTML)
      .join(''),
  );
  expect(inputs.length).toBe(4);
  expect(placeholders).toEqual(['Номер карты', 'ММ/ГГ', 'CVV/CVC', 'Email']);
});
