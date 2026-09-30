import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const shared=['.profile','.profile-copy','.location','.about-link','.projects-link'];
 const measure=()=>page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [selector,[r.x,r.y,r.width,r.height]];})),shared);
 for(const width of [1440,1200,768,390,320]){
  await page.setViewportSize({width,height:1100});
  for(const lang of ['ru','en']){
   await page.goto(`http://localhost:5173/${lang}/`);await page.evaluate(()=>document.fonts.ready);await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
   const main=await measure();await page.locator('.about-link').click();await expect(page).toHaveURL(`http://localhost:5173/${lang}/about/`);await page.evaluate(()=>document.fonts.ready);
   const about=await measure();for(const selector of shared)for(let i=0;i<4;i++)expect(Math.abs(main[selector][i]-about[selector][i]),`${width} ${lang} ${selector} coordinate ${i}`).toBeLessThan(1);
   await expect(page.locator('html')).not.toHaveClass(/language-enter|language-leave/);
   await page.locator('.projects-link').click();await expect(page).toHaveURL(`http://localhost:5173/${lang}/`);
   console.log(width,lang,'shared geometry stable in both directions');
  }
 }
 expect(errors).toEqual([]);
}finally{await browser.close();}
