// Generate lossless delivery assets; originals are never overwritten.
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';

const pages=['ru','en'].flatMap(lang=>[`${lang}/index.html`,...['alfa','wasd','nspk','vtb'].map(name=>`${lang}/cases/${name}/index.html`)]);
try { await fs.access('design/image-delivery.json'); throw new Error('Delivery manifest already exists. Use finalize-image-delivery.mjs to refine existing candidates.'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const out='public/assets/responsive';
await fs.mkdir(out,{recursive:true});
const cache=new Map(),report={encoding:'WebP lossless; original pixels at native width; Lanczos3 for smaller variants',assets:[],pages:{}};
const full='(max-width:700px) calc(100vw - 40px), (max-width:1100px) calc(100vw - 64px), (max-width:1440px) calc(100vw - 120px), 1320px';
const attr=(tag,key)=>tag.match(new RegExp(`\\s${key}="([^"]*)"`))?.[1];
const set=(tag,key,value)=>new RegExp(`\\s${key}="[^"]*"`).test(tag)?tag.replace(new RegExp(`\\s${key}="[^"]*"`),` ${key}="${value}"`):tag.replace(/\s*\/?>$/,` ${key}="${value}">`);
const voids=new Set(['img','input','meta','link','br','hr','source','area','base','embed','param','track','wbr']);
function scaleSizes(k){return `(max-width:599px) calc(${(100*k).toFixed(3)}vw - ${(52*k).toFixed(3)}px), (max-width:1099px) calc(${(50*k).toFixed(3)}vw - ${(64*k).toFixed(3)}px), (max-width:1399px) ${(25*k).toFixed(3)}vw, ${Math.ceil(333*k)}px`;}
function sizesFor(tag,ancestors,main){
 const c=ancestors.map(a=>a.cls).join(' '),cl=attr(tag,'class')||'';
 if(main){
  if(c.includes('project-art')){let k=1;if(c.includes('alfa'))k=1.3839;else if(c.includes('wasd'))k=2.4328;else if(c.includes('vtb'))k=1.3239;return scaleSizes(k);}
  return '400px';
 }
 if(c.includes('alfa-gallery'))return '(max-width:700px) 140px, (max-width:1440px) calc((100vw - 300px) / 8), 145px';
 if(c.includes('alfa-article-image'))return '(max-width:700px) calc(100vw - 40px), (max-width:1100px) calc((100vw - 96px) / 3), (max-width:1440px) calc((100vw - 160px) / 3), 427px';
 if(c.includes('showcase-image'))return '(max-width:700px) calc(85vw - 34px), (max-width:1440px) 48vw, 650px';
 if(c.includes('alfa-award-art'))return '(max-width:700px) 73vw, (max-width:1440px) 40vw, 557px';
 if(c.includes('vtb-next-art'))return '(max-width:700px) calc(72vw - 29px), (max-width:1440px) calc(49vw - 59px), 645px';
 if(c.includes('wasd-next-art'))return '(max-width:700px) calc(125vw - 50px), (max-width:1440px) calc(73vw - 88px), 958px';
 if(c.includes('nspk-next-art'))return '(max-width:700px) 110vw, (max-width:1440px) 60vw, 800px';
 if(cl.includes('nspk-hero-screen'))return '(max-width:700px) calc(56vw - 22px), (max-width:1440px) 56vw, 734px';
 return full;
}
async function derivatives(url){
 if(cache.has(url))return cache.get(url);
 const data=await fs.readFile('public'+url),meta=await sharp(data).metadata();
 const hash=crypto.createHash('sha256').update(data).digest('hex').slice(0,16);
 const widths=[...new Set([640,1280,2560,meta.width].filter(w=>w<=meta.width))].sort((a,b)=>a-b);
 const variants=[];
 for(const width of widths){
  const file=`${out}/${hash}-${width}.webp`;
  let image=sharp(data);if(width<meta.width)image=image.resize({width,withoutEnlargement:true,kernel:'lanczos3'});
  try{await fs.access(file);}catch{await image.webp({lossless:true,effort:4}).toFile(file);}
  variants.push({url:file.slice(6),width,bytes:(await fs.stat(file)).size});
 }
 // Do not replace the native file with a larger encoding.
 if(variants.at(-1).bytes>=data.length)variants[variants.length-1]={url,width:meta.width,bytes:data.length};
 const result={original:url,originalBytes:data.length,width:meta.width,height:meta.height,variants};cache.set(url,result);report.assets.push(result);
 console.log(`${url}: ${Math.round(data.length/1000)} KB → ${variants.map(v=>`${v.width}w:${Math.round(v.bytes/1000)} KB`).join(', ')}`);
 return result;
}
for(const file of pages){
 const source=await fs.readFile(file,'utf8'),main=/^(ru|en)\/index/.test(file);const stack=[],edits=[];report.pages[file]=[];
 for(const match of source.matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)){
  let tag=match[0],name=match[1].toLowerCase();if(tag.startsWith('</')){const i=stack.map(a=>a.name).lastIndexOf(name);if(i>=0)stack.splice(i);continue;}
  if(name==='img'){
   const url=attr(tag,'src');
   if(url?.startsWith('/assets/')&&/\.(png|jpe?g)$/i.test(url)&&!attr(tag,'srcset')){
    const result=await derivatives(url),sizes=sizesFor(tag,stack,main),fallback=result.variants.find(v=>v.width>=1280)||result.variants.at(-1);
    tag=set(set(set(tag,'src',fallback.url),'srcset',result.variants.map(v=>`${v.url} ${v.width}w`).join(', ')),'sizes',sizes);
    tag=set(tag,'decoding','async');report.pages[file].push({original:url,sizes});
   }
   if(main&&stack.some(a=>/\b(project|toolbox)\b/.test(a.cls)))tag=set(tag,'loading','lazy');
   if(stack.some(a=>/\bcase-intro\b/.test(a.cls))){tag=set(tag,'loading','eager');tag=set(tag,'fetchpriority','high');}
   if((attr(tag,'class')||'').includes('video-poster'))tag=set(tag,'loading','lazy');
   if(tag!==match[0])edits.push({start:match.index,end:match.index+match[0].length,tag});
  }
  if(!voids.has(name)&&!tag.endsWith('/>'))stack.push({name,cls:attr(tag,'class')||''});
 }
 edits.reverse();
 let updated=source;for(const e of edits)updated=updated.slice(0,e.start)+e.tag+updated.slice(e.end);
 await fs.writeFile(file,updated);
}
// Native video poster is not responsive. Use the responsive overlay for both videos.
for(const lang of ['ru','en']){
 const file=`${lang}/cases/alfa/index.html`;let html=await fs.readFile(file,'utf8');
 const matches=[...html.matchAll(/<video\b[^>]*>/g)];
 for(const match of matches.reverse()){
  const poster=attr(match[0],'poster');if(!poster)continue;
  const data=await derivatives(poster),fallback=data.variants.find(v=>v.width>=1280)||data.variants.at(-1);
  let tag=match[0].replace(/\sposter="[^"]*"/,'').replace(/\spreload="[^"]*"/,' preload="none"').replace(/\ssrc="([^"]*)"/,' data-src="$1"').replace(/\sautoplay="[^"]*"/,'');
  const first=html.slice(0,match.index).lastIndexOf('video-poster')<html.slice(0,match.index).lastIndexOf('<div class="alfa-video">');
  if(first)tag=`<img class="video-poster" src="${fallback.url}" srcset="${data.variants.map(v=>`${v.url} ${v.width}w`).join(', ')}" sizes="${full}" alt="" aria-hidden="true" decoding="async" fetchpriority="high">`+tag;
  html=html.slice(0,match.index)+tag+html.slice(match.index+match[0].length);
 }
 await fs.writeFile(file,html);
}
await fs.writeFile('design/image-delivery.json',JSON.stringify(report,null,2)+'\n');
