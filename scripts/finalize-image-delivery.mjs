// Refine delivery candidates and defer inactive media. Does not modify originals.
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';
const report=JSON.parse(await fs.readFile('design/image-delivery.json','utf8'));
const lookup=new Map();
for(const asset of report.assets){
 lookup.set(asset.original,asset);
 for(const v of asset.variants)lookup.set(v.url,asset);
 const slots=Object.values(report.pages).flat().filter(s=>s.original===asset.original).map(s=>s.sizes);
 const widths=new Set();
 if(slots.some(s=>s.includes('145px')||s.includes('427px')))widths.add(320);
 if(asset.original.includes('/main-en/')){widths.add(960);widths.add(1920);}
 if(slots.some(s=>s.endsWith('1320px'))||asset.original.endsWith('/alfa-cover.png')){widths.add(1320);widths.add(2640);}
 for(const width of widths){
  if(width>=asset.width||asset.variants.some(v=>v.width===width))continue;
  const data=await fs.readFile('public'+asset.original);
  const hash=crypto.createHash('sha256').update(data).digest('hex').slice(0,16);
  const url=`/assets/responsive/${hash}-${width}.webp`;
  try{await fs.access('public'+url);}catch{await sharp(data).resize({width,withoutEnlargement:true,kernel:'lanczos3'}).webp({lossless:true,effort:4}).toFile('public'+url);}
  asset.variants.push({url,width,bytes:(await fs.stat('public'+url)).size});
 }
 asset.variants.sort((a,b)=>a.width-b.width);
 asset.variants=asset.variants.filter((v,i,all)=>!all.slice(i+1).some(larger=>larger.bytes<=v.bytes));
 for(const v of asset.variants)lookup.set(v.url,asset);
}
const attr=(tag,key)=>tag.match(new RegExp(`\\s${key}="([^"]*)"`))?.[1];
const set=(tag,key,value)=>tag.replace(new RegExp(`(\\s${key}=")[^"]*(")`),`$1${value}$2`);
const voids=new Set(['img','input','meta','link','br','hr','source','area','base','embed','param','track','wbr']);
for(const file of Object.keys(report.pages)){
 let html=await fs.readFile(file,'utf8');const stack=[],edits=[];
 for(const match of html.matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)){
  let tag=match[0];const name=match[1].toLowerCase();
  if(tag.startsWith('</')){const i=stack.map(a=>a.name).lastIndexOf(name);if(i>=0)stack.splice(i);continue;}
  if(name==='img'){
   const key=attr(tag,'data-src')?'data-src':'src',src=attr(tag,key),asset=lookup.get(src);
   if(asset){
    const fallback=asset.variants.find(v=>v.width>=1280)||asset.variants.at(-1);
    tag=set(tag,key,fallback.url);
    tag=set(tag,attr(tag,'data-srcset')?'data-srcset':'srcset',asset.variants.map(v=>`${v.url} ${v.width}w`).join(', '));
   }
   if(stack.some(a=>(a.cls.includes('showcase-image')||a.cls.includes('carousel-slide'))&&a.hidden==='true'))tag=tag.replace(/\ssrc=/,' data-src=').replace(/\ssrcset=/,' data-srcset=');
   if(tag!==match[0])edits.push({start:match.index,end:match.index+match[0].length,tag});
  }
  if(!voids.has(name)&&!tag.endsWith('/>'))stack.push({name,cls:attr(tag,'class')||'',hidden:attr(tag,'aria-hidden')});
 }
 for(const e of edits.reverse())html=html.slice(0,e.start)+e.tag+html.slice(e.end);
 await fs.writeFile(file,html);
}
// Only discard redundant generated derivatives, never source assets.
const used=new Set(report.assets.flatMap(a=>a.variants.map(v=>v.url)));
for(const file of await fs.readdir('public/assets/responsive')){
 if(/^[a-f0-9]{16}-[0-9]+\.webp$/.test(file)&&!used.has('/assets/responsive/'+file))await fs.unlink('public/assets/responsive/'+file);
}
await fs.writeFile('design/image-delivery.json',JSON.stringify(report,null,2)+'\n');
console.log(`Updated responsive candidates for ${report.assets.length} source images and ${Object.keys(report.pages).length} pages.`);
