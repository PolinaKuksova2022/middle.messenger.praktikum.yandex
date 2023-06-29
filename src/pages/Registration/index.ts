import Block from "../../utils/Block";
import { formTemplate } from "../../component/commonTmpl/form.tmpl";
import { InputGroup } from "../../component/form/inputGroup";
import { Button } from "../../component/button/button";

interface RegistrationProps {
  title: string;
  containerClass: string;
}
export class Registration extends Block<RegistrationProps> {
  constructor(props: RegistrationProps) {
    super("div", props);
  }

  init() {
    this.children.button_1 = new Button({
      text: "Зарегистрироваться",
      events: {
        click: () => window.location.href="/registration",
      },
    });
    this.children.button_2 = new Button({
      text: "Войти",
      events: {
        click: () => window.location.href="/auth",
      },
    });

    this.children.group_1 = new InputGroup({
      name: "email",
      label: "Почта",
      id: "mail",
      type: "text",
      placeholder: "pochta@yandex.ru",
    });
    this.children.group_2 = new InputGroup({
      name: "login",
      label: "Логин",
      id: "login",
      type: "text",
      placeholder: "ivanivanov",
    });
    this.children.group_3 = new InputGroup({
      name: "first_name",
      label: "Имя",
      id: "username",
      type: "text",
      placeholder: "Иван",
    });
    this.children.group_4 = new InputGroup({
      name: "second_name",
      label: "Фамилия",
      id: "usersurname",
      type: "text",
      placeholder: "Иванов",
    });
    this.children.group_5 = new InputGroup({
      name: "phone",
      label: "Телефон",
      id: "phone",
      type: "tel",
      placeholder: "+7(___)-___-__-__",
    });
    this.children.group_6 = new InputGroup({
      name: "password",
      label: "Пароль",
      id: "password",
      type: "password",
      placeholder: "",
    });

    this.children.group_7 = new InputGroup({
      name: "password",
      label: "Повторите пароль",
      id: "password-2",
      type: "password",
      placeholder: "",
    });

    this.children.button_1.element?.classList.add("button");
    this.children.button_2.element?.classList.add(
      ...["button", "navigation-btn"]
    );
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}
