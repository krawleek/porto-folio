import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:800}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/about/');
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await expect(page.locator('.about-card:enabled')).toHaveCount(6);
  for(const topic of ['photography','writing','education']){
   const card=page.locator('[data-topic='+topic+']');
   await card.focus();await page.keyboard.press('Enter');
   expect(await page.locator('.about-scene').evaluate(el=>el.scrollTop)).toBe(0);
   await expect(page.locator('.about-dialog-flight')).toHaveCount(1);
   const flight=page.locator('.about-dialog-flight');
   await expect(flight.locator('img')).toHaveCSS('object-fit','contain');
   await expect(page.locator('.about-dialog-prose')).toHaveCSS('opacity','0');
   await expect(page.locator('.about-close')).toHaveCSS('opacity','0');
   if(topic==='writing')await expect(flight.locator('.flight-back')).toHaveCount(1);
   await page.waitForTimeout(300);
   await page.screenshot({path:`test-results/about-${width}-${topic}-flight.png`});
   await page.waitForFunction(()=>document.querySelector('.about-dialog').dataset.revealPhase==='text');
   await expect(page.locator('.about-close')).toHaveCSS('opacity','0');
   const translate=await page.locator('.about-dialog-prose').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
   expect(translate).toBeLessThanOrEqual(0);
   await expect(page.locator('.about-dialog')).toHaveAttribute('data-reveal-phase','ready');
   await expect(page.locator('.about-dialog-prose')).toHaveCSS('opacity','1');
   await expect(page.locator('.about-close')).toHaveCSS('opacity','1');
   await expect(card).toHaveCSS('visibility','hidden');
   await page.locator('.about-close').click();
   await expect(page.locator('.about-dialog')).not.toBeVisible();
   await expect(card).toHaveCSS('visibility','visible');
  }
  // Interrupting a flight must not leak an old reveal into the next opening.
  await page.locator('[data-topic=writing]').focus();await page.keyboard.press('Enter');
  await expect(page.locator('.about-dialog-flight')).toHaveCount(1);
  await page.keyboard.press('Escape');await expect(page.locator('.about-dialog')).not.toBeVisible();
  await page.locator('[data-topic=photography]').focus();await page.keyboard.press('Enter');
  await expect(page.locator('.about-dialog')).toHaveAttribute('data-reveal-phase','ready');
  await expect(page.locator('#about-dialog-title')).toHaveText('Фотография');
  await page.keyboard.press('Escape');await expect(page.locator('.about-dialog')).not.toBeVisible();
  await expect(page.locator('.about-dialog-flight')).toHaveCount(0);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('[data-topic=writing]').click();
  await expect(page.locator('.about-dialog-prose')).toHaveCSS('opacity','1');
  await expect(page.locator('.about-close')).toHaveCSS('opacity','1');
  expect(errors).toEqual([]);
  console.log('About reveal passed',width);await page.close();
 }
}finally{await browser.close();}
