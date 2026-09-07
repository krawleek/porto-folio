export function initCaseVideos(){
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 document.querySelectorAll('.alfa-video').forEach(container=>{
  const video=container.querySelector('video'),button=container.querySelector('button');
  let visible=false,manual=false;
  video.muted=true;
  const play=()=>{
   if(!video.src&&video.dataset.src){video.src=video.dataset.src;delete video.dataset.src;}
   video.play().then(()=>container.classList.remove('video-unavailable')).catch(()=>container.classList.add('video-unavailable'));
  };
  function update(){
   if(visible&&!document.hidden&&(!reduce.matches||manual))play();
   else {video.pause();if(reduce.matches&&!manual)container.classList.add('video-unavailable');}
  }
  button.addEventListener('click',()=>{manual=true;play();});
  video.addEventListener('playing',()=>container.classList.remove('video-unavailable'));
  video.addEventListener('error',()=>container.classList.add('video-unavailable'));
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{rootMargin:'150px 0px'}).observe(container);
  document.addEventListener('visibilitychange',update);reduce.addEventListener('change',update);
  if(reduce.matches){video.autoplay=false;video.pause();container.classList.add('video-unavailable');}
 });
}
