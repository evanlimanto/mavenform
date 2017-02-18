const _ = require('lodash');

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

export { lmatrix, lx };
