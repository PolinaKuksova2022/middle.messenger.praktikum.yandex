import Handlebars from "handlebars";
import { template } from "./error404.tmpl";
import { RedirectBtn } from "../../component/button/redirectButton";

export const Error404 = () => Handlebars.compile(template)({
    button: RedirectBtn ({text: 'Назад к чатам', className: 'button navigation-btn', ref: '/chat'}),
});