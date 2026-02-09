import Prism from 'prismjs';

Prism.languages.velvex = {
  'comment': {
    pattern: /Ignore\[[\s\S]*?\]/,
    greedy: true
  },
  'keyword': /\b(Frac|Pdiff|Integ|Sqrt|Matrix|Txt|Piecewise)\b/,
  'operator': /[=\-+*/^]/,
  'punctuation': /[\[\](),]/,
  'variable': /\b[a-z]\b/i,
  'string': {
    pattern: /Txt\[[\s\S]*?\]/,
    inside: {
      'punctuation': /[\[\]]/,
      'inner-text': {
        // Matches 'Txt[' followed by content, but skips 'Txt[' visually
        pattern: /(Txt\[)[\s\S]+?(?=\])/,
        lookbehind: true
      }
    }
  }
};