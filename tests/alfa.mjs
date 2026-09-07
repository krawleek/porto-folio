import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:width===320?640:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/?case=alfa');await expect(page).toHaveURL(/cases\/alfa\//);await expect(page.locator('h1')).toContainText('Альфа');
  await expect(page.locator('.password-form')).toHaveCount(0);
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('body')).not.toContainText('undefined');
  for(const video of await page.locator('.alfa-video video').all()){
   await video.scrollIntoViewIfNeeded();
   await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(0);
   expect(await video.evaluate(v=>({muted:v.muted,controls:v.controls,loop:v.loop,inline:v.playsInline,ready:v.readyState>1}))).toEqual({muted:true,controls:false,loop:true,inline:true,ready:true});
  }
  for(const id of ['financial-adviser','bank-consultant']){
   for(const [progress,step] of [[0,0],[.45,1],[.85,2],[.45,1]]){
    await page.evaluate(({id,progress})=>{const el=document.getElementById(id),sticky=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(sticky).top)+(el.offsetHeight-sticky.offsetHeight)*progress,behavior:'instant'});},{id,progress});
    await expect(page.locator('#'+id)).toHaveAttribute('data-step',String(step));
    await expect(page.locator('#'+id+' .showcase-step.active')).toHaveCount(1);
    await expect(page.locator('#'+id+' .showcase-image.active')).toHaveCount(1);
    const box=await page.locator('#'+id+' .showcase-screen').boundingBox();expect(box.height).toBeGreaterThan(100);expect(box.y+box.height).toBeLessThanOrEqual((width===320?640:900)+1);
   }
  }
  await page.locator('footer [data-lang=en]').click();await expect(page.locator('h1')).toHaveText('Alfa-Bank AI assistant 🥇');await expect(page.locator('header [data-lang=en]')).toHaveAttribute('aria-pressed','true');
  await page.locator('footer [data-lang=ru]').click();
  if(width<700){await page.locator('.menu-toggle').click();await expect(page.locator('#mobile-links')).toBeVisible();await page.mouse.click(5,300);await expect(page.locator('#mobile-links')).toBeHidden();}
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(300);
  await page.screenshot({path:`test-results/alfa-${width}.png`,fullPage:true});
  expect(errors).toEqual([]);await page.close();console.log(`Alfa ${width}: public route, assets, layout, scroll states, languages and real muted MP4 playback passed`);
 }
 const page=await browser.newPage({reducedMotion:'reduce'});await page.route('https://player.vimeo.com/**',route=>route.abort());await page.goto('http://localhost:5173/cases/alfa/');await expect(page.locator('.showcase-step[aria-hidden=false]')).toHaveCount(6);await page.close();
 console.log('Reduced motion passed');
}finally{await browser.close();}
