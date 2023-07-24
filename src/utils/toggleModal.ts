import Password from '../component/modal/password';
import Photo from '../component/modal/photo';
import { FormInput } from './global/definitions';
import isAllValid from './validate/isAllValid';

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

  const modal = new Password({
    title: 'Измените пароль',
    containerClass: 'container container_big',
  });

  article.appendChild(modal.getContent()!);
  app!.append(article);

  const changeBtn = document.getElementById('change');
  changeBtn?.classList.add('disabled');
  const inputArr = Array.from(document.getElementsByName('password')).map(
    (i) => i as HTMLInputElement
  );
  changeBtn?.addEventListener('mouseover', () => {
    if (isAllValid(inputArr)) {
      changeBtn.classList.remove('disabled');

      const inputs: FormInput[] = inputArr.map((i) => ({ name: i.name, value: i.value }));

      window.__FORMS_DATA__[window.location.pathname] = inputs;

      console.log('FORMS_DATA:');
      console.log(window.__FORMS_DATA__);
    } else {
      changeBtn.classList.add('disabled');
    }
  });
}

//   import Password from '../component/modal/password';
// import Photo from '../component/modal/photo';
// import isAllValid from './validate/isAllValid';

// let show = true;
// const app = document.getElementById('app');

// export default function toggleModal(e: Event) {
//   const article = document.createElement('article');
//   article.className = 'modal';
//   article.id = 'modalData';
//   const modalData = document.getElementById('modalData');
//   let modal;

//   if (show) {
//     if (e) {
//       modal = new Password({ title: 'Измените пароль', containerClass: 'container container_big' });
//     } else {
//       modal = new Photo({ title: 'Загрузите файл', containerClass: 'container container_big' });
//     }
//     article.appendChild(modal.getContent()!);
//     app!.append(article);
//   }

//   const changeBtn = document.getElementById('change');
//   if (e) {
//     changeBtn?.classList.add('disabled');
//   }

//   let showInputValue: string[];
//   changeBtn?.addEventListener('click', () => {
//     if (modalData) app!.removeChild(modalData);
//     if (e) {
// const inputArr = Array.from(document.getElementsByName('password')).map(
//   (i) => i as HTMLInputElement
//       );
//       showInputValue = inputArr.map(i => (i.value))
//       console.log(showInputValue);
//       changeBtn.addEventListener('mouseover', () => {
// if (isAllValid(inputArr)) {
//   changeBtn.classList.remove('disabled');
// }
//       });
//       if (modalData) app!.removeChild(modalData);
//     } else {
//       console.log('3');
//       if (modalData) app!.removeChild(modalData);
//     }
//     show = !show;
//   });
// }
