const _ = require('lodash');

function lmatrix(values, transpose=false) {
  var n = values.length;
  if (Array.isArray(values[0])) {
    // 2-D
    var m = values[0].length;
    var s = `
      \\(\\left[\\begin{array}{${
        _.repeat('c ', m)
      }}${
        _.join(_.map(values, (list) => {
          return _.join(list, ' & ') + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""  
      }\\)
      `;
    return s;
  } else {
    // 1-D
    var s = `
      \\(\\left[\\begin{array}{c}${
        _.join(_.map(values, (value) => {
          return value + "\\\\";
        }), '')
      }\\end{array}\\right]${
        (transpose) ? "^T" : ""
      }\\)
      `;
    return s;
  }
}

function lx(s) {
  return `\\(${s}\\)`;
}

export { lmatrix, lx };
