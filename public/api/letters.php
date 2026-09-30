<?php
// Timeweb PHP hosting. Private data is a sibling of public_html, never in the web root.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function reply(int $status, array $body): void { http_response_code($status); echo json_encode($body, JSON_UNESCAPED_UNICODE); exit; }
try {
 $root = realpath($_SERVER['DOCUMENT_ROOT']);
 if (!$root) reply(503, ['error'=>'configuration']);
 $dir = dirname($root).'/.portfolio-letters';
 if (!is_dir($dir) && !mkdir($dir,0700,true)) reply(503,['error'=>'storage']);
 $keyFile=$dir.'/admin-key';
 if (!file_exists($keyFile)) { $handle=@fopen($keyFile,'x'); if($handle){chmod($keyFile,0600);fwrite($handle,bin2hex(random_bytes(32)));fclose($handle);} }
 $key=trim(file_get_contents($keyFile));
 if(strlen($key)<32) reply(503,['error'=>'configuration']);
 $db=new PDO('sqlite:'.$dir.'/letters.sqlite');
 $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
 $db->exec('PRAGMA busy_timeout=5000');
 $db->exec('CREATE TABLE IF NOT EXISTS letters (id INTEGER PRIMARY KEY, created TEXT NOT NULL, message TEXT NOT NULL, language TEXT NOT NULL)');
 $db->exec('CREATE TABLE IF NOT EXISTS rate (ip TEXT PRIMARY KEY, stamp INTEGER NOT NULL)');
 chmod($dir.'/letters.sqlite',0600);
 $method=$_SERVER['REQUEST_METHOD'];
 if($method==='GET'){
  $header=$_SERVER['HTTP_AUTHORIZATION']??$_SERVER['REDIRECT_HTTP_AUTHORIZATION']??'';
  if(!hash_equals($key,preg_replace('/^Bearer /','',$header))) reply(401,['error'=>'unauthorized']);
  reply(200,['letters'=>$db->query('SELECT id,created,message,language FROM letters ORDER BY id DESC LIMIT 500')->fetchAll(PDO::FETCH_ASSOC)]);
 }
 if($method!=='POST') reply(405,['error'=>'method']);
 $origin=parse_url($_SERVER['HTTP_ORIGIN']??'');
 $host=($origin['host']??'').(isset($origin['port'])?':'.$origin['port']:'');
 if($host!==($_SERVER['HTTP_HOST']??'')||!in_array($origin['scheme']??'',['https','http'],true)) reply(403,['error'=>'origin']);
 if(strpos($_SERVER['CONTENT_TYPE']??'','application/json')!==0) reply(415,['error'=>'type']);
 $raw=file_get_contents('php://input',false,null,0,20001);
 if(strlen($raw)>20000) reply(413,['error'=>'size']);
 $data=json_decode($raw,true,16,JSON_THROW_ON_ERROR);
 $message=is_string($data['message']??null)?trim($data['message']):'';
 if(!$message||!preg_match('//u',$message)||preg_match_all('/./us',$message)>4000) reply(400,['error'=>'message']);
 if(!empty($data['website'])) reply(200,['ok'=>true]);
 $ip=hash_hmac('sha256',$_SERVER['REMOTE_ADDR']??'unknown',$key);$now=time();
 $db->exec('BEGIN IMMEDIATE');
 $db->prepare('DELETE FROM rate WHERE stamp < ?')->execute([$now-60]);
 $query=$db->prepare('SELECT stamp FROM rate WHERE ip=?');$query->execute([$ip]);
 if($query->fetchColumn()!==false){$db->exec('ROLLBACK');reply(429,['error'=>'rate']);}
 $db->prepare('INSERT INTO letters(created,message,language) VALUES(?,?,?)')->execute([gmdate('c'),$message,($data['language']??'')==='en'?'en':'ru']);
 $db->prepare('INSERT INTO rate(ip,stamp) VALUES(?,?)')->execute([$ip,$now]);$db->exec('COMMIT');
 reply(201,['ok'=>true]);
} catch(JsonException $error){reply(400,['error'=>'invalid']);}
catch(Throwable $error){error_log('Letters API: '.$error->getMessage());reply(503,['error'=>'unavailable']);}
