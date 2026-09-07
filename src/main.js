import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';

const projects = [
 {id:'vtb', nda:true, title:'Проектирование личного кабинета клиента ВТБ НПФ', enTitle:'Pension Fund Client Portal Redesign', description:'Спроектировала личный кабинет для 11 млн клиентов ВТБ НПФ, который помог увеличить общую сумму взносов с помощью упрощения пополнений и прогноз выплат', enDescription:'Redesigned the portal, restructuring key user flows and product logic to improve Task Success Rate across payment scenarios and create a foundation for growing recurring contributions', art:'vtb-cover.png', icon:'40-34655-imgImage4.png', url:'/cases/vtb/'},
 {id:'nspk', nda:true, title:'Аудит национальной платежной системы', enTitle:'Improving Usability for a National Payment System', description:'Предложила улучшения для B2B-платформы выпуска карт МИР, снизив количество ошибок у новых пользователей и подготовив продукт к масштабированию без необходимости ручного обучения', enDescription:'Proposed improvements to the B2B platform for issuing MIR cards, reducing errors among new users and preparing the product to scale without relying on manual training', art:'nspk-cover.png', icon:'40-34665-imgImage2.png', url:'/cases/nspk/'},
 {id:'alfa', nda:false, title:'ИИ-ассистент Альфа-Банка', enTitle:'AI Assistant for Alfa-Bank', description:'Разработала новую концепцию ИИ-ассистента Alfa 2.0, определив модель взаимодействия, логику персонализации и подход к снижению затрат на обслуживание массового сегмента.', enDescription:'Developed a new concept for the Alfa 2.0 AI assistant, defining its interaction model, personalization logic, and an approach to reducing cost-to-serve for the mass-market segment.', art:'alfa-cover.png', icon:'40-34675-imgImage3.png', url:'/cases/alfa/'},
 {id:'wasd', nda:true, title:'Редизайн онбординга в WASD', enTitle:'Onboarding Redesign at WASD', description:'Спроектировала систему активации пользователей, которая превратила линейный онбординг в механизм роста, помогая снизить отток на ранних этапах и увеличить удержание на 7-й день.', enDescription:'Designed a user activation system that transformed linear onboarding into a growth mechanism, helping reduce early-stage churn and increase D7 Retention.', art:'wasd-cover.png', icon:'40-34685-imgIcon.svg', url:'/cases/wasd/'},
];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const mobile = matchMedia('(max-width:700px)');
const reduced = matchMedia('(prefers-reduced-motion:reduce)');
let language='ru', access=false, currentForm=null, returnFocus=null, successTimer;
try { access=sessionStorage.getItem('ndaAccess')==='true'; } catch {}
const section=$('#projects');
projects.forEach((project,index)=>{
 const article=document.createElement('article');article.className=`project ${project.id}`;article.id=project.id;article.style.zIndex=index+1;
 article.innerHTML=`<div class="project-surface"><div class="project-art" aria-hidden="true"><img src="/assets/${project.art}" alt="" ${index?'loading="lazy"':''} decoding="async"></div><span class="tag">${project.nda?'NDA':'CONTEST'}</span><div class="project-copy"><div class="project-icon"><img src="/assets/${project.icon}" alt=""></div><h2>${project.title}</h2><p>${project.description}</p></div><a class="project-link" href="#${project.id}" data-project="${index}" aria-label="${project.title}"></a></div>`;
 section.append(article);
});
const cards=$$('.project');
function updateStack(){
 if(reduced.matches){cards.forEach(c=>{c.style.transform='';c.style.filter='';c.style.opacity='';});return;}
 const top=parseFloat(getComputedStyle(cards[0]).top);
 const step=cards[0].offsetHeight+(mobile.matches?12:16);
 const progress=(scrollY+top-section.offsetTop)/step;
 cards.forEach((card,i)=>{const depth=Math.max(0,Math.min(3-i,progress-i));const scale=1-depth*(mobile.matches?.025:.04);const offset=depth*(mobile.matches?14:24);card.style.transform=`translateY(${offset}px) scale(${scale})`;card.style.filter=`brightness(${1-depth*.04})`;const fade=Math.max(0,Math.min(1,(depth-.55)/.45));card.style.opacity=String(1-fade*fade*(3-2*fade));});
}
let queued=false;function scheduleStack(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;updateStack();});}
addEventListener('scroll',scheduleStack,{passive:true});addEventListener('resize',scheduleStack);reduced.addEventListener('change',scheduleStack);updateStack();
const sheet=$('#sheet'), caseDialog=$('#case-dialog');
function closeGate(restore=true){clearTimeout(successTimer);if(currentForm){currentForm.remove();currentForm=null;}if(sheet.open)sheet.close();if(restore)returnFocus?.focus({preventScroll:true});}
function showProject(index){
 const p=projects[index];closeGate(false);
 if(p.url){location.assign(p.url);return;}
 $('#case-title').textContent=language==='ru'?p.title:p.enTitle;
 $('#case-description').textContent=language==='ru'?p.description:p.enDescription;
 $('.case-note').textContent=language==='ru'?'Полный кейс можно запросить по почте.':'Request the full case study by email.';
 caseDialog.showModal();
}
function openGate(index,event){
 closeGate(false);returnFocus=event.currentTarget;
 const form=document.createElement('form');form.className='password-form';form.noValidate=true;
 form.innerHTML=`<div class="password-field"><input type="password" name="password" autocomplete="current-password" placeholder="${language==='ru'?'Введите пароль':'Enter password'}" aria-label="${language==='ru'?'Пароль для кейса':'Case study password'}" aria-describedby="password-helper"><button type="submit" aria-label="${language==='ru'?'Открыть кейс':'Open case study'}"><img src="/assets/input-imgSend1.svg" alt=""></button></div><p class="helper" id="password-helper" role="status"></p><button class="button accent sheet-confirm" type="submit">${language==='ru'?'Открыть кейс':'Open case study'}</button>`;
 currentForm=form;
 const input=$('input',form),helper=$('.helper',form),icon=$('.password-field img',form);
 if(mobile.matches){$('#sheet-title').textContent=language==='ru'?'Кейс спрятан под паролем':'This case study is password protected';$('.sheet-content').replaceChildren(form);sheet.showModal();}
 else {
 const surface=$('.project-surface',cards[index]);surface.append(form);
 const rect=surface.getBoundingClientRect(),scale=rect.width/surface.offsetWidth;
 const pointX=event.clientX||rect.left+rect.width/2,pointY=event.clientY||rect.top+rect.height/2;
 const x=Math.max(12,Math.min((pointX-rect.left)/scale,surface.offsetWidth-187));
 const minY=Math.max(12,(12-rect.top)/scale),maxY=Math.min(surface.offsetHeight-80,(innerHeight-80-rect.top)/scale);
 const y=Math.max(minY,Math.min((pointY-rect.top)/scale,maxY));
 form.style.left=`${x}px`;form.style.top=`${y}px`;form.style.transformOrigin=`${(pointX-rect.left)/scale-x}px ${(pointY-rect.top)/scale-y}px`;
 }
 input.focus({preventScroll:true});
 input.addEventListener('input',()=>{form.classList.remove('error','success');input.removeAttribute('aria-invalid');helper.textContent='';icon.src='/assets/input-imgSend1.svg';});
 form.addEventListener('submit',e=>{
 e.preventDefault();if(form.classList.contains('success'))return;
 if(input.value!=='121064'){form.classList.add('error');input.setAttribute('aria-invalid','true');helper.textContent=language==='ru'?'Пароль неверный':'Incorrect password';icon.src='/assets/input-imgWarning.svg';input.focus();return;}
 access=true;try{sessionStorage.setItem('ndaAccess','true');}catch{}
 form.classList.remove('error');form.classList.add('success');input.removeAttribute('aria-invalid');helper.textContent=language==='ru'?'Иду к кейсу':'Opening case study';icon.src='/assets/input-imgCheckmarkCircle.svg';successTimer=setTimeout(()=>showProject(index),400);
 });
}
$$('[data-project]').forEach(link=>link.addEventListener('click',function(event){
 event.preventDefault();const index=Number(this.dataset.project);
 if(projects[index].nda&&!access){
 if(this.closest('footer')&&!mobile.matches){cards[index].scrollIntoView({behavior:'instant',block:'center'});updateStack();}
 openGate(index,event);
 } else {returnFocus=this;showProject(index);}
}));
$$('dialog').forEach(dialog=>{
 $('.close',dialog).addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{const rect=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom))dialog.close();});
 dialog.addEventListener('close',()=>{if(dialog===sheet)closeGate(false);returnFocus?.focus({preventScroll:true});});
});
let touchStart;$('.sheet-handle').addEventListener('touchstart',e=>{touchStart=e.touches[0].clientY;},{passive:true});
sheet.addEventListener('touchend',e=>{if(touchStart!==undefined&&e.changedTouches[0].clientY-touchStart>60)sheet.close();touchStart=undefined;},{passive:true});
addEventListener('keydown',e=>{if(e.key==='Escape'&&currentForm&&!sheet.open)closeGate();});
document.addEventListener('pointerdown',e=>{if(currentForm&&!sheet.open&&!currentForm.contains(e.target)&&!e.target.closest('[data-project]'))closeGate(false);});
mobile.addEventListener('change',()=>closeGate());
if(window.visualViewport){const adjust=()=>{sheet.style.bottom=`${Math.max(0,innerHeight-visualViewport.height-visualViewport.offsetTop)}px`;};visualViewport.addEventListener('resize',adjust);visualViewport.addEventListener('scroll',adjust);}
let toastTimer;function notify(text){const toast=$('.toast');toast.textContent=text;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000);}
$$('[data-email]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('krawleek@yandex.ru');notify(language==='ru'?'Почта скопирована: krawleek@yandex.ru':'Email copied: krawleek@yandex.ru');}catch{location.href='mailto:krawleek@yandex.ru';}}));
$$('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
 language=button.dataset.lang;document.documentElement.lang=language;
 $$('[data-ru]').forEach(el=>{el.textContent=el.dataset[language];});
 $$('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===language)));
 projects.forEach((p,i)=>{const title=language==='ru'?p.title:p.enTitle;$('h2',cards[i]).textContent=title;$('.project-copy p',cards[i]).textContent=language==='ru'?p.description:p.enDescription;$('.project-link',cards[i]).setAttribute('aria-label',title);});
 document.title=language==='ru'?'Елена Юнг — продуктовый дизайнер':'Elena Jung — Product Designer';closeGate();
}));
const mobileNav=$('.mobile-nav'), menuToggle=$('.menu-toggle'), mobileLinks=$('#mobile-links');
function setMenu(open,restore=false){
 menuToggle.setAttribute('aria-expanded',String(open));
 menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
 $('img',menuToggle).src=open?'/assets/menu-close.svg':'/assets/menu.svg';
 mobileLinks.hidden=!open;
 if(restore)menuToggle.focus({preventScroll:true});
}
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
$$('a',mobileNav).forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('pointerdown',e=>{if(!mobileNav.contains(e.target))setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileLinks.hidden)setMenu(false,true);});
mobileNav.addEventListener('focusout',e=>{if(e.relatedTarget&&!mobileNav.contains(e.relatedTarget))setMenu(false);});
mobile.addEventListener('change',()=>setMenu(false));

