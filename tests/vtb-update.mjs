import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome'});
try{const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>sessionStorage.setItem('ndaAccess','true'));
for(const lang of ['ru','en'])for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});await page.goto(`http://localhost:5173/${lang}/cases/vtb/`);await expect(page.locator('.vtb-main')).toBeVisible();
 await page.locator('.carousel').scrollIntoViewIfNeeded();await page.locator('.carousel-next').click();await expect(page.locator('[data-slide="1"]')).toHaveAttribute('aria-pressed','true');
 for(const showcase of await page.locator('.showcase').all()){
 await showcase.evaluate(e=>window.scrollTo({top:e.offsetTop+100,behavior:'instant'}));await page.waitForTimeout(500);
 await showcase.evaluate(e=>window.scrollTo({top:e.offsetTop+(e.offsetHeight-e.querySelector('.showcase-sticky').offsetHeight)*.8,behavior:'instant'}));await expect(showcase).toHaveAttribute('data-step','1');
 }
 for(const img of await page.locator('.vtb-main img').all()){await img.evaluate(e=>e.loading='eager');await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const [name,selector] of [['intro','.case-intro'],['research','.vtb-research'],['banner','.vtb-next']]){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(1200);await page.screenshot({path:`/tmp/vtb-${lang}-${width}-${name}.png`});}
 console.log(lang,width,'passed');
}
expect(errors).toEqual([]);
}finally{await browser.close();}
