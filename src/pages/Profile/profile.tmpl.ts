const template = `
  <div class="profile-container">
    <section class="profile-container__mane-info">
      {{{avatar}}}
      <h1 class="name">{{ first_name }}</h1>
    </section>
    <section class="profile-container__info">
      {{{group_1}}}
      {{{group_2}}}
      {{{group_3}}}
      {{{group_4}}}
      {{{group_5}}}
      {{{group_6}}}
    </section>
    <section class="profile-container__btn">
      {{{button_1}}}
      {{{button_2}}}
      {{{button_3}}}
      {{{button_4}}}
    </section>
  </div>
`;

export default template;
