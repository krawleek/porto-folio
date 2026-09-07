import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  for(const [width,height] of [[1440,800],[1024,768],[390,800],[320,640],[844,390]]) {
    const page=await browser.newPage({viewport:{width,height}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://localhost:5173/about/');
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode()));});
    for(const lang of ['ru','en']) {
      await page.locator('[data-lang='+lang+']').click();
      for(const p of [0,.15,.25,.4,.55,.65,.75,.85,1]) {
        await page.evaluate(p=>scrollTo({top:(document.querySelector('.about-story').offsetHeight-innerHeight)*p,behavior:'instant'}),p);
        await page.waitForTimeout(80);
        const layout=await page.evaluate(()=>{
          const rect=el=>{const b=el.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom};};
          return {overflow:document.documentElement.scrollWidth>innerWidth,cards:[...document.querySelectorAll('.about-card')].map(rect),text:[...document.querySelectorAll('.about-copy')].filter(el=>+getComputedStyle(el).opacity>.05).map(rect)};
        });
        expect(layout.overflow).toBe(false);
        if(p===0||p===1)expect(layout.cards.some(card=>card.y<height&&card.bottom>height)).toBe(true);
        for(const card of layout.cards) {

          for(const text of layout.text)expect(card.x>=text.right||card.right<=text.x||card.y>=text.bottom||card.bottom<=text.y,`overlap ${width} ${lang} ${p}`).toBe(true);
        }
      }
    }
    await page.locator('[data-lang=ru]').click();
    await expect(page.locator('.about-card:enabled')).toHaveCount(6);
    await page.screenshot({path:`test-results/about-${width}-fan.png`});
    const position=await page.evaluate(()=>scrollY);
    for(const topic of ['mentoring','challenges','photography','writing','education','research']) {
      const card=page.locator('[data-topic="'+topic+'"]');
      // Keyboard access also checks that every overlapping fan card is reachable.
      await card.focus();await page.keyboard.press('Enter');
      await expect(page.locator('.about-dialog')).toBeVisible();
      await expect(page.locator('#about-dialog-title')).toHaveText(await card.getAttribute('aria-label'));
      await page.waitForTimeout(260);
      await page.keyboard.press('Tab');
      expect(await page.evaluate(()=>document.querySelector('.about-dialog').contains(document.activeElement))).toBe(true);
      if(topic==='writing')await expect(page.locator('.about-posts a')).toHaveCount(4);
      if(topic==='mentoring')await page.screenshot({path:`test-results/about-${width}-dialog.png`});
      if(topic==='education')await page.mouse.click(2,60);
      else if(topic==='research')await page.locator('.about-close').click();
      else await page.keyboard.press('Escape');
      await expect(page.locator('.about-dialog')).not.toBeVisible();
      expect(await page.evaluate(()=>scrollY)).toBe(position);
      await expect(card).toBeFocused();
    }
    if(width<700) {
      await page.locator('[data-topic=writing]').focus();await page.keyboard.press('Enter');await page.waitForTimeout(270);
      const handle=await page.locator('.about-sheet-handle').boundingBox();
      await page.mouse.move(width/2,handle.y+12);await page.mouse.down();await page.mouse.move(width/2,handle.y+130,{steps:8});await page.mouse.up();
      await expect(page.locator('.about-dialog')).not.toBeVisible();
    }
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(80);await expect(page.locator('.about-card:disabled')).toHaveCount(6);
    await page.emulateMedia({reducedMotion:'reduce'});
    await expect(page.locator('.about-copy[aria-hidden=false]')).toHaveCount(3);
    await expect(page.locator('.about-card:enabled')).toHaveCount(6);
    await page.locator('[data-topic=research]').click();await expect(page.locator('.about-dialog')).toBeVisible();await page.keyboard.press('Escape');
    expect(errors).toEqual([]);
    console.log('About passed',width,height);await page.close();
  }
} finally {await browser.close();}
