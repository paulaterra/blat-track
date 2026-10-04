const STORAGE_KEY='blat-al-dia-v4';
const OLD_STORAGE_KEY='blat-al-dia-v3';
const LEGACY_STORAGE_KEY='blat-al-dia-v2';
const DB_NAME='blat-al-dia-files';
const DB_STORE='files';

const todayISO=()=>new Date().toISOString().slice(0,10);
const uid=(prefix='id')=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

const ICONS={
  paw:'<path d="M7.2 10.2c1.2 0 2.1-1.2 2.1-2.8S8.4 4.5 7.2 4.5 5.1 5.8 5.1 7.4s.9 2.8 2.1 2.8ZM16.8 10.2c1.2 0 2.1-1.2 2.1-2.8s-.9-2.9-2.1-2.9-2.1 1.3-2.1 2.9.9 2.8 2.1 2.8ZM3.8 15.1c1.1.3 2.2-.6 2.6-2s-.1-2.8-1.2-3.1-2.2.6-2.6 2 .1 2.8 1.2 3.1ZM20.2 15.1c1.1-.3 1.6-1.7 1.2-3.1s-1.5-2.3-2.6-2-1.6 1.7-1.2 3.1 1.5 2.3 2.6 2Z"/><path d="M12 11.8c-2.8 0-5.7 3.2-5.7 5.7 0 1.8 1.5 3 3.2 2.4 1.4-.5 1.8-.8 2.5-.8s1.1.3 2.5.8c1.7.6 3.2-.6 3.2-2.4 0-2.5-2.9-5.7-5.7-5.7Z"/>',
  home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M8 10h8M8 14h8M8 18h5"/>',
  notebook:'<path d="M5 4h13a1 1 0 0 1 1 1v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 2v4M12 2v4M16 2v4M8 10h7M8 14h7"/>',
  dog:'<path d="M7 7c-2.4.7-3.6 3-3.1 5.2.3 1.5 1.2 2.6 2.5 3.3M17 7c2.4.7 3.6 3 3.1 5.2-.3 1.5-1.2 2.6-2.5 3.3"/><path d="M7.5 8c.7-3 2.5-4.6 4.5-4.6S15.8 5 16.5 8c.9 4-.2 9.5-4.5 11-4.3-1.5-5.4-7-4.5-11Z"/><path d="M9.4 10.4h.1M14.5 10.4h.1"/><path d="M10.5 14c1-1 2-1 3 0-.3 1.3-.8 1.8-1.5 1.8s-1.2-.5-1.5-1.8ZM9.6 17c1.6 1.5 3.2 1.5 4.8 0"/>',
  'dog-minimal':'<path d="M7.4 9c-1-2.8-2.8-4.2-4.3-4-.5 1-.8 2.3-.8 3.9 0 2.8 1.1 5.4 3 7.3"/><path d="M16.6 9c1-2.8 2.8-4.2 4.3-4 .5 1 .8 2.3.8 3.9 0 2.8-1.1 5.4-3 7.3"/><path d="M7.7 9.2C8.3 5 10 2.9 12 2.9s3.7 2.1 4.3 6.3c.7 4.1-.5 8.5-4.3 10.1-3.8-1.6-5-6-4.3-10.1Z"/><path d="M9.4 10.8h.1M14.5 10.8h.1"/><path d="M10.8 13.7c.6-.5 1.8-.5 2.4 0"/><path d="M9.8 16.1c1.3 1.1 3.1 1.1 4.4 0"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',edit:'<path d="m4 16-.8 4 4-.8L18.5 7.9l-3.2-3.2L4 16Z"/><path d="m13.8 6.2 3.2 3.2"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/>',folder:'<path d="M3 6h6l2 2h10v11H3z"/>',
  'chevron-right':'<path d="m9 18 6-6-6-6"/>','arrow-right':'<path d="M5 12h14M13 6l6 6-6 6"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
  save:'<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/>',trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',
  camera:'<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.2"/>',crop:'<path d="M6 3v12a3 3 0 0 0 3 3h12"/><path d="M3 6h12a3 3 0 0 1 3 3v12"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 14v6h14v-6"/>',
  paperclip:'<path d="m9 12 5.7-5.7a3 3 0 0 1 4.2 4.2L11 18.4a5 5 0 0 1-7.1-7.1l8-8"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  external:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v7H4V6h7"/>',image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/>',
  pill:'<path d="M8.5 18.5 5.5 15.5a4.2 4.2 0 0 1 0-6l4-4a4.2 4.2 0 0 1 6 0l3 3a4.2 4.2 0 0 1 0 6l-4 4a4.2 4.2 0 0 1-6 0Z"/><path d="m8 8 8 8"/>',
  syringe:'<path d="m14 5 5 5M16 3l5 5M7 12l5 5M11 8l5 5-7 7H4v-5z"/><path d="M3 21l4-4"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  droplet:'<path d="M12 2.5s5.5 6.2 5.5 11A5.5 5.5 0 0 1 6.5 13.5c0-4.8 5.5-11 5.5-11Z"/>',
  bottle:'<path d="M9 3h6M10 3v4l-2 2v11h8V9l-2-2V3"/><path d="M8 12h8"/>',
  bowl:'<path d="M4 13h16c0 4-3.6 7-8 7s-8-3-8-7Z"/><path d="M7 9c.8-2 2.5-3 5-3s4.2 1 5 3"/>',
  sparkles:'<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z"/><path d="m18.5 14 .7 2.2 2.3.8-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.8.7-2.2Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  smartphone:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/>',
  send:'<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  sync:'<path d="M20 7h-5V2"/><path d="M20 7a8 8 0 0 0-14.5-2M4 17h5v5"/><path d="M4 17a8 8 0 0 0 14.5 2"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'
};
function icon(name,size=20){return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.file}</svg>`}
function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{if(!el.dataset.iconDone){el.innerHTML=icon(el.dataset.icon);el.dataset.iconDone='1'}})}

const seed={
  profile:{name:'Blat',breed:'Golden Retriever',birthdate:'',weight:'',microchip:'',vet:'',allergies:'',regularMedication:'',photoX:50,photoY:50,photoZoom:1},
  tracking:[
    {id:'t1',name:'Milbemax',category:'Desparasitació',format:'Pastilla',subtype:'Desparasitació interna',lastDate:'2026-07-01',nextDate:'2026-10-01',intervalValue:3,intervalUnit:'months',notifyBefore:15,notifySameDay:true,notes:''},
    {id:'t2',name:'Bravecto',category:'Desparasitació',format:'Pastilla',subtype:'Puces i paparres',lastDate:'2026-07-15',nextDate:'2026-10-15',intervalValue:3,intervalUnit:'months',notifyBefore:15,notifySameDay:true,notes:''},
    {id:'t3',name:'Vacuna anual',category:'Vacuna',format:'Vacuna',subtype:'Recordatori anual',lastDate:'2025-11-08',nextDate:'2026-11-08',intervalValue:1,intervalUnit:'years',notifyBefore:15,notifySameDay:true,notes:''}
  ],
  guidelines:[
    {id:'g1',title:'Problemes de pell',when:'Quan té una zona irritada o una ferida',instructions:'Si està infectat → Crema X\nSi només té ferida → Crema Y',products:'Crema X · Crema Y',notes:'Seguir la pauta veterinària indicada per aquell episodi.',tone:'peach',attachments:[]},
    {id:'g2',title:'Diarrea',when:'Quan comença amb femtes toves',instructions:'Comprar menjar gastrointestinal X\nDonar durant 2–3 dies segons la pauta que ens van indicar',products:'Menjar gastrointestinal X',notes:'',tone:'mint',attachments:[]}
  ],
  journal:[
    {id:'j1',date:'2026-08-14',type:'Salut',title:'Diarrea',notes:'Femtes toves. Vaig comprar el menjar gastrointestinal que ens havia recomanat el veterinari.',attachments:[]},
    {id:'j2',date:'2026-07-03',type:'Salut',title:'Pell irritada',notes:'Zona irritada. Revisar si és només ferida o si sembla infectat abans d’aplicar la pauta corresponent.',attachments:[]}
  ],
  documents:[],
  notifications:{emailEnabled:false,email:'',ntfyEnabled:false,ntfyServer:'https://ntfy.sh',ntfyTopic:'',lastSync:''},
  deviceId:'',
  notified:{}
};

let state=loadState();
let currentScreen='inici';
let trackingFilter='Tots';
let documentFilter='Tots';
let pendingFiles=[];let pendingFileIndex=0;
let guidelineAttachmentDraft=[];
let journalAttachmentDraft=[];

function clone(x){return JSON.parse(JSON.stringify(x))}
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY)||localStorage.getItem(OLD_STORAGE_KEY)||localStorage.getItem(LEGACY_STORAGE_KEY);
    if(!raw){const fresh=clone(seed);fresh.deviceId=(crypto.randomUUID?crypto.randomUUID():uid('device'));return fresh;}
    const saved=JSON.parse(raw);
    const merged={...seed,...saved,profile:{...seed.profile,...saved.profile},notifications:{...seed.notifications,...saved.notifications}};
    const guidelineTones=['peach','mint','lilac','sky','yellow','rose'];
    merged.guidelines=(merged.guidelines||[]).map((g,i)=>({...g,tone:g.tone||guidelineTones[i%guidelineTones.length],attachments:Array.isArray(g.attachments)?g.attachments:[]}));
    merged.journal=(merged.journal||[]).map(j=>({...j,attachments:Array.isArray(j.attachments)?j.attachments:[]}));
    if(!merged.deviceId)merged.deviceId=(crypto.randomUUID?crypto.randomUUID():uid('device'));
    localStorage.setItem(STORAGE_KEY,JSON.stringify(merged));
    return merged;
  }catch{return clone(seed)}
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function lines(s=''){return esc(s).split(/\n+/).filter(Boolean)}
function formatDate(iso){if(!iso)return'Sense data';return new Intl.DateTimeFormat('ca-ES',{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso.slice(0,10)+'T12:00:00'))}
function daysBetween(a,b){return Math.ceil((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/86400000)}
function addInterval(dateStr,value,unit){
  if(!dateStr||!value)return'';
  const [y,m,day]=dateStr.split('-').map(Number);value=Number(value);
  const d=new Date(y,m-1,day,12,0,0);
  if(unit==='days')d.setDate(d.getDate()+value);
  if(unit==='weeks')d.setDate(d.getDate()+value*7);
  if(unit==='months'){
    const originalDay=d.getDate();
    d.setDate(1);d.setMonth(d.getMonth()+value);
    const lastDay=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
    d.setDate(Math.min(originalDay,lastDay));
  }
  if(unit==='years'){
    const originalDay=d.getDate(),originalMonth=d.getMonth();
    d.setDate(1);d.setFullYear(d.getFullYear()+value);d.setMonth(originalMonth);
    const lastDay=new Date(d.getFullYear(),originalMonth+1,0).getDate();
    d.setDate(Math.min(originalDay,lastDay));
  }
  const yy=d.getFullYear(),mm=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');
  return `${yy}-${mm}-${dd}`;
}
function dueText(date){if(!date)return'Sense data';const diff=daysBetween(todayISO(),date);if(diff<0)return`Fa ${Math.abs(diff)} dies`;if(diff===0)return'Avui';if(diff===1)return'Demà';return`D’aquí ${diff} dies`}
function unitLabel(unit,val){const one=Number(val)===1;return({days:one?'dia':'dies',weeks:one?'setmana':'setmanes',months:one?'mes':'mesos',years:one?'any':'anys'})[unit]||unit}
function categoryIcon(cat){return({'Vacuna':'syringe','Desparasitació':'pill','Medicació':'heart','Higiene':'sparkles','Revisió':'clipboard','Altres':'file'})[cat]||'file'}
function formatTone(format,category=''){return({'Vacuna':'yellow','Pastilla':'mint','Pipeta':'sky','Crema':'peach','Xampú':'lilac','Aliment':'orange','Injecció':'rose','Altres':'neutral'})[format]||({'Vacuna':'yellow','Desparasitació':'mint','Medicació':'lilac','Higiene':'sky','Revisió':'peach','Altres':'neutral'})[category]||'neutral'}
function formatIcon(format,category=''){return({'Vacuna':'syringe','Pastilla':'pill','Pipeta':'droplet','Crema':'bottle','Xampú':'sparkles','Aliment':'bowl','Injecció':'syringe','Altres':'file'})[format]||categoryIcon(category)}
function journalTone(type=''){return({'Salut':'peach','Visita veterinari':'sky','Millora':'mint','Medicació':'lilac','Alimentació':'yellow','Altres':'neutral'})[type]||'neutral'}
function documentTone(cat=''){return({'Carnet de vacunació':'yellow','Analítiques':'lilac','Receptes':'peach','Informes':'sky','Altres':'orange'})[cat]||'neutral'}
function fileIcon(type=''){if(type.startsWith('image/'))return'image';if(type.includes('pdf'))return'file';return'paperclip'}

function navigate(screen){
  currentScreen=screen;
  document.querySelectorAll('.screen').forEach(el=>el.classList.toggle('active',el.dataset.screen===screen));
  document.querySelectorAll('[data-nav]').forEach(el=>el.classList.toggle('active',el.dataset.nav===screen));
  const titles={inici:'Inici',seguiment:'Seguiment',pautes:'Pautes',quadern:'Quadern',documents:'Documents',notificacions:'Notificacions',perfil:'Blat'};
  document.getElementById('screenTitle').textContent=titles[screen]||'Blat al dia';
  window.scrollTo({top:0,behavior:'smooth'});
}

function photoCropValues(){return {x:Number(state.profile.photoX??50),y:Number(state.profile.photoY??50),zoom:Number(state.profile.photoZoom??1)}}
function applyPhotoCrop(img){if(!img)return;const {x,y,zoom}=photoCropValues();img.style.objectPosition=`${x}% ${y}%`;img.style.transform=`scale(${zoom})`;img.style.transformOrigin=`${x}% ${y}%`}
function applyCropToAllPhotos(){['headerAvatar','sidebarAvatar','heroAvatar','profilePhoto'].forEach(id=>applyPhotoCrop(document.getElementById(id)))}
function renderAll(){renderHeaderPhoto();renderHome();renderTracking();renderGuidelines();renderJournal();renderProfile();renderDocuments();renderNotifications();hydrateIcons();checkNotifications()}
async function renderHeaderPhoto(){
  await Promise.all([
    loadBlobImage('profile-photo',document.getElementById('headerAvatar'),document.getElementById('avatarFallback')),
    loadBlobImage('profile-photo',document.getElementById('sidebarAvatar'),document.getElementById('sidebarAvatarFallback')),
    loadBlobImage('profile-photo',document.getElementById('heroAvatar'),document.getElementById('heroAvatarFallback'))
  ]);
  applyCropToAllPhotos();
}

function renderHome(){
  const upcoming=[...state.tracking].filter(x=>x.nextDate).sort((a,b)=>a.nextDate.localeCompare(b.nextDate)).slice(0,4);
  document.getElementById('summaryUpcoming').textContent=state.tracking.filter(x=>x.nextDate&&daysBetween(todayISO(),x.nextDate)<=30).length;
  document.getElementById('summaryGuidelines').textContent=state.guidelines.length;
  document.getElementById('summaryJournal').textContent=state.journal.length;
  document.getElementById('summaryDocuments').textContent=state.documents.length;
  document.getElementById('upcomingList').innerHTML=upcoming.length?upcoming.map(item=>`<button class="card notice-card tone-${formatTone(item.format,item.category)}" data-edit-tracking="${item.id}" style="text-align:left;width:100%"><div class="notice-icon">${icon(formatIcon(item.format,item.category))}</div><div class="notice-body"><div class="notice-title">${esc(item.name||'Seguiment sense nom')}</div><div class="notice-meta">${esc(item.subtype||item.category)} · ${esc(item.format||'')}</div></div><div class="notice-date">${dueText(item.nextDate)}<span>${formatDate(item.nextDate)}</span></div></button>`).join(''):`<div class="empty"><strong>Cap avís pendent</strong>Afegeix el primer seguiment.</div>`;
  const recent=[...state.journal].sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,4);
  document.getElementById('recentJournal').innerHTML=recent.length?recent.map(j=>`<button class="card notice-card tone-${journalTone(j.type)}" data-edit-journal="${j.id}" style="text-align:left;width:100%"><div class="notice-icon">${icon('notebook')}</div><div class="notice-body"><div class="notice-title">${esc(j.title||'Anotació sense títol')}</div><div class="notice-meta">${esc(j.type||'Altres')} · ${formatDate(j.date)}</div></div>${icon('chevron-right',17)}</button>`).join(''):`<div class="empty"><strong>Encara no hi ha anotacions</strong>Quan passi alguna cosa, deixa-la apuntada aquí.</div>`;
}

function renderTracking(){
  const cats=['Tots',...new Set(state.tracking.map(x=>x.category||'Altres'))];
  document.getElementById('trackingFilters').innerHTML=cats.map(c=>`<button class="filter-btn ${trackingFilter===c?'active':''}" data-track-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const filtered=trackingFilter==='Tots'?state.tracking:state.tracking.filter(x=>(x.category||'Altres')===trackingFilter);const groups={};filtered.forEach(x=>{const cat=x.category||'Altres';(groups[cat]??=[]).push(x)});
  const keys=Object.keys(groups);
  document.getElementById('trackingGroups').innerHTML=keys.length?keys.map(cat=>`<div><div class="group-head"><h3>${esc(cat)}</h3><span class="group-count">${groups[cat].length} ${groups[cat].length===1?'item':'items'}</span></div><div class="stack">${groups[cat].sort((a,b)=>(a.nextDate||'9999').localeCompare(b.nextDate||'9999')).map(trackingCard).join('')}</div></div>`).join(''):`<div class="empty"><strong>No hi ha res aquí</strong>Pots afegir qualsevol vacuna, pastilla, crema, revisió o el que necessitis.</div>`;
}
function trackingCard(item){return`<div class="card tracking-card tone-${formatTone(item.format,item.category)}"><div class="card-icon">${icon(formatIcon(item.format,item.category))}</div><div class="tracking-main"><h4>${esc(item.name||'Seguiment sense nom')}</h4><p>${esc(item.subtype||item.category)}${item.format?` · ${esc(item.format)}`:''}</p><div class="inline-tags"><span class="pill">${esc(item.category)}</span>${item.intervalValue?`<span class="pill">Cada ${item.intervalValue} ${unitLabel(item.intervalUnit,item.intervalValue)}</span>`:''}</div>${item.notes?`<p style="margin-top:9px">${esc(item.notes)}</p>`:''}</div><div class="tracking-actions"><div class="due">${item.nextDate?dueText(item.nextDate):'Sense data'}<br><span style="color:var(--muted);font-weight:600">${item.nextDate?formatDate(item.nextDate):''}</span></div><div><button class="tiny-btn" data-edit-tracking="${item.id}">Editar</button> <button class="done-btn" data-done-tracking="${item.id}">Fet ✓</button></div></div></div>`}

