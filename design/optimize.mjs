import sharp from 'sharp';
import {mkdir,rename} from 'node:fs/promises';
await mkdir('design/originals',{recursive:true});
for(const name of ['40-34655-imgFrame4','40-34665-imgProject1','40-34675-imgFrame5','wasd-cover']){
 await sharp(`public/assets/${name}.png`).resize({width:2000,withoutEnlargement:true}).webp({quality:88}).toFile(`public/assets/${name}.webp`);
 await rename(`public/assets/${name}.png`,`design/originals/${name}.png`);
}
for(const name of ['40-34655-imgFrame3.png','40-34685-imgPic.png','43-36599-imgSubtract.svg','43-36599-imgSubtract1.svg'])await rename(`public/assets/${name}`,`design/originals/${name}`);
