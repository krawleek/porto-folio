import './alfa.css';
import './wasd.css';
import {content} from './wasd-content.js';
import {initCaseMenu} from './case-menu.js';
import {initCaseShowcases} from './case-showcase.js';
document.querySelector('#case-root').innerHTML=content;
initCaseMenu();
initCaseShowcases();
await import('./wasd-language.js');
