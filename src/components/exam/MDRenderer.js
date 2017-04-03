import { replace } from 'lodash';

const marked = require('marked');

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
  code = replace(code, /\r\n|\r|\n/g, '<hr class="scode" />');
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<code class="codediv">${code}</code>`;
};
renderer.codespan = function(code, language) {
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
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
  href = replace(href, /\\./g, '.'); // remove escapes
  return `<img src="${href}" title="${title}" alt="${text}" />`;
};
renderer.list = function(body, ordered) {
  if (ordered) {
    return `${replace(replace(body, '<li>', ''), '</li>', '')}`;
  } else {
    return `<ul>${body}</ul>`;
  }
};

export default function MDRenderer(text) {
  return marked(text, { renderer });
}
