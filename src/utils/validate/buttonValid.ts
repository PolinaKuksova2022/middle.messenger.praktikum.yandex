import { FormInput } from '../global/definitions';
import { regEmail, regLogin, regName, regPassword } from './constants';

export default function buttonValid() {
  const button = document.getElementsByClassName('disabled')[0];

  const inputArr = Array.from(document.getElementsByTagName('INPUT'));
  const inputs: FormInput[] = inputArr
    .map((i) => i as HTMLInputElement)
    .map((i) => ({ name: i.name, value: i.value }));

  const isAllValid = inputs.every((i) => {
    if (i.value.length !== 0) {
      switch (i.name) {
        case 'login':
          return i.value.match(regLogin);
        case 'password':
          return i.value.match(regPassword);
        case 'email':
          return i.value.match(regEmail);
        case 'first_name':
          return i.value.match(regName);
        case 'second_name':
          return i.value.match(regName);
        default:
          return true;
      }
    }
    return true;
  });
  if (isAllValid) {
    window.__FORMS_DATA__[window.location.pathname] = inputs;
    button.classList.remove('disabled');

    console.log('FORMS_DATA:');
    console.log(window.__FORMS_DATA__);

    setTimeout(() => {
      window.location.href = '/chat';
    }, 3000);
  }
}
