import Handlebars from "handlebars";
import { template } from "./main.tmpl";
import { RedirectBtn } from "../../component/button/redirectButton";

export const Main = () =>
  Handlebars.compile(template)({
    buttons: [
      RedirectBtn({ text: "Авторизация", className: "button", ref: "/auth" }),
      RedirectBtn({
        text: "Регистрация",
        className: "button",
        ref: "/registration",
      }),
      RedirectBtn({ text: "Профиль", className: "button", ref: "/profile" }),
      RedirectBtn({
        text: "Лента переписки",
        className: "button",
        ref: "/chat",
      }),
      RedirectBtn({ text: "Error404", className: "button", ref: "*" }),
      RedirectBtn({
        text: "Error500",
        className: "button",
        ref: "/internal-server-error",
      }),
    ],
  });
