import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1100}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173/ru/');await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
async function drag(selector){const item=page.locator(selector),before=await item.boundingBox();await page.mouse.move(before.x+before.width/2,before.y+40);await page.mouse.down();await page.mouse.move(before.x+before.width/2-45,before.y+70,{steps:8});await page.mouse.up();const after=await item.boundingBox();expect(Math.abs(after.x-before.x)).toBeGreaterThan(30);}
for(const selector of ['.about-link','.projects-link','.toolbox']){
 const item=page.locator(selector),before=await item.boundingBox();
 await page.mouse.move(before.x+before.width/2,before.y+before.height/2);await page.mouse.down();await page.mouse.move(before.x+before.width/2+35,before.y+before.height/2+20,{steps:8});await page.mouse.up();
 const after=await item.boundingBox();expect(after.x-before.x).toBeGreaterThan(30);
 await expect(page).toHaveURL('http://localhost:5173/ru/');
}
await drag('#vtb');await expect(page.locator('.password-popover')).toBeHidden();
await drag('#vtb .badge');await expect(page).toHaveURL('http://localhost:5173/ru/');
const card=await page.locator('#vtb .project-link').boundingBox();const click={x:card.x+60,y:card.y+90};
await page.mouse.click(click.x,click.y);await expect(page.locator('.password-popover')).toBeVisible();
const field=await page.locator('.password-popover').boundingBox();expect(Math.abs(field.x-click.x-8)).toBeLessThan(2);expect(Math.abs(field.y-click.y-8)).toBeLessThan(2);await page.keyboard.press('Escape');
await page.locator('.like-button').click();await expect(page.locator('.like-count')).toHaveText('1');await page.reload();await expect(page.locator('.like-button')).toBeDisabled();
await page.locator('[data-lang=en]').click();await expect(page).toHaveURL('http://localhost:5173/en/');await expect(page.locator('.like-button')).toBeDisabled();
await expect(page.locator('html')).not.toHaveClass(/language-enter/);
expect(await page.locator('body').evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
await expect.poll(()=>page.locator('html').evaluate(e=>getComputedStyle(e,'::after').opacity)).toBe('0');
await page.screenshot({path:'/tmp/main-cutout-desktop.png',fullPage:true});
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/main-cutout-mobile.png',fullPage:true});
await page.setViewportSize({width:1440,height:1100});
await page.goto('http://localhost:5173/ru/about/');await drag('.cat-photo');await expect(page.locator('.photo-viewer')).not.toBeVisible();
await page.locator('.cat-photo').click();await expect(page.locator('.photo-viewer')).toBeVisible();await page.keyboard.press('Escape');
expect(errors).toEqual([]);console.log('Drag, click separation, password, session counter and language navigation passed.');await browser.close();
