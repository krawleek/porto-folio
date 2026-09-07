// Both effects are decorative: their layers never receive pointer events.
const canvas=document.createElement('canvas');
canvas.className='background-ink';canvas.setAttribute('aria-hidden','true');
const trail=document.createElement('div');trail.className='photo-trail';trail.setAttribute('aria-hidden','true');
document.body.append(canvas,trail);
const ctx=canvas.getContext('2d');
const hero=document.querySelector('.hero');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const paths=[];
let drawing=false,last=null,path=null,photoIndex=0,travel=0,trailLast=null,queued=false;
const selectors='h1,h2,h3,p,a,button,input,textarea,select,label,img,svg,video,[role="button"],.project,.contact-art,.nav-links,.mobile-panel,.language,footer,dialog[open],.password-form';
function exclusions(){
 return [...document.querySelectorAll(selectors)].filter(el=>!el.closest('.photo-trail,[aria-hidden="true"],.about-copy[inert]')&&el.getClientRects().length).map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height&&r.bottom>=0&&r.top<=innerHeight).map(r=>({left:r.left-4,top:r.top-4,right:r.right+4,bottom:r.bottom+4}));
}
const inside=(p,r)=>p.x>=r.left&&p.x<=r.right&&p.y>=r.top&&p.y<=r.bottom;
function free(p,rects){
 if(document.querySelector('dialog[open]')||p.x<0||p.y<0||p.x>=innerWidth||p.y>=innerHeight)return false;
 return !rects.some(r=>inside(p,r));
}
function paint(){
 queued=false;
 const dpr=Math.min(devicePixelRatio||1,2),w=Math.round(innerWidth*dpr),h=Math.round(innerHeight*dpr);
 if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;canvas.style.width=`${innerWidth}px`;canvas.style.height=`${innerHeight}px`;}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,innerWidth,innerHeight);
 ctx.strokeStyle='#007aff';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';
 for(const points of paths){if(points.length<2)continue;ctx.beginPath();points.forEach((p,i)=>{const x=p.x-scrollX,y=p.y-scrollY;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}
 // Re-mask on every scroll/layout change: old ink can never cover moving sticky content.
 for(const r of exclusions())ctx.clearRect(r.left,r.top,r.right-r.left,r.bottom-r.top);
 if(document.querySelector('dialog[open]'))ctx.clearRect(0,0,innerWidth,innerHeight);
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(paint);}}
function finish(){drawing=false;last=null;path=null;}
function addPoint(p){if(!path){path=[];paths.push(path);}path.push({x:p.x+scrollX,y:p.y+scrollY});}
document.addEventListener('pointerdown',e=>{
 if(e.pointerType!=='mouse'||e.button!==0||e.ctrlKey||e.metaKey||e.altKey)return;
 const point={x:e.clientX,y:e.clientY};if(!free(point,exclusions()))return;
 drawing=true;last=point;path=null;travel=0;trailLast=null;addPoint(point);
 // Only a drag that begins on empty background suppresses native selection.
 e.preventDefault();
});
document.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse')return;
 if(paths.length)schedule();
 const point={x:e.clientX,y:e.clientY},rects=exclusions();
 if(drawing){
  if(!(e.buttons&1)){finish();return;}
  const count=Math.max(1,Math.ceil(Math.hypot(point.x-last.x,point.y-last.y)/2));
  for(let i=1;i<=count;i++){
   const sample={x:last.x+(point.x-last.x)*i/count,y:last.y+(point.y-last.y)*i/count};
   if(free(sample,rects))addPoint(sample);else path=null;
  }
  last=point;schedule();return;
 }
 if(!hero||e.buttons||reduced.matches||!free(point,rects)||!inside(point,hero.getBoundingClientRect())){trailLast=null;travel=0;return;}
 if(trailLast)travel+=Math.hypot(point.x-trailLast.x,point.y-trailLast.y);
 trailLast=point;
 if(travel>=100){travel=0;spawnPhoto(point,rects);}
});
function spawnPhoto(point,rects){
 const bounds=hero.getBoundingClientRect();
 // Reserve the full rotated/overshooting image envelope, not just its center.
 const size=150,jitter=()=>Math.random()*14-7;
 const candidates=[[24,-size/2],[-size-24,-size/2],[-size/2,24],[-size/2,-size-24]];
 let position;
 for(const [dx,dy] of candidates){
  const left=point.x+dx+jitter(),top=point.y+dy+jitter();
  const box={left,top,right:left+size,bottom:top+size};
  if(left<0||box.right>innerWidth||top<Math.max(0,bounds.top)||box.bottom>Math.min(innerHeight,bounds.bottom))continue;
  if(rects.some(r=>box.left<r.right&&box.right>r.left&&box.top<r.bottom&&box.bottom>r.top))continue;
  position={left:left+15,top:top+15};break;
 }
 if(!position)return;
 const photo=document.createElement('div');photo.className='trail-photo';photo.dataset.photo=String(photoIndex);
 photo.style.left=`${position.left}px`;photo.style.top=`${position.top}px`;photo.style.setProperty('--turn',`${Math.random()*12-6}deg`);
 const img=new Image();img.alt='';img.src=`/assets/trail/${photoIndex+1}.png`;photo.append(img);photoIndex=(photoIndex+1)%6;
 trail.append(photo);photo.addEventListener('animationend',()=>photo.remove(),{once:true});
 // Fallback cleanup also handles a preference change during an animation.
 setTimeout(()=>photo.remove(),2200);
}
function clearTrail(){trail.replaceChildren();trailLast=null;travel=0;}
window.addEventListener('pointerup',finish);window.addEventListener('pointercancel',finish);window.addEventListener('blur',()=>{finish();clearTrail();});
window.addEventListener('scroll',()=>{finish();clearTrail();schedule();},{passive:true});
window.addEventListener('resize',()=>{finish();clearTrail();schedule();});
reduced.addEventListener('change',clearTrail);
new ResizeObserver(()=>{clearTrail();schedule();}).observe(document.querySelector('main'));
new MutationObserver(()=>{clearTrail();schedule();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','hidden','lang']});
document.fonts.ready.then(schedule);
// Fetch each asset once; displayed images reuse the browser cache.
for(let i=1;hero&&i<=6;i++){const img=new Image();img.src=`/assets/trail/${i}.png`;}
schedule();

document.addEventListener('about:frame',schedule);
