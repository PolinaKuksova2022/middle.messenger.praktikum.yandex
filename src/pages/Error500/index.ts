import Block from "../../utils/Block";
import { Button } from "../../component/button/button";
import { template } from "./error500.tmpl";

interface Error500Props {
  title: string;
}
export class Error500 extends Block<Error500Props> {
  constructor(props: Error500Props) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Назад к чатам",
      events: {
        click: () => window.location.href="/chat",
      },
    });

    this.children.button.element?.classList.add(
      ...["button", "navigation-btn"]
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
