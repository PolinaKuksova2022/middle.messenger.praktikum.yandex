import Block from '../../utils/core/Block';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

interface ModalProps {
  title: string;
  containerClass: string;
}
export default class Password extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props, 'div');
  }

  init() {
    this.children.group_1 = new InputGroup({
      name: 'password',
      label: 'Пароль',
      inputClass: 'input',
      id: 'password',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '',
    });

    this.children.group_2 = new InputGroup({
      name: 'password',
      label: 'Повторите пароль',
      inputClass: 'input',
      id: 'password-2',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '',
    });
    this.children.button_1 = new Button({
      text: 'Поменять',
      id: 'change',
    });

    this.children.group_1.element?.classList.add('input-group');
    this.children.group_2.element?.classList.add('input-group');
    this.children.button_1.element?.classList.add('button');
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}
