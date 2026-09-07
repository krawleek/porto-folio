export function initCaseMenu(){
const $=(s,r=document)=>r.querySelector(s);
const menu=$('.mobile-nav'),toggle=$('.menu-toggle'),links=$('#mobile-links');
function setMenu(open,focus=false){toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');$('img',toggle).src=open?'/assets/menu-close.svg':'/assets/menu.svg';links.hidden=!open;if(focus)toggle.focus();}
toggle.addEventListener('click',()=>setMenu(links.hidden));
document.addEventListener('pointerdown',e=>{if(!menu.contains(e.target))setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!links.hidden)setMenu(false,true);});
menu.addEventListener('focusout',e=>{if(e.relatedTarget&&!menu.contains(e.relatedTarget))setMenu(false);});
matchMedia('(max-width:700px)').addEventListener('change',()=>setMenu(false));

}
