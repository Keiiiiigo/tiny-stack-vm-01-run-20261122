import{mkdirSync as D,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T=new Map([[0,0],[1,11],[2,14],[3,100],[4,120],[5,220],[6,230],[7,330],[48,2],[49,102],[50,102],[51,2],[52,0],[64,110],[65,200],[80,100],[81,100],[82,10],[83,100]]);
for(let o=16;o<35;o++)if(o!=23&&o!=27&&o!=31)T.set(o,210);
T.set(23,110);T.set(27,110);
function run(p,q){
const n=p.length,s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536);
let a=0,b=0,d=0,t=0,l=0,g=0;
const E=x=>({out:o.subarray(0,l),exit:x});
const u=r=>{a-=2;s[a++]=r|0};
for(;;){
if(t==1e6)return E(10);
if(d<0||d>=n)return E(9);
const k=p[d],v=T.get(k);
if(v===undefined)return E(5);
const i=v%10;
if(d+i>=n)return E(9);
t++;
const x=d+1+i;
if(a<(v/100|0))return E(2);
if(a-(v/100|0)+(v/10%10|0)>256)return E(3);
d=x;
const y=s[a-2],z=s[a-1];
switch(k){
case 0:return E(0);
case 1:s[a++]=(p[x-1]<<24)>>24;break;
case 2:s[a++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:a--;break;
case 4:s[a]=z;a++;break;
case 5:{const w=z;s[a-1]=y;s[a-2]=w;break;}
case 6:s[a]=y;a++;break;
case 7:{const w=s[a-3];s[a-3]=y;s[a-2]=z;s[a-1]=w;break;}
case 16:u(y+z);break;
case 17:u(y-z);break;
case 18:u(Math.imul(y,z));break;
case 19:if(!z)return E(4);u((y/z)|0);break;
case 20:if(!z)return E(4);u(y%z);break;
case 21:if(!z)return E(4);u(Math.floor((y>>>0)/(z>>>0)));break;
case 22:if(!z)return E(4);u((y>>>0)%(z>>>0));break;
case 23:s[a-1]=-z;break;
case 24:u(y&z);break;
case 25:u(y|z);break;
case 26:u(y^z);break;
case 27:s[a-1]=~z;break;
case 28:u(y<<z);break;
case 29:u(y>>z);break;
case 30:u(y>>>z);break;
case 32:u(y===z?1:0);break;
case 33:u(y<z?1:0);break;
case 34:u((y>>>0)<(z>>>0)?1:0);break;
case 48:case 49:case 50:{
const r=((p[x-2]|p[x-1]<<8)<<16)>>16;
if(k==48||(k==49?s[--a]==0:s[--a]!=0))d=x+r;
break;}
case 51:
if(b==64)return E(7);
c[b++]=x;d=p[x-2]|p[x-1]<<8;
break;
case 52:
if(!b)return E(8);
d=c[--b];
break;
case 64:
if(z<0||z>255)return E(6);
s[a-1]=m[z];
break;
case 65:
if(z<0||z>255)return E(6);
m[z]=y;a-=2;
break;
case 80:{
const w=Buffer.from(String(z));
if(l+w.length>65536)return E(11);
a--;o.set(w,l);l+=w.length;
break;}
case 81:
if(l+1>65536)return E(11);
o[l++]=z&255;a--;
break;
case 82:s[a++]=g<q.length?q[g++]:-1;break;
case 83:return E(z&255);
}
}
}
for(const id of R(I).sort()){
const{out,exit}=run(F(I+'/'+id+'/program.bin'),F(I+'/'+id+'/input.bin'));
D(O+'/'+id,{recursive:true});
W(O+'/'+id+'/stdout.bin',out);
W(O+'/'+id+'/exit.txt',exit+'\n');
}