const art=$('.contact-art'),tilt=$('.tilt-card');
let holdTimer,held=false,spinning=false,angle=0,speed=0,frame=0,lastTime=0,pointerId=null,startPoint=null;
function stopSpin(){
 clearTimeout(holdTimer);held=false;spinning=false;speed=0;angle=0;lastTime=0;
 cancelAnimationFrame(frame);art.classList.remove('spinning');tilt.style.transform='';
}
function animateSpin(time){
 const dt=Math.min((time-(lastTime||time))/1000,.05);lastTime=time;
 if(held)speed=Math.min(720,speed+480*dt);
 else speed*=Math.exp(-1.45*dt);
 angle+=speed*dt;
 tilt.style.transform=`rotateX(8deg) rotateY(${angle}deg) rotateZ(2deg) scale(1.015)`;
 if(!held&&speed<8){
  spinning=false;lastTime=0;art.classList.remove('spinning');
  // Settle at the nearest full turn without unwinding all previous rotations.
  tilt.style.transform=`rotateY(${Math.round(angle/360)*360}deg)`;
  return;
 }
 frame=requestAnimationFrame(animateSpin);
}
function beginHold(){
 if(reduced.matches)return;
 clearTimeout(holdTimer);
 holdTimer=setTimeout(()=>{
  held=true;
  if(!spinning){angle=0;speed=100;spinning=true;lastTime=0;art.classList.add('spinning');frame=requestAnimationFrame(animateSpin);}
 },280);
}
function releaseHold(){clearTimeout(holdTimer);held=false;pointerId=null;startPoint=null;}
art.addEventListener('pointerdown',event=>{
 if(event.button!==0||reduced.matches)return;
 pointerId=event.pointerId;startPoint={x:event.clientX,y:event.clientY};
 art.setPointerCapture(event.pointerId);beginHold();
});
art.addEventListener('pointermove',event=>{
 if(pointerId!==null){
  if(event.pointerType!=='mouse'&&startPoint&&Math.hypot(event.clientX-startPoint.x,event.clientY-startPoint.y)>12)releaseHold();
  return;
 }
 if(event.pointerType!=='mouse'||reduced.matches||spinning)return;
 const r=art.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
 tilt.style.transform=`rotateX(${-y*20}deg) rotateY(${x*20}deg) rotateZ(${x*4}deg) translateY(-4px) scale(1.015)`;
});
art.addEventListener('pointerup',releaseHold);
art.addEventListener('pointercancel',releaseHold);
art.addEventListener('lostpointercapture',releaseHold);
art.addEventListener('pointerleave',()=>{if(!spinning&&pointerId===null)tilt.style.transform='';});
art.addEventListener('contextmenu',event=>event.preventDefault());
art.addEventListener('keydown',event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();if(!event.repeat)beginHold();}});
art.addEventListener('keyup',event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();releaseHold();}});
art.addEventListener('blur',releaseHold);
window.addEventListener('blur',releaseHold);
reduced.addEventListener('change',()=>{if(reduced.matches)stopSpin();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSpin();});

import './background-interactions.js';

// Direct case links reuse the same session-wide NDA gate on the home page.
const requestedCase=new URLSearchParams(location.search).get('case');
const requestedIndex=projects.findIndex(project=>project.id===requestedCase);
if(requestedIndex!==-1){
 history.replaceState(null,'',location.pathname+location.hash);
 requestAnimationFrame(()=>{
  const card=cards[requestedIndex];
  const top=parseFloat(getComputedStyle(card).top)||64;
  window.scrollTo({top:section.offsetTop+requestedIndex*(card.offsetHeight+(mobile.matches?12:16))-top,behavior:'instant'});
  updateStack();
  $('.project-link',card).click();
 });
}
