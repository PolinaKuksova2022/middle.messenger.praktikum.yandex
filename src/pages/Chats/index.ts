import Block from "../../utils/Block";
import { Button } from "../../component/button/button";
interface ChatsProps {
  title: string;
}
export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "click me",
      events: {
        click: () => alert("1"),
      },
    });

    this.children.button.element?.classList.add(
      ...["button", "navigation-btn"]
    );
  }

  render() {
    return this.compile(
      `
        <h1>{{title}}</h1>
        {{{button}}}
        `,
      this.props
    );
  }
}
