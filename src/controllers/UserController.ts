import { IAvatar, IPassword, IProfileData, UserAPI } from '../api/user-api';
import store from '../utils/core/Store';
import AuthController from './AuthController';

class UserController {
  private api = new UserAPI();

  async putProfile(data: IProfileData) {
    try {
      const profile = await this.api.profile(data);
      store.set('user', profile);

      alert('Вы изменили данные');
    } catch (error) {
      throw error;
    }
  }

  async putAvatar(data: IAvatar) {
    try {
      const user = await this.api.avatar(data);
      store.set('user', user);

      alert('Вы изменили фото');
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  async putPassword(data: IPassword) {
    try {
      await this.api.password(data);

      //закрыть модальное окно
      const app = document.getElementById('app');
      const  modalPassword = document.getElementById('modalData')
      if(modalPassword) {
        app?.removeChild(modalPassword);
      };

      alert('Вы изменили пароль');
    } catch (error) {
      alert((error as Record<string, string>).reason)
      console.log(error);
    }
  }

  async fetchUserId(id: number) {
    try {
      await this.api.getUserId(id);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
