import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const base=process.env.TEST_BASE_URL||'http://localhost:5173';
try{
 for(const width of [1440,1200,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:900}});await context.route('https://www.googletagmanager.com/**',r=>r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const lang of ['ru','en']){
   await page.goto(`${base}/${lang}/about/`);await page.evaluate(()=>document.fonts.ready);
   await expect(page.locator('h1')).toHaveText(lang==='ru'?'Елена Юнг':'Elena Jung');
   await expect(page.locator('.post')).toHaveCount(3);
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&(!i.complete||!i.naturalWidth)).map(i=>i.src)}));
   expect(state).toEqual({overflow:false,broken:[]});
   if([1440,390,320].includes(width))await page.screenshot({path:`/tmp/about-${lang}-${width}.png`,fullPage:true});
   await page.locator('[data-fact="mentoring"]').click();await expect(page.locator('#fact-mentoring')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#fact-mentoring')).toBeHidden();
   await page.locator('.cat-photo').click();await expect(page.locator('.photo-viewer')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.photo-viewer')).toBeHidden();
   await page.locator('.message-toggle').click();await expect(page.locator('#message')).toBeFocused();await page.locator('#message').fill('Hello');await page.keyboard.press('Escape');await expect(page.locator('#message-form')).toBeHidden();
   await page.locator('.home-sticker .fact-trigger').focus();await page.keyboard.press('ArrowRight');expect(await page.locator('.home-sticker').evaluate(e=>e.style.getPropertyValue('--drag-x'))).toBe('12px');await page.keyboard.press('Escape');
   await page.locator('.cue-ball').click();
   const other=lang==='ru'?'en':'ru';await page.locator(`[data-lang="${other}"]`).click();await expect(page).toHaveURL(`${base}/${other}/about/`);
   console.log(width,lang,'layout, assets, facts, photos, message, sticker, balls, language passed');
  }
  expect(errors).toEqual([]);await context.close();
 }
}finally{await browser.close();}
