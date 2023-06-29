import Block from "../../utils/Block";
import { formTemplate } from "../../component/commonTmpl/form.tmpl";
import { InputGroup } from "../../component/form/inputGroup";
import { Button } from "../../component/button/button";

interface AuthProps {
  title: string;
  containerClass: string;
}
export class Auth extends Block<AuthProps> {
  constructor(props: AuthProps) {
    super("div", props);
  }

  init() {
    this.children.button_1 = new Button({
      text: "Авторизация", 
      events: {
        click: () => (window.location.href="/auth"),
      },
    });
    this.children.button_2 = new Button({
      text: "Нет аккаунта?",
      events: {
        click: () => window.location.href="/registration",
      },
    });

    this.children.group_1 = new InputGroup({
      name: "login",
      label: "Логин",
      id: "username",
      type: "text",
      placeholder: "",
    });
    this.children.group_2 = new InputGroup({
      name: "password",
      label: "Пароль",
      id: "password",
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

// import Handlebars from "handlebars";
// import { formTemplate } from "../../component/commonTmpl/form.tmpl";
// // import { inputGroup } from "../../component/form/inputGroup";
// import { RedirectBtn } from "../../component/button/redirectButton";

// export const Auth = () =>
//   Handlebars.compile(formTemplate)({
//     title: "Авторизация",
//     containerClass: "container",
//     inputs: [
//       inputGroup({

//       }),
//       inputGroup({
        // label: "Пароль",
        // id: "password",
        // type: "password",
        // placeholder: "",
//       }),
//     ],
//     buttons: [
//       RedirectBtn({ 
//       RedirectBtn({
//         text: "Нет аккаунта?",
//         className: "button navigation-btn",
//         ref: "/registration",
//       }),
//     ],
//   });
