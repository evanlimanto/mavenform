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

const Renderer = new marked.Renderer();
Renderer.code = function(code, language) {
  code = replace(code, /\r\n|\r|\n/g, '<hr class="scode" />');
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<code class="codediv">${code}</code>`;
};
Renderer.codespan = function(code, language) {
  code = replace(code, /\\_/g, '_'); // remove escapes
  code = replace(code, /\\./g, '.'); // remove escapes
  return `<code>${code}</code>`;
};
Renderer.em = function(text) {
  return `<i>${text}</i>`;
};
Renderer.br = function() {
  return '<hr class="s1" />';
};
Renderer.paragraph = function(text) {
  return `${text}`;
};
Renderer.image = function(href, title, text) {
  href = replace(href, /\\\./g, '.'); // remove escapes
  return `<img src="${href}" title="${title}" alt="${text}" />`;
};
Renderer.list = function(body, ordered) {
  if (ordered) {
    return `${replace(replace(body, '<li>', ''), '</li>', '')}`;
  } else {
    return `<ul>${body}</ul>`;
  }
};

export default function MDRenderer(text) {
  return marked(text, { Renderer });
}