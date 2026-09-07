// Own every animation in an opening so closing/reopening cannot resume an old reveal.
export function beginAboutReveal(dialog, source, reduced) {
  let cancelled=false, flight;
  const animations=new Set();
  const content=dialog.querySelector('.about-dialog-content');
  const text=[...dialog.querySelectorAll('.about-dialog-prose,.about-posts')];
  const close=dialog.querySelector('.about-close');
  const art=dialog.querySelector('.about-dialog-art');
  const writing=content.classList.contains('is-writing');
  const hidden=[...text,close,...(art?[art]:[])];
  const animate=(el,frames,options)=>{
    const animation=el.animate(frames,{fill:'both',...options});
    animations.add(animation);
    return animation.finished.catch(()=>{});
  };
  async function run() {
    if(reduced.matches)return;
    dialog.classList.add('is-sequencing');
    dialog.dataset.revealPhase='card';
    hidden.forEach(el=>{el.style.opacity='0';el.style.pointerEvents='none';});
    if(writing)content.style.visibility='hidden';
    if(art)await art.decode().catch(()=>{});
    if(cancelled)return;
    const face=source.querySelector('.about-card-face');
    const origin=face.getBoundingClientRect();
    const target=(art||content).getBoundingClientRect();
    const matrix=new DOMMatrixReadOnly(getComputedStyle(source).transform);
    const angle=Math.atan2(matrix.b,matrix.a)*180/Math.PI;
    const startWidth=source.offsetWidth,startHeight=source.offsetHeight;
    flight=document.createElement('div');flight.className='about-dialog-flight';flight.setAttribute('aria-hidden','true');
    const picture=source.querySelector('img').cloneNode();picture.alt='';
    if(writing){
      flight.classList.add('is-flipping');
      const front=document.createElement('div');front.className='flight-front';front.append(picture);
      const back=document.createElement('div');back.className='flight-back';
      flight.append(front,back);
    }else flight.append(picture);
    dialog.append(flight);source.style.visibility='hidden';
    const start={left:origin.left+(origin.width-startWidth)/2+'px',top:origin.top+(origin.height-startHeight)/2+'px',width:startWidth+'px',height:startHeight+'px',transform:'perspective(1400px) rotateZ('+angle+'deg) rotateY(0deg)'};
    const end={left:target.left+'px',top:target.top+'px',width:target.width+'px',height:target.height+'px',transform:'perspective(1400px) rotateZ(0deg) rotateY('+(writing?180:0)+'deg)'};
    Object.assign(flight.style,start);
    const cards=[...document.querySelectorAll('.about-card')],index=cards.indexOf(source);
    cards.forEach((card,i)=>{
      if(i===index)return;
      const neighbor=card.querySelector('.about-card-face');
      animate(neighbor,[{transform:getComputedStyle(neighbor).transform},{transform:'translateX('+(i<index?32:-32)+'px)'}],{duration:560,easing:'cubic-bezier(.22,.75,.25,1)'});
    });
    await animate(flight,[start,end],{duration:writing?820:700,easing:'cubic-bezier(.22,.75,.25,1)'});
    if(cancelled)return;
    if(art)art.style.opacity='1';
    content.style.visibility='';
    flight.remove();flight=null;
    dialog.classList.remove('is-sequencing');
    dialog.dataset.revealPhase='text';
    await Promise.all(text.map(el=>animate(el,[
      {opacity:0,transform:'translateX(-24px)',clipPath:'inset(0 100% 0 0)'},
      {opacity:1,transform:'translateX(0)',clipPath:'inset(0 0 0 0)'}
    ],{duration:420,easing:'cubic-bezier(.2,.75,.3,1)'})));
    if(cancelled)return;
    text.forEach(el=>{el.style.pointerEvents='';});
    dialog.dataset.revealPhase='close';
    await animate(close,[{opacity:0,transform:'translateX(-8px)'},{opacity:1,transform:'translateX(0)'}],{duration:200,easing:'ease-out'});
    if(cancelled)return;
    hidden.forEach(el=>{el.style.opacity='';el.style.pointerEvents='';});
    close.style.pointerEvents='';
    dialog.dataset.revealPhase='ready';
    dialog.classList.add('is-revealed');
  }
  run();
  return ()=>{
    cancelled=true;
    animations.forEach(animation=>animation.cancel());
    flight?.remove();source.style.visibility='';
    hidden.forEach(el=>{el.style.opacity='';el.style.pointerEvents='';});
    content.style.visibility='';
    dialog.classList.remove('is-sequencing','is-revealed');
    delete dialog.dataset.revealPhase;
  };
}
