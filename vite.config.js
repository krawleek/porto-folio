import {defineConfig} from 'vite';
import {lettersApi} from './server/letters.js';
import {fileURLToPath} from 'node:url';

const pages=['index.html','about/index.html',...['alfa','nspk','vtb','wasd'].map(id=>'cases/'+id+'/index.html')];
const inputs=[...pages,...['ru','en'].flatMap(lang=>pages.map(page=>lang+'/'+page))];
export default defineConfig({
  plugins:[{name:"private-letters",configureServer(server){server.middlewares.use(lettersApi());}}],
  build:{
    rollupOptions:{
      input:Object.fromEntries(inputs.map(page=>[page.replaceAll('/','-'),fileURLToPath(new URL('./'+page,import.meta.url))]))
    }
  }
});
