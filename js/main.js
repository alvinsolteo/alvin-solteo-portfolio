/* Alvin Solteo — Virtual Assistant Portfolio
   Behaviour: tools tabs, certificates lightbox, video, testimonials carousel,
   scroll progress, reveal-on-scroll and counters. */
/* Tool logos: tool name -> file in assets/logos/tools/ */
const ICON_DIR='assets/logos/tools/';
const ICONS={
  "Microsoft Office 365": "microsoft-office-365.svg",
  "Google Workspace": "google-workspace.svg",
  "Outlook": "outlook.svg",
  "SharePoint": "sharepoint.svg",
  "Dropbox": "dropbox.svg",
  "Zoom": "zoom.svg",
  "Slack": "slack.svg",
  "DocuSign": "docusign.png",
  "Asana": "asana.svg",
  "Notion": "notion.svg",
  "Airtable": "airtable.svg",
  "Trello": "trello.svg",
  "Calendly": "calendly.svg",
  "SurveyMonkey": "surveymonkey.svg",
  "Zendesk": "zendesk.svg",
  "Monday.com": "monday-com.svg",
  "Xero": "xero.svg",
  "QuickBooks": "quickbooks.svg",
  "HubSpot": "hubspot.svg",
  "Amazon": "amazon.svg",
  "AWS": "aws.svg",
  "Meta": "meta.svg",
  "LinkedIn": "linkedin.svg",
  "Sales Navigator": "sales-navigator.svg",
  "Claude": "claude.svg",
  "Canva": "canva.svg",
  "Lightroom": "lightroom.svg",
  "Adobe": "adobe.svg",
  "ChatGPT": "chatgpt.svg",
  "Pipedrive CRM": "pipedrive-crm.svg",
  "HRIS": "hris.svg",
  "LMS": "lms.svg",
  "CapCut": "capcut.png",
  "GoHighLevel": "gohighlevel.png",
  "ClickFunnels": "clickfunnels.png",
  "Keepa": "keepa.png",
  "Jungle Scout": "jungle-scout.png",
  "Hubstaff": "hubstaff.png",
  "Apollo": "apollo.png",
  "WorkflowMax": "workflowmax.png",
  "Connecteam": "connecteam.png",
  "Brevity Care CRM": "brevity-care-crm.png",
  "ShiftCare": "shiftcare.png",
  "Eworks Manager": "eworks-manager.png",
  "JobAdder": "jobadder.png",
  "Carelink": "carelink.png",
  "Flare": "flare.png",
  "Freshdesk": "freshdesk.png",
  "Wrike CRM": "wrike-crm.png",
  "PRODA": "proda.png",
  "SEEK": "seek.png",
  "Idealist": "idealist.png",
  "Employment Hero": "employment-hero.png",
  "Scribe": "scribe.png",
  "PandaDoc": "pandadoc.png",
  "Dialpad": "dialpad.png",
  "Microsoft Teams": "microsoft-teams.svg",
  "Microsoft Copilot": "microsoft-copilot.png",
  "Helium 10": "helium-10.png"
};
const data=[
 ['Office & Communication',['Microsoft Office 365','Google Workspace','Outlook','Microsoft Teams','SharePoint','Dropbox','Zoom','Slack','Dialpad','DocuSign','PandaDoc']],
 ['Projects & Productivity',['Asana','Notion','Airtable','Trello','Calendly','Scribe','SurveyMonkey','Zendesk','Monday.com']],
 ['CRM, HR & Business',['Employment Hero','Idealist','SEEK','PRODA','Pipedrive CRM','Wrike CRM','Freshdesk','Flare','Carelink','JobAdder','Eworks Manager','Brevity Care CRM','ShiftCare','Connecteam','WorkflowMax','HRIS','LMS','Xero','QuickBooks','Apollo','HubSpot','Hubstaff']],
 ['E-Commerce & Marketing',['Amazon','AWS','Helium 10','Jungle Scout','Keepa','ClickFunnels','GoHighLevel','Meta','LinkedIn','Sales Navigator']],
 ['Design, Content & AI',['Claude','Canva','Lightroom','Adobe','CapCut','Microsoft Copilot','ChatGPT']]
];
const palette=['#b57456','#171d3b','#5d6486','#a4654a','#7a5c8a','#3f7f78','#c28a4a','#8a4f5e'];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* marquee */
const orgs=[['Boundless Freedom Project','logo'],['Cloudstaff Health Care','logo'],['United Disability Care','logo'],['Creative Tour','logo'],['The University of Mindanao','logo'],['Essilor Philippines','logo']];
const mq=document.getElementById('marquee');
/* Organisation logos for the marquee: name -> [file, height in px] */
const LOGOS={
  "Boundless Freedom Project":["assets/logos/orgs/boundless-freedom-project.png",54],
  "Cloudstaff Health Care":["assets/logos/orgs/cloudstaff.png",46],
  "United Disability Care":["assets/logos/orgs/united-disability-care.png",44],
  "Creative Tour":["assets/logos/orgs/creative-tour.png",56],
  "The University of Mindanao":["assets/logos/orgs/university-of-mindanao.png",54],
  "Essilor Philippines":["assets/logos/orgs/essilor.png",50]
};
[0,1].forEach(k=>orgs.forEach(([n,c])=>{
  const s=document.createElement('span');
  if(c==='logo'){s.className='wlogo';const im=document.createElement('img');im.src=LOGOS[n][0];im.alt=k?'':n;im.style.height=LOGOS[n][1]+'px';s.append(im)}
  else{s.className=c;s.textContent=n}
  if(k)s.setAttribute('aria-hidden','true');mq.append(s)}));

