import Block from '../utils/core/Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export default class Route {
  private block: Block | null = null;

  constructor(
    public pathname: string,
    public readonly BlockClass: typeof Block,
    public readonly query: string
  ) {}

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    this.block = new this.BlockClass({});

    render(this.query, this.block);
  }
}
