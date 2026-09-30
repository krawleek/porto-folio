import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await context.route('https://www.googletagmanager.com/**',r=>r.abort());
 const page=await context.newPage();await page.goto('http://localhost:5173/ru/about/');await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
 const sticker=page.locator('.home-sticker .fact-trigger');await sticker.scrollIntoViewIfNeeded();
 const cdp=await context.newCDPSession(page);
 async function swipe(x,y,dx,dy){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y:y+dy*i/8}]});await page.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 let r=await sticker.boundingBox();await swipe(r.x+r.width/2,r.y+r.height/2,65,0);
 expect(parseFloat(await page.locator('.home-sticker').evaluate(e=>e.style.getPropertyValue('--drag-x')))).toBeGreaterThan(40);
 r=await sticker.boundingBox();const before=await page.evaluate(()=>scrollY);await swipe(r.x+r.width/2,r.y+r.height/2,0,-120);await page.waitForTimeout(300);expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(before+30);
 await page.locator('[data-fact="mentoring"]').tap();await expect(page.locator('#fact-mentoring')).toBeVisible();await page.locator('.photography h2').tap();await expect(page.locator('#fact-mentoring')).toBeHidden();
 await page.locator('.message-toggle').tap();await expect(page.locator('#message-form')).toBeVisible();
 await context.close();
 const reduced=await browser.newContext({reducedMotion:'reduce'});const rp=await reduced.newPage();await rp.goto('http://localhost:5173/en/about/');await rp.locator('.cue-ball').click();await expect(rp.locator('.toast')).toHaveText('Nice shot!');await reduced.close();
 console.log('Chromium touch: sticker drag, vertical page scroll, fact and form taps; reduced motion passed');
}finally{await browser.close();}
