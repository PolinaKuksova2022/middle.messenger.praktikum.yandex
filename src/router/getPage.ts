import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';
import Chats from '../pages/Chats';
import Main from '../pages/Main';
import Error404 from '../pages/Error404';
import Error500 from '../pages/Error500';
import toggleModal from '../utils/toggleModal';

window.toggleModal = toggleModal;

export default function getPage() {
  if (!window.__FORMS_DATA__) window.__FORMS_DATA__ = {};
  switch (window.location.pathname) {
    case '/auth':
      return new Auth({ title: 'Авторизация', containerClass: 'container' });
    case '/registration':
      return new Registration({ title: 'Регистрация', containerClass: 'container container_big' });
    case '/profile':
      return new Profile({ name: 'Иван', func: 'window.toggleModal()' });
    case '/chat':
      return new Chats({ title: 'chat' });
    case '/internal-server-error':
      return new Error500({ title: '' });
    case '/':
      return new Main({ title: 'Навигация' });
    default:
      return new Error404({ title: '' });
  }
}
