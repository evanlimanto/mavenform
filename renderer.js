const mjAPI = require('mathjax-node');
const marked = require('marked');
const _ = require('lodash');

mjAPI.config({
  MathJax: {
    asciimath2jax: {
      delimiters: [ ["@", "@"], ["@@", "@@"] ]
    },
    AsciiMath: { displaystyle: false },
    tex2jax: {
      inlineMath: [ ['$','$'] ],
      displayMath: [ ['$$','$$'] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"], MMLorHTML: {prefer: "HTML"} },
  }
});

/*
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var VARIANT = MathJax.OutputJax["HTML-CSS"].FONTDATA.VARIANT;
  VARIANT["normal"].fonts.unshift("MathJax_SansSerif");
  VARIANT["bold"].fonts.unshift("MathJax_SansSerif-bold");
  VARIANT["italic"].fonts.unshift("MathJax_SansSerif-italic");
  VARIANT["-tex-mathit"].fonts.unshift("MathJax_SansSerif-italic");
});
MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  var VARIANT = MathJax.OutputJax.SVG.FONTDATA.VARIANT;
  VARIANT["normal"].fonts.unshift("MathJax_SansSerif");
  VARIANT["bold"].fonts.unshift("MathJax_SansSerif-bold");
  VARIANT["italic"].fonts.unshift("MathJax_SansSerif-italic");
  VARIANT["-tex-mathit"].fonts.unshift("MathJax_SansSerif-italic");
});
MathJax.Hub.Register.LoadHook("[MathJax]/extensions/asciimath2jax.js",function () {
  var AM = MathJax.Extension.asciimath2jax,
      CREATEPATTERNS = AM.createPatterns;
  AM.createPatterns = function () {
    var result = CREATEPATTERNS.call(this);
    this.match['@@'].mode = ";mode=display";
    return result;
  };
});
MathJax.Hub.Register.StartupHook("AsciiMath Jax Ready",function () {
  var AM = MathJax.InputJax.AsciiMath;
  AM.postfilterHooks.Add(function (data) {
    if (data.script.type.match(/;mode=display/))
      {data.math.root.display = "block"}
    return data;
  });
});
*/

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
  code = _.replace(code, /\r\n|\r|\n/g, '<hr class="scode" />');
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
