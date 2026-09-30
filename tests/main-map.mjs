import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
const base=process.env.TEST_BASE_URL||'http://localhost:5173';
for(const width of [1440,1200,1024,768,390,320]){
 const context=await browser.newContext({viewport:{width,height:1100}});await context.route('https://www.googletagmanager.com/**',r=>r.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const lang of ['ru','en']){
 await page.goto(base+'/'+lang+'/');await page.evaluate(()=>document.fonts.ready);await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
 await expect(page.locator('.project')).toHaveCount(4);
 const stats=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
 expect(stats.overflow).toBe(false);expect(stats.broken).toEqual([]);console.log(width,lang,JSON.stringify(stats));
 if([1440,390,320].includes(width))await page.screenshot({path:`/tmp/main-${lang}-${width}.png`,fullPage:true});
 if(await page.locator('.like-button').isEnabled())await page.locator('.like-button').click();await expect(page.locator('.like-button')).toBeDisabled();await expect(page.locator('.like-count')).toHaveText('1');
 await page.locator('#vtb .project-link').click();await expect(page.locator(width>=1100?'.password-popover':'#sheet')).toBeVisible();await page.locator('#case-password').fill('wrong');await page.locator('#case-password').press('Enter');await expect(page.locator('#case-password')).toHaveAttribute('aria-invalid','true');await page.keyboard.press('Escape');
 }
 await context.close();
}
expect(errors).toEqual([]);console.log('JS errors:',errors);
const context=await browser.newContext();await context.route('https://www.googletagmanager.com/**',r=>r.abort());
const page=await context.newPage();
await page.goto(base+'/en/?case=nspk');await expect(page.locator('.password-popover')).toBeVisible();
await page.locator('#case-password').fill('121064');await page.locator('#case-password').press('Enter');
await expect(page).toHaveURL(base+'/en/cases/nspk/');
await page.goto(base+'/ru/');await page.locator('[data-lang="en"]').click();await expect(page).toHaveURL(base+'/en/');
await page.locator('[data-email]').click();await expect(page.locator('.toast')).toContainText('Email copied');
await context.close();await browser.close();
