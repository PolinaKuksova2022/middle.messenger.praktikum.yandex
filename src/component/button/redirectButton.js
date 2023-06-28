import Handlebars from "handlebars";

export const RedirectBtn = ({ text, className, ref }) =>
  Handlebars.compile(
    `<button class="${className}" onclick="window.location = '${ref}'">
        ${text}
    </button>`
  )();
