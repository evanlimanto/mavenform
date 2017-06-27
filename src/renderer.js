const marked = require('marked');
const _ = require('lodash');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const renderer = new marked.Renderer();
renderer.code = function(code, language) {
  code = _.replace(code, /\r\n|\r|\n/g, '<hr class="s0-5" />');
  code = _.replace(code, /\\_/g, '_'); // remove escapes
  code = _.replace(code, /\\./g, '.'); // remove escapes
  return `<code class="codediv">${code}</code>`;
};
renderer.codespan = function(code, language) {
  code = _.replace(code, /\\_/g, '_'); // remove escapes
  code = _.replace(code, /\\./g, '.'); // remove escapes
  return `<code>${code}</code>`;
};
renderer.em = function(text) {
  return `<i>${text}</i>`;
};
renderer.br = function() {
  return '<hr class="s1" />';
};
renderer.paragraph = function(text) {
  return `${text}`;
};
renderer.image = function(href, title, text) {
  href = _.replace(href, /\\./g, '.'); // remove escapes
  return `<img src="${href}" title="${title}" alt="${text}" />`;
};
renderer.link = function(href, title, text) {
  href = _.replace(href, /\\./g, '.'); // remove escapes
  return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
}
renderer.list = function(body, ordered) {
  if (ordered) {
    return _.replace(_.replace(body, '<li>', ''), '</li>', '');
  } else {
    return `<ul>${body}</ul>`;
  }
};

exports.preprocess = function(text) {
  text = _.replace(text, /_/g, '\\_');
  text = _.replace(text, /&amp;/g, '&');
  text = marked(text, { renderer });
  return text;
};
