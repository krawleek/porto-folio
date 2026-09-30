import {language} from './page-language.js';
import {navigateWithFade} from './page-motion.js';
import './smooth-scroll.js';
import './background-interactions.js';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './main.css';
import {enableBoardDrag} from './board-drag.js';
import {cutoutCards} from './cutout-cards.js';
cutoutCards();

const $=s=>document.querySelector(s);
const en=language==='en';
const board=$('.map-board'),svg=$('.connectors');
function drawConnectors(){
 if(innerWidth<1100)return;
 const b=board.getBoundingClientRect();
 const point=(selector,side)=>{const r=$(selector).getBoundingClientRect();return {x:(side==='left'?r.left:side==='right'?r.right:r.left+r.width/2)-b.left,y:(side==='top'?r.top:side==='bottom'?r.bottom:r.top+r.height/2)-b.top};};
 const root=point('.profile','right'),work=point('.projects-link','bottom'),about=point('.about-link','left'),left=point('.projects-link','left'),right=point('.projects-link','right'),tool=point('.toolbox','bottom'),top=point('.projects-link','top');
 const curves=[`M${root.x},${root.y} C${root.x+85},${root.y} ${about.x-80},${about.y} ${about.x},${about.y}`,`M${root.x},${root.y} C${root.x+75},${root.y} ${left.x-60},${left.y} ${left.x},${left.y}`,`M${tool.x},${tool.y} C${tool.x},${tool.y+36} ${top.x},${top.y-36} ${top.x},${top.y}`];
 const dots=[root,about,left,right,tool,top,work];
 const vtb=point('.vtb','left');vtb.y=$('.vtb').getBoundingClientRect().top-b.top+90.5;
 curves.push(`M${right.x},${right.y} C${right.x+95},${right.y} ${vtb.x-100},${vtb.y} ${vtb.x},${vtb.y}`);
 for(const selector of ['.wasd','.nspk','.alfa']){const end=point(selector,'top');curves.push(`M${work.x},${work.y} C${work.x},${work.y+210} ${end.x},${end.y-210} ${end.x},${end.y}`);dots.push(end);}
 svg.setAttribute('viewBox',`0 0 ${b.width} ${b.height}`);
 svg.innerHTML=curves.map(d=>`<path d="${d}"/>`).join('')+dots.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="2.5"/>`).join('');
}
enableBoardDrag(board,'.project, .badge, .deposit, .cat, .about-link, .projects-link, .toolbox, .facts, .selected, .guestbook',drawConnectors);
const connectorObserver=new ResizeObserver(drawConnectors);
[board,$('.profile')].forEach(element=>connectorObserver.observe(element));document.fonts.ready.then(drawConnectors);

const dialog=$('#sheet'),form=$('.password-form'),input=$('#case-password'),helper=$('.helper');
const popover=document.createElement('div');popover.className='password-popover';popover.hidden=true;document.body.append(popover);
input.placeholder=en?'Enter password':'Введите пароль';
const desktop=matchMedia('(min-width:1100px)');
function closePassword(){if(dialog.open)dialog.close();popover.hidden=true;trigger?.focus({preventScroll:true});}
document.addEventListener('pointerdown',event=>{if(!popover.hidden&&!popover.contains(event.target)&&!event.target.closest('[data-project]'))closePassword();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!popover.hidden)closePassword();});
desktop.addEventListener('change',closePassword);
let destination=null,trigger=null,access=false;
try{access=sessionStorage.getItem('ndaAccess')==='true';}catch{}
function openProject(link,event){
 if(link.closest('.project').dataset.nda!=='true'||access){navigateWithFade(link.href);return;}
 destination=link.href;trigger=link;form.reset();helper.textContent='';input.removeAttribute('aria-invalid');form.classList.remove('success');
 if(desktop.matches){
  popover.append(form);popover.hidden=false;
  const r=link.getBoundingClientRect();
  popover.style.left=`${Math.max(12,Math.min(event?.detail ? event.clientX+8 : r.left+24,innerWidth-187))}px`;
  popover.style.top=`${Math.max(12,Math.min(event?.detail ? event.clientY+8 : r.top+155,innerHeight-90))}px`;
 }else{popover.hidden=true;dialog.append(form);dialog.showModal();}
 input.focus({preventScroll:true});
}
document.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();openProject(link,event);}));
form.addEventListener('submit',event=>{event.preventDefault();if(input.value!=='121064'){helper.textContent=en?'Incorrect password':'Пароль неверный';input.setAttribute('aria-invalid','true');input.focus();return;}access=true;try{sessionStorage.setItem('ndaAccess','true');}catch{}form.classList.add('success');helper.textContent=en?'Opening case':'Иду к кейсу';setTimeout(()=>navigateWithFade(destination),350);});
input.addEventListener('input',()=>{helper.textContent='';input.removeAttribute('aria-invalid');});
$('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>trigger?.focus({preventScroll:true}));
const requested=new URLSearchParams(location.search).get('case');
if(['vtb','nspk','wasd','alfa'].includes(requested)){history.replaceState(null,'',location.pathname+location.hash);openProject($(`#${requested} .project-link`));}
let toastTimer;
$('[data-email]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('krawleek@yandex.ru');const toast=$('.toast');toast.textContent=en?'Email copied: krawleek@yandex.ru':'Почта скопирована: krawleek@yandex.ru';toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000);}catch{location.href='mailto:krawleek@yandex.ru';}});
// The static site stores this lightweight guestbook locally, across both languages.
let likes=0;try{likes=Math.max(0,parseInt(localStorage.getItem('portfolio-likes'),10)||0);}catch{}
$('.like-count').textContent=likes;
let voted=false;try{voted=sessionStorage.getItem('portfolio-voted')==='true';}catch{}
const likeButton=$('.like-button');
function showVote(){likeButton.disabled=voted;likeButton.setAttribute('aria-pressed',String(voted));}
showVote();likeButton.addEventListener('click',()=>{if(voted)return;voted=true;likes++;$('.like-count').textContent=likes;showVote();try{localStorage.setItem('portfolio-likes',String(likes));sessionStorage.setItem('portfolio-voted','true');}catch{}});
