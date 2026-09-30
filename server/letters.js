import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync,writeFileSync,chmodSync} from 'node:fs';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {resolve} from 'node:path';
export function lettersApi(){
 const dir=resolve(process.env.LETTERS_DATA_DIR||'.private');mkdirSync(dir,{recursive:true,mode:0o700});
 const keyFile=resolve(dir,'admin-key');let key=process.env.LETTERS_ADMIN_KEY;
 if(!key){try{key=readFileSync(keyFile,'utf8').trim();}catch{key=randomBytes(32).toString('hex');writeFileSync(keyFile,key,{mode:0o600});}}
 const db=new DatabaseSync(resolve(dir,'letters.sqlite'));chmodSync(resolve(dir,'letters.sqlite'),0o600);
 db.exec('CREATE TABLE IF NOT EXISTS letters (id INTEGER PRIMARY KEY, created TEXT NOT NULL, message TEXT NOT NULL, language TEXT NOT NULL)');
 const attempts=new Map();
 return async(req,res,next)=>{
  const path=new URL(req.url,'http://localhost').pathname;if(!['/api/letters','/api/letters.php'].includes(path))return next();
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');
  const reply=(code,data)=>{res.statusCode=code;res.end(JSON.stringify(data));};
  if(req.method==='GET'){
   const token=(req.headers.authorization||'').replace(/^Bearer /,'');const a=Buffer.from(token),b=Buffer.from(key);
   if(a.length!==b.length||!timingSafeEqual(a,b))return reply(401,{error:'unauthorized'});
   return reply(200,{letters:db.prepare('SELECT * FROM letters ORDER BY id DESC LIMIT 500').all()});
  }
  if(req.method!=='POST')return reply(405,{error:'method'});
  const origin=req.headers.origin;if(!origin||!URL.canParse(origin)||new URL(origin).host!==req.headers.host)return reply(403,{error:'origin'});
  if(!req.headers['content-type']?.startsWith('application/json'))return reply(415,{error:'type'});
  const ip=req.socket.remoteAddress,now=Date.now();for(const [k,v]of attempts)if(now-v>60000)attempts.delete(k);
  if(attempts.has(ip))return reply(429,{error:'rate'});
  let body='';try{
   for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>20000)return reply(413,{error:'size'});}
   const data=JSON.parse(body),message=typeof data.message==='string'?data.message.trim():'';
   if(!message||message.length>4000)return reply(400,{error:'message'});
   if(data.website)return reply(200,{ok:true});
   db.prepare('INSERT INTO letters(created,message,language) VALUES(?,?,?)').run(new Date().toISOString(),message,data.language==='en'?'en':'ru');attempts.set(ip,now);return reply(201,{ok:true});
  }catch{return reply(400,{error:'invalid'});}
 };
}
