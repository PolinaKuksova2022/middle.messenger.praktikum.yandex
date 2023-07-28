const regName = /^[А-ЯЁA-Z][а-яёa-z-]*$/;
const regLogin = /^(?=.*[a-zA-Z])(?!.*\d{3,20}$)[a-zA-Z0-9_-]{3,20}$/;
const regCharacters = /^.{3,20}$/;
const regCapital = /^[A-Z]/;
const regSymbol = /^[A-Za-z0-9_-]+$/;
const regPassword = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regPhone = /^\+?\d{10,15}$/;

const loginText = 'Логин может содержать цифры, но не состоять из них';
const charactersText = 'Допустимая длина от 3 до 20 символов';
const capitalText = 'Начните с заглавной буквы';
const symbolText = 'Недопускается наличие пробелов и символов, только латиница';
const passwordText =
  'Допускается 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
const emailText = 'Недопустимый email';
const phoneText = 'Недопустимый номер';
const passwordsMismatch = 'Новые пароли не совпадают';

// const loginInput = 'login';
// const input = document.getElementsByName(loginInput)[0];
// const passwordInput = 'password';
// const password = document.getElementsByName(passwordInput)[0];

export {
  regLogin,
  regName,
  regCharacters,
  regCapital,
  regSymbol,
  regPassword,
  regEmail,
  regPhone,

  // loginInput,
  // input,
  loginText,
  charactersText,
  capitalText,
  symbolText,
  passwordText,
  emailText,
  phoneText,
  passwordsMismatch,
};
