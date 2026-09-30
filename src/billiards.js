export function mountBilliards(en){
 const dialog=document.createElement('dialog');dialog.className='billiards-dialog';
 dialog.innerHTML=`<button type="button" class="close" aria-label="${en?'Close':'Закрыть'}">×</button><h2>${en?'A little pool break':'Немного бильярда'}</h2><p>${en?'Pull back from the white ball, then release. Pocket all coloured balls.':'Потяните от белого шара назад и отпустите. Забейте все цветные шары.'}</p><canvas width="800" height="420" tabindex="0" aria-label="${en?'Pool table. Arrow keys aim, hold Space to charge, release to shoot.':'Бильярд. Стрелки — прицел, удерживайте пробел для силы, отпустите для удара.'}"></canvas><div class="game-footer"><span role="status"></span><button type="button" class="game-reset">${en?'New game':'Заново'}</button></div>`;
 document.body.append(dialog);const canvas=dialog.querySelector('canvas'),ctx=canvas.getContext('2d'),status=dialog.querySelector('[role=status]');
 const pockets=[[25,25],[400,19],[775,25],[25,395],[400,401],[775,395]],colors=['#f6ba00','#1374d7','#e74a36','#753aac','#ee831c','#14865d','#222'];
 let balls=[],aim=null,frame=0,last=0,angle=0,charge=0,shots=0,scored=0;
 const moving=()=>balls.some(b=>Math.hypot(b.vx,b.vy)>2);
 function reset(){balls=[{x:210,y:210,vx:0,vy:0,color:'#f7f3e8',cue:true}];colors.forEach((color,i)=>balls.push({x:530+(i%3)*25,y:170+Math.floor(i/3)*27+(i%3)*9,vx:0,vy:0,color}));shots=0;scored=0;aim=null;update();draw();}
 function update(){status.textContent=`${en?'Pocketed':'Забито'}: ${scored}/7 · ${en?'Shots':'Удары'}: ${shots}${scored===7?(en?' — Well played!':' — Отличная игра!'):''}`;}
 function draw(){
  ctx.clearRect(0,0,800,420);ctx.fillStyle='#2e2520';ctx.fillRect(0,0,800,420);ctx.fillStyle='#d9ddd8';ctx.fillRect(20,20,760,380);
  for(const [x,y] of pockets){ctx.beginPath();ctx.arc(x,y,19,0,Math.PI*2);ctx.fillStyle='#171818';ctx.fill();}
  for(const b of balls){ctx.beginPath();ctx.arc(b.x,b.y,11,0,Math.PI*2);const g=ctx.createRadialGradient(b.x-4,b.y-5,1,b.x,b.y,13);g.addColorStop(0,'#fff');g.addColorStop(.25,b.color);g.addColorStop(1,'#302d29');ctx.fillStyle=g;ctx.shadowColor='#0005';ctx.shadowBlur=4;ctx.shadowOffsetY=3;ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;}
  const cue=balls.find(b=>b.cue);if(aim&&cue){ctx.beginPath();ctx.moveTo(cue.x,cue.y);ctx.lineTo(cue.x+(cue.x-aim.x)*1.5,cue.y+(cue.y-aim.y)*1.5);ctx.strokeStyle='#007aff';ctx.lineWidth=2;ctx.setLineDash([5,5]);ctx.stroke();ctx.setLineDash([]);}
 }
 function shoot(dx,dy){const cue=balls.find(b=>b.cue);if(!cue||moving())return;const length=Math.hypot(dx,dy);if(length<3)return;const power=Math.min(length,140)*5;cue.vx=dx/length*power;cue.vy=dy/length*power;shots++;aim=null;update();}
 function step(time){
  const dt=Math.min((time-last)/1000||.016,.025);last=time;
  // Small substeps keep fast balls from passing through each other.
  for(let s=0;s<4;s++){
   for(const b of [...balls]){
    b.x+=b.vx*dt/4;b.y+=b.vy*dt/4;const friction=Math.exp(-1.1*dt/4);b.vx*=friction;b.vy*=friction;
    if(Math.hypot(b.vx,b.vy)<2)b.vx=b.vy=0;
    if(pockets.some(([x,y])=>Math.hypot(b.x-x,b.y-y)<20)){
     if(b.cue){b.x=210;b.y=210;b.vx=b.vy=0;}else{balls.splice(balls.indexOf(b),1);scored++;update();}continue;
    }
    if(b.x<33||b.x>767){b.x=Math.max(33,Math.min(767,b.x));b.vx*=-.88;}
    if(b.y<33||b.y>387){b.y=Math.max(33,Math.min(387,b.y));b.vy*=-.88;}
   }
   for(let i=0;i<balls.length;i++)for(let j=i+1;j<balls.length;j++){
    const a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>=22||d===0)continue;
    const nx=dx/d,ny=dy/d,overlap=(22-d)/2;a.x-=nx*overlap;a.y-=ny*overlap;b.x+=nx*overlap;b.y+=ny*overlap;
    const speed=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(speed>0){a.vx-=speed*nx*.96;a.vy-=speed*ny*.96;b.vx+=speed*nx*.96;b.vy+=speed*ny*.96;}
   }
  }
  draw();if(dialog.open)frame=requestAnimationFrame(step);
 }
 const point=e=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*800/r.width,y:(e.clientY-r.top)*420/r.height};};
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0||moving())return;const p=point(e),cue=balls.find(b=>b.cue);if(Math.hypot(p.x-cue.x,p.y-cue.y)>35)return;aim=p;canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(aim)aim=point(e);});
 canvas.addEventListener('pointerup',()=>{if(!aim)return;const cue=balls.find(b=>b.cue);shoot(cue.x-aim.x,cue.y-aim.y);aim=null;});
 canvas.addEventListener('pointercancel',()=>aim=null);
 canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))return;e.preventDefault();if(moving())return;if(e.key===' '){if(!charge)charge=performance.now();}else{angle+=(e.key==='ArrowLeft'||e.key==='ArrowUp'?-.1:.1);}const cue=balls.find(b=>b.cue);aim={x:cue.x-Math.cos(angle)*70,y:cue.y-Math.sin(angle)*70};});
 canvas.addEventListener('keyup',e=>{if(e.key===' '&&charge){e.preventDefault();const power=Math.min(140,35+(performance.now()-charge)/10);charge=0;shoot(Math.cos(angle)*power,Math.sin(angle)*power);}});
 dialog.querySelector('.close').onclick=()=>dialog.close();dialog.querySelector('.game-reset').onclick=reset;
 dialog.addEventListener('close',()=>{cancelAnimationFrame(frame);aim=null;charge=0;});
 document.querySelectorAll('.ball').forEach(button=>button.addEventListener('click',()=>{dialog.showModal();if(!balls.length)reset();last=performance.now();frame=requestAnimationFrame(step);canvas.focus();}));
}
