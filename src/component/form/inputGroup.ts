import Block from "../../utils/Block";

interface InputGroupProps {
  name: string;
  label: string;
  id: string;
  type: string;
  placeholder: string;
}
export class InputGroup extends Block<InputGroupProps> {
  constructor(props: InputGroupProps) {
    super("div", props);
  }

  render() {
    return this.compile(
      `<article class="inputGroup">
        <label class="label" for={{id}}>{{label}}</label>
        <input name={{name}} class="input" type={{type}} id={{id}} name={{id}} onblur={{onblur}} required placeholder={{placeholder}}>
      </article>`,
      this.props
    );
  }
}
