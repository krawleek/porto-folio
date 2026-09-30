import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const language of ['ru','en']){
  await page.goto(`http://localhost:5173/${language}/about/`);await expect(page.locator('.site-loader')).toHaveCount(0,{timeout:6000});
  await expect(page.locator('.billiards-dialog')).toHaveCount(0);
  for(const fact of ['education','mentoring','challenges']){
   const button=page.locator(`[data-fact=${fact}]`),r=await button.boundingBox();
   await page.mouse.move(r.x+r.width/2,r.y+r.height/2);const note=page.locator(`#fact-${fact}`);await expect(note).toBeVisible();
   const first=await note.boundingBox();await page.mouse.move(r.x+r.width/2+8,r.y+r.height/2+8);const second=await note.boundingBox();expect(second.x).toBeCloseTo(Math.min(r.x+r.width/2+8+14,1440-second.width-12),0);expect(second.y).toBeCloseTo(Math.min(r.y+r.height/2+8+20,1100-second.height-12),0);
   await page.mouse.move(20,20);await expect(note).toBeHidden();
  }
  const yellow=page.locator('.yellow-ball'),before=await yellow.boundingBox();await page.locator('.cue-ball').click();
  await expect.poll(async()=>Math.abs((await yellow.boundingBox()).x-before.x)).toBeGreaterThan(15);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await page.locator('.message-toggle').click();await page.locator('#message').fill('Test draft');
  expect(await page.locator('#message').evaluate(e=>getComputedStyle(e).outlineStyle)).toBe('none');
  await expect(page.locator('.message-send')).toBeVisible();await expect(page.locator('.message-form .confirm')).toHaveCount(0);
  // Do not store test messages in the owner's real local inbox.
  await page.route('**/api/letters.php',route=>route.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'}));
  await page.locator('.message-send').click();await expect(page.locator('#message-form')).toBeHidden();await expect(page.locator('.toast')).toContainText(language==='ru'?'отправлено':'sent');
  await page.mouse.click(20,20);await page.mouse.move(20,850);await page.mouse.down();await page.mouse.move(90,890,{steps:12});await page.mouse.up();
  const ink=await page.locator('.background-ink').evaluate(canvas=>canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((value,index)=>index%4===3&&value>0));expect(ink).toBe(true);
  console.log(language,'hover notes, collisions, message UI and drawing passed');
 }
 expect(errors).toEqual([]);
}finally{await browser.close();}
