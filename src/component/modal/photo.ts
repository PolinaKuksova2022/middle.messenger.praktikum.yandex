import Block from '../../utils/core/Block';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';

interface ModalProps {
  title: string;
  containerClass: string;
}
export default class Photo extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props, 'div');
  }

  init() {
    this.children.button_1 = new Button({
      text: 'Выбрать файл на компьютере',
      path: '/',
    });
    this.children.button_2 = new Button({
      text: 'Поменять',
      id: 'change',
    });

    this.children.button_1.element?.classList.add(...['button', 'navigation-btn']);
    this.children.button_2.element?.classList.add('button');
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}