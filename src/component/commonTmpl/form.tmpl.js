export const formTemplate = `
<div class="{{containerClass}}">
  <h1 class="container__title">{{title}}</h1>
  <form class="form-group">
      <section class="form-group__input">
        {{#each inputs}}
          {{{this}}}
        {{/each}}
      </section>
    <section class="form-group__button">
      {{#each buttons}}
        {{{this}}}
      {{/each}}
    </section>
 </form>
</div>
`;
