/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.history = window.history;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
global.FormData = window.FormData;
global.DocumentFragment = window.DocumentFragment;
