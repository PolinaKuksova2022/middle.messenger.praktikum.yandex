import { Password } from '../component/modal/password';
import Photo from '../component/modal/photo';

const app = document.getElementById('app');

export function togglePhoto() {
  const article = document.createElement('article');
  article.className = 'modal';
  article.id = 'modalData';
  const modal = new Photo({ title: 'Загрузите файл', containerClass: 'container container_big' });
  article.appendChild(modal.getContent()!);
  app!.append(article);

  // const changeBtn = document.getElementById('change');
  // console.log(changeBtn);
  // changeBtn?.addEventListener('click', () => {
  //   console.log('1');
  //   const modal = document.getElementById('modalData');
  //   if (modal) app!.removeChild(modal);
  //   show = !show;
  // });
}

export function togglePassword() {
  const article = document.createElement('article');
  article.className = 'modal';
  article.id = 'modalData';

  const modal = new Password({});

  article.appendChild(modal.getContent()!);
  app!.append(article);
}
