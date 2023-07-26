import { FormInput } from '../global/definitions';
import isAllValid from './isAllValid';

export default function buttonValid() {
  const button = document.getElementsByClassName('disabled')[0];

  const inputArr = Array.from(document.getElementsByTagName('INPUT'));
  const inputs: FormInput[] = inputArr
    .map((i) => i as HTMLInputElement)
    .map((i) => ({ name: i.name, value: i.value }));

  if (isAllValid(inputs)) {
    // window.__FORMS_DATA__[window.location.pathname] = inputs;
    button.classList.remove('disabled');

    // console.log('FORMS_DATA:');
    // console.log(window.__FORMS_DATA__);

    // setTimeout(() => {
    //   window.location.href = '/chat';
    // }, 3000);

    return true
  }

  return  false;
}
