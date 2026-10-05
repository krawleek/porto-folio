import {chromium, expect} from '@playwright/test';

const base = process.env.BASE_URL || 'http://localhost:5175';
const browser = await chromium.launch({channel:'chrome'});
try {
  const context = await browser.newContext();
  await context.route('**/mc.yandex.ru/**', route => route.abort());
  await context.addInitScript(() => sessionStorage.setItem('ndaAccess', 'true'));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  if (process.argv.includes('--banner')) {
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(`${base}/en/cases/wasd/`, {waitUntil:'domcontentloaded'});
    const banner = page.locator('.wasd-next');
    await banner.scrollIntoViewIfNeeded();
    await banner.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    console.log(await banner.locator('.wasd-next-art img').evaluateAll(images => images.map(img => ({
      src:img.getAttribute('src'), rect:img.getBoundingClientRect().toJSON(),
      css:getComputedStyle(img).cssText, opacity:getComputedStyle(img).opacity,
      z:getComputedStyle(img).zIndex, display:getComputedStyle(img).display
    }))));
    await banner.screenshot({path:'/tmp/verified-en-banner.png'});
    await browser.close();
    process.exit(0);
  }

  // Interrupt the first visit before its animation completes. Even when the
  // next document's application bundle is stalled, no loader may reappear.
  await page.goto(`${base}/ru/`, {waitUntil:'domcontentloaded'});
  await expect(page.locator('.site-loader')).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem('portfolio-loaded'))).toBe('true');
  await page.route('**/src/**', route => route.abort());
  await page.goto(`${base}/ru/about/`, {waitUntil:'domcontentloaded'});
  expect(await page.locator('html').getAttribute('class')).not.toContain('is-loading');
  await page.waitForTimeout(4700);
  await expect(page.locator('.site-loader')).toHaveCount(0);
  await page.unroute('**/src/**');
  await page.reload({waitUntil:'domcontentloaded'});
  expect(await page.locator('html').getAttribute('class')).not.toContain('is-loading');
  console.log('Interrupted first visit, stalled next bundle, and reload: passed');

  await page.emulateMedia({reducedMotion:'reduce'});
  for (const lang of ['ru','en']) for (const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:width > 700 ? 1000 : 844});
    for (const name of ['nspk','alfa','vtb','wasd']) {
      await page.goto(`${base}/${lang}/cases/${name}/`, {waitUntil:'domcontentloaded'});
      await expect(page.locator('.case-main')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.site-loader')).toHaveCount(0);
      const layout = await page.locator('.case-main').evaluate(main => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        gap: parseFloat(getComputedStyle(main).gap),
        top: parseFloat(getComputedStyle(main).paddingTop),
        body: [...main.querySelectorAll('.case-intro .case-lead, .findings article, .alfa-notes article')].map(el => {
          const style = getComputedStyle(el);
          return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
        })
      }));
      expect(layout.overflow, `${lang}/${name} ${width} overflow`).toBe(false);
      expect(layout.gap).toBe(width <= 700 ? 48 : 72);
      expect(layout.top).toBe(width <= 700 ? 48 : width <= 1100 ? 72 : 103);
      for (const leading of layout.body) expect(leading).toBeGreaterThanOrEqual(1.2);
      if (width === 1440 || width === 390) {
        await page.screenshot({path:`/tmp/refined-${lang}-${name}-${width}-intro.png`});
        const research = page.locator('.research-grid, .alfa-research').first();
        await research.scrollIntoViewIfNeeded();
        await page.screenshot({path:`/tmp/refined-${lang}-${name}-${width}-research.png`});
      }
      for (const img of await page.locator('img[src*="/case-refresh/"]').all()) {
        await img.evaluate(el => el.loading = 'eager');
        await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
        await img.evaluate(el => el.decode());
      }
      if (name === 'vtb' || name === 'wasd') {
        const banner = page.locator('.next-case');
        await banner.scrollIntoViewIfNeeded();
        await expect(banner).toHaveAttribute('href', `/${lang}/cases/${name === 'vtb' ? 'alfa' : 'nspk'}/`);
        if (width === 1440 || width === 390) await banner.screenshot({path:`/tmp/refined-${lang}-${name}-${width}-banner.png`});
      }
      if (lang === 'ru' && name === 'nspk' && (width === 1440 || width === 390)) {
        await page.locator('.nspk-hero').screenshot({path:`/tmp/refined-nspk-${width}-hero.png`});
      }
      console.log(`${lang}/${name} ${width}: passed`);
    }
  }
  // Increased leading must also fit the pinned, animated versions of the cases.
  await page.emulateMedia({reducedMotion:'no-preference'});
  for (const lang of ['ru','en']) for (const width of [1440,390,320]) {
    await page.setViewportSize({width,height:width === 320 ? 568 : 900});
    for (const name of ['alfa','vtb','wasd']) {
      await page.goto(`${base}/${lang}/cases/${name}/`, {waitUntil:'domcontentloaded'});
      await expect(page.locator('.showcase').first()).toBeVisible();
      for (const showcase of await page.locator('.showcase').all()) {
        const steps = await showcase.locator('.showcase-step').count();
        for (let step=0;step<steps;step++) {
          await showcase.evaluate((el, progress) => {
            const sticky = el.querySelector('.showcase-sticky');
            scrollTo({top:el.offsetTop+(el.offsetHeight-sticky.offsetHeight)*progress,behavior:'instant'});
          }, steps === 1 ? 0 : step/(steps-1));
          await expect(showcase).toHaveAttribute('data-step', String(step));
          const geometry = await showcase.evaluate(el => {
            const copy = el.querySelector('.showcase-copy').getBoundingClientRect();
            const screen = el.querySelector('.showcase-screen').getBoundingClientRect();
            return {copyBottom:copy.bottom,screenTop:screen.top,screenHeight:screen.height,viewport:innerHeight};
          });
          expect(geometry.copyBottom, `${lang}/${name} ${width} step ${step} text fits`).toBeLessThanOrEqual(geometry.viewport);
          if (width <= 700) {
            expect(geometry.screenTop).toBeGreaterThanOrEqual(geometry.copyBottom);
            expect(geometry.screenHeight).toBeGreaterThan(0);
          }
        }
      }
    }
  }
  console.log('Pinned case sections: passed');
  expect(errors).toEqual([]);
} finally {
  await browser.close();
}
