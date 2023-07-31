import UserController from '../../controllers/UserController';
import Block from '../../utils/core/Block';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

export default class Photo extends Block {
  init() {
    this.props.title = 'Загрузите файл';
    this.props.containerClass = 'container container_big';

    this.children.group_1 = new InputGroup({
      name: '',
      id: 'avatar',
      type: 'file',
      value: 'Выбрать файл на компьютере',
    });
    this.children.button_1 = new Button({
      text: 'Поменять',
      id: 'change',
      events: {
        click: (e) => {
          e.preventDefault();
          this.onChange();
        },
      },
    });

    this.children.group_1.element?.classList.add('input-group');
    this.children.button_1.element?.classList.add('button');
  }

  onChange() {
    const inputElement = <HTMLInputElement>document.getElementById('avatar');

    if (!inputElement.files) return;

    const formData = new FormData();
    formData.append('avatar', inputElement.files[0]);
    console.log(inputElement.files[0]);

    UserController.putAvatar(formData);
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}
