import buttonValid from './buttonValid';

import {
  capitalText,
  charactersText,
  emailText,
  idText,
  loginText,
  passwordText,
  passwordsMismatch,
  phoneText,
  regCapital,
  regCharacters,
  regEmail,
  regId,
  regLogin,
  regName,
  regPassword,
  regPhone,
  regSymbol,
  symbolText,
} from './constants';

export function inputOut(event: Event) {
  // при выходе из поля, проверяем валидность и снимаем disabled класс у кнопки
  buttonValid();

  const target = event.target as HTMLTextAreaElement;
  const { value } = target;
  const error = document.createElement('div');
  error.className = 'error-message';

  if (value.length === 0) {
    error.className = 'error-empty';
    error.innerHTML = 'Поле не может быть пустым';
    target.after(error);
    target.classList.add('input-incorrect');
  }

  if (value.length !== 0 && target) {
    switch (target.name) {
      case 'login':
        if (!regLogin.test(value)) {
          if (!value.match(regCharacters)) {
            error.innerHTML = charactersText;
          } else if (!value.match(regSymbol)) {
            error.innerHTML = symbolText;
          } else {
            error.innerHTML = loginText;
          }
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      case 'email':
        if (!value.match(regEmail)) {
          error.innerHTML = emailText;
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      case 'first_name':
        if (!regName.test(value)) {
          if (!value.match(regCapital)) {
            error.innerHTML = capitalText;
          } else {
            error.innerHTML = symbolText;
          }
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      case 'second_name':
        if (!regName.test(value)) {
          if (!value.match(regCapital)) {
            error.innerHTML = capitalText;
          } else {
            error.innerHTML = symbolText;
          }
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      case 'password':
      case 'newPassword':
      case 'oldPassword':
        {
          if (!value.match(regPassword)) {
            error.innerHTML = passwordText;
            target.after(error);
            target.classList.add('input-incorrect');
          }

          const passwordArr = Array.from(document.getElementsByName('newPassword'));
          const passwordsValues = passwordArr.map((i) => (i as HTMLInputElement).value);
          const isPasswordsField = passwordsValues.every((i) => i.length !== 0);
          if (
            passwordsValues[0] !== passwordsValues[1] &&
            isPasswordsField &&
            passwordsValues.length > 1
          ) {
            error.innerHTML = passwordsMismatch;
            target.after(error);
            target.classList.add('input-incorrect');
          }
        }
        break;
      case 'phone':
        if (!value.match(regPhone)) {
          error.innerHTML = phoneText;
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      case 'userId':
        if (!regId.test(value)) {
          error.innerHTML = idText;
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      default:
    }
  }
}

export function inputIn(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const error = document.getElementsByClassName('error-message');
  const empty = document.getElementsByClassName('error-empty');
  if (target.classList.contains('input-incorrect')) {
    target.classList.remove('input-incorrect');
    if (error[0]) {
      error[0].remove();
    }
    if (empty[0]) {
      empty[0].remove();
    }
  }
}
