import {beginAboutReveal} from './about-reveal.js';

export function initAboutDialog() {
  const dialog=document.querySelector('.about-dialog');
  const handle=dialog.querySelector('.about-sheet-handle');
  const scroller=dialog.querySelector('.about-dialog-scroll');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let trigger,scrollY=0,closing=false,drag=null,backdropDown=false,cancelReveal,previousOverflow='';
  const announce=open=>document.dispatchEvent(new CustomEvent('about:modal',{detail:{open}}));
  async function close() {
    if(!dialog.open||closing)return;
    closing=true;
    // Stop pending reveal stages immediately, including a close during the flight.
    cancelReveal?.();cancelReveal=null;
    if(!reduced.matches){
      const mobile=matchMedia('(max-width:700px)').matches;
      await dialog.animate([{opacity:1,transform:getComputedStyle(dialog).transform},{opacity:0,transform:mobile?'translateY(60px)':'scale(.96)'}],{duration:180,easing:'ease-in',fill:'forwards'}).finished;
    }
    dialog.close();
  }
  dialog.addEventListener('close',()=>{
    cancelReveal?.();cancelReveal=null;
    dialog.getAnimations().forEach(a=>a.cancel());
    dialog.style.transform='';
    document.documentElement.style.overflow=previousOverflow;
    window.scrollTo({top:scrollY,behavior:'instant'});
    closing=false;drag=null;
    dialog.classList.remove('is-sequencing','is-revealed');
    dialog.querySelector('.about-dialog-flight')?.remove();
    document.querySelectorAll('.about-card').forEach(card=>card.style.visibility='');
    document.querySelectorAll('.about-card-face').forEach(face=>face.getAnimations().forEach(animation=>animation.cancel()));
    announce(false);
    trigger?.focus({preventScroll:true});
  });
  dialog.querySelector('.about-close').addEventListener('click',close);
  dialog.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const targets=[...dialog.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')];
    const first=targets[0],last=targets.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  const outside=e=>{const r=dialog.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
  dialog.addEventListener('pointerdown',e=>{backdropDown=e.target===dialog&&outside(e);});
  dialog.addEventListener('pointerup',e=>{if(backdropDown&&e.target===dialog&&outside(e))close();backdropDown=false;});
  // Drag the handle; scrolling the actual content stays entirely native.
  handle.addEventListener('pointerdown',e=>{
    if(!matchMedia('(max-width:700px)').matches||e.button!==0)return;
    drag={id:e.pointerId,y:e.clientY,delta:0};handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    drag.delta=Math.max(0,e.clientY-drag.y);
    dialog.style.transform='translateY('+drag.delta+'px)';
  });
  function release(e){
    if(!drag||e.pointerId!==drag.id)return;
    const dismiss=e.type!=='pointercancel'&&drag.delta>80;
    const delta=drag.delta;drag=null;
    if(dismiss)close();
    else {
      dialog.style.transform='';
      if(!reduced.matches)dialog.animate([{transform:'translateY('+delta+'px)'},{transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
    }
  }
  handle.addEventListener('pointerup',release);handle.addEventListener('pointercancel',release);
  let touchDrag=null;
  scroller.addEventListener('touchstart',e=>{
    if(e.touches.length!==1||scroller.scrollTop>0||!matchMedia('(max-width:700px)').matches||e.target.closest('a,button,input'))return;
    touchDrag={x:e.touches[0].clientX,y:e.touches[0].clientY,delta:0};
  },{passive:true});
  scroller.addEventListener('touchmove',e=>{
    if(!touchDrag)return;
    if(e.touches.length!==1){touchDrag=null;dialog.style.transform='';return;}
    const dy=e.touches[0].clientY-touchDrag.y,dx=e.touches[0].clientX-touchDrag.x;
    if(dy<0||Math.abs(dx)>Math.abs(dy)){touchDrag=null;dialog.style.transform='';return;}
    if(dy>8&&e.cancelable){e.preventDefault();touchDrag.delta=dy;dialog.style.transform='translateY('+dy+'px)';}
  },{passive:false});
  function releaseTouch(e){
    if(!touchDrag)return;
    const dismiss=e.type!=='touchcancel'&&touchDrag.delta>80;
    touchDrag=null;
    if(dismiss)close();else dialog.style.transform='';
  }
  scroller.addEventListener('touchend',releaseTouch);scroller.addEventListener('touchcancel',releaseTouch);
  return {async open(source){
    if(dialog.open)return;
    trigger=source;scrollY=window.scrollY;
    announce(true);
    previousOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    dialog.showModal();scroller.scrollTop=0;
    cancelReveal=beginAboutReveal(dialog,source,reduced);
  }};
}
