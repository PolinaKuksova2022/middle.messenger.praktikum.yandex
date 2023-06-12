import Handlebars from "handlebars";
import { template } from "./chats.tmpl";

export const Chats = () => Handlebars.compile(template)();