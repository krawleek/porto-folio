import {loadImages} from './image-loading.js';
export function initCaseCarousel(carousel){
const $=s=>carousel.querySelector(s),$$=s=>[...carousel.querySelectorAll(s)];
const viewport=$('.carousel-viewport'),track=$('.carousel-track'),dots=$$('[data-slide]');
const reduce=matchMedia('(prefers-reduced-motion:reduce)');
let current=0,timer=null,paused=reduce.matches,hover=false,focused=false,visible=false,gesture=null,request=0;
function schedule(){clearTimeout(timer);if(!paused&&!hover&&!focused&&visible&&!document.hidden)timer=setTimeout(()=>{show(current+1);},5000);}
async function show(index,manual=false){
 const next=(index+dots.length)%dots.length,token=++request;
 clearTimeout(timer);
 await loadImages($$('.carousel-slide')[next]);
 if(token!==request)return;
 current=next;track.style.transform=`translateX(-${current*100}%)`;
 dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));
 $$('.carousel-slide').forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==current)));
 if(manual)$('.carousel-status').textContent=document.documentElement.lang==='en'?`Slide ${current+1} of ${dots.length}`:`Слайд ${current+1} из ${dots.length}`;
 if(visible)loadImages($$('.carousel-slide')[(current+1)%dots.length]);
 schedule();
}
$('.carousel-prev').addEventListener('click',()=>show(current-1,true));$('.carousel-next').addEventListener('click',()=>show(current+1,true));
dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.slide),true)));
carousel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;schedule();}});carousel.addEventListener('pointerleave',()=>{hover=false;schedule();});
carousel.addEventListener('focusin',()=>{focused=true;schedule();});carousel.addEventListener('focusout',()=>queueMicrotask(()=>{focused=carousel.contains(document.activeElement);schedule();}));
viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1),true);}});
viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;gesture={id:e.pointerId,x:e.clientX,y:e.clientY};viewport.setPointerCapture(e.pointerId);});
viewport.addEventListener('pointerup',e=>{if(!gesture||gesture.id!==e.pointerId)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))show(current+(dx<0?1:-1),true);gesture=null;});
viewport.addEventListener('pointercancel',()=>gesture=null);viewport.addEventListener('dragstart',e=>e.preventDefault());
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){loadImages($$('.carousel-slide')[current]);loadImages($$('.carousel-slide')[(current+1)%dots.length]);}schedule();},{threshold:.15}).observe(carousel);
document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',()=>{paused=reduce.matches;schedule();});
schedule();

}
