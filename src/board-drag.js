// Keep native links clickable; a deliberate drag consumes only its own click.
export function enableBoardDrag(board, selector, onMove = () => {}) {
 const items=[...board.querySelectorAll(selector)];
 items.forEach(item=>{
  if(item.hasAttribute('data-draggable'))return;
  item.dataset.draggable='';
  item.querySelectorAll('img').forEach(img=>img.draggable=false);
  let offset={x:0,y:0},drag=null,suppress=false;
  const place=(x,y)=>{
   const r=item.getBoundingClientRect(),b=board.getBoundingClientRect();
   const left=r.left-offset.x,top=r.top-offset.y;
   offset={x:Math.max(b.left-left,Math.min(x,b.right-left-r.width)),y:Math.max(b.top-top,Math.min(y,b.bottom-top-r.height))};
   item.style.translate=`${offset.x}px ${offset.y}px`;onMove();dispatchEvent(new Event('board-drag'));
  };
  item.addEventListener('dragstart',e=>e.preventDefault());
  item.addEventListener('pointerdown',e=>{
   if(e.button!==0||e.target.closest('input,textarea,select,form,[data-ball-physics]')||e.target.closest('[data-draggable]')!==item)return;
   const restored=getComputedStyle(item).translate.split(' ').map(parseFloat);if(Number.isFinite(restored[0]))offset={x:restored[0],y:restored[1]||0};
   suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,origin:{...offset},active:false};
  });
  item.addEventListener('pointermove',e=>{
   if(!drag||e.pointerId!==drag.id)return;
   const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
   if(!drag.active){
    if(Math.hypot(dx,dy)<8)return;
    if(e.pointerType==='touch'&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
    drag.active=true;item.setPointerCapture(e.pointerId);item.classList.add('is-dragging');
   }
   place(drag.origin.x+dx,drag.origin.y+dy);
  });
  const end=()=>{if(drag?.active){suppress=true;setTimeout(()=>suppress=false,0);}drag=null;item.classList.remove('is-dragging');};
  ['pointerup','pointercancel','lostpointercapture'].forEach(type=>item.addEventListener(type,end));
  item.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();suppress=false;}},true);
  item.addEventListener('keydown',e=>{
   const directions={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]};
   if(e.altKey&&directions[e.key]){e.preventDefault();const [x,y]=directions[e.key];place(offset.x+x,offset.y+y);}
   if(e.key==='Escape'){item.style.translate='';offset={x:0,y:0};onMove();dispatchEvent(new Event('board-drag'));}
  });
  addEventListener('resize',()=>{item.style.translate='';offset={x:0,y:0};onMove();dispatchEvent(new Event('board-drag'));});
 });
}
