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
    public blockClass: typeof Block,
    public query: string
  ) {}

  //   navigate(pathname: string) {
  //     if (this.match(pathname)) {
  //       this._pathname = pathname;
  //       this.render();
  //     }
  //   }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }

    // this.block.show();
  }
}
