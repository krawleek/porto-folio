// Runs before first paint, with a fail-safe if the application bundle fails.
(()=>{
 const root=document.documentElement;
 const isBoard=path=>/^\/(ru|en)\/(about\/)?$/.test(path);
 const isSectionSwitch=(from,to)=>from&&to&&isBoard(from.pathname)&&isBoard(to.pathname)&&from.pathname!==to.pathname&&from.pathname.split('/')[1]===to.pathname.split('/')[1];
 if(isBoard(location.pathname)){
  root.classList.add('portfolio-page');
  const style=document.createElement('style');style.textContent='@view-transition{navigation:auto}';document.head.append(style);
 }
 addEventListener('pageswap',event=>{
  if(!event.viewTransition)return;
  const to=event.activation?.entry?.url;
  if(!to||!isSectionSwitch(new URL(location.href),new URL(to)))event.viewTransition.skipTransition();
 });
 addEventListener('pagereveal',event=>{
  try{
   const saved=JSON.parse(sessionStorage.getItem('portfolio-section-position')||'null');
   sessionStorage.removeItem('portfolio-section-position');
   if(saved?.to===location.pathname){
    scrollTo({top:saved.scroll,behavior:'instant'});
    for(const [selector,value] of [['.about-link',saved.about],['.projects-link',saved.work]]){const element=document.querySelector(selector);if(element)element.style.translate=value;}
    dispatchEvent(new Event('section-position-restored'));
   }
  }catch{}
  if(!event.viewTransition)return;
  const from=navigation.activation?.from?.url;
  if(!from||!isSectionSwitch(new URL(from),new URL(location.href)))event.viewTransition.skipTransition();
 });
 try {
  if(sessionStorage.getItem('portfolio-language-transition')===location.pathname){
   sessionStorage.removeItem('portfolio-language-transition');root.classList.add('language-enter');
  }
  if(!sessionStorage.getItem('portfolio-loaded')&&/^\/(ru|en)\/(about\/)?$/.test(location.pathname))root.classList.add('is-loading');
 }catch{}
 setTimeout(()=>root.classList.remove('is-loading','language-enter'),4500);
})();
