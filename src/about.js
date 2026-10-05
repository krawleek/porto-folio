import {language} from './page-language.js';
import './smooth-scroll.js';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './main.css';
import './about.css';
import {messageSurface} from './message-surface.js';
import {mountBilliards} from './billiards.js';
import './background-interactions.js';
import {enableBoardDrag} from './board-drag.js';

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],en=language==='en';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const board=$('.map-board'),svg=$('.connectors');
function drawConnectors(){
 if(innerWidth<1100||(board.dataset.section&&board.dataset.section!=='about'))return;
 const b=board.getBoundingClientRect();
 const point=(selector,side)=>{const r=$(selector).getBoundingClientRect();return {x:(side==='right'?r.right:r.left)-b.left,y:r.top+r.height/2-b.top};};
 const root=point('.profile','right'),work=point('.projects-link','left'),photo=point('.cat-photo','left');
 const curves=[`M${root.x},${root.y} C${root.x+90},${root.y} ${work.x-80},${work.y} ${work.x},${work.y}`,`M${root.x},${root.y} C${root.x+100},${root.y} ${photo.x-90},${photo.y} ${photo.x},${photo.y}`];
 svg.setAttribute('viewBox',`0 0 ${b.width} ${b.height}`);svg.innerHTML=curves.map(d=>`<path d="${d}"/>`).join('')+[root,work,photo].map(p=>`<circle cx="${p.x}" cy="${p.y}" r="2.5"/>`).join('');
}
addEventListener('section-position-restored',drawConnectors);
addEventListener('board-drag',drawConnectors);
const connectorObserver=new ResizeObserver(drawConnectors);
[board,$('.profile')].forEach(element=>connectorObserver.observe(element));document.fonts.ready.then(drawConnectors);
let toastTimer;
function notify(text){$('.toast').textContent=text;$('.toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').classList.remove('visible'),2800);}
if(!$('[data-email]').dataset.emailBound)$('[data-email]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('krawleek@yandex.ru');notify(en?'Email copied: krawleek@yandex.ru':'Почта скопирована: krawleek@yandex.ru');}catch{location.href='mailto:krawleek@yandex.ru';}});
$('[data-email]').dataset.emailBound='true';
function setFact(button,open){button.setAttribute('aria-expanded',String(open));document.getElementById(button.getAttribute('aria-controls')).hidden=!open;}
function closeFacts(except){$$('[data-fact]').forEach(button=>{if(button!==except)setFact(button,false);});}
$$('[data-fact]').forEach(button=>{
 const item=button.closest('.fact-item'),note=document.getElementById(button.getAttribute('aria-controls'));
 const hover=['education','mentoring','challenges'].includes(button.dataset.fact);
 function follow(event){
  if(!hover||event.pointerType!=='mouse')return;
  closeFacts(button);setFact(button,true);note.classList.add('cursor-note');
  const x=Math.min(event.clientX+14,innerWidth-note.offsetWidth-12),y=Math.min(event.clientY+20,innerHeight-note.offsetHeight-12);
  note.style.setProperty('--note-x',`${Math.max(12,x)}px`);note.style.setProperty('--note-y',`${Math.max(12,y)}px`);
 }
 button.addEventListener('pointerenter',follow);button.addEventListener('pointermove',follow);
 button.addEventListener('pointerleave',event=>{if(hover&&event.pointerType==='mouse'){setFact(button,false);note.classList.remove('cursor-note');}});
 button.addEventListener('click',event=>{if(button.dataset.dragged==='true'){button.dataset.dragged='false';return;}if(hover&&event.pointerType==='mouse')return;note.classList.remove('cursor-note');const open=button.getAttribute('aria-expanded')!=='true';closeFacts(button);setFact(button,open);});
 button.addEventListener('focus',()=>{if(!button.matches(':focus-visible'))return;note.classList.remove('cursor-note');closeFacts(button);setFact(button,true);});
 button.addEventListener('blur',()=>setFact(button,false));
});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.fact-item'))closeFacts();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeFacts();closeMessage();}});

enableBoardDrag(board,'.education-fact .fact-trigger, .mentoring-fact .fact-trigger, .challenge-fact .fact-trigger, .photo, .writing-icons, .p5-mark, .projects-link, .photography-copy, .post, .ball-play, .message-invite, .trophy, .selected',drawConnectors);
const sticker=$('.home-sticker .fact-trigger');sticker.setAttribute('aria-describedby','sticker-help');
let drag=null,offset={x:0,y:0};
function placeSticker(x,y){const base=$('.home-sticker').getBoundingClientRect(),area=board.getBoundingClientRect();offset={x:Math.max(area.left-base.left,Math.min(x,area.right-base.left-sticker.offsetWidth)),y:Math.max(area.top-base.top,Math.min(y,area.bottom-base.top-sticker.offsetHeight))};for(const [axis,value] of Object.entries(offset))$('.home-sticker').style.setProperty(`--drag-${axis}`,`${value}px`);}
sticker.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,x:offset.x,y:offset.y,active:false};sticker.setPointerCapture(event.pointerId);});
sticker.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;if(!drag.active){if(Math.hypot(dx,dy)<8)return;if(event.pointerType==='touch'&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}drag.active=true;closeFacts();sticker.classList.add('is-dragging');}placeSticker(drag.x+dx,drag.y+dy);});
function release(){if(drag?.active)sticker.dataset.dragged='true';sticker.classList.remove('is-dragging');drag=null;}
sticker.addEventListener('pointerup',release);sticker.addEventListener('pointercancel',release);sticker.addEventListener('lostpointercapture',release);
sticker.addEventListener('keydown',event=>{const directions={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]};if(directions[event.key]){event.preventDefault();const [x,y]=directions[event.key];placeSticker(offset.x+x,offset.y+y);}if(event.key==='Escape')placeSticker(0,0);});
addEventListener('resize',()=>placeSticker(0,0));

const viewer=$('.photo-viewer');let photoTrigger;
$$('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoTrigger=button;const target=viewer.querySelector('img');target.src=button.querySelector('img').src;target.alt=button.getAttribute('aria-label');viewer.showModal();}));
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
viewer.addEventListener('close',()=>photoTrigger?.focus({preventScroll:true}));

const toggle=$('.message-toggle'),form=$('#message-form');
const surface=messageSurface(form,toggle,en);
function closeMessage(){surface.close();}
toggle.addEventListener('click',()=>{if(form.hidden||toggle.getAttribute('aria-expanded')==='false')surface.open();else surface.close();});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('.message-invite'))closeMessage();});
form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const message=$('#message').value.trim();if(!message)return;
 const send=form.querySelector('.message-send'),status=form.querySelector('.message-status');if(send.disabled)return;send.disabled=true;status.textContent=en?'Sending…':'Отправляю…';
 try{
  const response=await fetch('/api/letters.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,language,website:form.elements.website.value})});
  if(!response.ok)throw new Error(response.status===429?'rate':'server');
  const result=await response.json();if(!result.ok)throw new Error('server');
  form.reset();status.textContent='';await surface.sent();
 }catch(error){status.textContent=error.message==='rate'?(en?'Please wait a minute before sending again.':'Подождите минуту перед следующим сообщением.'):(en?'Could not send. Your text is saved here; please try again.':'Не удалось отправить. Текст сохранён в поле — попробуйте ещё раз.');}
 finally{send.disabled=false;}
});
form.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key==='Enter'){event.preventDefault();form.requestSubmit();}});

mountBilliards(en);
