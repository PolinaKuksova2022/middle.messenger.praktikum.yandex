export const template = `
  <div class="profile-container">
    <section class="profile-container__mane-info">
      <section onclick={{onclick}} class="avatar">
        <img class="avatar__img"  src='' alt=''/>
        <span class="avatar__text">Поменять аватар</span>
      </section>
      <h1 class="name">{{name}}</h1>
    </section>
    <section class="profile-container__info">
      {{#each data}}
        {{{this}}}
      {{/each}}
    </section>
    <section class="profile-container__btn">
      {{#each buttons}}
          {{{this}}}
      {{/each}}
    </section>
  </div>
`