/* tools */
const tabs=document.getElementById('tabs'), box=document.getElementById('toolGroups');
const names=['All tools',...data.map(d=>d[0])];
const total=data.reduce((a,g)=>a+g[1].length,0);
document.getElementById('toolCount').dataset.count=total;
function initials(n){const w=n.replace(/[^A-Za-z0-9 ]/g,'').split(' ');return (w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase()}
function render(idx){
  box.innerHTML='';
  data.forEach((g,gi)=>{
    if(idx!==0&&idx-1!==gi)return;
    const sec=document.createElement('div');sec.className='group';
    const head=document.createElement('div');head.className='group-head';
    const h=document.createElement('h3');h.textContent=g[0];
    const c=document.createElement('span');c.textContent=String(gi+1).padStart(2,'0')+' / '+String(g[1].length).padStart(2,'0')+' tools';
    head.append(h,c);
    const grid=document.createElement('div');grid.className='tool-grid';
    g[1].forEach((t,i)=>{
      const d=document.createElement('div');d.className='tool';d.style.setProperty('--i',i);
      const l=document.createElement('div');
      if(ICONS[t]){const f=ICONS[t];l.className='logo img'+(f.endsWith('.svg')?'':' raster');const im=document.createElement('img');im.src=ICON_DIR+f;im.alt='';im.width=36;im.height=36;im.loading='lazy';l.append(im);}
      else{l.className='logo';l.style.background=palette[(i+gi*3)%palette.length];l.textContent=initials(t);}
      const s=document.createElement('span');s.textContent=t;
      d.append(l,s);grid.append(d);
    });
    sec.append(head,grid);box.append(sec);
  });
}
names.forEach((n,i)=>{
  const b=document.createElement('button');b.className='tab';b.type='button';b.setAttribute('role','tab');
  b.setAttribute('aria-selected',i===0);b.textContent=n;
  b.onclick=()=>{[...tabs.children].forEach((x,j)=>x.setAttribute('aria-selected',j===i));render(i)};
  tabs.append(b);
});
render(0);

/* certificates */
/* Certificates: files in assets/certificates/ */
const certs=[
 {
  "src": "assets/certificates/ndis-worker-orientation.jpg",
  "cap": "NDIS Worker Orientation Completion Certificate",
  "w": 1600,
  "h": 1132
 },
 {
  "src": "assets/certificates/ndis-new-worker-induction.jpg",
  "cap": "New Worker NDIS Induction Module Completion Certificate",
  "w": 1600,
  "h": 1132
 },
 {
  "src": "assets/certificates/hipaa-security-awareness.jpg",
  "cap": "HIPAA Security Awareness & Privacy Training",
  "w": 1600,
  "h": 1131
 },
 {
  "src": "assets/certificates/coursera-canva-web-pages.jpg",
  "cap": "Coursera: Use Canva to Create Desktop and Mobile-Friendly Web Pages",
  "w": 1600,
  "h": 1236
 },
 {
  "src": "assets/certificates/coursera-excel-dashboards.jpg",
  "cap": "Coursera: Create Charts and Dashboards Using Microsoft Excel",
  "w": 1600,
  "h": 1236
 },
 {
  "src": "assets/certificates/mos-excel-2016-attendance.jpg",
  "cap": "Microsoft Office Specialist Excel 2016 Certificate of Attendance",
  "w": 1600,
  "h": 1130
 }
];
const cg=document.getElementById('certs');
const dlg=document.getElementById('lightbox'), big=dlg.querySelector('img'), bigcap=dlg.querySelector('p');
certs.forEach(c=>{
  const f=document.createElement('figure');f.className='cert';
  const b=document.createElement('button');b.type='button';b.className='frame';b.setAttribute('aria-label','View larger: '+c.cap);
  const im=document.createElement('img');im.src=c.src;im.alt=c.cap;im.width=c.w;im.height=c.h;im.loading='lazy';
  b.append(im);
  b.onclick=()=>{big.src=c.src;big.alt=c.cap;bigcap.textContent=c.cap;dlg.showModal()};
  const fc=document.createElement('figcaption');fc.textContent=c.cap;
  f.append(b,fc);cg.append(f);
});
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.tagName==='BUTTON')dlg.close()});

