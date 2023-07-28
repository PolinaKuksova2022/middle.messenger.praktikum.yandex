import getInputsData from './getInputs';
import isAllValid from './isAllValid';

export default function buttonValid() {
  const button = document.getElementsByClassName('disabled')[0];

  if (isAllValid(getInputsData()) && button) {
    button.classList.remove('disabled');
    return true;
  }

  return false;
}
