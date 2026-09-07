import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:5173');await p.evaluate(()=>document.fonts.ready);
await expect(p.locator('.project-surface').first()).toHaveCSS('border-top-width','0px');
const alpha=(x,y)=>p.evaluate(([x,y])=>document.querySelector('.background-ink').getContext('2d').getImageData(x,y,1,1).data[3],[x,y]);
await p.mouse.move(60,220);await p.mouse.down();await p.mouse.move(1300,220,{steps:1});await p.mouse.up();await p.waitForTimeout(100);
expect(await alpha(100,220)).toBeGreaterThan(0);expect(await alpha(720,220)).toBe(0);expect(await alpha(1300,220)).toBeGreaterThan(0);
await p.mouse.move(60,650);await p.mouse.down();await p.mouse.move(1350,650,{steps:1});await p.mouse.up();await p.waitForTimeout(100);expect(await alpha(500,650)).toBe(0);
await p.evaluate(()=>scrollTo({top:100,behavior:'instant'}));await p.waitForTimeout(100);expect(await alpha(100,120)).toBeGreaterThan(0);
await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(100);
await p.mouse.move(40,100);for(const x of [150,260,370,480])await p.mouse.move(x,100);
await p.waitForTimeout(200);const photos=await p.locator('.trail-photo').evaluateAll(els=>els.map(e=>e.dataset.photo));expect(photos.length).toBeGreaterThan(1);expect(photos.slice(0,3)).toEqual(['0','1','2']);
await p.screenshot({path:'test-results/background-trail.png'});
await p.waitForTimeout(2300);await expect(p.locator('.trail-photo')).toHaveCount(0);
expect(await alpha(100,220)).toBeGreaterThan(0);
await p.locator('[data-lang=en]').click();await expect(p.locator('.hero p')).toContainText('lately in B2C fintech');await expect(p.locator('#vtb h2')).toHaveText('Pension Fund Client Portal Redesign');
await p.reload();await p.waitForTimeout(100);expect(await alpha(100,220)).toBe(0);
expect(errors).toEqual([]);console.log('Passed: ink boundaries, fast crossings, scroll persistence, refresh reset, photo sequence/lifetime, English copy, borders');
}finally{await browser.close();}
