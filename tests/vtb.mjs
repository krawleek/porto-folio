import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const width of [1440,390,320]){
 const page=await browser.newPage({viewport:{width,height:width===320?640:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:5173/cases/vtb/');await expect(page.locator('.password-form')).toBeVisible();await page.locator('.password-form input').fill('121064');await page.locator('.password-form input').press('Enter');await expect(page).toHaveURL(/cases\/vtb\//);await expect(page.locator('h1')).toContainText('ВТБ');
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('body')).not.toContainText('undefined');
 await page.locator('.carousel').scrollIntoViewIfNeeded();await page.mouse.move(0,0);await expect(page.locator('[data-slide="1"]')).toHaveAttribute('aria-pressed','true',{timeout:6500});await page.locator('[data-slide="2"]').click();await expect(page.locator('[data-slide="2"]')).toHaveAttribute('aria-pressed','true');await page.locator('.carousel-next').click();await expect(page.locator('[data-slide="0"]')).toHaveAttribute('aria-pressed','true');
 for(const id of ['savings-model','savings-goals','contextual-actions'])for(const [progress,step] of [[0,0],[.7,1],[.2,0]]){
  await page.evaluate(({id,progress})=>{const el=document.getElementById(id),sticky=el.firstElementChild;scrollTo({top:scrollY+el.getBoundingClientRect().top-parseFloat(getComputedStyle(sticky).top)+(el.offsetHeight-sticky.offsetHeight)*progress,behavior:'instant'});},{id,progress});
  await expect(page.locator('#'+id)).toHaveAttribute('data-step',String(step));const box=await page.locator('#'+id+' .showcase-screen').boundingBox();expect(box.height).toBeGreaterThan(100);expect(box.y+box.height).toBeLessThanOrEqual((width===320?640:900)+1);
 }
 await page.locator('footer [data-lang=en]').click();await expect(page.locator('h1')).toHaveText('Designing the VTB Pension Fund customer portal');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('footer [data-lang=ru]').click();
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`test-results/vtb-${width}.png`,fullPage:true});
 await page.reload();await expect(page).toHaveURL(/cases\/vtb\//);await page.locator('.next-case').click();await expect(page).toHaveURL(/cases\/alfa\//);expect(errors).toEqual([]);await page.close();console.log(`VTB ${width}: gate, carousel, six scroll states, languages, layout and navigation passed`);
}}finally{await browser.close();}
