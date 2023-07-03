import { FormInput } from './global/definitions';
import isAllValid from './validate/isAllValid';

let editMode = false;

export default function editData(event: Event) {
  const btn = event.target as HTMLButtonElement;
  const inputArr = Array.from(document.getElementsByTagName('INPUT')).map(
    (i) => i as HTMLInputElement
  );

  if (!editMode || isAllValid(inputArr)) {
    btn.textContent = editMode ? 'Изменить данные' : 'Cохранить изменения';
    inputArr.map((i) => (i.disabled = editMode));
    editMode = !editMode;

    if (editMode) {
      btn.addEventListener('mouseover', () => {
        if (isAllValid(inputArr)) {
          btn.classList.remove('disabled');
        } else {
          btn.classList.add('disabled');
        }
      });
    } else {
      btn.removeEventListener('mouseover', () => {});
    }

    if (isAllValid(inputArr)) {
      const inputs: FormInput[] = inputArr.map((i) => ({ name: i.name, value: i.value }));

      window.__FORMS_DATA__[window.location.pathname] = inputs;

      console.log('FORMS_DATA:');
      console.log(window.__FORMS_DATA__);
    }
  }
}
