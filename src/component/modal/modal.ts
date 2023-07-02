import Block from "../../utils/core/Block";
import { Button } from "../button/button";
import { formTemplate } from "../commonTmpl/form.tmpl";

interface ModalProps {
  title: string;
  containerClass: string;
}
export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props, "div");
  }

  init() {
    this.children.button_1 = new Button({
      text: "Выбрать файл на компьютере",
      path: "/"
      // events: {
      //   click: () => window.location.href="/",
      // },
    });
    this.children.button_2 = new Button({
      text: "Поменять",
      path: "/"
      // events: {
      //   click: () => window.location.href="/profile",
      // },
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
