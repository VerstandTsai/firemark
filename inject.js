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
document.documentElement.lang = 'en';
injectSource(`${jsDelivr}/npm/marked/lib/marked.umd.js`, () => {
  injectInline(`
    const source = document.body.firstElementChild;
    source.innerHTML = marked.parse(source.innerText);
  `);
  const source = document.body.firstElementChild;
  const destination = document.createElement('div');
  destination.innerHTML = source.innerHTML;
  document.body.prepend(destination);
  source.remove();
  injectSource(`${jsDelivr}/gh/highlightjs/cdn-release/build/highlight.min.js`,
    () => injectInline(`hljs.highlightAll();`)
  );
  injectInline(`window.MathJax = {tex: {inlineMath: {'[+]': [['$', '$']]}}};`);
  injectSource(`${jsDelivr}/npm/mathjax@4/tex-chtml.js`);
});

