import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const base=process.env.TEST_BASE_URL||'http://localhost:5173';
const routes=['','about/','cases/alfa/','cases/nspk/','cases/vtb/','cases/wasd/'];
try {
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900}});
  await context.route('https://www.googletagmanager.com/**',r=>r.abort());
  await context.addInitScript(()=>sessionStorage.setItem('ndaAccess','true'));
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const lang of ['ru','en'])for(const route of routes){
   await page.goto(base+'/'+lang+'/'+route);
   await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://krawleek.site/'+lang+'/'+route);
   await expect(page.locator('link[hreflang]')).toHaveCount(2);
   const bad=await page.locator('a[href^="/"]').evaluateAll((links,lang)=>links.map(a=>a.getAttribute('href')).filter(h=>!h.startsWith('/'+lang+'/')&&!/^\/(ru|en)\//.test(h)),lang);
   expect(bad).toEqual([]);
   if(route==='')await expect(page.locator('.project')).toHaveCount(4);
   if(route.startsWith('cases/'))await expect(page.locator('.case-meta')).toContainText(lang==='ru'?'Команда':'Team');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const other=lang==='ru'?'en':'ru';
   await page.locator('a[data-lang="'+other+'"]').first().click();
   await expect(page).toHaveURL(base+'/'+other+'/'+route);
   await expect(page.locator('html')).toHaveAttribute('lang',other);
   await expect(page.locator('h1')).toBeVisible();
  }
  expect(errors).toEqual([]);await context.close();console.log(width+': 12 pages, links, metadata, language navigation passed');
 }
 const context=await browser.newContext();await context.route('https://www.googletagmanager.com/**',r=>r.abort());const page=await context.newPage();
 await page.goto(base+'/en/cases/nspk/');await expect(page).toHaveURL(base+'/en/');
 await expect(page.locator('.password-form')).toBeVisible();
 await page.locator('.password-form input').fill('121064');await page.locator('.password-form input').press('Enter');
 await expect(page).toHaveURL(base+'/en/cases/nspk/');await expect(page.locator('h1')).toContainText('National');
 await page.reload();await expect(page.locator('h1')).toContainText('National');
 await page.goto(base+'/#projects');await expect(page).toHaveURL(base+'/ru/#projects');
 await page.locator('a[data-lang="en"]').click();await expect(page).toHaveURL(base+'/en/#projects');
 await context.close();console.log('NDA language, reload and legacy anchor passed');
}finally{await browser.close();}
