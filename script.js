const inject = (src, onload) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onload;
  document.body.append(script);
};

document.documentElement.lang = 'en';
window.MathJax = {tex: {inlineMath: {'[+]': [['$', '$']]}}};
const source = document.body.firstElementChild;
const markdown = source.textContent;
source.remove();
const destination = document.createElement('div');
document.body.prepend(destination);
const jsDelivr = 'https://cdn.jsdelivr.net';
inject(`${jsDelivr}/npm/marked/lib/marked.umd.js`, () => {
  destination.innerHTML = marked.parse(markdown);
  for (const x of document.getElementsByClassName('language-mermaid')) {
    const parent = x.parentElement;
    parent.innerHTML = x.innerHTML;
    parent.className = 'mermaid';
  }
  inject(`${jsDelivr}/npm/mermaid/dist/mermaid.min.js`,
    () => mermaid.init()
  );
  inject(`${jsDelivr}/gh/highlightjs/cdn-release/build/highlight.min.js`,
    () => hljs.highlightAll()
  );
  inject(`${jsDelivr}/npm/mathjax@4/tex-chtml.js`);
});

