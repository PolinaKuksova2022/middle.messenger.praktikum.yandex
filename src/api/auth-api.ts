import { API } from './api';

export interface IRegistrationData {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signin(data: ILoginData): Promise<void> {
    console.log('signin');
    return this.http.post('/signin', data);
  }

  signup(data: IRegistrationData): Promise<void> {
    console.log('signup');
    return this.http.post('/signup', data);
  }

  logout(): Promise<void> {
    return this.http.post('/logout');
  }

  getUser(): Promise<IUser> {
    return this.http.get('/user');
  }
};