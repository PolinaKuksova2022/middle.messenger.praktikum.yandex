/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.scss'] = function () {
  module.exports = () => ({});
};

require.extensions['.svg'] = function () {
  module.exports = () => ({});
};
