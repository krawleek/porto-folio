// Preserve NDA query parameters and section anchors from existing shared URLs.
const path=location.pathname.replace(/index\.html$/, '');
location.replace('/ru'+(path.endsWith('/')?path:path+'/')+location.search+location.hash);
