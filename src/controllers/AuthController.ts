import { AuthAPI, ILoginData, IRegistrationData } from '../api/auth-api';
import { Routes } from '../main';
import router from '../router/router';
import store from '../utils/core/Store';

class AuthController {
  private api = new AuthAPI();

  async signin(data: ILoginData) {
    try {
      await this.api.signin(data);
      
      await this.fetchUser();

      router.go(Routes.Profile);

      alert('Вход выполнен');
    } catch (error) {
      console.log(error);
    }
  }

  async signup(data: IRegistrationData) {
    try {
      await this.api.signup(data);

      router.go(Routes.Profile);

      alert('Регистрация прошла');
    } catch (error) {
      console.log(error);
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

  async fetchUser() {
    try {
      const user = await this.api.getUser();
      store.set('user', user);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
