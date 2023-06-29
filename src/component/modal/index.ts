import Block from "../../utils/Block";
import { Button } from "../../component/button/button";
import { formTemplate } from "../commonTmpl/form.tmpl";

interface ModalProps {
  title: string;
  containerClass: string;
}
export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super("div", props);
  }

  init() {
    this.children.button_1 = new Button({
      text: "Выбрать файл на компьютере",
      events: {
        click: () => window.location.href="/",
      },
    });
    this.children.button_2 = new Button({
      text: "Поменять",
      events: {
        click: () => window.location.href="/profile",
      },
    });

    this.children.button_1.element?.classList.add(
      ...["button", "navigation-btn"]
    );
    this.children.button_2.element?.classList.add("button");
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}


// export const Modal = () =>
//   Handlebars.compile(formTemplate)({
//     title: "Загрузите файл",
//     containerClass: "container container_big",
//     buttons: [
//       RedirectBtn({
//         text: "Выбрать файл на компьютере",
//         className: "button navigation-btn",
//         ref: "/",
//       }),
//       ToggleModalBtn({
//         text: "Поменять",
//         className: "button",
//         ref: "/profile",
//       }),
//     ],
//   });
