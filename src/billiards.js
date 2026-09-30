// Two balls on the page: drag or flick one into the other, with equal-mass collisions.
export function mountBilliards(){
 const area=document.querySelector('.ball-play'),elements=[...area.querySelectorAll('.ball')];
 let frame=0,last=0,drag=null;
 const balls=elements.map(el=>({el,x:0,y:0,vx:0,vy:0}));
 const geometry=b=>{const r=b.el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,r:Math.min(r.width,r.height)*.37};};
 const paint=()=>balls.forEach(b=>b.el.style.translate=`${b.x}px ${b.y}px`);
 function collide(){
  const [a,b]=balls,ga=geometry(a),gb=geometry(b),dx=gb.x-ga.x,dy=gb.y-ga.y,d=Math.hypot(dx,dy),radius=ga.r+gb.r;
  if(!d||d>=radius)return;
  const nx=dx/d,ny=dy/d,overlap=radius-d;
  if(drag?.ball===a){b.x+=nx*overlap;b.y+=ny*overlap;}
  else if(drag?.ball===b){a.x-=nx*overlap;a.y-=ny*overlap;}
  else{a.x-=nx*overlap/2;a.y-=ny*overlap/2;b.x+=nx*overlap/2;b.y+=ny*overlap/2;}
  const speed=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;
  if(speed>0){a.vx-=speed*nx*.94;a.vy-=speed*ny*.94;b.vx+=speed*nx*.94;b.vy+=speed*ny*.94;}
 }
 function step(time){
  const dt=Math.min((time-last)/1000||.016,.025);last=time;
  for(let i=0;i<4;i++){
   for(const b of balls){if(drag?.ball===b)continue;b.x+=b.vx*dt/4;b.y+=b.vy*dt/4;b.vx*=Math.exp(-3*dt/4);b.vy*=Math.exp(-3*dt/4);}
   paint();collide();
   for(const b of balls){const g=geometry(b),board=area.closest('main').getBoundingClientRect();if(g.x-g.r<0){b.x+=g.r-g.x;b.vx=Math.abs(b.vx)*.7;}if(g.x+g.r>innerWidth){b.x-=g.x+g.r-innerWidth;b.vx=-Math.abs(b.vx)*.7;}if(g.y-g.r<board.top){b.y+=board.top-g.y+g.r;b.vy=Math.abs(b.vy)*.7;}if(g.y+g.r>board.bottom){b.y-=g.y+g.r-board.bottom;b.vy=-Math.abs(b.vy)*.7;}}
  }
  paint();if(drag||balls.some(b=>Math.hypot(b.vx,b.vy)>2))frame=requestAnimationFrame(step);else frame=0;
 }
 function run(){if(!frame){last=performance.now();frame=requestAnimationFrame(step);}}
 balls.forEach((ball,index)=>{
  const el=ball.el;el.dataset.ballPhysics='';el.style.touchAction='none';
  el.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.stopPropagation();ball.vx=ball.vy=0;drag={ball,id:e.pointerId,x:e.clientX,y:e.clientY,time:performance.now(),moved:false};el.setPointerCapture(e.pointerId);run();});
  el.addEventListener('pointermove',e=>{if(drag?.ball!==ball||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y,now=performance.now(),dt=Math.max((now-drag.time)/1000,.016);ball.x+=dx;ball.y+=dy;ball.vx=Math.max(-900,Math.min(900,dx/dt));ball.vy=Math.max(-900,Math.min(900,dy/dt));drag.moved||=Math.hypot(dx,dy)>2;Object.assign(drag,{x:e.clientX,y:e.clientY,time:now});paint();});
  const end=e=>{if(drag?.ball!==ball)return;const moved=drag.moved;drag=null;if(e.type==='pointercancel')ball.vx=ball.vy=0;if(!moved&&e.type==='pointerup')hit();run();};
  el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
  function hit(){const a=geometry(ball),b=geometry(balls[1-index]),d=Math.hypot(b.x-a.x,b.y-a.y)||1;ball.vx=(b.x-a.x)/d*600;ball.vy=(b.y-a.y)/d*600;run();}
  el.addEventListener('click',e=>{if(e.detail===0)hit();});
  el.addEventListener('keydown',e=>{if(e.key==='Escape'){balls.forEach(b=>Object.assign(b,{x:0,y:0,vx:0,vy:0}));paint();}});
 });
 addEventListener('resize',()=>{drag=null;balls.forEach(b=>Object.assign(b,{x:0,y:0,vx:0,vy:0}));paint();});
 addEventListener('pagehide',()=>cancelAnimationFrame(frame));
}
