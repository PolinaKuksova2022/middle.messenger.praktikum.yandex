import Block from '../../utils/core/Block';
import { template } from './profile.tmpl';
import { GroupData } from '../../component/groupData/groupData';
import { Button } from '../../component/button/button';

interface ProfileProps {
  name: string;
  func: string;
}
export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props, 'div');
  }

  init() {
    this.children.button_1 = new Button({
      text: 'Изменить данные',
      path: '/auth',
      // events: {
      //   click: () => (window.location.href = "/auth"),
      // },
    });
    this.children.button_2 = new Button({
      text: 'Изменить пароль',
      path: '/registrationa',

      // events: {
      //   click: () => (window.location.href = "/"),
      // },
    });
    this.children.button_3 = new Button({
      text: 'Выйти',
      path: '/auth',
      // events: {
      //   click: () => (window.location.href = "/chat"),
      // },
    });

    this.children.group_1 = new GroupData({
      title: 'Почта',
      name: 'email',
      value: 'pochta@yandex.ru',
    });
    this.children.group_2 = new GroupData({
      title: 'Логин',
      name: 'login',
      value: 'ivanivanov',
    });
    this.children.group_3 = new GroupData({
      title: 'Имя',
      name: 'first_name',
      value: 'Иван',
    });
    this.children.group_4 = new GroupData({
      title: 'Фамилия',
      name: 'second_name',
      value: 'Иванов',
    });
    this.children.group_5 = new GroupData({
      title: 'Имя в чате',
      name: 'display_name',
      value: 'Иван',
    });
    this.children.group_6 = new GroupData({
      title: 'Телефон',
      name: 'phone',
      value: '+7 (909) 967 30 30',
    });

    this.children.button_1.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_2.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_3.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
  }

  render() {
    return this.compile(template, this.props);
  }
}
