import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:width>700?1000:844}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/cases/nspk/');await expect(page.locator('.password-form')).toBeVisible();await expect(page).toHaveURL('http://localhost:5173/');
  await page.locator('.password-form input').fill('wrong');await page.locator('.password-form input').press('Enter');await expect(page.locator('.helper')).toHaveText('Пароль неверный');
  await page.locator('.password-form input').fill('121064');await page.locator('.password-form input').press('Enter');await expect(page).toHaveURL(/cases\/nspk\//);await expect(page.locator('h1')).toHaveText('Аудит национальной платежной системы');
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/nspk-${width}.png`,fullPage:true});
  const carousel=page.locator('.carousel');await carousel.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await expect(page.locator('[data-slide="0"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-slide="1"]')).toHaveAttribute('aria-pressed','true',{timeout:6500});
  await page.locator('[data-slide="2"]').click();await expect(page.locator('[data-slide="2"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('.carousel-next').click();await expect(page.locator('[data-slide="0"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('.carousel-viewport').focus();await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-slide="2"]')).toHaveAttribute('aria-pressed','true');
  for(const id of ['comparison-1','comparison-2']){
   const compare=page.locator('#'+id);await compare.scrollIntoViewIfNeeded();const box=await compare.boundingBox();
   await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.8,box.y+box.height*.5,{steps:10});await page.mouse.up();
   expect(Number(await compare.locator('input').inputValue())).toBeGreaterThan(75);
   await compare.locator('input').focus();await page.keyboard.press('Home');await expect(compare.locator('input')).toHaveValue('0');await page.keyboard.press('End');await expect(compare.locator('input')).toHaveValue('100');
  }
  await page.reload();await expect(page.locator('h1')).toBeVisible();await expect(page).toHaveURL(/cases\/nspk\//);
  await page.locator('.next-case').click();await expect(page).toHaveURL(/cases\/vtb\//);await expect(page.locator('.password-form')).toHaveCount(0);
  expect(errors).toEqual([]);await context.close();console.log(`Passed NSPK ${width}px: direct NDA gate, navigation, images, layout, 5s carousel, controls, two comparisons, session persistence`);
 }
}finally{await browser.close();}