/* video */
const evs=document.getElementById('evs'),playBtn=document.getElementById('playBtn'),thumb=document.getElementById('thumb');
playBtn.addEventListener('click',()=>{evs.controls=true;thumb.classList.add('playing');evs.play().catch(()=>{})});
evs.addEventListener('ended',()=>{evs.controls=false;thumb.classList.remove('playing');evs.currentTime=0});



/* testimonials carousel */
const tm=document.getElementById('tm'),tmSlides=[...tm.querySelectorAll('.tm-slide')],tmTabs=document.getElementById('tmTabs'),tmStage=document.getElementById('tmStage');
let tmCur=0,tmTimer=null,tmPaused=false;
tmSlides.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.className='tm-tab';b.textContent=s.dataset.name;b.setAttribute('aria-label','Show testimonial from '+s.dataset.name);b.addEventListener('click',()=>{tmGo(i);tmRestart()});tmTabs.append(b)});
function tmFit(){const cs=getComputedStyle(tmStage);tmStage.style.height=(tmSlides[tmCur].offsetHeight+parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom))+'px'}
function tmGo(i){tmCur=(i+tmSlides.length)%tmSlides.length;tmSlides.forEach((s,j)=>{s.classList.toggle('is-active',j===tmCur);s.setAttribute('aria-hidden',j!==tmCur)});[...tmTabs.children].forEach((b,j)=>b.setAttribute('aria-current',j===tmCur));tmFit()}
function tmRestart(){clearInterval(tmTimer);if(!reduce&&!tmPaused)tmTimer=setInterval(()=>tmGo(tmCur+1),9000)}
document.getElementById('tmPrev').addEventListener('click',()=>{tmGo(tmCur-1);tmRestart()});
document.getElementById('tmNext').addEventListener('click',()=>{tmGo(tmCur+1);tmRestart()});
['mouseenter','focusin'].forEach(ev=>tm.addEventListener(ev,()=>{tmPaused=true;clearInterval(tmTimer)}));
['mouseleave','focusout'].forEach(ev=>tm.addEventListener(ev,()=>{tmPaused=false;tmRestart()}));
tm.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){tmGo(tmCur-1);tmRestart()}if(e.key==='ArrowRight'){tmGo(tmCur+1);tmRestart()}});
let tmX=null;
tmStage.addEventListener('pointerdown',e=>{tmX=e.clientX});
tmStage.addEventListener('pointerup',e=>{if(tmX===null)return;const dx=e.clientX-tmX;tmX=null;if(Math.abs(dx)>50){tmGo(tmCur+(dx<0?1:-1));tmRestart()}});
tmGo(0);tmRestart();
addEventListener('resize',tmFit);addEventListener('load',tmFit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(tmFit);

/* nav */
const nav=document.getElementById('nav'),menuBtn=document.getElementById('menuBtn');
menuBtn.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));

/* scroll effects */
const prog=document.getElementById('progress'),tl=document.getElementById('timeline');
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';
  nav.classList.toggle('scrolled',scrollY>8);
  const r=tl.getBoundingClientRect();
  tl.style.setProperty('--p',Math.min(1,Math.max(0,(innerHeight*.65-r.top)/r.height)));
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();

/* reveal + counters */
document.querySelectorAll('[data-stagger]').forEach(p=>[...p.children].forEach((c,i)=>{c.classList.add('reveal');c.style.setProperty('--d',(i*90)+'ms')}));
function count(el){
  const end=+el.dataset.count;if(reduce||!end){el.textContent=end;return}
  const t0=performance.now(),dur=1400;
  (function step(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=Math.round(end*e);if(k<1)requestAnimationFrame(step)})(t0);
}
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(count);
  if(e.target.dataset&&e.target.dataset.count)count(e.target);
  io.unobserve(e.target);
}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.stat').forEach(el=>{el.addEventListener('animationstart',()=>{},{once:true})});
