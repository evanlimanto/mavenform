const _ = require('lodash');
const longblank = _.repeat('_', 30);
const blank = '<code>________</code>';
const twelvespace = _.repeat('&nbsp;', 12);
const eightspace = _.repeat('&nbsp;', 8);
const sevenspace = _.repeat('&nbsp;', 7);
const sixspace = _.repeat('&nbsp;', 6);
const fivespace = _.repeat('&nbsp;', 5);
const fourspace = _.repeat('&nbsp;', 4);
const threespace = _.repeat('&nbsp;', 3);
const twospace = _.repeat('&nbsp;', 2);
const onespace = _.repeat('&nbsp;', 1);

function lmatrix(values, transpose=false, inline=true) {
  var s;
  if (Array.isArray(values[0])) {
    // 2-D
    var m = values[0].length;
    s = `
      \\left[\\begin{array}{${
        _.repeat('c ', m)
      }}${
        _.join(_.map(values, (list) => {
          return _.join(list, ' & ') + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""
      }
    `;
    return lx(s, inline);
  } else {
    // 1-D
    s = `
      \\left[\\begin{array}{c}${
        _.join(_.map(values, (value) => {
          return value + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""
      }
    `;
    return lx(s, inline);
  }
}

function lx(s, inline=true) {
  return `${ (inline) ? "\\(" : "$$"}${s}${ (inline) ? "\\)" : "$$" }`;
}

export {
  lmatrix, lx,
  longblank, blank, onespace, twospace, threespace, fourspace, fivespace, sixspace, sevenspace, eightspace, twelvespace
};
