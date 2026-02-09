import Prism from 'prismjs';

Prism.languages.velvex = {
  'comment': {
    pattern: /Ignore\[[\s\S]*?\]/,
    greedy: true
  },
  'keyword': /\b(Frac|Pdiff|Diff|Integ|Sqrt|Matrix|Txt|Piecewise|Taylor|Inf|Bold|Omega|Om|__|Zeta)\b/,
  'operator': /->|=>|[=\-+*/^]/,
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
