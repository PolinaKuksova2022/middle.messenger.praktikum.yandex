const formTemplate = `
<div class="{{containerClass}}">
  <h1 class="container__title">{{title}}</h1>
  <form class="form-group">
      <section class="form-group__input">
        {{{group_1}}}
        {{{group_2}}}
        {{{group_3}}}
        {{{group_4}}}
        {{{group_5}}}
        {{{group_6}}}
        {{{group_7}}}
      </section>
    <section class="form-group__button">
      {{{button_1}}}
      {{{button_2}}}
    </section>
 </form>
</div>
`;

export default formTemplate;
