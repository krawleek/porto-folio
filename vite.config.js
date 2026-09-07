import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({build:{rollupOptions:{input:{about:fileURLToPath(new URL('./about/index.html',import.meta.url)),wasd:fileURLToPath(new URL('./cases/wasd/index.html',import.meta.url)),vtb:fileURLToPath(new URL('./cases/vtb/index.html',import.meta.url)),alfa:fileURLToPath(new URL('./cases/alfa/index.html',import.meta.url)),main:fileURLToPath(new URL('./index.html',import.meta.url)),nspk:fileURLToPath(new URL('./cases/nspk/index.html',import.meta.url))}}}});
