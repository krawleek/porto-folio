export function initCaseShowcases(){
const showcases=[...document.querySelectorAll('.showcase')];
const reduce=matchMedia('(prefers-reduced-motion:reduce)');
let queued=false;
function update(){queued=false;showcases.forEach(section=>{
 const sticky=section.querySelector('.showcase-sticky');
 const distance=section.offsetHeight-sticky.offsetHeight;
 const progress=(parseFloat(getComputedStyle(sticky).top)-section.getBoundingClientRect().top)/distance;
 const count=section.querySelectorAll('.showcase-step').length;
 const step=reduce.matches?0:Math.max(0,Math.min(count-1,Math.floor(progress*count)));
 section.dataset.step=String(step);
 for(const selector of ['.showcase-step','.showcase-image','.showcase-dots span'])section.querySelectorAll(selector).forEach((el,i)=>{el.classList.toggle('active',i===step);if(!el.matches('.showcase-dots span'))el.setAttribute('aria-hidden',String(!reduce.matches&&i!==step));});
});}
function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);schedule();
}