function renderGuidelines(){
  const list=document.getElementById('guidelinesList');
  list.innerHTML=state.guidelines.length?state.guidelines.map(g=>{
    const instructions=lines(g.instructions||'');
    const tone=g.tone||['peach','mint','lilac','sky','yellow','rose'][state.guidelines.indexOf(g)%6];
    return `<article class="card guideline-card tone-${tone}"><div class="guideline-top"><div><span class="pill">Pauta habitual</span><h4 style="margin-top:8px">${esc(g.title||'Pauta sense títol')}</h4>${g.when?`<p>${esc(g.when)}</p>`:''}</div><button class="card-menu" data-edit-guideline="${g.id}" aria-label="Editar pauta">${icon('more')}</button></div>${instructions.length?`<ul class="guideline-lines">${instructions.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}${g.products?`<div class="inline-tags"><span class="pill">${esc(g.products)}</span></div>`:''}${g.notes?`<p style="margin-top:10px">${esc(g.notes)}</p>`:''}${g.attachments?.length?`<div class="guideline-media-grid">${g.attachments.map(a=>`<button class="guideline-media" data-open-guideline-file="${a.id}"><div class="guideline-media-preview" data-guideline-preview="${a.id}">${icon(fileIcon(a.type))}</div><div class="guideline-media-copy"><strong>${esc(a.name)}</strong>${a.description?`<span>${esc(a.description)}</span>`:''}</div></button>`).join('')}</div>`:''}</article>`
  }).join(''):`<div class="empty"><strong>Cap pauta encara</strong>Afegeix aquelles indicacions que et dona el veterinari i vols recordar.</div>`;
  hydrateGuidelinePreviews();
}
async function hydrateGuidelinePreviews(){
  const nodes=[...document.querySelectorAll('[data-guideline-preview]')];
  await Promise.all(nodes.map(async node=>{const id=node.dataset.guidelinePreview;const meta=state.guidelines.flatMap(g=>g.attachments||[]).find(a=>a.id===id);if(!meta||!meta.type?.startsWith('image/'))return;const blob=await getBlob(id);if(!blob)return;const url=URL.createObjectURL(blob);node.innerHTML=`<img src="${url}" alt="">`;setTimeout(()=>URL.revokeObjectURL(url),120000)}));
}

function renderJournal(){
  const items=[...state.journal].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  document.getElementById('journalTimeline').innerHTML=items.length?items.map(j=>`<div class="card journal-card tone-${journalTone(j.type)}"><div class="journal-date">${formatDate(j.date)}</div><div class="journal-head"><div><h4>${esc(j.title||'Anotació sense títol')}</h4><span class="pill">${esc(j.type||'Altres')}</span></div><button class="card-menu" data-edit-journal="${j.id}" aria-label="Editar">${icon('more')}</button></div>${j.notes?`<p style="margin-top:10px">${esc(j.notes)}</p>`:''}${j.attachments?.length?`<div class="journal-media-grid">${j.attachments.map(a=>`<button class="journal-media" data-open-journal-file="${a.id}"><div class="journal-media-preview" data-journal-preview="${a.id}">${icon(fileIcon(a.type))}</div>${a.description?`<span>${esc(a.description)}</span>`:''}</button>`).join('')}</div>`:''}</div>`).join(''):`<div class="empty"><strong>Quadern buit</strong>Afegeix visites, símptomes, millores o qualsevol cosa que vulguis recordar.</div>`;
  hydrateJournalPreviews();
}
async function hydrateJournalPreviews(){
  const nodes=[...document.querySelectorAll('[data-journal-preview]')];
  await Promise.all(nodes.map(async node=>{const id=node.dataset.journalPreview;const meta=state.journal.flatMap(j=>j.attachments||[]).find(a=>a.id===id);if(!meta||!meta.type?.startsWith('image/'))return;const blob=await getBlob(id);if(!blob)return;const url=URL.createObjectURL(blob);node.innerHTML=`<img src="${url}" alt="">`;setTimeout(()=>URL.revokeObjectURL(url),120000)}));
}


function renderProfile(){const f=document.getElementById('profileForm');Object.entries(state.profile).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v||''});document.getElementById('profileNameTitle').textContent=state.profile.name||'Blat';document.getElementById('profileSummary').textContent=[state.profile.breed,state.profile.weight?`${state.profile.weight} kg`:null].filter(Boolean).join(' · ');document.getElementById('sidebarDogName').textContent=state.profile.name||'Blat';document.getElementById('sidebarDogMeta').textContent=state.profile.breed||'Golden Retriever';loadBlobImage('profile-photo',document.getElementById('profilePhoto'),document.getElementById('profilePhotoFallback')).then(()=>applyPhotoCrop(document.getElementById('profilePhoto')))}
function renderDocuments(){
  const cats=['Tots','Carnet de vacunació','Analítiques','Receptes','Informes','Altres'];document.getElementById('documentFilters').innerHTML=cats.map(c=>`<button class="filter-btn ${documentFilter===c?'active':''}" data-doc-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const docs=(documentFilter==='Tots'?state.documents:state.documents.filter(d=>d.category===documentFilter)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  document.getElementById('documentsList').innerHTML=docs.length?docs.map(d=>`<div class="card doc-card tone-${documentTone(d.category)}"><div class="doc-icon">${icon(fileIcon(d.type))}</div><div><div class="doc-title">${esc(d.name)}</div><div class="doc-meta">${esc(d.category)} · ${formatDate(d.createdAt.slice(0,10))}${d.note?` · ${esc(d.note)}`:''}</div></div><div class="doc-actions"><button data-open-doc="${d.id}" title="Obrir">${icon('external')}</button><button data-delete-doc="${d.id}" title="Eliminar">${icon('trash')}</button></div></div>`).join(''):`<div class="empty"><strong>Encara no hi ha arxius</strong>Puja el carnet de vacunació, analítiques, receptes, informes o qualsevol altre document.</div>`;
}

let trackingNextDateManual=false;
function calculatedTrackingNextDate(){
  const f=document.getElementById('trackingForm');
  return addInterval(f.elements.lastDate.value,f.elements.intervalValue.value,f.elements.intervalUnit.value);
}
function refreshTrackingNextDate({force=false}={}){
  const f=document.getElementById('trackingForm'),next=f.elements.nextDate;
  const calculated=calculatedTrackingNextDate();
  if(!calculated)return;
  if(force||!trackingNextDateManual||!next.value)next.value=calculated;
}
function openTracking(item=null){
  const dlg=document.getElementById('trackingDialog'),f=document.getElementById('trackingForm');
  f.reset();f.elements.notifyBefore.value=15;f.elements.notifySameDay.checked=true;f.elements.intervalUnit.value='months';f.elements.id.value='';
  document.getElementById('trackingModalTitle').textContent=item?'Editar seguiment':'Nou seguiment';
  f.querySelector('[data-action="delete-tracking"]').classList.toggle('hidden',!item);
  if(item)Object.entries(item).forEach(([k,v])=>{if(f.elements[k])f.elements[k].type==='checkbox'?f.elements[k].checked=!!v:f.elements[k].value=v??''});
  const calculated=calculatedTrackingNextDate();
  trackingNextDateManual=!!(item?.nextDate&&calculated&&item.nextDate!==calculated);
  if(!item)trackingNextDateManual=false;
  refreshTrackingNextDate();
  dlg.showModal();
}
function openGuideline(item=null){
  const dlg=document.getElementById('guidelineDialog'),f=document.getElementById('guidelineForm');f.reset();f.elements.id.value='';document.getElementById('guidelineModalTitle').textContent=item?'Editar pauta':'Nova pauta';f.querySelector('[data-action="delete-guideline"]').classList.toggle('hidden',!item);
  if(item)Object.entries(item).forEach(([k,v])=>{if(f.elements[k]&&k!=='attachments')f.elements[k].value=v??''});
  guidelineAttachmentDraft=(item?.attachments||[]).map(a=>({...a,isNew:false,file:null,deleted:false}));renderGuidelineAttachmentEditor();dlg.showModal();
}
function openJournal(item=null){const dlg=document.getElementById('journalDialog'),f=document.getElementById('journalForm');f.reset();f.elements.id.value='';f.elements.date.value=todayISO();document.getElementById('journalModalTitle').textContent=item?'Editar anotació':'Nova anotació';f.querySelector('[data-action="delete-journal"]').classList.toggle('hidden',!item);if(item)Object.entries(item).forEach(([k,v])=>{if(f.elements[k]&&k!=='attachments')f.elements[k].value=v??''});journalAttachmentDraft=(item?.attachments||[]).map(a=>({...a,isNew:false,file:null,deleted:false}));renderJournalAttachmentEditor();dlg.showModal()}

function markDone(id){const item=state.tracking.find(x=>x.id===id);if(!item)return;const doneDate=todayISO();item.lastDate=doneDate;if(item.intervalValue)item.nextDate=addInterval(doneDate,item.intervalValue,item.intervalUnit);state.journal.push({id:uid('j'),date:doneDate,type:'Medicació',title:`${item.name||'Seguiment'} · fet`,notes:`${item.category||'Altres'}${item.subtype?` · ${item.subtype}`:''}. Proper recordatori: ${item.nextDate?formatDate(item.nextDate):'sense data'}.`,attachments:[]});saveState();syncNotificationBackend({silent:true});renderAll();toast(`${item.name||'Seguiment'} marcat com a fet`)}

async function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(DB_STORE))db.createObjectStore(DB_STORE)};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function putBlob(key,blob){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,'readwrite');tx.objectStore(DB_STORE).put(blob,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
async function getBlob(key){const db=await openDB();return new Promise((resolve,reject)=>{const req=db.transaction(DB_STORE,'readonly').objectStore(DB_STORE).get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function deleteBlob(key){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,'readwrite');tx.objectStore(DB_STORE).delete(key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
async function loadBlobImage(key,img,fallback){try{const blob=await getBlob(key);if(blob){const url=URL.createObjectURL(blob);img.src=url;img.style.display='block';fallback.style.display='none';applyPhotoCrop(img)}else{img.style.display='none';fallback.style.display='grid'}}catch{}}
async function handleProfilePhoto(file){if(!file)return;await putBlob('profile-photo',file);state.profile.photoX=50;state.profile.photoY=50;state.profile.photoZoom=1;saveState();await renderHeaderPhoto();renderProfile();toast('Foto d’en Blat actualitzada');setTimeout(openPhotoCrop,120)}

function renderGuidelineAttachmentEditor(){
  const el=document.getElementById('guidelineAttachmentEditor');const visible=guidelineAttachmentDraft.map((a,i)=>({...a,_i:i})).filter(a=>!a.deleted);
  el.innerHTML=visible.length?visible.map(a=>`<div class="attachment-edit-row"><div class="attachment-edit-preview" data-edit-preview="${a._i}">${icon(fileIcon(a.type))}</div><div class="attachment-edit-main"><strong>${esc(a.name)}</strong><input type="text" value="${esc(a.description||'')}" placeholder="Descripció, ex. crema per quan està infectat" data-attachment-desc="${a._i}" /></div><button type="button" class="attachment-remove" data-remove-attachment="${a._i}" aria-label="Eliminar adjunt">${icon('trash')}</button></div>`).join(''):`<div class="empty"><strong>Cap adjunt</strong>Afegeix fotos, PDFs o altres arxius. Cada adjunt pot tenir la seva descripció.</div>`;
  hydrateDraftPreviews();
}
async function hydrateDraftPreviews(){
  const nodes=[...document.querySelectorAll('[data-edit-preview]')];
  await Promise.all(nodes.map(async node=>{const a=guidelineAttachmentDraft[Number(node.dataset.editPreview)];if(!a||!a.type?.startsWith('image/'))return;let blob=a.file;if(!blob)blob=await getBlob(a.id);if(!blob)return;const url=URL.createObjectURL(blob);node.innerHTML=`<img src="${url}" alt="">`;setTimeout(()=>URL.revokeObjectURL(url),120000)}));
}
function addGuidelineFiles(files){[...files].forEach(file=>guidelineAttachmentDraft.push({id:uid('gfile'),name:file.name,type:file.type||'application/octet-stream',description:'',isNew:true,file,deleted:false}));renderGuidelineAttachmentEditor()}
async function saveGuidelineAttachments(){
  document.querySelectorAll('[data-attachment-desc]').forEach(inp=>{const a=guidelineAttachmentDraft[Number(inp.dataset.attachmentDesc)];if(a)a.description=inp.value.trim()});
  for(const a of guidelineAttachmentDraft){if(a.deleted&&!a.isNew)await deleteBlob(a.id);if(a.isNew&&!a.deleted&&a.file)await putBlob(a.id,a.file)}
  return guidelineAttachmentDraft.filter(a=>!a.deleted).map(({id,name,type,description})=>({id,name,type,description}));
}
async function openGuidelineFile(id){const blob=await getBlob(id);if(!blob)return;const url=URL.createObjectURL(blob);window.open(url,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000)}

function renderJournalAttachmentEditor(){
  const el=document.getElementById('journalAttachmentEditor');const visible=journalAttachmentDraft.map((a,i)=>({...a,_i:i})).filter(a=>!a.deleted);
  el.innerHTML=visible.length?visible.map(a=>`<div class="attachment-edit-row"><div class="attachment-edit-preview" data-journal-edit-preview="${a._i}">${icon(fileIcon(a.type))}</div><div class="attachment-edit-main"><strong>${esc(a.name)}</strong><input type="text" value="${esc(a.description||'')}" placeholder="Descripció, ex. aspecte de l'èczema el primer dia" data-journal-attachment-desc="${a._i}" /></div><button type="button" class="attachment-remove" data-remove-journal-attachment="${a._i}" aria-label="Eliminar adjunt">${icon('trash')}</button></div>`).join(''):`<div class="empty"><strong>Cap foto o arxiu</strong>Pots guardar fotos de la pell, evolució d'una ferida, receptes o qualsevol document relacionat.</div>`;
  hydrateJournalDraftPreviews();
}
async function hydrateJournalDraftPreviews(){
  const nodes=[...document.querySelectorAll('[data-journal-edit-preview]')];
  await Promise.all(nodes.map(async node=>{const a=journalAttachmentDraft[Number(node.dataset.journalEditPreview)];if(!a||!a.type?.startsWith('image/'))return;let blob=a.file;if(!blob)blob=await getBlob(a.id);if(!blob)return;const url=URL.createObjectURL(blob);node.innerHTML=`<img src="${url}" alt="">`;setTimeout(()=>URL.revokeObjectURL(url),120000)}));
}
function addJournalFiles(files){[...files].forEach(file=>journalAttachmentDraft.push({id:uid('jfile'),name:file.name,type:file.type||'application/octet-stream',description:'',isNew:true,file,deleted:false}));renderJournalAttachmentEditor()}
async function saveJournalAttachments(){
  document.querySelectorAll('[data-journal-attachment-desc]').forEach(inp=>{const a=journalAttachmentDraft[Number(inp.dataset.journalAttachmentDesc)];if(a)a.description=inp.value.trim()});
  for(const a of journalAttachmentDraft){if(a.deleted&&!a.isNew)await deleteBlob(a.id);if(a.isNew&&!a.deleted&&a.file)await putBlob(a.id,a.file)}
  return journalAttachmentDraft.filter(a=>!a.deleted).map(({id,name,type,description})=>({id,name,type,description}));
}
async function openJournalFile(id){const blob=await getBlob(id);if(!blob)return;const url=URL.createObjectURL(blob);window.open(url,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000)}

function queueDocuments(files){pendingFiles=[...files];pendingFileIndex=0;if(!pendingFiles.length)return;showNextDocDialog()}
function showNextDocDialog(){if(pendingFileIndex>=pendingFiles.length){pendingFiles=[];renderDocuments();renderHome();toast('Arxius pujats');return}const f=pendingFiles[pendingFileIndex];document.getElementById('pendingDocName').textContent=f.name;document.getElementById('docCategoryForm').reset();document.getElementById('docCategoryDialog').showModal()}
async function savePendingDocument(category,note){const file=pendingFiles[pendingFileIndex];const id=uid('doc');await putBlob(id,file);state.documents.push({id,name:file.name,type:file.type||'application/octet-stream',size:file.size,category,note,createdAt:new Date().toISOString()});saveState();pendingFileIndex++;document.getElementById('docCategoryDialog').close();showNextDocDialog()}
async function openDocument(id){const blob=await getBlob(id);if(!blob)return;const url=URL.createObjectURL(blob);window.open(url,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000)}
async function deleteDocument(id){if(!confirm('Vols eliminar aquest arxiu?'))return;await deleteBlob(id);state.documents=state.documents.filter(x=>x.id!==id);saveState();renderDocuments();renderHome();toast('Arxiu eliminat')}


async function openPhotoCrop(){
  const blob=await getBlob('profile-photo');
  if(!blob){toast('Puja primer una foto d’en Blat');return}
  const dlg=document.getElementById('photoCropDialog'),img=document.getElementById('photoCropPreview');
  const url=URL.createObjectURL(blob);img.src=url;img.dataset.objectUrl=url;
  const {x,y,zoom}=photoCropValues();
  document.getElementById('cropX').value=x;document.getElementById('cropY').value=y;document.getElementById('cropZoom').value=zoom;
  updatePhotoCropPreview();dlg.showModal();
}
function updatePhotoCropPreview(){
  const img=document.getElementById('photoCropPreview');if(!img)return;
  const x=Number(document.getElementById('cropX').value||50),y=Number(document.getElementById('cropY').value||50),zoom=Number(document.getElementById('cropZoom').value||1);
  img.style.objectPosition=`${x}% ${y}%`;img.style.transform=`scale(${zoom})`;img.style.transformOrigin=`${x}% ${y}%`;
  document.getElementById('cropXOut').value=`${Math.round(x)}%`;document.getElementById('cropYOut').value=`${Math.round(y)}%`;document.getElementById('cropZoomOut').value=`${zoom.toFixed(2)}×`;
}
function resetPhotoCropControls(){document.getElementById('cropX').value=50;document.getElementById('cropY').value=50;document.getElementById('cropZoom').value=1;updatePhotoCropPreview()}

function notificationConfig(){return window.BLAT_CONFIG||{notificationFunctionUrl:'',supabaseAnonKey:''}}
function backendConfigured(){return !!notificationConfig().notificationFunctionUrl}
function notificationSettingsFromForm(){
  const f=document.getElementById('notificationForm');
  if(!f)return state.notifications;
  return {
    emailEnabled:f.elements.emailEnabled.checked,
    email:(f.elements.email.value||'').trim(),
    ntfyEnabled:f.elements.ntfyEnabled.checked,
    ntfyServer:(f.elements.ntfyServer.value||'https://ntfy.sh').trim().replace(/\/$/,''),
    ntfyTopic:(f.elements.ntfyTopic.value||'').trim()
  };
}
function renderNotifications(){
  const f=document.getElementById('notificationForm');if(!f)return;
  const n=state.notifications||seed.notifications;
  f.elements.emailEnabled.checked=!!n.emailEnabled;
  f.elements.email.value=n.email||'';
  f.elements.ntfyEnabled.checked=!!n.ntfyEnabled;
  f.elements.ntfyServer.value=n.ntfyServer||'https://ntfy.sh';
  f.elements.ntfyTopic.value=n.ntfyTopic||'';
  const status=document.getElementById('notificationBackendStatus');
  if(status){
    status.className='backend-status '+(backendConfigured()?'connected':'pending');
    status.innerHTML=backendConfigured()?`${icon('check',14)} Backend connectat${n.lastSync?` · ${new Intl.DateTimeFormat('ca-ES',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(n.lastSync))}`:''}`:`${icon('info',14)} Falta connectar Supabase per als avisos automàtics`;
  }
  const upcoming=[...state.tracking].filter(x=>x.nextDate).sort((a,b)=>a.nextDate.localeCompare(b.nextDate)).slice(0,6);
  const el=document.getElementById('notificationUpcoming');
  el.innerHTML=upcoming.length?upcoming.map(item=>`<div class="notification-reminder tone-${formatTone(item.format,item.category)}"><span class="notification-reminder-icon">${icon(formatIcon(item.format,item.category))}</span><span><strong>${esc(item.name||'Seguiment')}</strong><small>${esc(item.format||item.category||'Altres')} · ${dueText(item.nextDate)}</small></span><span class="notification-channels">${n.emailEnabled?`<i title="Email">${icon('mail',14)}</i>`:''}${n.ntfyEnabled?`<i title="ntfy">${icon('smartphone',14)}</i>`:''}</span></div>`).join(''):`<div class="empty"><strong>Cap avís programat</strong>Quan afegeixis dates a Seguiment, apareixeran aquí.</div>`;
}
async function backendRequest(payload){
  const cfg=notificationConfig();if(!cfg.notificationFunctionUrl)throw new Error('Backend no configurat');
  const headers={'Content-Type':'application/json'};
  if(cfg.supabaseAnonKey){headers.apikey=cfg.supabaseAnonKey;headers.Authorization=`Bearer ${cfg.supabaseAnonKey}`}
  const res=await fetch(cfg.notificationFunctionUrl,{method:'POST',headers,body:JSON.stringify(payload)});
  let data={};try{data=await res.json()}catch{}
  if(!res.ok)throw new Error(data.error||`Error ${res.status}`);
  return data;
}
async function syncNotificationBackend({silent=false}={}){
  if(!backendConfigured()){if(!silent)toast('Configura Supabase a config.js per activar avisos automàtics');renderNotifications();return false}
  try{
    await backendRequest({action:'sync',deviceId:state.deviceId,settings:state.notifications,tracking:state.tracking.map(({id,name,category,format,subtype,nextDate,notifyBefore,notifySameDay})=>({id,name,category,format,subtype,nextDate,notifyBefore,notifySameDay}))});
    state.notifications.lastSync=new Date().toISOString();saveState();renderNotifications();if(!silent)toast('Avisos sincronitzats');return true;
  }catch(err){console.error(err);if(!silent)toast(`No s'ha pogut sincronitzar: ${err.message}`);renderNotifications();return false}
}
async function testNotificationChannel(channel){
  const current=notificationSettingsFromForm();state.notifications={...state.notifications,...current};saveState();renderNotifications();
  if(channel==='ntfy'&&!backendConfigured()){
    if(!current.ntfyTopic){toast('Escriu primer el topic de ntfy');return}
    try{
      const res=await fetch(current.ntfyServer||'https://ntfy.sh',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({topic:current.ntfyTopic,title:'Blat al dia · prova',message:'Les notificacions ntfy funcionen correctament 🐾',priority:3,tags:['dog','white_check_mark']})});
      if(!res.ok)throw new Error(`Error ${res.status}`);toast('Notificació ntfy enviada');
    }catch(err){console.error(err);toast(`No s'ha pogut enviar ntfy: ${err.message}`)}
    return;
  }
  if(!backendConfigured()){toast('L’email necessita el backend Supabase + Resend');return}
  try{await backendRequest({action:'test',channel,deviceId:state.deviceId,settings:current});toast(channel==='email'?'Email de prova enviat':'Notificació ntfy enviada')}catch(err){console.error(err);toast(`Error de prova: ${err.message}`)}
}

async function checkNotifications(){if(!('Notification'in window)||Notification.permission!=='granted')return;const today=todayISO();for(const item of state.tracking){if(!item.nextDate)continue;const diff=daysBetween(today,item.nextDate);const should=(item.notifySameDay&&diff===0)||(Number(item.notifyBefore)===diff);const key=`${item.id}-${today}-${diff}`;if(should&&!state.notified[key]){try{new Notification('Blat al dia',{body:diff===0?`${item.name||'Seguiment'} toca avui`:`${item.name||'Seguiment'} toca d’aquí ${diff} dies`,icon:'icons/icon-192.png'});state.notified[key]=true;saveState()}catch{}}}}
function requestNotifications(){if('Notification'in window&&Notification.permission==='default')Notification.requestPermission().then(()=>checkNotifications())}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2200)}

// UI events
document.addEventListener('click',async e=>{
  const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go);return}
  const nav=e.target.closest('[data-nav]');if(nav){navigate(nav.dataset.nav);return}
  const q=e.target.closest('[data-quick]');if(q){if(q.dataset.quick==='tracking')openTracking();if(q.dataset.quick==='note')openJournal();return}
  if(e.target.closest('[data-action="add-tracking"]'))return openTracking();
  if(e.target.closest('[data-action="add-guideline"]'))return openGuideline();
  if(e.target.closest('[data-action="add-journal"]'))return openJournal();
  if(e.target.closest('[data-action="crop-profile-photo"]'))return openPhotoCrop();
  if(e.target.closest('[data-action="reset-photo-crop"]'))return resetPhotoCropControls();
  if(e.target.closest('[data-action="sync-notifications"]'))return syncNotificationBackend();
  if(e.target.closest('[data-action="test-email"]'))return testNotificationChannel('email');
  if(e.target.closest('[data-action="test-ntfy"]'))return testNotificationChannel('ntfy');
  const et=e.target.closest('[data-edit-tracking]');if(et)return openTracking(state.tracking.find(x=>x.id===et.dataset.editTracking));
  const eg=e.target.closest('[data-edit-guideline]');if(eg)return openGuideline(state.guidelines.find(x=>x.id===eg.dataset.editGuideline));
  const ej=e.target.closest('[data-edit-journal]');if(ej)return openJournal(state.journal.find(x=>x.id===ej.dataset.editJournal));
  const done=e.target.closest('[data-done-tracking]');if(done)return markDone(done.dataset.doneTracking);
  const tf=e.target.closest('[data-track-filter]');if(tf){trackingFilter=tf.dataset.trackFilter;renderTracking();return}
  const df=e.target.closest('[data-doc-filter]');if(df){documentFilter=df.dataset.docFilter;renderDocuments();return}
  const openDoc=e.target.closest('[data-open-doc]');if(openDoc)return openDocument(openDoc.dataset.openDoc);
  const delDoc=e.target.closest('[data-delete-doc]');if(delDoc)return deleteDocument(delDoc.dataset.deleteDoc);
  const openGF=e.target.closest('[data-open-guideline-file]');if(openGF)return openGuidelineFile(openGF.dataset.openGuidelineFile);
  const openJF=e.target.closest('[data-open-journal-file]');if(openJF)return openJournalFile(openJF.dataset.openJournalFile);
  const remove=e.target.closest('[data-remove-attachment]');if(remove){guidelineAttachmentDraft[Number(remove.dataset.removeAttachment)].deleted=true;renderGuidelineAttachmentEditor();return}
  const removeJ=e.target.closest('[data-remove-journal-attachment]');if(removeJ){journalAttachmentDraft[Number(removeJ.dataset.removeJournalAttachment)].deleted=true;renderJournalAttachmentEditor();return}
  const close=e.target.closest('[data-close]');if(close)return close.closest('dialog').close();
  if(e.target.closest('[data-action="delete-tracking"]')){const id=document.getElementById('trackingForm').elements.id.value;if(id&&confirm('Vols eliminar aquest seguiment?')){state.tracking=state.tracking.filter(x=>x.id!==id);saveState();syncNotificationBackend({silent:true});document.getElementById('trackingDialog').close();renderAll()}return}
  if(e.target.closest('[data-action="delete-guideline"]')){const id=document.getElementById('guidelineForm').elements.id.value;if(id&&confirm('Vols eliminar aquesta pauta i els seus adjunts?')){const g=state.guidelines.find(x=>x.id===id);for(const a of(g?.attachments||[]))await deleteBlob(a.id);state.guidelines=state.guidelines.filter(x=>x.id!==id);saveState();document.getElementById('guidelineDialog').close();renderAll()}return}
  if(e.target.closest('[data-action="delete-journal"]')){const id=document.getElementById('journalForm').elements.id.value;if(id&&confirm('Vols eliminar aquesta anotació?')){const j=state.journal.find(x=>x.id===id);for(const a of(j?.attachments||[]))await deleteBlob(a.id);state.journal=state.journal.filter(x=>x.id!==id);saveState();document.getElementById('journalDialog').close();renderAll()}return}
});

const trackingForm=document.getElementById('trackingForm');
['lastDate','intervalValue','intervalUnit'].forEach(name=>trackingForm.elements[name].addEventListener('input',()=>refreshTrackingNextDate({force:true})));
trackingForm.elements.intervalUnit.addEventListener('change',()=>refreshTrackingNextDate({force:true}));
trackingForm.elements.nextDate.addEventListener('input',()=>{
  const calculated=calculatedTrackingNextDate();
  trackingNextDateManual=!!trackingForm.elements.nextDate.value&&trackingForm.elements.nextDate.value!==calculated;
});

document.getElementById('trackingForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const obj=Object.fromEntries(new FormData(f));obj.notifySameDay=f.elements.notifySameDay.checked;obj.notifyBefore=Number(obj.notifyBefore||0);obj.intervalValue=obj.intervalValue?Number(obj.intervalValue):'';if(!obj.nextDate&&obj.lastDate&&obj.intervalValue)obj.nextDate=addInterval(obj.lastDate,obj.intervalValue,obj.intervalUnit);if(obj.id){const i=state.tracking.findIndex(x=>x.id===obj.id);state.tracking[i]={...state.tracking[i],...obj}}else{obj.id=uid('t');state.tracking.push(obj)}saveState();syncNotificationBackend({silent:true});f.closest('dialog').close();renderAll();toast('Seguiment desat');requestNotifications()});

document.getElementById('guidelineForm').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget;const obj=Object.fromEntries(new FormData(f));obj.attachments=await saveGuidelineAttachments();if(obj.id){const i=state.guidelines.findIndex(x=>x.id===obj.id);state.guidelines[i]={...state.guidelines[i],...obj}}else{obj.id=uid('g');obj.tone=['peach','mint','lilac','sky','yellow','rose'][state.guidelines.length%6];state.guidelines.push(obj)}saveState();f.closest('dialog').close();renderAll();toast('Pauta desada')});

