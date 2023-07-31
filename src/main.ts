import AuthController from './controllers/AuthController';
import Auth from './pages/Auth';
import Chats from './pages/Chats';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Main from './pages/Main';
import { Profile } from './pages/Profile';
import Registration from './pages/Registration';
import router from './router/router';
import store from './utils/core/Store';

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
  console.log('DOM LOADED');
  router
    .use(Routes.Main, Main)
    .use(Routes.Register, Registration)
    .use(Routes.Auth, Auth)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chats)
    .use(Routes.Error404, Error404)
    .use(Routes.Error500, Error500)
    .setOnRoutedCallback((route) => {
      if (store.state) {
        switch (route.pathname) {
          case Routes.Auth:
          case Routes.Register:
            router.go(Routes.Profile);
            return;
        }
      } else {
        switch (route.pathname) {
          case Routes.Chat:
          case Routes.Profile:
            router.go(Routes.Auth);
            return;
        }
      }
    })
    .start();

  if (!router.exists(window.location.pathname)) {
    router.go(Routes.Error404);
    return;
  }
  

  try {
    await AuthController.fetchUser();
  } catch (e) {
    console.log(e, 'Here');
  }
});
