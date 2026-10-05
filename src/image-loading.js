// Hydrate deferred image states only when their section or next state is needed.
const pending=new WeakMap();
export function loadImages(element){
 if(!element)return Promise.resolve();
 return Promise.all([...element.querySelectorAll('img')].map(img=>{
  if(pending.has(img))return pending.get(img);
  img.loading='eager';
  if(img.dataset.srcset){img.srcset=img.dataset.srcset;delete img.dataset.srcset;}
  if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}
  const task=img.decode().catch(()=>{});pending.set(img,task);return task;
 }));
}
