const script = document.createElement('script');
script.type = 'module';
script.text = `
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/highlight.min.js';
document.documentElement.lang = 'en';
const source = document.body.firstElementChild.innerText;
document.body.innerHTML = marked.parse(source);
hljs.highlightAll();
`;
document.body.append(script);

