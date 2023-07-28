import UserController from '../controllers/UserController';
import store from './core/Store';
import getInputsData from './validate/getInputs';
import isAllValid from './validate/isAllValid';

let editMode = false;

export default function editData(event: Event) {
  const btn = event.target as HTMLButtonElement;
  const inputArr = Array.from(document.getElementsByTagName('INPUT')).map(
    (i) => i as HTMLInputElement
  );

  if (!editMode || isAllValid(getInputsData())) {
    btn.textContent = editMode ? 'Изменить данные' : 'Cохранить изменения';
    inputArr.map((i) => (i.disabled = editMode));
    editMode = !editMode;

    if (editMode) {
      btn.addEventListener('mouseover', () => {
        if (isAllValid(getInputsData())) {
          btn.classList.remove('disabled');
        } else {
          btn.classList.add('disabled');
        }
      });
    } else {
      btn.removeEventListener('mouseover', () => {});

      UserController.putProfile(getInputsData());
      
      console.log('при изменении данных', store.state);
    }
  }
}
