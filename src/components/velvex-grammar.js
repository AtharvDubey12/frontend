import Prism from 'prismjs';
// TODO: Add more operators.
Prism.languages.velvex = {
  'comment': {
    pattern: /Ignore\[[\s\S]*?\]/,
    greedy: true
  },
  'keyword': /\b(Frac|Pdiff|Diff|Integ|Sqrt|Matrix|Txt|Piecewise|Taylor|Inf|Bold|Omega|Om|__|Zeta)\b/,
  "operator": /->|=>|[=+*/^_-]/,
  'punctuation': /[\[\](),]/,
  'variable': /\b[a-z]\b/i,
  'string': {
    pattern: /Txt\[[\s\S]*?\]/,
    inside: {
      'punctuation': /[\[\]]/,
      'inner-text': {
        pattern: /(Txt\[)[\s\S]+?(?=\])/,
        lookbehind: true
      }
    }
  }
};
Prism.languages.velvet = Prism.languages.velvex;