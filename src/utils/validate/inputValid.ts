import {
  capitalText,
  charactersText,
  emailText,
  loginText,
  passwordText,
  passwordsMismatch,
  phoneText,
  regCapital,
  regCharacters,
  regEmail,
  regLogin,
  regName,
  regPassword,
  regPhone,
  regSymbol,
  symbolText,
} from './constants';

export function inputOut(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;
  const error = document.createElement('div');
  error.className = 'error-message';
  if (value !== '' && target) {
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
        if (!value.match(regPassword)) {
          error.innerHTML = passwordText;
          target.after(error);
          target.classList.add('input-incorrect');
        }

        const passwordArr = Array.from(document.getElementsByName('password'));
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
        break;
      case 'phone':
        if (!value.match(regPhone)) {
          error.innerHTML = phoneText;
          target.after(error);
          target.classList.add('input-incorrect');
        }
        break;
      default:
        alert('Загляни в constants.ts');
    }
  }
}

export function inputIn(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const error = document.getElementsByClassName('error-message');
  if (target.classList.contains('input-incorrect')) {
    target.classList.remove('input-incorrect');
    error[0].remove();
  }
}
