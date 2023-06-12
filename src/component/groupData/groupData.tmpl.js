import Handlebars from "handlebars";

export const groupData = ({title, name, value}) =>
  Handlebars.compile(
    `
        <section class="group-data">
            <p class="group-data__title">${title}</p>
            <p name=${name} class="group-data__value">${value}</p>
        </section>
    `
  )();
