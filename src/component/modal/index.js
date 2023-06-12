import Handlebars from "handlebars";
import { formTemplate } from "../commonTmpl/form.tmpl";
import { RedirectBtn } from "../button/redirectButton";
import { ToggleModalBtn } from "../button/ToggleModalButton";

export const Modal = () => Handlebars.compile(formTemplate)({
    title: 'Загрузите файл',
    containerClass: 'container container_big',
    buttons: [
        RedirectBtn ({text: 'Выбрать файл на компьютере', className: 'button navigation-btn', ref: '/'}),
        ToggleModalBtn ({text: 'Поменять', className: 'button', ref: '/profile'}),
    ],
});