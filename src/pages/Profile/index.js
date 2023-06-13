import Handlebars from "handlebars";
import { template } from "./profile.tmpl";
import { groupData } from "../../component/groupData/groupData.tmpl";
import { RedirectBtn } from "../../component/button/redirectButton";
import { ToggleModalBtn } from "../../component/button/ToggleModalButton";
import { toggleModal } from "../../utils/toggleModal";

window.toggleModal = toggleModal;

export const Profile = () =>
  Handlebars.compile(template)({
    name: "Иван",
    onclick: "window.toggleModal()",
    data: [
      groupData({ 
        name: "email", 
        title: "Почта", 
        value: "pochta@yandex.ru" 
      }),
      groupData({ 
        name: "login",
        title: "Логин", 
        value: "ivanivanov" 
      }),
      groupData({
        name: "first_name",  
        title: "Имя", 
        value: "Иван" 
      }),
      groupData({ 
        name: "second_name", 
        title: "Фамилия", 
        value: "Иванов" 
      }),
      groupData({ 
        name: "display_name", 
        title: "Имя в чате", 
        value: "Иван" 
      }),
      groupData({
        name: "phone",
        title: "Телефон",
        value: "+7 (909) 967 30 30",
      }),
    ],
    buttons: [
      ToggleModalBtn({
        text: "Изменить данные",
        className: "button modal-btn navigation-btn",
      }),
      ToggleModalBtn({
        text: "Изменить пароль",
        className: "button modal-btn navigation-btn",
      }),
      RedirectBtn({
        text: "Выйти",
        className: "button navigation-btn excretion-btn",
        ref: "/chat",
      }),
    ],
  });
