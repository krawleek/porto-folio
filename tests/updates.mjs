import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
for(const width of [1440,390,320]){
const page=await browser.newPage({viewport:{width,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173');
await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
expect(await page.evaluate(()=>document.fonts.check('20px "Nina CTT"'))).toBe(true);
expect(await page.locator('.project-art img').evaluateAll(imgs=>imgs.every(i=>i.naturalWidth===2988))).toBe(true);
expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
if(width<700){
 await expect(page.locator('header')).toHaveCSS('position','fixed');
 await page.locator('.menu-toggle').click();await expect(page.locator('#mobile-links')).toBeVisible();
 await page.screenshot({path:`test-results/menu-${width}.png`});
 await page.mouse.click(10,250);await expect(page.locator('#mobile-links')).toBeHidden();
 await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toBeFocused();
 await page.locator('.menu-toggle').click();await page.locator('#mobile-links a[href="#projects"]').click();await expect(page.locator('#mobile-links')).toBeHidden();
}
await page.evaluate(()=>{const section=document.querySelector('#projects'),card=section.firstElementChild;scrollTo({top:section.offsetTop+3*(card.offsetHeight+(innerWidth<=700?12:16))-parseFloat(getComputedStyle(card).top)+5,behavior:'instant'});});
await page.waitForTimeout(200);
for(const id of ['vtb','nspk','alfa'])await expect(page.locator('#'+id)).toHaveCSS('opacity','0');
await expect(page.locator('#wasd')).toHaveCSS('opacity','1');
await page.screenshot({path:`test-results/stack-end-${width}.png`});
await page.locator('.contact-art').scrollIntoViewIfNeeded();
const box=await page.locator('.contact-art').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height*.65);await page.mouse.down();await page.waitForTimeout(850);
await expect(page.locator('.contact-art')).toHaveClass(/spinning/);
const first=await page.locator('.tilt-card').getAttribute('style');await page.mouse.up();await page.waitForTimeout(250);expect(await page.locator('.tilt-card').getAttribute('style')).not.toBe(first);
await expect(page.locator('.contact-art')).not.toHaveClass(/spinning/,{timeout:6000});
await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('#vtb')).toHaveCSS('opacity','1');
expect(errors).toEqual([]);await page.close();console.log(`Passed updates at ${width}px`);
}
}finally{await browser.close();}
