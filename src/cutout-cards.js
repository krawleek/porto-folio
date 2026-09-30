export function cutoutCards(){
 const ns='http://www.w3.org/2000/svg';
 const definitions=document.createElementNS(ns,'svg');
 definitions.setAttribute('width','0');definitions.setAttribute('height','0');definitions.setAttribute('aria-hidden','true');definitions.style.position='absolute';
 const defs=document.createElementNS(ns,'defs');definitions.append(defs);document.body.append(definitions);
 document.querySelectorAll('.project-art').forEach((art,index)=>{
  const clip=document.createElementNS(ns,'clipPath'),path=document.createElementNS(ns,'path');
  clip.id=`project-cutout-${index}`;clip.setAttribute('clipPathUnits','userSpaceOnUse');clip.append(path);defs.append(clip);
  art.style.clipPath=`url(#${clip.id})`;
  const arrow=document.createElement('span');arrow.className='project-open';arrow.setAttribute('aria-hidden','true');
  arrow.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const nda=[...art.closest('.project').querySelectorAll('.tags span')].find(tag=>tag.textContent.trim()==='NDA');
  if(nda){
   arrow.removeAttribute('aria-hidden');arrow.classList.add('project-nda');
   arrow.replaceChildren(nda);
  }
  art.after(arrow);
  new ResizeObserver(()=>{
   const w=art.clientWidth,h=art.clientHeight;
   // Mirror the rounded inset to the lower left corner.
   path.setAttribute('d',`M22 0H${w-22}Q${w} 0 ${w} 22V${h-64}Q${w} ${h-52} ${w-12} ${h-52}H${w-32}Q${w-52} ${h-52} ${w-52} ${h-32}V${h-12}Q${w-52} ${h} ${w-64} ${h}H18Q0 ${h} 0 ${h-18}V22Q0 0 22 0Z`);
   if(nda){
    // 16px text line with 6px of space above and below.
    path.setAttribute('d',`M22 0H${w-22}Q${w} 0 ${w} 22V${h-36}Q${w} ${h-28} ${w-8} ${h-28}H${w-42}Q${w-52} ${h-28} ${w-52} ${h-18}V${h-8}Q${w-52} ${h} ${w-60} ${h}H18Q0 ${h} 0 ${h-18}V22Q0 0 22 0Z`);
   }
   path.setAttribute('transform',`translate(${w} 0) scale(-1 1)`);
   art.parentElement.style.setProperty('--art-height',`${h}px`);
  }).observe(art);
 });
}
