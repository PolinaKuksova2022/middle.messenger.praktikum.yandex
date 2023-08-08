import API from './api';

export interface IProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IPassword {
  newPassword: string;
  oldPassword: string;
}

export interface IId {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
}

export interface ISearch {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
}

export class UserAPI extends API {
  constructor() {
    super('/user');
  }

  profile(data: IProfileData) {
    return this.http.put('/profile', data);
  }

  avatar(img: FormData) {
    return this.http.put('/profile/avatar', img);
  }

  password(data: IPassword) {
    return this.http.put('/password', data);
  }

  getUserId(id: number) {
    return this.http.get(`/${id}`);
  }

  search(data: ISearch) {
    return this.http.post('/search', data);
  }
}
