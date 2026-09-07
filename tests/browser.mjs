import {chromium,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
await mkdir('test-results',{recursive:true});
const errors=[];
try{
 for(const width of [1440,1024,390,320]){
  const context=await browser.newContext({viewport:{width,height:width>700?1000:844},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173');await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
  await page.screenshot({path:`test-results/${width}.png`,fullPage:true});
  await page.locator('#vtb .project-link').click({position:{x:80,y:100}});
  const form=width<=700?page.locator('#sheet .password-form'):page.locator('#vtb .password-form');
  await expect(form).toBeVisible();await expect(form.locator('input')).toBeFocused();
  await form.locator('input').fill('wrong');await form.locator('input').press('Enter');await expect(form.locator('.helper')).toHaveText('Пароль неверный');
  await page.screenshot({path:`test-results/${width}-password.png`});
  await form.locator('input').fill('121064');await form.locator('input').press('Enter');await expect(page).toHaveURL(/cases\/vtb\//);
  expect(await page.evaluate(()=>sessionStorage.getItem('ndaAccess'))).toBe('true');
  await page.goto('http://localhost:5173');
  await page.locator('#nspk .project-link').click({position:{x:80,y:100}});await expect(page).toHaveURL(/cases\/nspk\//);await expect(page.locator('.password-form')).toHaveCount(0);
  await page.goto('http://localhost:5173');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.locator('[data-lang=en]').click();await expect(page.locator('h1')).toHaveText('Elena Jung');await page.locator('[data-lang=ru]').click();
  await page.locator('.hero [data-email]').click();await expect(page.locator('.toast')).toContainText('Почта скопирована');
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('krawleek@yandex.ru');
  await page.evaluate(()=>scrollTo({top:1300,behavior:'instant'}));await page.waitForTimeout(150);expect(await page.locator('#vtb').evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');
  await page.screenshot({path:`test-results/${width}-stack.png`});
  await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('#vtb')).toHaveCSS('position','relative');
  await context.close();console.log(`Passed: ${width}px, images, overflow, NDA error/success/session, language, clipboard, stacking, reduced motion`);
 }
 expect(errors).toEqual([]);
}finally{await browser.close();}
