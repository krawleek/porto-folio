import copy from './vtb-copy.json';
import {initCaseLanguage} from './nspk-language.js';
const en={
 '113:4752':'Designing the VTB Pension Fund customer portal',
 '113:4753':'VTB Pension Fund is one of Russia’s largest private pension funds, with 11 million customers, managing people’s long-term savings.\n\nI redesigned the legacy system based on a UX audit and developed the portal’s product logic around achieving long-term financial goals.',
 '113:7147':'The project began with a UX audit of VTB Pension Fund’s entire digital customer journey, from the corporate website and contract application to the customer portal.\n\nUnlike other touchpoints, the fund’s portal was a legacy product. It let users check their contracts and perform basic operations, but offered little help in understanding the program or deciding what to do next.',
 '237:1395':'This became a business problem: pension programs depend on long-term customer relationships, while their terms are largely set by the government and differ little between funds.\n\nThe quality of the customer experience therefore becomes a key competitive advantage.',
 '238:3644':'The business needed more than an updated interface: the digital service had to support long-term customer engagement.',
 '237:1378':'Increase contributions','237:1379':'Grow the use of recurring payments','237:1383':'Increase engagement','237:1384':'Savings forecasts and personalized recommendations','237:1388':'Modernize the legacy product','237:1389':'A modern mobile-first experience and PWA',
 '248:13692':'The UX audit showed that isolated interface improvements would not be enough.\n\nThe portal needed a new product model: from viewing data to managing savings and achieving financial goals.\n\nThis became the guiding principle for the design.',
 '237:1404':'An unclear savings model','237:1405':'Users could see their total balance, but not its breakdown: their own contributions, government contributions, and investment income.\n\nThis reduced transparency and trust in long-term savings.',
 '237:1414':'No guidance toward a financial goal','237:1415':'Users did not know how much or how often to contribute to get the most out of the program.\n\nThe interface showed the account’s current state but did little to help users change it.',
 '237:1409':'Unavailable actions in the interface','237:1410':'Users were shown workflows they could not access under the terms of their specific contract.\n\nThis created false expectations, errors, and additional support requests.',
 '238:3649':'Poor mobile web adaptation','238:3650':'Although mobile accounted for 76% of traffic, the interface was poorly adapted to small screens.',
 '237:1417':'Analysis of competing fintech and savings services\n\nEvaluation of user workflows using Nielsen’s heuristics\n\nVisual interface audit\n\nUnmoderated usability testing of key workflows\n\nDesk research: analysis of reviews, support requests, documentation, business requirements, and more',
 '237:1425':'I designed the core of the customer portal: contract and account pages, profiles, login, and registration.\n\nAfter establishing the key patterns, I independently developed the product further, designing contract termination, payout, and beneficiary workflows while incorporating new business and regulatory requirements.',
 '113:4837':'A transparent savings model','113:4838':'Users understand how their savings are structured and how they grow, building trust in the product and encouraging regular contributions.',
 '237:1432':'Separating income sources within the balance','237:3553':'Explaining the key mechanisms of savings growth within the user journey',
 '113:4873':'Savings modeling and motivation','113:4874':'Users understand how their actions affect their final savings and are more likely to take the next step.',
 '238:3565':'Visualizing progress and projected savings','238:3573':'Savings goals with a clear view of progress',
 '238:3601':'Contextual actions','238:3602':'I developed widgets and guidance that support users from onboarding through contract management.',
 '238:3603':'The service can explain co-funding terms, suggest setting a goal, increasing regular contributions, or enabling recurring payments.','238:3593':'Information appears when it is needed to make a decision.',
 '238:3615':'Redesigning the key workflows shifted the portal from viewing data to taking action, especially forecasting savings and setting up recurring payments.\n\nThe solutions were evaluated through internal usability tests and scenarios close to real-world use.',
 '238:3620':'More successful completion of recurring payment setup','238:3623':'Contextual explanations reduced reliance on support','238:3626':'A transparent savings structure increased trust in the service',
 '238:3652':'Many thanks to the VTB Pension Fund team for their responsiveness, interest in our ideas, and warm collaboration despite the workload and fast pace 🔅',
 '238:3633':'Alfa-Bank AI assistant'
};
const extra={'Команда':'Team','Роман Беньо, арт-директор':'Roman Benyo, Art Director','Эдуард Горбунов, Senior Product Designer':'Eduard Gorbunov, Senior Product Designer'};
for(const [id,value] of Object.entries(en))copy[id].split('\n\n').forEach((ru,i)=>extra[ru]=value.split('\n\n')[i]);
initCaseLanguage(extra,{ru:'ВТБ НПФ — Елена Юнг',en:'VTB Pension Fund — Elena Jung'});
