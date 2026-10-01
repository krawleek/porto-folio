import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome'});
try{
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>sessionStorage.setItem('ndaAccess','true'));
for(const lang of ['ru','en'])for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});await page.goto(`http://localhost:5173/${lang}/cases/nspk/`);await expect(page.locator('.case-main')).toBeVisible();
 await expect(page.locator('.carousel')).toHaveCount(2);
 for(const carousel of await page.locator('.carousel').all()){
  await carousel.scrollIntoViewIfNeeded();await carousel.locator('.carousel-next').click();await expect(carousel.locator('[data-slide="1"]')).toHaveAttribute('aria-pressed','true');
  await expect(carousel.locator('.carousel-status')).toContainText(lang==='en'?'Slide 2 of':'Слайд 2 из');
 }
 for(const comparison of await page.locator('.comparison').all()){
  await comparison.scrollIntoViewIfNeeded();const input=comparison.locator('input');const box=await input.boundingBox();await page.mouse.move(box.x+box.width*.7,box.y+box.height/2);await page.mouse.down();expect(await comparison.evaluate(e=>getComputedStyle(e).outlineStyle)).toBe('none');await page.mouse.move(box.x+box.width*.3,box.y+box.height/2);await page.mouse.up();expect(Number(await input.inputValue())).toBeLessThan(35);await input.press('ArrowRight');expect(await comparison.evaluate(e=>getComputedStyle(e).outlineStyle)).toBe('solid');
 }
 for(const img of await page.locator('.case-main img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const [name,selector] of [['intro','.case-intro'],['decision','.decision-carousel'],['banner','.next-case'],['comparison','#comparison-1']]){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.locator(selector).screenshot({path:`/tmp/nspk-${lang}-${width}-${name}.png`});}
 console.log(lang,width,'passed');
}
expect(errors).toEqual([]);
}finally{await browser.close();}
