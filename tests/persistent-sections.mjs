import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390])for(const start of ['main','about']){
  const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://localhost:5173/ru/${start==='about'?'about/':''}`);await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
  await page.evaluate(()=>{window.originalCard=document.querySelector('.profile');window.originalMe=document.querySelector('.about-link');window.originalWork=document.querySelector('.projects-link');});
  const rect=await page.locator('.profile').boundingBox();
  for(let i=0;i<4;i++){
   const about=(start==='main')===(i%2===0);
   await page.locator(about?'.about-link':'.projects-link').click();
   await expect(page).toHaveURL(`http://localhost:5173/ru/${about?'about/':''}`);
   await expect.poll(()=>page.evaluate(()=>document.querySelectorAll('[data-board-section] :scope').length>=0)).toBe(true);
   expect(await page.evaluate(()=>window.originalCard===document.querySelector('.profile')&&window.originalMe===document.querySelector('.about-link')&&window.originalWork===document.querySelector('.projects-link'))).toBe(true);
   const after=await page.locator('.profile').boundingBox();expect(after.x).toBeCloseTo(rect.x,0);expect(after.y).toBeCloseTo(rect.y,0);expect(after.height).toBeCloseTo(rect.height,0);
   await expect(page.locator(about?'.education-fact':'.projects')).toBeVisible();
   await expect(page.locator(about?'.projects':'.education-fact')).toBeHidden();
   await page.waitForTimeout(350);
  }
  expect(errors).toEqual([]);console.log(width,start,'same card and nodes across four switches');await page.close();
 }
}finally{await browser.close();}
