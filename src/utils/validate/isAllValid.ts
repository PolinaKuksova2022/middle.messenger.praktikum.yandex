import { regEmail, regLogin, regName, regPassword } from './constants';

export default function isAllValid(data: Record<string, string>) {
  return Object.entries(data)
    .map((x) => ({ key: x[0], value: x[1] }))
    .every((i) => {
      if (i.value.length !== 0) {
        switch (i.key) {
          case 'login':
            return i.value.match(regLogin);
          case 'password':
          case 'newPassword':
          case 'oldPassword':
            return i.value.match(regPassword);
          case 'email':
            return i.value.match(regEmail);
          case 'first_name':
            return i.value.match(regName);
          case 'second_name':
            return i.value.match(regName);
          default:
            return true;
        }
      }
      return false;
    });
}
