import copy from './wasd-copy.json';
import {caseHeader,caseFooter} from './case-shell.js';
const text=(id,tag='p',cls='')=>`<${tag} class="${cls}">${copy[id]}</${tag}>`;
const paragraphs=(id,cls='case-lead')=>`<div class="${cls}">${copy[id].split('\n\n').map(p=>`<p>${p}</p>`).join('')}</div>`;
const image=(name,alt,cls='case-image',ext='png')=>`<img class="${cls}" src="/assets/wasd/${name}.${ext}" alt="${alt}" loading="lazy" decoding="async">`;
const showcase=(id,steps)=>`<section class="showcase" id="${id}" style="--steps:${steps.length}" aria-label="${copy[steps[0][0]]}"><div class="showcase-sticky"><div class="showcase-copy"><div class="showcase-dots" aria-hidden="true">${steps.map((_,i)=>`<span class="${i===0?'active':''}"></span>`).join('')}</div><div class="showcase-descriptions">${steps.map(([title,desc,detail],i)=>`<div class="showcase-step ${i===0?'active':''}" aria-hidden="${i!==0}">${text(title,'h2')}${text(desc,'p','showcase-intro')}${text(detail,'p','case-lead')}</div>`).join('')}</div></div><div class="showcase-screen">${steps.map(([title,,,name],i)=>`<div class="showcase-image ${i===0?'active':''}" aria-hidden="${i!==0}">${image(name,copy[title],'')}</div>`).join('')}</div></div></section>`;
const context=copy['276:25638'].split('\n\n');
export const content=`<a class="skip" href="#case-content">Перейти к кейсу</a>${caseHeader.replace('</header>','<div class="language" aria-label="Язык / Language"><button type="button" data-lang="ru" aria-pressed="true">RU</button><span>/</span><button type="button" data-lang="en" aria-pressed="false">ENG</button></div></header>')}
<main class="case-main wasd-main" id="case-content"><section class="case-intro">${text('276:25576','h1')}${paragraphs('276:25577')}<dl class="case-meta"><div><dt>Роль</dt><dd>Product designer</dd></div><div><dt>Процесс</dt><dd>Research • Visual Design • UX/UI • Prototyping</dd></div><div><dt>Команда</dt><dd>Вера Бондарева, Design Lead</dd></div><div><dt>Дата</dt><dd>Май–Октябрь 2022</dd></div></dl>${image('imgSlide1691417','Онбординг WASD — знакомство с XP','wasd-cover')}</section>
<section class="case-context wasd-context"><p>${context[0]}</p><ul>${copy['276:25638-list'].split('\n\n').map(p=>`<li>${p}</li>`).join('')}</ul><p>${context[1]}</p></section>
<section><div class="wasd-before">${image('imgImage54','Предыдущий интерфейс онбординга WASD')}${image('imgImage55','','wasd-before-overlay')}</div></section>
<section>${text('279:6345','p','case-context')}</section>
<section>${text('279:6348','h2')}<div class="business-goals">${[['imgTime','279:6353','279:6354'],['imgWarning','279:6358','279:6359'],['imgComponent','279:6363','279:6364']].map(([icon,title,desc])=>`<article><h3>${image(icon,'','goal-icon','svg')}${copy[title]}</h3>${text(desc)}</article>`).join('')}</div></section>
<section>${text('279:6372','h2')}<div class="research-grid"><div class="findings">${[['279:6378','279:6379'],['279:6383','279:6384'],['279:6388','279:6389']].map(([title,desc])=>`<article><span aria-hidden="true">❌</span><div>${text(title,'h3')}${text(desc)}</div></article>`).join('')}</div><aside class="research-methods"><ul>${copy['276:25637-list'].split('\n\n').map(p=>`<li>${p}</li>`).join('')}</ul></aside></div></section>
<section>${paragraphs('276:25640','wasd-strategy')}</section>
${showcase('first-session',[['276:25661','276:25662','279:6397','imgImage91'],['279:6894','279:6895','279:6896','imgImage92']])}
${showcase('xp-quests',[['276:25670','276:25671','279:6399','imgImage93'],['279:6969','279:6970','279:6971','imgImage94'],['276:25679','276:25680','279:6415','imgImage95']])}
<section>${text('279:6427','h2')}${paragraphs('279:6428')}</section>
<section class="case-results">${[['276:25729','276:25730'],['276:25732','276:25733'],['276:25735','276:25736']].map(([title,desc])=>`<div>${text(title,'h3')}${text(desc)}</div>`).join('')}</section>
<section>${text('279:6432','p','wasd-thanks')}</section>
<section class="next-case-section">${text('326:3960','h2')}<a class="next-case wasd-next" href="/cases/nspk/"><div class="wasd-next-art">${image('next-nspk','','')}</div><span class="next-case-copy"><span class="case-tag">FINTECH</span><span class="next-case-title">${copy['326:3965']}</span></span><span class="next-arrow">${image('imgArrowForward','','','svg')}</span></a></section>
</main>${caseFooter}`;
