// A single pinned composition. Scroll controls both transitions; only the
// middle hold adds a small, deterministic drift around the reading area.
export function initAboutMotion() {
  const story = document.querySelector('.about-story');
  const scene = document.querySelector('.about-scene');
  const copies = [...document.querySelectorAll('.about-copy')];
  const cards = [...document.querySelectorAll('.about-card')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n,a=0,b=1) => Math.min(b,Math.max(a,n));
  const ease = n => {n=clamp(n);return n*n*(3-2*n);};
  const mix = (a,b,t) => a+(b-a)*t;
  let layout, frame=0, dirty=true, frozen=false;
  function measure() {
    const w = scene.clientWidth, h = scene.clientHeight;
    const narrow = w < 700;
    const width = narrow ? w*.40 : 300*Math.min(w/1440,h/800);
    const height = width*1.4;
    // Centers and rotations follow the three 1440 x 800 Figma compositions.
    const initial = [[110,810,30],[490,1120,-16],[400,770,-8],[1280,810,20],[700,1170,20],[1240,1280,-16]];
    const orbit = [[70,355,20],[290,760,-16],[1410,435,-8],[1290,350,16],[870,770,-16],[500,-35,-16]];
    const fan = [[296,832,-45],[482,725,-30],[607,713,-6],[846,706,7],[1010,725,30],[1145,832,45]];
    const mobileOrbit = [[-.12,.44,20],[.15,.98,-16],[1.08,.60,-8],[1.06,.26,16],[.63,1.04,-16],[.30,-.025,-16]];
    const states = cards.map((_,i)=>({
      initial:narrow ? [w*[.06,.35,.30,.95,.65,.9][i],h+height*[.05,.8,.02,.08,.8,1][i],initial[i][2]] : [initial[i][0]*w/1440,h+(initial[i][1]-800)*(width/300)-height*.12,initial[i][2]],
      orbit:narrow ? [mobileOrbit[i][0]*w,mobileOrbit[i][1]*h,mobileOrbit[i][2]] : [orbit[i][0]*w/1440,orbit[i][1]*h/800,orbit[i][2]],
      fan:narrow ? [w/2+(i-2.5)*w*.135,h+height*.18-(2.5-Math.abs(i-2.5))*height*.16,fan[i][2]] : [fan[i][0]*w/1440,fan[i][1]*h/800,fan[i][2]],
    }));
    layout={w,h,narrow,width,height,states};
  }
  function refresh(){dirty=true;schedule();}
  function schedule(){if(!frame&&!document.hidden&&!frozen)frame=requestAnimationFrame(render);}
  function render(time) {
    frame=0;
    if(dirty){measure();dirty=false;}
    if(reduced.matches) {
      scene.dataset.stage='2';
      copies.forEach(el=>{el.style.cssText='';el.inert=false;el.setAttribute('aria-hidden','false');});
      cards.forEach(el=>{el.style.removeProperty('transform');el.style.removeProperty('width');el.style.removeProperty('height');el.disabled=false;el.tabIndex=0;});
      return;
    }
    const range=story.offsetHeight-scene.offsetHeight;
    const progress=clamp(-story.getBoundingClientRect().top/Math.max(1,range));
    const first=ease((progress-.08)/.28),second=ease((progress-.61)/.28);
    const opacity=[1-ease((progress-.1)/.13),ease((progress-.27)/.1)*(1-ease((progress-.61)/.12)),ease((progress-.8)/.1)];
    const final=progress>=.9;
    scene.dataset.stage=final?'2':progress>.27?'1':'0';
    copies.forEach((el,i)=>{
      el.style.opacity=opacity[i];
      el.style.transform='translate(-50%, '+((1-opacity[i])*(i===0?-16:16))+'px)';
      el.inert=opacity[i]<.95;
      el.setAttribute('aria-hidden',String(opacity[i]<.5));
    });
    const {w,h,width,height,states}=layout;
    const drift=Math.sin(Math.PI*first)*(1-second)+first*(1-second)*.6;
    cards.forEach((el,i)=>{
      const {initial,orbit,fan}=states[i];
      // Move outward before moving up, and move down before returning inward.
      const outward=ease(first*1.6),up=ease((first-.38)/.62);
      const down=ease(second*1.6),inward=ease((second-.38)/.62);
      let x=mix(mix(initial[0],orbit[0],outward),fan[0],inward);
      let y=mix(mix(initial[1],orbit[1],up),fan[1],down);
      let angle=mix(mix(initial[2],orbit[2],first),fan[2],second);
      x+=Math.sin(time/2100+i*1.7)*7*drift;
      y+=Math.cos(time/2600+i*2.1)*7*drift;
      angle+=Math.sin(time/3100+i)*2*drift;
      // Preserve the intentionally cropped edges, while keeping the reading area clear.
      const rad=angle*Math.PI/180;
      const halfW=(Math.abs(Math.cos(rad))*width+Math.abs(Math.sin(rad))*height)/2;
      const halfH=(Math.abs(Math.sin(rad))*width+Math.abs(Math.cos(rad))*height)/2;
      for(const copy of copies.filter((_,j)=>opacity[j]>.01)) {
        const r=copy.getBoundingClientRect(),gap=16;
        if(x+halfW>r.left-gap&&x-halfW<r.right+gap&&y+halfH>r.top-gap&&y-halfH<r.bottom+gap){
          const choices=[{x:r.left-gap-halfW,y},{x:r.right+gap+halfW,y},{x,y:r.top-gap-halfH},{x,y:r.bottom+gap+halfH}];
          choices.sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
          ({x,y}=choices[0]);
        }
      }
      el.style.width=width+'px';el.style.height=height+'px';
      el.style.transform='translate('+(x-width/2)+'px,'+(y-height/2)+'px) rotate('+angle+'deg)';
      el.disabled=!final;el.tabIndex=final?0:-1;
    });
    document.dispatchEvent(new Event('about:frame'));
    if(progress>.08&&progress<.9)schedule();
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',refresh);
  reduced.addEventListener('change',refresh);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  document.addEventListener('about:modal',e=>{frozen=e.detail.open;if(frozen){cancelAnimationFrame(frame);frame=0;}else refresh();});
  const observer=new ResizeObserver(refresh);copies.forEach(el=>observer.observe(el));
  refresh();
  return {refresh,toCards(){
    if(reduced.matches)cards[0].focus();
    else {
      window.scrollTo({top:story.offsetTop+story.offsetHeight-scene.offsetHeight,behavior:'instant'});
      refresh();requestAnimationFrame(()=>cards[0].focus({preventScroll:true}));
    }
  }};
}
