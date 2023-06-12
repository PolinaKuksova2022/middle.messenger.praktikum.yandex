import Handlebars from "handlebars";
import { template } from "./profile.tmpl";
import { groupData } from "../../component/groupData/groupData.tmpl";
import { RedirectBtn } from "../../component/button/redirectButton";
import { ToggleModalBtn } from "../../component/button/ToggleModalButton";
import { toggleModal } from "../../utils/toggleModal";

window.toggleModal = toggleModal;

export const Profile = () => Handlebars.compile(template)({
    name: 'Иван',
    onclick: 'window.toggleModal()',
    data: [
        groupData({title: 'Почта', name: 'email', value: 'pochta@yandex.ru'}),
        groupData({title: 'Логин', name: 'login', value: 'ivanivanov'}),
        groupData({title: 'Имя', name: 'first_name', value: 'Иван'}),
        groupData({title: 'Фамилия', name: 'second_name', value: 'Иванов'}),
        groupData({title: 'Имя в чате', name: 'display_name', value: 'Иван'}),
        groupData({title: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30'}),
    ],
    buttons: [
        ToggleModalBtn ({text: 'Изменить данные', className: 'button modal-btn navigation-btn'}),
        ToggleModalBtn ({text: 'Изменить пароль', className: 'button modal-btn navigation-btn'}),
        RedirectBtn ({text: 'Выйти', className: 'button navigation-btn excretion-btn', ref: '/chat'}),
    ],

});