import Handlebars from "handlebars";
import { formTemplate } from "../../component/commonTmpl/form.tmpl";
import { inputGroup } from "../../component/form/inputGroup";
import { RedirectBtn } from "../../component/button/redirectButton";

export const Auth = () => Handlebars.compile(formTemplate)({
    title: 'Авторизация',
    containerClass: 'container',
    inputs: [
        inputGroup({label: 'Логин', id: 'username', type: 'text', placeholder: ''}),
        inputGroup({label: 'Пароль', id: 'password', type: 'password', placeholder: ''}),
    ],
    buttons: [
        RedirectBtn ({text: 'Авторизация', className: 'button', ref: '/auth'}),
        RedirectBtn ({text: 'Нет аккаунта?', className: 'button navigation-btn', ref: '/registration'}),
    ],
});