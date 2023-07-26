import Block from '../../utils/core/Block';

interface InputGroupProps {
  name: string;
  label: string;
  inputClass: string;
  id: string;
  type: string;
  events?: {
    focusout: (event: Event) => void;
    focusin: (event: Event) => void;
  };
  placeholder: string;
  disabled?: string;
}
export default class InputGroup extends Block<InputGroupProps> {
  constructor(props: InputGroupProps) {
    super(props, 'article');
  }

  // public getName() {
  //   console.log("NAME", (this.element as HTMLInputElement).name);

  //   return (this.element as HTMLInputElement).name;
  // }

  // public getValue() {
  //   console.log("VALUE", (this.element as HTMLInputElement).value);

  //   return (this.element as HTMLInputElement).value;
  // }

  render() {
    return this.compile(
      `
        <label class="label" for={{id}}>{{label}}</label>
        <input name="{{name}}" class="{{inputClass}}" type="{{type}}" id={{id}} name={{id}} required placeholder="{{placeholder}}" {{disabled}}>
      `,
      { ...this.props }
    );
  }
}
