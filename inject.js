const injectSource = (src, onload) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onload;
  document.body.append(script);
};

const injectInline = (code) => {
  const script = document.createElement('script');
  script.text = code;
  document.body.append(script);
};

const jsDelivr = 'https://cdn.jsdelivr.net';
injectSource(`${jsDelivr}/npm/marked/lib/marked.umd.js`, () => {
  injectInline(`
    document.body.innerHTML =
    marked.parse(document.body.firstElementChild.innerText);
  `);
  injectSource(`${jsDelivr}/gh/highlightjs/cdn-release/build/highlight.min.js`,
    () => injectInline(`hljs.highlightAll();`)
  );
  injectInline(`window.MathJax = {tex: {inlineMath: {'[+]': [['$', '$']]}}};`);
  injectSource(`${jsDelivr}/npm/mathjax@4/tex-chtml.js`);
});
document.documentElement.lang = 'en';

