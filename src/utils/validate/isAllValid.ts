import { FormInput } from "../global/definitions";
import { regEmail, regLogin, regName, regPassword } from "./constants";

export default function isAllValid(inputs: FormInput[] | HTMLInputElement[] ) {
    return inputs.every((i) => {
        if (i.value.length !== 0) {
          switch (i.name) {
            case 'login':
              return i.value.match(regLogin);
            case 'password':
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
