import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';
import './about.css';
import {caseHeader} from './case-shell.js';
import {initCaseMenu} from './case-menu.js';
import {topics} from './about-data.js';
import {initAboutMotion} from './about-motion.js';
import {initAboutDialog} from './about-dialog.js';

const english = [
  ['Mentoring', 'I mentor early-career designers through Women in Tech, a programme I once joined as a mentee. Helping others grow matters to me, so I also take on mentoring and professional development responsibilities within my teams.'],
  ['Challenges', 'I enjoy situations where I need to learn something new quickly, so I regularly take part in hackathons and design competitions. The Telegram competition pushed me to explore UI animation in After Effects, and I won the Alfa Bank competition on my third attempt.'],
  ['Photography', 'I take photographs and explore street and documentary photography. Lately, I have been trying new formats: shooting on Polaroid and being photographed myself to better understand the experience on the other side of the lens.'],
  ['Thoughts into words', 'For the past two years, I have run a Telegram channel about the systems behind everyday things and how technology, products, culture and economics shape our behaviour. Together with 600+ readers, I question what seems obvious and explore why familiar things work the way they do. Here are a few posts to start with:'],
  ['Education', 'I graduated from the HSE School of Design, part of a university ranked among the world’s top 200 in QS. Its project-based approach taught me to see design beyond the interface: combining research, systems thinking and product development to tackle real industry challenges.'],
  ['Research', 'My interest in research goes beyond UX. I have studied the impact of AI on the creative industries, presented my work at academic conferences, and explored Responsible AI as an approach to developing technology.'],
];
topics.forEach((topic, i) => { topic.en = {title: english[i][0], body: english[i][1]}; });
const asset = id => '/assets/about/'+id+({research:'.jpg',challenges:'.png',photography:'.png',education:'.png'}[id]||'.webp');
const posts = [
  {id:'ai', url:'450', ru:'Прочитала D&AD AI & Creativity Report', en:'Reading the D&AD AI & Creativity Report'},
  {id:'enshittification', url:'448', ru:'Дерьмофикация как бизнес-модель', en:'Enshittification as a business model'},
  {id:'shopping', url:'412', ru:'Эпоха shopper-tainment', en:'The age of shopper-tainment'},
  {id:'museum', url:'431', ru:'Музей плохого искусства', en:'The Museum of Bad Art'},
];
const copy = {
  ru: {
    name:'Елена Юнг',
    intro:'Дизайнер продуктов с 5-летним опытом поиска и решения проблем. Я опираюсь на исследования и продуктовый подход, чтобы найти вещи, на которые действительно стоит тратить ресурсы.',
    curiosity:'В мире, где все решают проблемы, мне интереснее их находить',
    approach:'Моя сильная сторона — любопытство. Я ставлю под сомнение очевидное, разбираюсь, как всё устроено, и ищу то, что другие могли не заметить.',
    beyond:'Вне работы',
    interests:'Любопытство определяет не только то, как я работаю, но и то, как учусь, преподаю и исследую новое. Здесь — проекты, эксперименты и интересы, которые сформировали меня как дизайнера и которыми я занимаюсь сейчас.',
    cv:'Резюме', email:'Моя почта', telegram:'Телеграм', skip:'К карточкам', close:'Закрыть', copied:'Почта скопирована', about:'ОБО МНЕ', cases:'ПРОЕКТЫ', contacts:'КОНТАКТЫ',
  },
  en: {
    name:'Elena Jung',
    intro:'Product designer with 5 years of experience spotting the right problems before solving them. I use research and product thinking to decide what’s worth fixing — lately in B2C fintech.',
    curiosity:'In a world of problem solvers, I’m more interested in finding problems',
    approach:'Curiosity is my strength. I question the obvious, explore how things work, and look for what others may have missed.',
    beyond:'Beyond the day job',
    interests:'Curiosity shapes how I work, learn, teach, and explore beyond my day-to-day projects. Here are a few things that have shaped the designer I am today — and what I’m exploring next.',
    cv:'See my CV', email:'Email me', telegram:'Telegram', skip:'Explore the cards', close:'Close', copied:'Email copied', about:'ABOUT', cases:'CASES', contacts:'CONTACTS',
  },
};
const icon = name => '<img src="/assets/about/324-47132-img'+name+'.svg" alt="">';
const emailButton = () => '<button class="button accent" data-email><span data-copy="email"></span>'+icon('Mail')+'</button>';
const social = (label,url) => '<a class="button accent" href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+icon('Share')+'</a>';
document.querySelector('#about-root').innerHTML = caseHeader + `
  <div class="language about-language" aria-label="Язык / Language"><button data-lang="ru" aria-pressed="true">RU</button><span>/</span><button data-lang="en" aria-pressed="false">ENG</button></div>
  <a class="skip about-skip" href="#interests" data-copy="skip"></a>
  <main class="about-story">
    <div class="about-scene">
      <section class="about-copy about-intro" data-state="0">
        <h1 data-copy="name"></h1><p data-copy="intro"></p>
        <div class="about-actions"><a class="button" href="https://drive.google.com/file/d/1qsyQjOanp0wfC4tIxmQE_1zLL-KeoP91/view?usp=sharing" target="_blank" rel="noopener noreferrer"><span data-copy="cv"></span>${icon('File')}</a>${emailButton()}${social('<span data-copy="telegram"></span>','https://t.me/krawleek')}</div>
      </section>
      <section class="about-copy about-curiosity" data-state="1" aria-hidden="true" inert>
        <h2 data-copy="curiosity"></h2><p data-copy="approach"></p>
      </section>
      <section class="about-copy about-interests" id="interests" data-state="2" aria-hidden="true" inert>
        <h2 data-copy="beyond"></h2><p data-copy="interests"></p>
        <div class="about-actions">${emailButton()}${social('LinkedIn','https://www.linkedin.com/in/krawleek/')}${social('Telegram','https://t.me/krawleek')}</div>
      </section>
      <div class="about-cards" aria-label="Интересы / Interests">
        ${topics.map((topic,i)=>`<button class="about-card" data-topic="${topic.id}" aria-haspopup="dialog" tabindex="-1" disabled style="--card-order:${i}"><span class="about-card-face"><img src="${asset(topic.id)}" alt="" draggable="false"></span></button>`).join('')}
      </div>
    </div>
  </main>
  <dialog class="about-dialog" aria-labelledby="about-dialog-title">
    <div class="about-sheet-handle" aria-hidden="true"><span></span></div>
    <button class="about-close" type="button" autofocus><img src="/assets/about/324-53483-imgClose.svg" alt=""></button>
    <div class="about-dialog-scroll"><div class="about-dialog-content"></div></div>
  </dialog>
  <div class="toast" role="status" aria-live="polite"></div>
`;
initCaseMenu();
let lang = 'ru';
const modal = initAboutDialog();
const motion = initAboutMotion();
function setLanguage(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.title = lang === 'ru' ? 'Обо мне — Елена Юнг' : 'About — Elena Jung';
  document.querySelectorAll('[data-copy]').forEach(el => {el.textContent = copy[lang][el.dataset.copy];});
  document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === lang)));
  document.querySelectorAll('header a:not(.mobile-brand)').forEach(el => {
    const key = el.getAttribute('href') === '/about/' ? 'about' : el.hash === '#projects' ? 'cases' : 'contacts';
    el.textContent = copy[lang][key];
    if (key === 'about') el.setAttribute('aria-current','page');
  });
  topics.forEach(topic => {
    const card = document.querySelector('[data-topic="'+topic.id+'"]');
    card.setAttribute('aria-label',topic[lang].title);

  });
  document.querySelector('.about-close').setAttribute('aria-label',copy[lang].close);
  motion.refresh();
}
document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click',() => setLanguage(el.dataset.lang)));
document.querySelectorAll('[data-topic]').forEach(card => card.addEventListener('click',() => {
  const topic = topics.find(item => item.id === card.dataset.topic);
  const text = topic[lang];
  const content = document.querySelector('.about-dialog-content');
  content.classList.toggle('is-writing', topic.id === 'writing');
  content.classList.toggle('is-photography', topic.id === 'photography');
  // Text comes from the local copy data; use textContent for prose.
  content.replaceChildren();
  if (topic.id !== 'writing') {
    const img = document.createElement('img'); img.className = 'about-dialog-art'; img.src = asset(topic.id); img.alt = text.title;
    content.append(img);
  }
  const prose = document.createElement('div'); prose.className = 'about-dialog-prose';
  const heading = document.createElement('h2'); heading.id = 'about-dialog-title'; heading.textContent = text.title;
  const body = document.createElement('p'); body.textContent = text.body;
  prose.append(heading,body); content.append(prose);
  if (topic.id === 'writing') {
    const list = document.createElement('div'); list.className = 'about-posts';
    posts.forEach(post => {
      const a = document.createElement('a'); a.href = 'https://t.me/eenache/'+post.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      const title = document.createElement('h3'); title.textContent = post[lang];
      const img = document.createElement('img'); img.src = '/assets/about/post-'+post.id+'.webp'; img.alt = '';
      a.append(title,img); list.append(a);
    });
    content.append(list);
  }
  modal.open(card);
}));
let toastTimer;
document.querySelectorAll('[data-email]').forEach(button => button.addEventListener('click',async () => {
  try {
    await navigator.clipboard.writeText('krawleek@yandex.ru');
    const toast = document.querySelector('.toast'); toast.textContent = copy[lang].copied; toast.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove('visible'),2400);
  } catch { location.href = 'mailto:krawleek@yandex.ru'; }
}));
document.querySelector('.about-skip').addEventListener('click',e => {e.preventDefault();motion.toCards();});
setLanguage(lang);
document.fonts.ready.then(()=>motion.refresh());

import('./background-interactions.js');
