const template = `
  <div class="chats">
    <section class="dialogues">
      {{{button_1}}}
      {{{button_2}}}
      <ul class="dialogues__items">
        {{{chatList}}}
      </ul>
    </section>
    {{{activeChat}}}
  </div>
`;

//       <input class="dialogues__search" type="text" id="search-input" placeholder="🔍︎ Поиск">

export default template;
