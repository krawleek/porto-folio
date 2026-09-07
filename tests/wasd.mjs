import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const width of [1440,390,320]){
 const page=await browser.newPage({viewport:{width,height:width===320?640:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:5173/cases/wasd/');await expect(page.locator('.password-form')).toBeVisible();await page.locator('.password-form input').fill('wrong');await page.locator('.password-form input').press('Enter');await expect(page.locator('.helper')).toHaveText('Пароль неверный');await page.locator('.password-form input').fill('121064');await page.locator('.password-form input').press('Enter');await expect(page).toHaveURL(/cases\/wasd\//);
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
 await expect(page.locator('body')).not.toContainText('undefined');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 for(const [id,count] of [['first-session',2],['xp-quests',3]])for(const step of [...Array(count).keys(),0]){
  await page.evaluate(({id,count,step})=>{const el=document.getElementById(id),sticky=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(sticky).top)+(el.offsetHeight-sticky.offsetHeight)*(step+.15)/count,behavior:'instant'});},{id,count,step});
  await expect(page.locator('#'+id)).toHaveAttribute('data-step',String(step));await expect(page.locator('#'+id+' .showcase-step.active')).toHaveCount(1);const box=await page.locator('#'+id+' .showcase-screen').boundingBox();expect(box.height).toBeGreaterThan(100);expect(box.y+box.height).toBeLessThanOrEqual((width===320?640:900)+1);
 }
 await page.locator('footer [data-lang=en]').click();await expect(page.locator('h1')).toHaveText('WASD onboarding redesign');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('footer [data-lang=ru]').click();
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`test-results/wasd-${width}.png`,fullPage:true});
 if(width<700){await page.locator('.menu-toggle').click();await expect(page.locator('#mobile-links')).toBeVisible();await page.mouse.click(5,300);await expect(page.locator('#mobile-links')).toBeHidden();}
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.showcase-step[aria-hidden=false]')).toHaveCount(5);
 await page.reload();await expect(page).toHaveURL(/cases\/wasd\//);await page.locator('.next-case').click();await expect(page).toHaveURL(/cases\/nspk\//);await expect(page.locator('.password-form')).toHaveCount(0);expect(errors).toEqual([]);await page.close();console.log(`WASD ${width}: gate, images, five scroll states, language, layout, reduced motion and next case passed`);
}}finally{await browser.close();}
