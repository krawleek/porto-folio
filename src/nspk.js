import {initCaseCarousel} from './case-carousel.js';
import {initCaseMenu} from "./case-menu.js";
import {content} from './nspk-content.js';
document.querySelector('#case-root').innerHTML=content;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
initCaseMenu();

initCaseCarousel($('.carousel'));
$$('.comparison').forEach(comparison=>{
 const input=$('input',comparison);let pointer=null;
 const update=value=>{value=Math.max(0,Math.min(100,value));input.value=String(value);comparison.style.setProperty('--reveal',`${value}%`);input.setAttribute('aria-valuetext',`До ${Math.round(value)}%, после ${100-Math.round(value)}%`);};
 input.addEventListener('input',()=>update(Number(input.value)));
 const fromPointer=e=>{const r=comparison.getBoundingClientRect();update((e.clientX-r.left)/r.width*100);};
 input.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointer=e.pointerId;input.setPointerCapture(e.pointerId);input.focus({preventScroll:true});fromPointer(e);e.preventDefault();});
 input.addEventListener('pointermove',e=>{if(pointer===e.pointerId)fromPointer(e);});
 const release=()=>pointer=null;input.addEventListener('pointerup',release);input.addEventListener('pointercancel',release);input.addEventListener('lostpointercapture',release);
});

const {initCaseLanguage}=await import("./nspk-language.js");
initCaseLanguage();
