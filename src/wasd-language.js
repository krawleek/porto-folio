import copy from './wasd-copy.json';
import {initCaseLanguage} from './nspk-language.js';
const en={
 '276:25576':'WASD onboarding redesign',
 '276:25577':'WASD.TV is a streaming platform in the MTS ecosystem, focused on live streaming and gaming audiences.\n\nI rebuilt onboarding into a user activation and retention system, reducing time to value and churn during the first days on the platform.',
 '276:25638':'The platform attracted users but failed to retain them in their first sessions. Users did not understand WASD’s key advantages.\n\nAs a result, expensive acquired traffic was lost during activation.',
 '276:25638-list':'The first screen did not offer relevant content\n\nThe feed felt empty or random\n\nXP seemed complicated and unnecessary\n\nSupport was overwhelmed with basic questions',
 '279:6345':'The solution was to turn onboarding into an activation and retention system that helps users quickly discover the product’s value, builds a habit of returning, and increases engagement with the platform’s core features.',
 '279:6353':'Increase D7 retention','279:6354':'Show users why they should return to the platform','279:6358':'Reduce time to value','279:6359':'Deliver relevant content sooner','279:6363':'Increase feature adoption','279:6364':'Grow the use of supporting services',
 '279:6378':'Users do not reach the product’s value','279:6379':'The first minutes did not explain the platform’s advantages. Users could not find relevant content or understand how it differed from competitors.',
 '279:6383':'Onboarding does not adapt to user experience','279:6384':'Everyone received the same experience regardless of context or behavior. The system did not help users learn gradually.',
 '279:6388':'Features are not revealed at the right moment','279:6389':'Subscriptions, notifications, XP, and other features existed, but did not appear when users were ready to use them.',
 '276:25637-list':'Analysis of customer journeys and onboarding workflows\n\nIdentifying where users lose value in the first session\n\nDeveloping solutions through product workflows and growth mechanisms',
 '276:25640':'Instead of simple post-registration onboarding, I designed a user activation system.\n\nUsing progressive disclosure, the product gradually teaches and engages users, guiding them toward key actions when they are most ready.',
 '276:25661':'Personalizing the first session','276:25662':'After registration, users did not understand the platform’s value or find relevant content.',
 '279:6397':'We identify users’ interests to personalize content from the very first session.',
 '279:6896':'We refine preferences through streamer selection, improving the relevance of feed recommendations.',
 '276:25670':'Introducing XP from the first visit','276:25671':'Users did not understand the purpose or value of the platform’s internal currency.',
 '279:6399':'We award a starting balance immediately after registration','279:6971':'We show how the currency can be used',
 '276:25679':'Learning through quests','276:25680':'Key features remained unnoticed and were discovered by chance.',
 '279:6415':'We offer quests that reward XP and introduce users to the platform’s tools',
 '279:6428':'The onboarding redesign shifted users from passively browsing the platform to taking meaningful actions: finding relevant content, subscribing, enabling notifications, and using XP features.\n\nThe solutions were evaluated through product scenarios, customer journey analysis, and retention-driven flows reflecting real streaming platform behavior.',
 '276:25730':'Personalization shortened the path to the first meaningful interaction.',
 '276:25733':'XP and quests increased the use of the platform’s key features.',
 '276:25736':'Contextual onboarding made the platform easier to learn.',
 '279:6432':'Many thanks to Design Lead Vera Bondareva for her attention and support, especially valuable at the beginning of my career!',
 '326:3965':'National Payment Card System audit'
};
const extra={'Команда':'Team','Дата':'Date','Вера Бондарева, Design Lead':'Vera Bondareva, Design Lead','Май–Октябрь 2022':'May–October 2022'};
for(const [id,value] of Object.entries(en))copy[id].split('\n\n').forEach((ru,i)=>extra[ru]=value.split('\n\n')[i]);
initCaseLanguage(extra,{ru:'WASD — Елена Юнг',en:'WASD onboarding — Elena Jung'});
