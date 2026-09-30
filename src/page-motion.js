import './page-motion.css';
const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
if(root.classList.contains('is-loading')){
 const loader=document.createElement('div');loader.className='site-loader';loader.setAttribute('role','status');loader.setAttribute('aria-label',root.lang==='en'?'Loading portfolio':'Загрузка портфолио');
 loader.innerHTML='<div class="loader-word" aria-hidden="true"><span class="loader-dot"></span><span class="loader-text">Design</span></div><svg class="loader-curve" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H100V0Q50 40 0 0Z"/></svg>';
 document.body.append(loader);root.classList.add('loader-mounted');
 const word=loader.querySelector('.loader-text');
 const ready=Promise.race([Promise.allSettled([document.fonts.ready,...[...document.images].filter(img=>img.loading!=='lazy').map(img=>img.decode().catch(()=>{}))]),pause(3000)]);
 (async()=>{
  if(!reduced.matches){
   const words=['Design','UX/UI','Vibecoding','Prototyping','Business','Solutions','Metrics','bla bla bla'];
   for(let i=0;i<words.length;i++){
    word.textContent=words[i];
    await pause(i===0?400:i===words.length-1?550:190);
   }
  }
  await ready;
  loader.classList.add('is-complete');
  try{sessionStorage.setItem('portfolio-loaded','true');}catch{}
  await pause(reduced.matches?0:750);
  root.classList.remove('is-loading','loader-mounted');loader.remove();
 })();
}
// Reveal only after styles, fonts and the visible images have settled.
if(root.classList.contains('language-enter')){
 const settled=new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))).then(()=>Promise.allSettled([
  document.fonts.ready,
  ...[...document.images].filter(img=>img.getBoundingClientRect().top<innerHeight).map(img=>img.decode().catch(()=>{}))
 ]));
 Promise.race([settled,new Promise(resolve=>setTimeout(resolve,3500))]).then(()=>{
  requestAnimationFrame(()=>root.classList.remove('language-enter'));
 });
}
let leaving=false;
export function navigateWithFade(href){
 if(leaving)return;leaving=true;
 const url=new URL(href,location.href);
 const boardPath=/^\/(ru|en)\/(about\/)?$/;
 if(boardPath.test(location.pathname)&&boardPath.test(url.pathname)&&location.pathname!==url.pathname&&location.pathname.split('/')[1]===url.pathname.split('/')[1]){
  // Keep shared elements visible via native shared-element snapshots.
  // Without support this remains a normal navigation, with no screen fade.
  url.hash='';location.assign(url.href);return;
 }
 try{sessionStorage.setItem('portfolio-language-transition',url.pathname);}catch{}
 root.classList.add('language-leave');setTimeout(()=>location.assign(url.href),reduced.matches?0:260);
}

document.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.origin!==location.origin||link.target==='_blank'||link.hasAttribute('download')||link.pathname===location.pathname)return;
 event.preventDefault();navigateWithFade(link.href);
});
addEventListener('pageshow',()=>{leaving=false;root.classList.remove('language-leave');});
