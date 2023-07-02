import Block from '../utils/core/Block';

export default function renderPage(block: Block) {
  const root = document.querySelector('#main');

  if (root) {
    root.innerHTML = '';
    root.append(block.getContent()!);
    block.dispatchComponentDidMount();
  }
}
