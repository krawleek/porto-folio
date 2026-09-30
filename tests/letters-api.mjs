import {createServer} from 'node:http';
import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import {lettersApi} from '../server/letters.js';
const dir=mkdtempSync(join(tmpdir(),'portfolio-letters-test-'));process.env.LETTERS_DATA_DIR=dir;
const api=lettersApi(),server=createServer((req,res)=>api(req,res,()=>{res.statusCode=404;res.end();}));
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`,url=base+'/api/letters.php';
try{
 assert.equal((await fetch(url)).status,401);
 assert.equal((await fetch(url,{method:'POST',headers:{Origin:'https://other.example','Content-Type':'application/json'},body:'{"message":"no"}'})).status,403);
 assert.equal((await fetch(url,{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:'{"message":""}'})).status,400);
 const body=JSON.stringify({message:'Private test <script>never execute</script>',language:'ru'}),options={method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body};
 assert.equal((await fetch(url,options)).status,201);assert.equal((await fetch(url,options)).status,429);
 assert.equal((await fetch(url,{headers:{Authorization:'Bearer wrong'}})).status,401);
 const token=readFileSync(join(dir,'admin-key'),'utf8').trim();const response=await fetch(url,{headers:{Authorization:`Bearer ${token}`}});assert.equal(response.status,200);assert.equal((await response.json()).letters.length,1);
 console.log('Private API: authentication, origin checks, validation, persistence and rate limit passed');
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));rmSync(dir,{recursive:true,force:true});}
