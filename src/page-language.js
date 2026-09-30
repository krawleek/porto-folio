import './page-motion.js';
// Language belongs to the URL. Content lives in independent ru/ and en/ HTML files.
export const language = document.documentElement.lang === 'en' ? 'en' : 'ru';
export const languagePath = path => '/' + language + (path.startsWith('/') ? path : '/' + path);

function preserveDestination() {
  document.querySelectorAll('a[data-lang]').forEach(link => {
    const target = new URL(link.href);
    link.href = target.pathname + location.search + location.hash;
  });
}
preserveDestination();

export function mountCase() {
  const template = document.querySelector('#case-markup');
  if (template) document.querySelector('#case-root').replaceChildren(template.content.cloneNode(true));
  preserveDestination();
}
