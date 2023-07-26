import AuthController from './controllers/AuthController';
import Auth from './pages/Auth';
import Chats from './pages/Chats';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Main from './pages/Main';
import { Profile } from './pages/Profile';
import Registration from './pages/Registration';
import router from './router/router';

export enum Routes {
  Main = '/',
  Register = '/registration',
  Auth = '/auth',
  Profile = '/profile',
  Chat = '/chat',
  Error404 = '*',
  Error500 = '/internal-server-error',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Main, Main)
    .use(Routes.Register, Registration)
    .use(Routes.Auth, Auth)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chats)
    .use(Routes.Error404, Error404)
    .use(Routes.Error500, Error500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Main:
    case Routes.Register:
    case Routes.Auth:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    router.start();
  } catch (err) {
    console.log(err, 'Here');

    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Main);
      console.log(isProtectedRoute, 'isProtectedRoute');
    }
  }
});
