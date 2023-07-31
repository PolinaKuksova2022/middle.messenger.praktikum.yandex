import Block from '../../utils/core/Block';

export interface InputGroupProps {
  name: string;
  label?: string;
  inputClass?: string;
  id: string;
  type: string;
  events?: {
    submit?: (event: Event) => void;
    focusout?: (event: Event) => void;
    focusin?: (event: Event) => void;
  };
  value?: string;
  placeholder?: string;
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
        <input name="{{name}}" class="{{inputClass}}" type="{{type}}" id={{id}} name={{id}} required placeholder="{{placeholder}}" value="{{value}}" {{disabled}}>
      `,
      this.props
    );
  }
}
