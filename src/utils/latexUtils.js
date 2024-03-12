const replaceAll = (expression, search, replacement) => {
  if (expression) {
    return expression.split(search).join(replacement);
  }
  return expression;
};

const cleanLatex = (latex) => {
  if (!latex) {
    return latex;
  }

  let clean = replaceAll(latex, '\\left(', '(');
  clean = replaceAll(clean, '\\right)', ')');
  //clean = replaceAll(clean, '\\left[', '[');
 // clean = replaceAll(clean, '\\right]', ']');
  // clean = replaceAll(clean, 'left(', '(');
  // clean = replaceAll(clean, '\\cdot ', '*');
  // clean = replaceAll(clean, 'cdot ', '*');
  // clean = replaceAll(clean, 'sen', '\\sin');
  // clean = replaceAll(clean, '.', '*');
  // clean = replaceAll(clean, '\\ ', '');
  return clean;
};

const cleanExpression = (expression, isMathQuill) => {
  // TODO: this is becuase a Mathquill issue: https://github.com/mathquill/mathquill/issues/784
  let cleanedExpression;
  if (isMathQuill) {
    cleanedExpression = replaceAll(expression, '\\int', '\\int_{\\ }^{\\ }');
    cleanedExpression = replaceAll(cleanedExpression, '\\mathbb{R}', '\\R');
    cleanedExpression = replaceAll(cleanedExpression, '\\mathbb{Z}', '\\Z');
    cleanedExpression = replaceAll(cleanedExpression, '\\;', ' ');
    cleanedExpression = replaceAll(cleanedExpression, '|', '\\mid');
    cleanedExpression = replaceAll(cleanedExpression, '\\setminus', '-');
  } else {
    cleanedExpression = replaceAll(expression, '\\int_{\\ }^{\\ }', '\\int ');
  }

  // this one is to avoid MathQuill write a complex latex
  return cleanLatex(cleanedExpression);
};

module.exports = {
  cleanExpression,
  cleanLatex,
  replaceAll
};
