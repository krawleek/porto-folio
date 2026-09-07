import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  const page=await browser.newPage({viewport:{width:390,height:800},hasTouch:true,isMobile:true});
  await page.goto('http://localhost:5173/');
  await page.locator('.menu-toggle').click();
  await page.locator('#mobile-links a[href="/about/"]').tap();
  await expect(page).toHaveURL(/about\//);
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await expect(page.locator('.about-card:enabled')).toHaveCount(6);
  for(const id of ['mentoring','challenges','photography','writing','education','research']) {
    const point=await page.evaluate(id=>{
      const el=document.querySelector('[data-topic='+id+']'),r=el.getBoundingClientRect();
      for(let y=r.top+5;y<r.bottom;y+=4)for(let x=r.left+5;x<r.right;x+=4)
        if(document.elementFromPoint(x,y)?.closest('.about-card')===el)return{x,y};
    },id);
    expect(point,'Exposed touch area: '+id).toBeTruthy();
    await page.touchscreen.tap(point.x,point.y);
    await expect(page.locator('.about-dialog')).toBeVisible();
    await page.waitForTimeout(260);
    await page.locator('.about-close').tap();
    await expect(page.locator('.about-dialog')).not.toBeVisible();
  }
  await page.locator('[data-topic=writing]').focus();await page.keyboard.press('Enter');
  await page.waitForTimeout(260);
  const y=(await page.locator('.about-dialog-prose').boundingBox()).y+75;
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:170,y}]});
  for(let d=10;d<=120;d+=10)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:170,y:y+d}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect(page.locator('.about-dialog')).not.toBeVisible();
  await page.goto('http://localhost:5173/cases/alfa/');
  await page.locator('.menu-toggle').click();
  await page.locator('#mobile-links a[href="/about/"]').tap();
  await expect(page).toHaveURL(/about\//);
  console.log('About touch gestures and navigation passed');
} finally {await browser.close();}
