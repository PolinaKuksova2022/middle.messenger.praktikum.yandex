import { IPassword, IProfileData, UserAPI } from '../api/user-api';
import store from '../utils/core/Store';
import { closeModal } from '../utils/toggleModal';

class UserController {
  private api = new UserAPI();

  async putProfile(data: IProfileData) {
    try {
      const profile = await this.api.profile(data);
      store.set('user', profile);

      alert('Вы изменили данные');
    } catch (error) {
      console.log(error);
    }
  }

  async putAvatar(img: FormData) {
    try {
      const user = await this.api.avatar(img);
      store.set('user', user);

      // закрыть модальное окно
      closeModal();

      alert('Вы изменили фото');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log(error);
    }
  }

  async putPassword(data: IPassword) {
    try {
      await this.api.password(data);

      // закрыть модальное окно
      closeModal();

      alert('Вы изменили пароль');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log(error);
    }
  }

  async fetchUserId(id: number) {
    try {
      await this.api.getUserId(id);
    } catch (error) {
      console.log((error as Record<string, string>).reason);
    }
  }
}

export default new UserController();
