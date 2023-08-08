import UserController from '../controllers/UserController';
import getInputsData from './validate/getInputs';
import isAllValid from './validate/isAllValid';

export default function editData(event: Event) {
  const btn = event.target as HTMLButtonElement;
  const inputArr = Array.from(document.getElementsByTagName('INPUT')).map(
    (i) => i as HTMLInputElement
  );

  if (btn.innerHTML === 'Изменить данные') {
    btn.textContent = 'Cохранить изменения';
    inputArr.map((i) => (i.disabled = false));
  } else if (isAllValid(getInputsData())) {
    btn.textContent = 'Изменить данные';
    inputArr.map((i) => (i.disabled = true));
    UserController.putProfile(getInputsData());
  }
}
