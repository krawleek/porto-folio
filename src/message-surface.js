export function messageSurface(form,toggle,en){
 const editor=document.createElement('div');editor.className='message-editor';
 while(form.firstChild)editor.append(form.firstChild);form.append(editor);
 const success=document.createElement('div');success.className='message-success';success.hidden=true;success.tabIndex=-1;success.setAttribute('role','status');
 success.innerHTML=`<svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5"/><path d="m9 16 5 5 9-10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><strong>${en?'Message sent':'Сообщение отправлено'}</strong><p>${en?'Thank you for writing!':'Спасибо, что написали!'}</p><button type="button">${en?'Done':'Готово'}</button>`;
 form.append(success);let animation=null,version=0;
 const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
 async function morph(change){
  const id=++version;animation?.cancel();const before=form.getBoundingClientRect().height;change();const after=form.getBoundingClientRect().height;
  if(reduced())return;
  animation=form.animate([{height:`${before}px`},{height:`${after}px`}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'});
  await animation.finished.catch(()=>{});if(id===version)animation=null;
 }
 function open(){++version;animation?.cancel();editor.hidden=false;success.hidden=true;form.classList.remove('is-success');form.hidden=false;toggle.setAttribute('aria-expanded','true');if(!reduced())form.animate([{opacity:0,scale:'.96'},{opacity:1,scale:'1'}],{duration:240,easing:'ease-out'});form.querySelector('textarea').focus({preventScroll:true});}
 async function close(){if(form.hidden)return;const id=++version;animation?.cancel();toggle.setAttribute('aria-expanded','false');if(!reduced()){animation=form.animate([{opacity:1,scale:'1'},{opacity:0,scale:'.96'}],{duration:180,easing:'ease-in',fill:'forwards'});await animation.finished.catch(()=>{});}if(id!==version)return;form.hidden=true;animation?.cancel();animation=null;}
 async function sent(){if(form.hidden)return;await morph(()=>{editor.hidden=true;success.hidden=false;form.classList.add('is-success');});if(!form.hidden){success.focus({preventScroll:true});if(!reduced())success.animate([{opacity:0},{opacity:1}],{duration:220});}}
 success.querySelector('button').addEventListener('click',()=>{close();toggle.focus({preventScroll:true});});
 return{open,close,sent};
}
