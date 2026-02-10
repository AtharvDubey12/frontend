import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MathJaxContext config={mathJaxConfig}>
      <App />
    </MathJaxContext>
  </StrictMode>,
)
