import { AuthAPI, ILoginData, IRegistrationData, IUser } from '../api/auth-api';
import Routes from '../main';
import router from '../router/router';
import store from '../utils/core/Store';

type Response = {
  success: boolean;
  user?: IUser | null;
  users?: IUser[] | null;
  error: unknown | null;
};

class AuthController {
  private api = new AuthAPI();

  async signin(data: ILoginData) {
    try {
      await this.api.signin(data);

      const user = await this.fetchUser();

      router.go(Routes.Profile);

      alert('Вход выполнен');

      return {
        success: true,
        user: user.user,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  async signup(data: IRegistrationData) {
    try {
      await this.api.signup(data);

      alert('Регистрация прошла');

      const user = await this.fetchUser();

      router.go(Routes.Profile);

      return {
        success: true,
        user: user.user,
        error: null,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  async logout() {
    try {
      await this.api.logout();

      store.set('user', undefined);

      router.go(Routes.Auth);

      alert('Вы вышли из профиля');
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser(): Promise<Response> {
    try {
      const user = await this.api.getUser();

      store.set('user', user);

      return {
        success: true,
        user,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        user: null,
        error,
      };
    }
  }
}

export default new AuthController();
