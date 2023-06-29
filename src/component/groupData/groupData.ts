import Block from "../../utils/Block";

interface GroupDataProps {
  title: string;
  name: string;
  value: string;
}
export class GroupData extends Block<GroupDataProps> {
  constructor(props: GroupDataProps) {
    super("div", props);
  }

  render() {
    return this.compile(
      `<section class="group-data">
            <p class="group-data__title">{{title}}</p>
            <p name={{name}} class="group-data__value">{{value}}</p>
        </section>
          `,
      this.props
    );
  }
}
