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

  render() {
    return this.compile(
      `
        <label class="label" for={{id}}>{{label}}</label>
        <input name={{name}} class="{{inputClass}}" type={{type}} id={{id}} name={{id}} required placeholder="{{placeholder}}" {{disabled}}>
      `,
      this.props
    );
  }
}
