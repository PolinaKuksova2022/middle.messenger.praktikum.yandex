import Handlebars from "handlebars";
import { formTemplate } from "../../component/commonTmpl/form.tmpl";
import { inputGroup } from "../../component/form/inputGroup";
import { RedirectBtn } from "../../component/button/redirectButton";
//import { validatePhone } from "../../utils/validatePhone";

//window.validatePhone = validatePhone;

export const Registration = () => Handlebars.compile(formTemplate)({
    title: 'Регистрация',
    containerClass: 'container container_big',
    inputs: [
        inputGroup({label: 'Почта', id: 'mail', type: 'text', placeholder: 'pochta@yandex.ru'}),
        inputGroup({label: 'Логин', id: 'login', type: 'text', placeholder: 'ivanivanov'}),
        inputGroup({label: 'Имя', id: 'username', type: 'text', placeholder: 'Иван'}),
        inputGroup({label: 'Фамилия', id: 'usersurname', type: 'text', placeholder: 'Иванов'}),
        inputGroup({label: 'Телефон', id: 'phone', type: 'tel', placeholder: '+7(___)-___-__-__'}),
        inputGroup({label: 'Пароль', id: 'password', type: 'password', placeholder: ''}),
        inputGroup({label: 'Повторите пароль', id: 'password-2', type: 'password', placeholder: ''}),
    ],
    buttons: [
        RedirectBtn ({text: 'Зарегистрироваться', className: 'button', ref: '/chat'}),
        RedirectBtn ({text: 'Войти', className: 'button navigation-btn', ref: '/auth'}),
    ],
});