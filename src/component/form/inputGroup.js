import Handlebars from "handlebars";

export const inputGroup = ({label, id, type, placeholder, onblur}) =>
  Handlebars.compile(
    `<article class="inputGroup">
      <label class="label" for=${id}>${label}</label>
      <input class="input" type=${type} id=${id} name=${id} onblur=${onblur} required placeholder=${placeholder}>
    </article>`
  )();
