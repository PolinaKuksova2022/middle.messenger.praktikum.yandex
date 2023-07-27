import isAllValid from './isAllValid';

export default function buttonValid() {
  const button = document.getElementsByClassName('disabled')[0];

  const inputArr = Array.from(document.getElementsByTagName('INPUT'));
  const value = inputArr.map((i) => i as HTMLInputElement).map((i) => [i.name, i.value]);

  const data = Object.fromEntries(value);

  if (isAllValid(data)) {
    button.classList.remove('disabled');
    return true;
  }

  return false;
}
