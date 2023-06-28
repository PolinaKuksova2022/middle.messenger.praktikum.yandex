import Handlebars from "handlebars";

export const ToggleModalBtn = ({ text, className, toggleModal }) =>
  Handlebars.compile(
    `<button class="${className}" onclick=${toggleModal}>
        ${text}
    </button>`
  )();
