// Lossless delivery variants for fresh Figma home-card exports. Keep originals.
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';
const fileKey='rGW1jeijHl87JxPnjF9Rjh';
const cards=[
 ['wasd-ru','394:11384',2.4656],['alfa-ru','394:11400',1.4187],
 ['nspk-ru','394:11416',1.4084],['vtb-ru','394:11095',1.5526],
 ['wasd-en','466:7830',2.4328],['alfa-en','466:7844',1.3839],
 ['nspk-en','466:7859',1.4084],['vtb-en','466:7935',1.5526],
];
const selected=process.argv.slice(2);
const report=JSON.parse(await fs.readFile('design/image-delivery.json','utf8'));
const sizesFor=k=>`(max-width:467px) calc(${(100*k).toFixed(3)}vw - ${(52*k).toFixed(3)}px), (max-width:599px) ${Math.ceil(416*k)}px, (max-width:899px) calc(${(50*k).toFixed(3)}vw - ${(66*k).toFixed(3)}px), (max-width:1099px) ${Math.ceil(384*k)}px, (max-width:1399px) calc(${(25*k).toFixed(3)}vw - ${(4*k).toFixed(3)}px), ${Math.ceil(329*k)}px`;
for(const [name,nodeId,scale] of cards){
 if(selected.length&&!selected.includes(name))continue;
 const original=`/assets/main-refresh/${name}${name.startsWith('vtb-')?'-updated':''}.png`,data=await fs.readFile('public'+original);
 const meta=await sharp(data).metadata(),hash=crypto.createHash('sha256').update(data).digest('hex').slice(0,16);
 const widths=[...new Set([480,640,960,1280,1920,2560,3200,meta.width].filter(w=>w<=meta.width))].sort((a,b)=>a-b);
 let variants=[];
 for(const width of widths){
  const url=`/assets/responsive/${hash}-${width}.webp`;
  try{await fs.access('public'+url);}catch{await sharp(data).resize({width,withoutEnlargement:true,kernel:'lanczos3'}).webp({lossless:true,effort:4}).toFile('public'+url);}
  const bytes=(await fs.stat('public'+url)).size;
  variants.push(width===meta.width&&bytes>=data.length?{url:original,width,bytes:data.length}:{url,width,bytes});
 }
 variants=variants.filter((v,i,all)=>!all.slice(i+1).some(larger=>larger.bytes<=v.bytes));
 const asset={original,originalBytes:data.length,width:meta.width,height:meta.height,figma:{fileKey,nodeId},variants};
 const index=report.assets.findIndex(a=>a.original===original);if(index<0)report.assets.push(asset);else report.assets[index]=asset;
 const [project,lang]=name.split('-'),file=`${lang}/index.html`,sizes=sizesFor(scale);
 const cls=lang==='en'&&project!=='nspk'?'localized-preview':project==='vtb'?'screen-base':'screen-overlay';
 const fallback=variants.find(v=>v.width>=960)||variants.at(-1);
 const image=`<img src="${fallback.url}" class="${cls}" alt="" draggable="false" loading="lazy" decoding="async" srcset="${variants.map(v=>`${v.url} ${v.width}w`).join(', ')}" sizes="${sizes}">`;
 let html=await fs.readFile(file,'utf8');
 html=html.replace(new RegExp(`(<article class="project ${project}"[\\s\\S]*?<div class="project-art"[^>]*>)[\\s\\S]*?(</div>)`),(_,start,end)=>start+image+end);
 await fs.writeFile(file,html);
 console.log(`${name}: ${meta.width}×${meta.height}, original ${data.length} B; ${variants.map(v=>`${v.width}w ${v.bytes} B`).join(', ')}`);
}
// Keep the shared manifest accurate for later delivery updates.
const lookup=new Map(report.assets.flatMap(a=>[[a.original,a],...a.variants.map(v=>[v.url,a])]));
for(const lang of ['ru','en']){
 const file=`${lang}/index.html`,html=await fs.readFile(file,'utf8');report.pages[file]=[];
 for(const match of html.matchAll(/<img\b[^>]*>/g)){
  const src=match[0].match(/\ssrc="([^"]+)"/)?.[1],sizes=match[0].match(/\ssizes="([^"]+)"/)?.[1],a=lookup.get(src);
  if(a&&sizes)report.pages[file].push({original:a.original,sizes});
 }
}
await fs.writeFile('design/image-delivery.json',JSON.stringify(report,null,2)+'\n');
