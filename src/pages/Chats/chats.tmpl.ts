const template = `
  <div class="chats">
    <section class="dialogues">
      {{{button}}}
      <input class="dialogues__search" type="text" id="search-input" placeholder="🔍︎ Поиск">
      <ul class="dialogues__items">
        {{{dialogue_1}}}
        {{{dialogue_2}}}
      </ul>
    </section>
    {{{message}}}
  </div>
`;

export default template;
