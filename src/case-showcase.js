import {loadImages} from './image-loading.js';
export function initCaseShowcases(){
 const showcases=[...document.querySelectorAll('.showcase')];
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const targets=new WeakMap(),near=new WeakSet();
 let queued=false;
 function display(section,step){
  section.dataset.step=String(step);
  for(const selector of ['.showcase-step','.showcase-image','.showcase-dots span'])section.querySelectorAll(selector).forEach((el,i)=>{
   el.classList.toggle('active',i===step);
   if(!el.matches('.showcase-dots span'))el.setAttribute('aria-hidden',String(!reduce.matches&&i!==step));
  });
 }
 function update(){
  queued=false;
  showcases.forEach(section=>{
   if(reduce.matches){targets.delete(section);display(section,0);return;}
   if(!near.has(section))return;
   const sticky=section.querySelector('.showcase-sticky'),images=[...section.querySelectorAll('.showcase-image')];
   const distance=Math.max(1,section.offsetHeight-sticky.offsetHeight);
   const progress=(parseFloat(getComputedStyle(sticky).top)-section.getBoundingClientRect().top)/distance;
   const step=Math.max(0,Math.min(images.length-1,Math.floor(progress*images.length)));
   if(targets.get(section)===step)return;
   targets.set(section,step);
   loadImages(images[step]).then(()=>{
    if(!reduce.matches&&targets.get(section)===step)display(section,step);
    loadImages(images[step+1]);
   });
  });
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){if(entry.isIntersecting)near.add(entry.target);else near.delete(entry.target);}
  schedule();
 },{rootMargin:'300px 0px'});
 showcases.forEach(section=>observer.observe(section));
 // Reduced motion shows a static sequence: each image loads near its own position.
 const staticObserver=new IntersectionObserver(entries=>{
  if(reduce.matches)for(const entry of entries)if(entry.isIntersecting)loadImages(entry.target);
 },{rootMargin:'300px 0px'});
 const observeStatic=()=>showcases.forEach(section=>section.querySelectorAll('.showcase-image').forEach(el=>{staticObserver.unobserve(el);staticObserver.observe(el);}));
 observeStatic();
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 reduce.addEventListener('change',()=>{observeStatic();schedule();});schedule();
}
