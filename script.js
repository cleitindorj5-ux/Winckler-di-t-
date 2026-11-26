const $=s=>document.querySelector(s);
const MEALS=[['cafe','Café da manhã','06:00','☕'],['escola','Lanche escolar','10:00','🎒'],['almoco','Almoço','13:00','🍽️'],['pre','Pré-treino','Antes do treino','⚡'],['pos','Pós-treino','Depois do treino','💪'],['jantar','Jantar','19:30','🌙'],['ceia','Ceia (opcional)','21:00','🥛']];
const MAIN=['cafe','escola','almoco','pre','pos','jantar'];
const M=[ // Dom..Sáb: café, escola, almoço, pré, pós, jantar
['Pão|Ovos|Queijo|Salada de frutas','Iogurte|Aveia|Fruta','Arroz|Feijão|Proteína|Salada','Iogurte|Fruta|Aveia','Sanduíche|Fruta','Refeição familiar completa'],
['Ovos|Pão|Queijo|Banana|Leite','Sanduíche de frango|Iogurte|Maçã','Arroz|Feijão|Frango|Cenoura|Laranja','Vitamina de banana|Leite|Aveia','Iogurte|Granola|Morangos','Arroz|Feijão|Carne|Legumes'],
['Pão com ovo|Mamão|Iogurte','Pão de queijo|Iogurte|Uvas','Macarrão|Carne moída|Brócolis|Manga','Pão com queijo|Pera','Sanduíche de frango|Fruta','Batata|Peixe|Vegetais|Iogurte'],
['Omelete com queijo|Pão|Melão','Sanduíche de queijo|Banana|Leite','Arroz|Feijão|Peixe|Abóbora|Mamão','Iogurte|Banana|Aveia','Shake (como a nutricionista orientou)|Fruta','Arroz|Feijão|Frango|Salada'],
['Ovos mexidos|Pão|Vitamina de fruta','Sanduíche de frango|Morangos','Purê de batata|Carne|Feijão|Salada','Pão com ovo|Fruta','Leite|Banana|Sanduíche','Macarrão|Carne|Legumes|Fruta'],
['Pão com queijo|Ovos|Banana','Iogurte|Granola|Maçã|Sanduíche','Arroz|Feijão|Frango|Legumes','Vitamina de mamão|Pão com queijo','Iogurte|Granola|Kiwi','Arroz|Feijão|Peixe|Vegetais'],
['Omelete|Pão|Mamão|Leite','Vitamina|Torradas com queijo','Macarrão|Frango|Vegetais','Banana|Pão com queijo','Sanduíche','Carboidrato|Proteína|Vegetais']];
const CEIA='Leite ou iogurte|Fruta|Aveia';
const GR=[['Banana','Mamão','Manga','Maçã','Pera','Uvas','Morangos','Laranja','Melão','Kiwi'],['Arroz','Batata','Macarrão','Mandioca','Cuscuz','Pão'],['Frango','Ovos','Carne','Peixe'],['Feijão','Lentilha','Grão-de-bico','Ervilha']];
const REC=[['ovos mexidos','Bata 2–3 ovos com uma pitada de sal. Aqueça uma frigideira com fio de azeite, em fogo baixo, e mexa devagar até firmar.'],['omelete','Bata os ovos, coloque na frigideira untada, adicione queijo (e tomate) e dobre quando firmar. Fogo baixo.'],['vitamina','Bata no liquidificador: fruta + leite + iogurte + aveia. Tome na hora, sem deixar horas fora da geladeira.'],['shake','Siga exatamente a receita e a medida da nutricionista. Não aumente a quantidade de pó. Prepare na hora.'],['sanduíche de frango','Desfie o frango já cozido, tempere leve, monte no pão com queijo. Leve na bolsa térmica com gelo.'],['sanduíche','Pão + queijo ou frango + folhas. Se for levar, mantenha refrigerado em bolsa térmica.'],['pão com ovo','Frite ou cozinhe um ovo, sem exagerar no óleo, e coloque dentro do pão.'],['purê','Cozinhe a batata até amolecer, amasse com um fio de leite e sal.'],['macarrão','Cozinhe al dente, escorra e misture com molho de tomate caseiro e a carne.'],['peixe','Tempere com limão e sal e asse a 200 °C por cerca de 15–20 min, até desfiar com o garfo.'],['frango','Tempere com alho, sal e limão. Grelhe ou asse até não ficar rosado por dentro.'],['arroz','Refogue o alho, adicione o arroz, água quente (2 para 1) e cozinhe tampado em fogo baixo.'],['feijão','Cozinhe na pressão até amolecer, refogue alho e cebola e tempere.'],['pão de queijo','Aqueça no forno por 5–8 min. Na escola, pode comer em temperatura ambiente.'],['legumes','Cozinhe no vapor ou refogue rapidamente com azeite para manter a cor e a textura.'],['queijo branco','Corte em fatias ou cubos e coma com pão, torrada ou fruta. Mantenha na geladeira.'],['iogurte','Use iogurte natural. Misture aveia ou granola e fruta picada por cima.']];
const BADGES=[['🌱','Primeiro check'],['🔥','3 dias seguidos'],['🔥','7 dias seguidos'],['⭐','Dia perfeito'],['💯','100 pontos'],['👑','500 pontos']];
const LV=['Reserva','Titular','Craque','Capitão','Craque da Rodada','Lenda'];
let S={m:{},n:{},sub:{},sup:{}};try{S=Object.assign(S,JSON.parse(localStorage.getItem('wk1')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('wk1',JSON.stringify(S))}catch(e){}};
const p2=n=>String(n).padStart(2,'0'),K=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
const parse=k=>{const[a,b,c]=k.split('-');return new Date(+a,b-1,+c)};
let today=new Date(),cur=K(today),tab='hoje',cm=new Date(today.getFullYear(),today.getMonth(),1);
const DN=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],MN=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const EX=['Ovos mexidos','Queijo branco'];const items=(dow,id)=>{let a=(id=='ceia'?CEIA:M[dow][MAIN.indexOf(id)]).split('|');if(['cafe','pre','pos'].includes(id))EX.forEach(x=>{if(!a.includes(x))a.push(x)});return a.map(x=>S.sub[x]===undefined?x:S.sub[x]).filter(Boolean)};
const dayPts=k=>{const m=S.m[k]||{};let s=0,c=0;for(const i of MAIN){if(m[i]==1){s+=10;c++}else if(m[i]==0)s-=3}
if(m.ceia==1)s+=5;if(m.agua>=(S.goal||4))s+=5;if(m.sono==1)s+=5;if(c==6)s+=20;return s};
const total=()=>Math.max(0,Object.keys(S.m).reduce((a,k)=>a+dayPts(k),0));
const good=k=>MAIN.filter(i=>(S.m[k]||{})[i]==1).length>=4;
const streak=()=>{let d=new Date(today);if(!good(K(d)))d.setDate(d.getDate()-1);let n=0;while(good(K(d))){n++;d.setDate(d.getDate()-1)}return n};
const best=()=>{const ks=Object.keys(S.m).sort();let b=0,n=0,prev=null;for(const k of ks){if(!good(k)){n=0;prev=null;continue}const d=parse(k);if(prev&&(d-prev)/864e5==1)n++;else n=1;prev=d;b=Math.max(b,n)}return b};
const toast=t=>{const e=document.createElement('div');e.className='toast';e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1300)};
function hero(){const t=total(),l=Math.floor(t/150);$('#lvn').textContent='Nível '+(l+1)+' · '+LV[Math.min(l,5)];$('#pts').textContent='⭐ '+t;$('#stk').textContent='🔥 '+streak()+(streak()==1?' dia':' dias');$('#xpb').style.width=(t%150)/1.5+'%';
const left=Math.ceil((new Date(today.getFullYear(),11,31)-today)/864e5);$('#xpt').textContent=(150-t%150)+' pts para o próximo nível · faltam '+left+' dias para o fim do ano'}
const rec=n=>{n=n.toLowerCase();const r=REC.find(x=>n.includes(x[0]));return r?r[1]:'Prepare com ingredientes frescos e bem lavados. Combine com o prato do dia e ajuste a porção conforme a sua fome.'};
function render(){hero();document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on',b.dataset.tab==tab));$('#app').innerHTML=tab=='hoje'?vHoje():tab=='cal'?vCal():vPerfil()}
function vHoje(){const d=parse(cur),dow=d.getDay(),m=S.m[cur]||{};let h=`<div class="dnav"><button data-act="day" data-v="-1">‹</button><div style="text-align:center"><h2 style="margin:0">${DN[dow]}, ${d.getDate()} de ${MN[d.getMonth()]}</h2><span class="mut">${cur==K(today)?'Hoje':'Toque nos alimentos para ver como fazer'} · ${dayPts(cur)>=0?'+':''}${dayPts(cur)} pts no dia</span></div><button data-act="day" data-v="1">›</button></div>`;
for(const[id,nm,hr,ic]of MEALS){const v=m[id],it=items(dow,id);h+=`<div class="card ${v==1?'done':v==0?'skip':''}"><div class="mh"><div class="ico">${ic}</div><div><b>${nm}</b><span>${hr}</span></div></div><div class="chips">${it.length?it.map(x=>`<button class="chip" data-act="item" data-id="${id}" data-x="${x}">${x}</button>`).join(''):'<span class="mut">Tudo retirado. Escreva nas observações o que comeu.</span>'}</div><div class="btns"><button class="btn ok ${v==1?'on':''}" data-act="set" data-id="${id}" data-v="1">✓ Comi ${id=='ceia'?'(+5)':'(+10)'}</button><button class="btn no ${v==0?'on':''}" data-act="set" data-id="${id}" data-v="0">${id=='ceia'?'Sem fome':'✗ Pulei (−3)'}</button></div></div>`}
h+=`<div class="card"><div class="mh"><div class="ico">💧</div><div><b>Hábitos</b><span>Água e sono (+5 cada)</span></div></div><div class="btns" style="margin-top:10px"><button class="btn" data-act="wat" data-v="-1">−</button><div class="btn" style="flex:2;text-align:center;cursor:default">💧 ${m.agua||0} de ${S.goal||4} garrafas</div><button class="btn ok on" data-act="wat" data-v="1">+</button></div><div class="btns" style="margin-top:8px"><button class="btn ok ${m.sono==1?'on':''}" data-act="set" data-id="sono" data-v="1">😴 Dormi bem</button><button class="btn" data-act="goal">Meta: ${S.goal||4} 🍶</button></div></div>`;
const su=S.sup[cur]||{};h+=`<div class="card"><b>💊 Suplementos</b><div class="mut">Só o que a nutricionista prescreveu, na dose e no horário dela. Aqui é só lembrete, sem pontos.</div><div class="chips">${['Whey','Creatina','SuperCoffee','Hipercalórico'].map(x=>`<button class="chip" data-act="sup" data-x="${x}" style="${su[x]?'background:var(--ok);color:#fff':''}">${su[x]?'✓ ':''}${x}</button>`).join('')}</div></div>`;
h+=`<div class="card"><b>📝 Observações do dia</b><div class="mut" style="margin:4px 0 8px">Como foi o dia? Treino, fome, o que você comeu de diferente…</div><textarea id="note" placeholder="Escreva aqui…">${(S.n[cur]||'').replace(/</g,'&lt;')}</textarea></div>`;
const done=MAIN.filter(i=>m[i]==1).length;h+=`<div class="mut" style="text-align:center">${done==6?'🏆 Dia perfeito! +20 de bônus':done+' de 6 refeições principais feitas'}</div>`;return h}
function vCal(){const y=cm.getFullYear(),mo=cm.getMonth(),f=new Date(y,mo,1).getDay(),n=new Date(y,mo+1,0).getDate();
let h=`<div class="dnav"><button data-act="mon" data-v="-1">‹</button><h2 style="margin:0">${MN[mo]} ${y}</h2><button data-act="mon" data-v="1">›</button></div><div class="grid">`+['D','S','T','Q','Q','S','S'].map(x=>`<div class="h">${x}</div>`).join('')+'<div class="h"></div>'.repeat(f);
for(let i=1;i<=n;i++){const k=y+'-'+p2(mo+1)+'-'+p2(i),m=S.m[k]||{},c=MAIN.filter(x=>m[x]==1).length,s=MAIN.filter(x=>m[x]==0).length;
const cl=c==6?'l3':c>=4?'l2':c>0?'l1':s>0?'lx':'';h+=`<div class="${cl} ${k==K(today)?'t':''}" data-act="goto" data-k="${k}">${i}</div>`}
h+=`</div><div class="card" style="margin-top:14px"><div class="mut">🟩 dia perfeito · 🟢 4–5 refeições · 🟨 1–3 refeições · 🟥 só pulou. Toque num dia para abrir.</div></div>`;return h}
function vPerfil(){const t=total(),b=best(),perf=Object.keys(S.m).some(k=>MAIN.every(i=>(S.m[k]||{})[i]==1)),first=Object.keys(S.m).some(k=>Object.values(S.m[k]||{}).includes(1));
const on=[first,b>=3,b>=7,perf,t>=100,t>=500];
const rm=Object.keys(S.sub);return `<h2>Conquistas</h2><div>${BADGES.map((x,i)=>`<div class="badge ${on[i]?'on':''}"><i>${x[0]}</i>${x[1]}</div>`).join('')}</div><div class="card"><b>Seu recorde</b><div class="mut">Maior sequência: ${b} dias · Pontos: ${t}</div></div>
<h2>Alimentos trocados ou retirados</h2><div class="card">${rm.length?rm.map(x=>`<div class="row" style="margin:6px 0"><span>${x} → ${S.sub[x]||'retirado'}</span><button class="chip" data-act="restore" data-x="${x}">Voltar</button></div>`).join(''):'<span class="mut">Nada por aqui. Toque num alimento em “Hoje” para trocar ou retirar.</span>'}</div>
<div class="card mut">Este app organiza a sua rotina e não substitui a nutricionista nem o pediatra. Porções, suplementos e treino seguem a orientação deles.</div>`}
function sheet(id,x){const g=GR.find(a=>a.includes(x));const sw=g?g.filter(y=>y!=x):[];
$('#sc').innerHTML=`<h2>${x}</h2><p>${rec(x)}</p>${sw.length?`<b>Trocar por:</b><div class="chips">${sw.map(y=>`<button class="chip" data-act="swap" data-x="${x}" data-y="${y}">${y}</button>`).join('')}</div>`:''}<div class="btns" style="margin-top:10px"><button class="btn no" data-act="del" data-x="${x}">🚫 Não quero mais</button><button class="btn" data-act="close">Fechar</button></div>`;$('#sheet').classList.add('on')}
const orig=x=>Object.keys(S.sub).find(k=>S.sub[k]==x)||x;
document.addEventListener('click',e=>{const t=e.target.closest('[data-tab],[data-act],#sheet');if(!t)return;
if(t.dataset.tab){tab=t.dataset.tab;render();window.scrollTo(0,0);return}
if(t.id=='sheet'){if(e.target.id=='sheet')t.classList.remove('on');return}
const a=t.dataset.act,D=t.dataset;
if(a=='day'){const d=parse(cur);d.setDate(d.getDate()+ +D.v);cur=K(d)}
else if(a=='mon')cm=new Date(cm.getFullYear(),cm.getMonth()+ +D.v,1);
else if(a=='goto'){cur=D.k;tab='hoje'}
else if(a=='item'){sheet(D.id,D.x);return}
else if(a=='close'){$('#sheet').classList.remove('on');return}
else if(a=='sup'){const s=S.sup[cur]=S.sup[cur]||{};s[D.x]=!s[D.x]}
else if(a=='restore')delete S.sub[D.x];
else if(a=='swap'||a=='del'){S.sub[orig(D.x)]=a=='swap'?D.y:'';$('#sheet').classList.remove('on');toast(a=='swap'?'Trocado por '+D.y:'Retirado 👍')}
else if(a=='wat'){const m=S.m[cur]=S.m[cur]||{},b=dayPts(cur);m.agua=Math.max(0,(m.agua||0)+ +D.v);const df=dayPts(cur)-b;toast(D.v>0?'💧 +1':'💧 −1');if(df>0)setTimeout(()=>toast('+5 pts ⭐ meta batida!'),1400)}else if(a=='goal'){S.goal=(S.goal||4)>=10?2:(S.goal||4)+1}
else if(a=='set'){const m=S.m[cur]=S.m[cur]||{},v=+D.v,b=dayPts(cur);m[D.id]=m[D.id]===v?undefined:v;if(m[D.id]===undefined)delete m[D.id];
const df=dayPts(cur)-b;if(m[D.id]!==undefined||df)toast((df>0?'+':'')+df+' pts '+(df>0?'⭐':'😬'));if(df>=20)setTimeout(()=>toast('🏆 Dia perfeito!'),1400)}
save();render()});
document.addEventListener('input',e=>{if(e.target.id=='note'){S.n[cur]=e.target.value;save()}});
render();

if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('service-worker.js').catch(function(e){console.warn('SW',e)})})}