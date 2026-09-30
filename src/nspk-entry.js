import {languagePath} from './page-language.js';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';
import './nspk.css';
let hasAccess=false;
try{hasAccess=sessionStorage.getItem('ndaAccess')==='true';}catch{}
if(!hasAccess)location.replace(languagePath('/?case=nspk'));
else import('./nspk.js');
