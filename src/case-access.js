import './case-access.css';
let openPrompt;
export function requestCaseAccess(link,event,navigate){
 try{if(sessionStorage.getItem('ndaAccess')==='true')return false;}catch{}
 if(!openPrompt)openPrompt=createPrompt(navigate);
 openPrompt(link,event);return true;
}
function createPrompt(navigateWithFade){
 const en=document.documentElement.lang==='en';
 const $=(selector,root=document)=>root.querySelector(selector);
 document.body.insertAdjacentHTML('beforeend','<dialog id="cpvt-sheet" aria-labelledby="cpvt-title"><button class="close" aria-label="Закрыть" type="button">×</button><img class="lock-icon" src="/assets/lock.svg" alt=""><h2 id="cpvt-title">Кейс спрятан под&nbsp;паролем</h2><form class="password-form" autocomplete="off" novalidate><label for="cpvt-password">Пароль для&nbsp;кейса</label><input id="cpvt-password" type="text" name="access-code" inputmode="numeric" autocomplete="one-time-code" enterkeyhint="go" autocorrect="off" data-form-type="other" data-bwignore="true" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore aria-describedby="cpvt-helper"><p class="helper" id="cpvt-helper" role="status"></p><button class="confirm" type="submit">Открыть кейс</button></form></dialog>');
 if(en){$('#cpvt-title').textContent='This case is password protected';$('#cpvt-sheet .close').setAttribute('aria-label','Close');$('#cpvt-sheet label').textContent='Case password';$('#cpvt-sheet .confirm').textContent='Open case';}
const dialog=$('#cpvt-sheet'),form=$('.password-form',dialog),input=$('#cpvt-password',dialog),helper=$('.helper',dialog);
const popover=document.createElement('div');popover.className='cpvt-password-popover';popover.hidden=true;document.body.append(popover);
input.placeholder=en?'Enter password':'Введите пароль';
const desktop=matchMedia('(min-width:1100px)');
function closePassword(){input.blur();if(dialog.open)dialog.close();popover.hidden=true;trigger?.focus({preventScroll:true});}
function syncPasswordViewport(){
 if(!dialog.open||desktop.matches)return;
 const viewport=window.visualViewport;
 dialog.style.setProperty('--sheet-viewport',`${viewport?.height??innerHeight}px`);
 dialog.style.setProperty('--sheet-keyboard',`${viewport?Math.max(0,innerHeight-viewport.height-viewport.offsetTop):0}px`);
}
window.visualViewport?.addEventListener('resize',syncPasswordViewport);
window.visualViewport?.addEventListener('scroll',syncPasswordViewport);
addEventListener('resize',syncPasswordViewport);
document.addEventListener('pointerdown',event=>{if(!popover.hidden&&!popover.contains(event.target)&&!event.target.closest('[data-project]'))closePassword();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!popover.hidden)closePassword();});
desktop.addEventListener('change',closePassword);
let destination=null,trigger=null,access=false;
try{access=sessionStorage.getItem('ndaAccess')==='true';}catch{}
function openProject(link,event){
 if(access){navigateWithFade(link.href);return;}
 destination=link.href;trigger=link;form.reset();helper.textContent='';input.removeAttribute('aria-invalid');form.classList.remove('success');
 if(desktop.matches){
  popover.append(form);popover.hidden=false;
  const r=link.getBoundingClientRect();
  popover.style.left=`${Math.max(12,Math.min(event?.detail ? event.clientX+8 : r.left+24,innerWidth-187))}px`;
  popover.style.top=`${Math.max(12,Math.min(event?.detail ? event.clientY+8 : r.top+155,innerHeight-90))}px`;
  input.focus({preventScroll:true});
 }else{
  popover.hidden=true;dialog.append(form);
  input.readOnly=true;
  dialog.showModal();
  dialog.querySelector('.close').focus({preventScroll:true});
  input.readOnly=false;
  syncPasswordViewport();
 }
}
form.addEventListener('submit',event=>{event.preventDefault();if(input.value!=='121064'){helper.textContent=en?'Incorrect password':'Пароль неверный';input.setAttribute('aria-invalid','true');input.focus();return;}access=true;try{sessionStorage.setItem('ndaAccess','true');}catch{}form.classList.add('success');helper.textContent=en?'Opening case':'Иду к\u00a0кейсу';setTimeout(()=>navigateWithFade(destination),350);});
input.addEventListener('input',()=>{helper.textContent='';input.removeAttribute('aria-invalid');});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{input.blur();dialog.style.removeProperty('--sheet-keyboard');dialog.style.removeProperty('--sheet-viewport');trigger?.focus({preventScroll:true});});

return openProject;
}
