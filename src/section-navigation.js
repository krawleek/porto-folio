import './about.css';
const board=document.querySelector('.map-board');
const language=document.documentElement.lang;
const sectionFor=path=>path.includes('/about/')?'about':'main';
let current=sectionFor(location.pathname),busy=false,queued=null;
board.dataset.section=current;
// Keep shared board labels mounted and outside section fade animations.
const sections=new Map(),shared='.profile,.board-navigation,.connectors,.facts,.selected';
function register(section,elements){elements.forEach(el=>{el.dataset.boardSection=section;});sections.set(section,elements);}
register(current,[...board.children].filter(el=>!el.matches(shared)));
const titles=new Map([[current,document.title]]);
const pending=new Map();
async function prepare(section){
 if(sections.has(section))return;
 if(pending.has(section))return pending.get(section);
 const task=(async()=>{
  const response=await fetch(`/${language}/${section==='about'?'about/':''}`);if(!response.ok)throw Error('section');
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');
  const source=doc.querySelector('.map-board');if(!source)throw Error('section');
  const elements=[...source.children].filter(el=>!el.matches(shared));
  for(const el of elements){el.hidden=true;board.append(document.adoptNode(el));}
  register(section,elements);titles.set(section,doc.title);
  for(const dialog of doc.querySelectorAll('body > dialog'))document.body.append(document.adoptNode(dialog));
  await Promise.allSettled(elements.flatMap(el=>[...el.querySelectorAll('img')]).map(img=>img.decode()));
 })();pending.set(section,task);
 try{await task;}catch(error){pending.delete(section);throw error;}
}
export async function switchSection(href,{history=true}={}){
 const url=new URL(href,location.href),next=sectionFor(url.pathname);
 if(busy){queued={href,history};return;}
 if(next===current)return;busy=true;
 try{
  await prepare(next);
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const outgoing=sections.get(current),incoming=sections.get(next),scroll=scrollY;
  const fade=(elements,from,to,duration)=>Promise.all(elements.filter(el=>!el.hidden).map(el=>el.animate([{opacity:from},{opacity:to}],{duration:reduced?0:duration,easing:'ease-in-out',fill:'forwards'}).finished.catch(()=>{})));
  board.style.minHeight=`${Math.max(board.offsetHeight,scroll+innerHeight-board.offsetTop)}px`;
  document.querySelectorAll('.fact-note').forEach(note=>note.hidden=true);
  document.querySelectorAll('[data-fact]').forEach(button=>button.setAttribute('aria-expanded','false'));
  const form=document.querySelector('#message-form');if(form){form.hidden=true;document.querySelector('.message-toggle').setAttribute('aria-expanded','false');}
  outgoing.forEach(el=>el.inert=true);
  await fade([...outgoing,board.querySelector('.connectors')],1,0,180);
  outgoing.forEach(el=>{el.hidden=true;el.getAnimations().forEach(a=>a.cancel());});
  board.dataset.section=next;board.classList.toggle('about-board',next==='about');document.body.classList.toggle('about-page',next==='about');
  incoming.forEach(el=>{el.inert=true;el.style.opacity='0';el.hidden=false;});
  if(next==='about')await import('./about.js');else await import('./main.js');
  current=next;
  document.title=titles.get(next);
  if(history)window.history.pushState({section:next},'',url.pathname);
  document.querySelector('.about-link').href=`/${language}/about/`;
  document.querySelector('.projects-link').href=`/${language}/#projects`;
  for(const [selector,active] of [['.about-link',next==='about'],['.projects-link',next==='main']]){const el=document.querySelector(selector);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');}
  document.querySelectorAll('[data-lang]').forEach(link=>link.href=`/${link.dataset.lang}/${next==='about'?'about/':''}`);
  dispatchEvent(new Event('section-position-restored'));
  scrollTo({top:scroll,behavior:'instant'});
  const connectors=board.querySelector('.connectors');connectors.getAnimations().forEach(a=>a.cancel());
  await fade([...incoming,connectors],0,1,300);
  incoming.forEach(el=>{el.inert=false;el.style.opacity='';el.getAnimations().forEach(a=>a.cancel());});connectors.getAnimations().forEach(a=>a.cancel());
  board.style.minHeight=`${Math.max(0,scroll+innerHeight-board.offsetTop)}px`;
 }catch(error){console.error('Section navigation failed',error);location.assign(url.href);}
 finally{busy=false;if(queued){const request=queued;queued=null;switchSection(request.href,{history:request.history});}}
}
addEventListener('popstate',()=>{if(/^\/(ru|en)\/(about\/)?$/.test(location.pathname))switchSection(location.href,{history:false});});
// Warm the other section on intent; the existing card remains fully interactive.
for(const link of document.querySelectorAll('.board-navigation a'))link.addEventListener('pointerenter',()=>prepare(sectionFor(new URL(link.href).pathname)).catch(()=>{}),{once:true});
