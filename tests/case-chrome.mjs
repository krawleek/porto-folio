import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>sessionStorage.setItem('ndaAccess','true'));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const lang of ['ru','en'])for(const name of ['vtb','nspk','wasd','alfa']){
   await page.goto(`http://localhost:5173/${lang}/cases/${name}/`);await expect(page.locator('body > .case-header, #case-root > .case-header')).toBeVisible();
   await expect(page.locator('.mobile-nav')).toHaveCount(0);await expect(page.locator('.desktop-nav')).toHaveCount(0);
   expect(await page.locator('footer').evaluate(e=>getComputedStyle(e).backgroundImage)).toBe('none');
   expect(await page.locator('footer').evaluate(e=>getComputedStyle(e).color)).toBe('rgb(16, 16, 18)');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   console.log(width,lang,name,'header and footer passed');
  }
 }
 expect(errors).toEqual([]);
 await page.goto('http://localhost:5173/en/about/');await expect(page.locator('.writing-icons a[href="https://t.me/eenache"]')).toHaveCount(0);
 await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content','Elena Jung — Portfolio');
 await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content',/lately in B2C fintech\./);
 await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content','https://porto-folio-fawn.vercel.app/opengraph.png');
}finally{await browser.close();}