document.getElementById('journalForm').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget,obj=Object.fromEntries(new FormData(f));obj.attachments=await saveJournalAttachments();if(obj.id){const i=state.journal.findIndex(x=>x.id===obj.id);state.journal[i]={...state.journal[i],...obj}}else{obj.id=uid('j');state.journal.push(obj)}saveState();f.closest('dialog').close();renderAll();toast('Anotació desada')});
document.getElementById('profileForm').addEventListener('submit',e=>{e.preventDefault();state.profile=Object.fromEntries(new FormData(e.currentTarget));saveState();renderAll();toast('Fitxa desada')});
['cropX','cropY','cropZoom'].forEach(id=>document.getElementById(id)?.addEventListener('input',updatePhotoCropPreview));
document.getElementById('photoCropForm')?.addEventListener('submit',e=>{e.preventDefault();state.profile.photoX=Number(document.getElementById('cropX').value||50);state.profile.photoY=Number(document.getElementById('cropY').value||50);state.profile.photoZoom=Number(document.getElementById('cropZoom').value||1);saveState();applyCropToAllPhotos();applyPhotoCrop(document.getElementById('profilePhoto'));document.getElementById('photoCropDialog').close();toast('Enquadrament desat')});
document.getElementById('photoCropDialog')?.addEventListener('close',()=>{const img=document.getElementById('photoCropPreview');if(img?.dataset.objectUrl){URL.revokeObjectURL(img.dataset.objectUrl);delete img.dataset.objectUrl}});
document.getElementById('profilePhotoInput').addEventListener('change',e=>handleProfilePhoto(e.target.files[0]));
document.getElementById('documentInput').addEventListener('change',e=>{queueDocuments(e.target.files);e.target.value=''});
document.getElementById('guidelineFiles').addEventListener('change',e=>{addGuidelineFiles(e.target.files);e.target.value=''});
document.getElementById('guidelineAttachmentEditor').addEventListener('input',e=>{const inp=e.target.closest('[data-attachment-desc]');if(!inp)return;const a=guidelineAttachmentDraft[Number(inp.dataset.attachmentDesc)];if(a)a.description=inp.value});
document.getElementById('journalFiles').addEventListener('change',e=>{addJournalFiles(e.target.files);e.target.value=''});
document.getElementById('journalAttachmentEditor').addEventListener('input',e=>{const inp=e.target.closest('[data-journal-attachment-desc]');if(!inp)return;const a=journalAttachmentDraft[Number(inp.dataset.journalAttachmentDesc)];if(a)a.description=inp.value});
document.getElementById('docCategoryForm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));savePendingDocument(d.category,d.note||'')});

document.getElementById('notificationForm').addEventListener('submit',async e=>{e.preventDefault();state.notifications={...state.notifications,...notificationSettingsFromForm()};saveState();renderNotifications();const synced=await syncNotificationBackend({silent:true});toast(synced?'Notificacions desades i sincronitzades':'Notificacions desades');});

hydrateIcons();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderAll();checkNotifications();
