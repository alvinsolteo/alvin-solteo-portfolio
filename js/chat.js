/* ============================================================
   Alvin Solteo — chat assistant widget
   - Works out of the box with a built-in answer engine (no server needed).
   - If an AI endpoint exists at CHAT_CONFIG.endpoint (see functions/api/chat.js),
     replies come from the AI instead. If it is missing or fails, the widget
     falls back to the built-in answers automatically.
   ============================================================ */
(function () {
  'use strict';

  var CHAT_CONFIG = {
    endpoint: '/api/chat',          // Cloudflare Pages Function (see README)
    aiEnabled: true,                // set to false to always use built-in answers
    title: 'Alvin’s Assistant',
    teaserDelay: 4500               // ms after the page is ready
  };

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOOLS = Array.isArray(window.PORTFOLIO_TOOLS) ? window.PORTFOLIO_TOOLS : [];
  var toolCount = TOOLS.reduce(function (a, g) { return a + g[1].length; }, 0) || 59;

  /* ---------- built-in knowledge ---------- */
  var DEFAULT_CHIPS = ['What services does he offer?', 'Tell me about his experience', 'Which tools does he use?', 'How can I contact Alvin?'];

  var KB = [
    { id: 'greet', a: 'Hi there! 👋 I’m Alvin’s assistant. I can tell you about his **services, experience, tools and credentials** — what would you like to know?', next: DEFAULT_CHIPS },
    { id: 'bot', k: ['are you ai', 'are you a bot', 'are you real', 'are you human', 'chatbot', 'robot', 'who are you', 'what are you'],
      a: 'I’m the virtual assistant for this site — an automated helper, not Alvin himself. I can answer questions about his services, experience, tools and credentials, and point you to the right section.', next: DEFAULT_CHIPS },
    { id: 'about', k: ['who is alvin', 'who is he', 'about alvin', 'tell me about alvin', 'tell me about him', 'introduce', 'background', 'about him', 'about you', 'yourself'],
      a: 'Alvin Solteo is a virtual assistant based in Davao City, Philippines. His background spans **executive support, human resources, and customer service**, and he has supported a U.S.-based nonprofit, disability-care operations in Australia, remote recruitment, and office-based teams in the Philippines.\n[Read the About section](#about)',
      next: ['What services does he offer?', 'Tell me about his experience', 'What do clients say about him?'] },
    { id: 'services', k: ['service', 'offer', 'what can you', 'what do you do', 'what can he', 'what does he do', 'help with', 'help me', 'support', 'assist', 'capabilit', 'specialt', 'skills', 'do for'],
      a: 'Alvin helps teams with:\n- **Executive assistance** — calendar management, meeting follow-ups, email correspondence, calls, research and documentation\n- **HR & recruitment** — job postings, candidate screening, interview coordination, onboarding and compliance support\n- **Operations & admin** — client intake, rostering, service documentation, invoicing support and reporting\n- **Digital support** — social media coordination, LinkedIn presence, basic Canva visuals and online research\n[View services](#services)',
      next: ['Tell me about his HR experience', 'Which tools does he use?', 'How can I contact Alvin?'] },
    { id: 'exec', k: ['executive', 'calendar', 'inbox', 'email management', 'schedul', 'meeting', 'correspondence', 'travel', 'personal assistant'],
      a: 'On the executive-assistant side, Alvin handles **calendars, inbox and correspondence, meeting follow-ups, calls, research and documentation**. One client says he “consistently keeps my busy schedule organized” and makes sure important tasks and deadlines are never overlooked.\n[Read the testimonials](#testimonials)',
      next: ['What do clients say about him?', 'Which tools does he use?', 'How can I contact Alvin?'] },
    { id: 'hr', k: ['hr', 'human resources', 'recruit', 'hiring', 'onboard', 'interview', 'candidate', 'screening', 'employee records', 'training'],
      a: 'Alvin has hands-on HR experience: he supported **recruitment for remote roles** (job postings, interviews, candidate assessment and onboarding), maintained **employee records**, coordinated **training logistics and orientation**, and supported **compliance records**. He has also passed the Certified Human Resources Associate (CHRA) examination.\n[See his experience](#experience)',
      next: ['Tell me about his experience', 'What’s his education?', 'How can I contact Alvin?'] },
    { id: 'ndis', k: ['ndis', 'disability', 'roster', 'rostering', 'care', 'claims', 'invoic', 'compliance', 'australia'],
      a: 'In his HR & admin role supporting disability-care operations in Australia, Alvin coordinated **NDIS administration, client intake, service agreements, workforce rostering, claims and invoicing support**, onboarding and compliance records. He has also completed the NDIS Worker Orientation and New Worker NDIS Induction modules.\n[View certificates](#certificates)',
      next: ['Does he have certifications?', 'Tell me about his experience', 'How can I contact Alvin?'] },
    { id: 'experience', k: ['experience', 'work history', 'career', 'resume', 'cv', 'previous', 'past role', 'employer', 'worked', 'timeline', 'jobs', 'companies', 'roles', 'years'],
      a: 'Here’s a quick timeline:\n- **Aug 2025 – Aug 2026** — Executive Assistant & HR Operations Support, Boundless Freedom Project\n- **Oct 2024 – Jul 2026** — HR & Admin Assistant, Cloudstaff Health Care / United Disability Care\n- **Apr 2024 – Sep 2024** — Remote HR Specialist, Creative Tour\n- **Aug 2018 – Apr 2024** — HR & Administrative Assistant, The University of Mindanao\n- **Nov 2015 – Jul 2016** — Customer Service Associate, Essilor Philippines\n[Open the experience timeline](#experience)',
      next: ['Tell me about his HR experience', 'What’s his education?', 'What do clients say about him?'] },
    { id: 'tools', k: ['tool', 'software', 'platform', 'tech stack', 'apps', 'toolkit', 'systems', 'crm'],
      a: function () {
        return 'Alvin works with **' + toolCount + ' tools and platforms** across five areas:\n- **Office & Communication** — Microsoft 365, Google Workspace, Teams, Slack, Zoom and more\n- **Projects & Productivity** — Asana, Notion, Airtable, Trello, Monday.com and more\n- **CRM, HR & Business** — HubSpot, Xero, QuickBooks, JobAdder, Employment Hero and more\n- **E-Commerce & Marketing** — Amazon, Helium 10, Jungle Scout, GoHighLevel, LinkedIn and more\n- **Design, Content & AI** — Canva, Adobe, CapCut, ChatGPT, Claude and Microsoft Copilot\n[Browse the toolkit](#tools)';
      },
      next: ['What services does he offer?', 'Tell me about his experience', 'How can I contact Alvin?'] },
    { id: 'education', k: ['education', 'degree', 'school', 'universit', 'studied', 'study', 'graduat', 'scholar', 'chra', 'college', 'bachelor'],
      a: 'Alvin holds a **BS in Business Administration, major in Marketing Management** from The University of Mindanao (graduated 2015, University Scholar) and passed the **Certified Human Resources Associate (CHRA)** examination.\n[See credentials](#credentials)',
      next: ['Does he have certifications?', 'Tell me about his experience', 'How can I contact Alvin?'] },
    { id: 'certs', k: ['certif', 'course', 'coursera', 'hipaa', 'excel', 'mos', 'credential', 'qualification'],
      a: 'Alvin’s certificates include:\n- NDIS Worker Orientation and New Worker NDIS Induction modules\n- HIPAA Security Awareness & Privacy Training\n- Coursera projects: Canva web pages, and Excel charts & dashboards\n- Microsoft Office Specialist Excel 2016 (certificate of attendance)\nYou can click any certificate to view it larger.\n[View certificates](#certificates)',
      next: ['What’s his education?', 'What do clients say about him?', 'How can I contact Alvin?'] },
    { id: 'testimonials', k: ['testimonial', 'review', 'feedback', 'clients say', 'say about', 'recommend', 'reference', 'people say', 'worked with him'],
      a: 'Here’s what people who have worked with Alvin say:\n- **Matt D.** (Nonprofit Founder/CFO): “proactive approach and attention to detail”\n- **Anne C.** (Managing Director): “consistency, positive attitude, and the care he puts into his work”\n- **Sylvia C.** (CEO): “incredible work ethic and commitment to our purpose”\n[Read the testimonials](#testimonials)',
      next: ['Tell me about his experience', 'What services does he offer?', 'How can I contact Alvin?'] },
    { id: 'pricing', k: ['rate', 'rates', 'price', 'pricing', 'cost', 'fee', 'how much', 'hourly', 'budget', 'quote', 'salary', 'package'],
      a: 'Rates depend on the scope of the work and the hours involved, so Alvin doesn’t list fixed prices on the site. The best way to get a quote is to reach out through the contact section and share what you need.\n- **Email:** [alvinsolteo.va@gmail.com](mailto:alvinsolteo.va@gmail.com)\n[Contact Alvin](#contact)', next: ['What services does he offer?', 'How can I contact Alvin?'] },
    { id: 'availability', k: ['available', 'availability', 'start date', 'when can', 'book a call', 'schedule a call', 'open to work', 'full-time', 'part-time', 'full time', 'part time', 'hire him', 'hire alvin', 'hire you', 'work with you'],
      a: 'I don’t have Alvin’s current availability, so the quickest way to find out is to message him through the contact section — tell him what you need and when you’d like to start.\n- **Email:** [alvinsolteo.va@gmail.com](mailto:alvinsolteo.va@gmail.com)\n[Contact Alvin](#contact)', next: ['What services does he offer?', 'What do clients say about him?'] },
    { id: 'contact', k: ['contact', 'reach', 'email', 'get in touch', 'message', 'talk to', 'speak', 'call', 'phone', 'whatsapp', 'number', 'linkedin', 'connect'],
      a: 'You can reach Alvin directly:\n- **Email:** [alvinsolteo.va@gmail.com](mailto:alvinsolteo.va@gmail.com)\n- **Phone:** [+63 981 095 2003](tel:+639810952003)\n- **LinkedIn:** [Alvin Solteo](https://www.linkedin.com/in/alvin-solteo-897347292/)\n[Go to the contact section](#contact)', next: ['What services does he offer?', 'What do clients say about him?'] },
    { id: 'location', k: ['where', 'location', 'based', 'time zone', 'timezone', 'philippines', 'davao', 'country', 'remote'],
      a: 'Alvin is based in **Davao City, Philippines**, and has supported teams based in the U.S., Australia and Switzerland as well as the Philippines.', next: ['Tell me about his experience', 'How can I contact Alvin?'] },
    { id: 'video', k: ['video', 'recording', 'watch', 'intro video', 'see him', 'hear him'],
      a: 'There’s a short EVS video recording on this page where you can see and hear Alvin introduce himself and his work.\n[Watch the video](#recording)', next: ['Tell me about Alvin', 'How can I contact Alvin?'] },
    { id: 'thanks', k: ['thanks', 'thank you', 'salamat', 'great', 'awesome', 'perfect', 'cool'],
      a: 'You’re welcome! If you’d like to talk to Alvin directly, the contact section is the quickest way.\n[Contact Alvin](#contact)', next: DEFAULT_CHIPS }
  ];

  var FALLBACK = {
    a: 'I couldn’t find that in Alvin’s portfolio. I can help with his **services, experience, tools, education, certificates and testimonials** — and for anything else, the best move is to ask him directly through the contact section.\n[Contact Alvin](#contact)',
    next: DEFAULT_CHIPS
  };

  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function kw(text, k) {
    var re = new RegExp('\\b' + reEsc(k) + (k.length <= 3 ? '\\b' : ''), 'i');
    return re.test(text);
  }

  function toolMatch(text) {
    for (var g = 0; g < TOOLS.length; g++) {
      var list = TOOLS[g][1];
      for (var i = 0; i < list.length; i++) {
        var name = list[i];
        if (new RegExp('(^|[^a-z0-9])' + reEsc(name.toLowerCase()) + '([^a-z0-9]|$)').test(text.toLowerCase())) return { name: name, cat: TOOLS[g][0] };
      }
    }
    return null;
  }

  function localAnswer(text) {
    var t = text.trim();
    if (/^(hi|hello|hey|yo|good (morning|afternoon|evening)|kumusta)\b/i.test(t) && t.split(/\s+/).length <= 4) return KB[0];
    var tm = toolMatch(t);
    if (tm) {
      return { a: 'Yes — **' + tm.name + '** is part of Alvin’s toolkit (' + tm.cat + ').\n[Browse the toolkit](#tools)', next: ['Which tools does he use?', 'What services does he offer?', 'How can I contact Alvin?'] };
    }
    var best = null, bestScore = 0;
    for (var i = 1; i < KB.length; i++) {
      var e = KB[i], s = 0;
      for (var j = 0; j < (e.k || []).length; j++) if (kw(t, e.k[j])) s += e.k[j].indexOf(' ') > -1 ? 2 : 1;
      if (s > bestScore) { bestScore = s; best = e; }
    }
    return best || FALLBACK;
  }

  /* ---------- tiny safe markdown renderer ---------- */
  function inline(s) {
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\[([^\]]+)\]\((#[a-z-]+)\)/g, '<a class="chat-link" href="$2">$1</a>');
    s = s.replace(/\[([^\]]+)\]\(((?:mailto:[^\s)]+)|(?:tel:\+?[0-9]+))\)/g, '<a class="chat-link" href="$2">$1</a>');
    s = s.replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a class="chat-link" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return s;
  }
  function render(text) {
    var html = '', list = false;
    text.trim().split(/\n/).forEach(function (ln) {
      var m = ln.match(/^\s*[-•*]\s+(.*)/);
      if (m) { if (!list) { html += '<ul>'; list = true; } html += '<li>' + inline(m[1]) + '</li>'; }
      else { if (list) { html += '</ul>'; list = false; } if (ln.trim()) html += '<p>' + inline(ln) + '</p>'; }
    });
    if (list) html += '</ul>';
    return html;
  }

  /* ---------- DOM ---------- */
  var avatarSrc = (document.querySelector('.portrait img') || {}).src || '';
  var root = document.createElement('div');
  root.className = 'chat';
  root.id = 'chat';
  root.innerHTML =
    '<div class="chat-teaser" id="chatTeaser" role="note">👋 Hi! I’m Alvin’s assistant — ask me anything about his work.<button type="button" aria-label="Dismiss">×</button></div>' +
    '<div class="chat-panel" id="chatPanel" role="dialog" aria-label="' + CHAT_CONFIG.title + '" aria-hidden="true">' +
      '<header class="chat-head">' +
        (avatarSrc ? '<img class="chat-ava" src="' + avatarSrc + '" alt="">' : '') +
        '<div class="chat-title"><b>' + CHAT_CONFIG.title + '</b><span><i></i>Online · replies instantly</span></div>' +
        '<div class="spacer">' +
          '<button type="button" class="chat-icon-btn" id="chatReset" aria-label="Start a new conversation"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>' +
          '<button type="button" class="chat-icon-btn" id="chatClose" aria-label="Close chat"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
        '</div>' +
      '</header>' +
      '<div class="chat-log" id="chatLog" role="log" aria-live="polite"></div>' +
      '<div class="chat-chips" id="chatChips"></div>' +
      '<form class="chat-form" id="chatForm" autocomplete="off">' +
        '<input id="chatInput" type="text" maxlength="300" placeholder="Ask about Alvin’s work…" aria-label="Your message">' +
        '<button class="chat-send" id="chatSend" type="submit" aria-label="Send message" disabled><svg viewBox="0 0 24 24"><path d="m5 12 14-7-5 14-2-6z"/></svg></button>' +
      '</form>' +
      '<p class="chat-note" id="chatNote">Ask about Alvin’s services, experience and tools.</p>' +
    '</div>' +
    '<button type="button" class="chat-fab" id="chatFab" aria-label="Chat with Alvin’s assistant" aria-expanded="false" aria-controls="chatPanel">' +
      '<svg class="i-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>' +
      '<svg class="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '<span class="chat-badge" aria-hidden="true"></span>' +
    '</button>';
  document.body.appendChild(root);

  var fab = document.getElementById('chatFab'), panel = document.getElementById('chatPanel'),
      log = document.getElementById('chatLog'), chips = document.getElementById('chatChips'),
      form = document.getElementById('chatForm'), input = document.getElementById('chatInput'),
      send = document.getElementById('chatSend'), note = document.getElementById('chatNote'),
      teaser = document.getElementById('chatTeaser');

  var history = [], busy = false, started = false, aiFails = 0, aiOff = false;
  try { aiOff = sessionStorage.getItem('as-chat-ai') === 'off'; } catch (e) {}
  if (!CHAT_CONFIG.aiEnabled) aiOff = true;

  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function setNote(ai) { note.textContent = ai ? 'AI assistant · answers can contain mistakes.' : 'Automated assistant · answers come from this portfolio.'; }

  function addMsg(who, html, stagger) {
    var m = document.createElement('div');
    m.className = 'msg ' + who;
    m.innerHTML = html;
    if (stagger && !reduce) {
      [].forEach.call(m.querySelectorAll('p,li'), function (n, i) {
        n.style.animation = 'rise .5s var(--ease) ' + (i * 130) + 'ms backwards';
      });
    }
    log.appendChild(m);
    scrollDown();
    return m;
  }
  function showTyping() {
    var m = document.createElement('div');
    m.className = 'msg bot'; m.id = 'chatTyping';
    m.innerHTML = '<span class="typing" aria-label="Typing"><i></i><i></i><i></i></span>';
    log.appendChild(m); scrollDown();
  }
  function hideTyping() { var t = document.getElementById('chatTyping'); if (t) t.remove(); }
  function setChips(list) {
    chips.innerHTML = '';
    (list || []).forEach(function (txt) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chat-chip'; b.textContent = txt;
      b.addEventListener('click', function () { ask(txt); });
      chips.appendChild(b);
    });
    scrollDown();
  }

  function greet() {
    started = true;
    var g = KB[0];
    addMsg('bot', render(g.a), true);
    history = [];
    setChips(g.next);
  }

  function askAI() {
    var ctrl = new AbortController();
    var to = setTimeout(function () { ctrl.abort(); }, 25000);
    return fetch(CHAT_CONFIG.endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-10) }), signal: ctrl.signal
    }).then(function (r) {
      clearTimeout(to);
      if (r.status === 404 || r.status === 405 || r.status === 501) { aiOff = true; try { sessionStorage.setItem('as-chat-ai', 'off'); } catch (e) {} throw new Error('ai-off'); }
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (j) {
      if (!j || !j.reply) throw new Error('empty');
      aiFails = 0;
      return j.reply;
    });
  }

  function ask(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true; send.disabled = true;
    addMsg('user', esc(text));
    history.push({ role: 'user', content: text });
    chips.innerHTML = '';
    showTyping();
    var started0 = Date.now();

    var finish = function (reply, next, ai) {
      var wait = Math.max(0, (reduce ? 0 : 750) - (Date.now() - started0));
      setTimeout(function () {
        hideTyping();
        addMsg('bot', render(reply), true);
        history.push({ role: 'assistant', content: reply.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') });
        setNote(ai);
        setChips(next || DEFAULT_CHIPS);
        busy = false; send.disabled = !input.value.trim();
        if (document.activeElement !== input) input.focus({ preventScroll: true });
      }, wait);
    };
    var local = function () {
      var e = localAnswer(text);
      var a = typeof e.a === 'function' ? e.a() : e.a;
      finish(a, e.next, false);
    };

    if (aiOff) { local(); return; }
    askAI().then(function (reply) { finish(reply, DEFAULT_CHIPS.slice(0, 3), true); })
      .catch(function () { aiFails++; if (aiFails >= 2) { aiOff = true; } local(); });
  }

  /* ---------- open / close ---------- */
  function open() {
    root.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    hideTeaser(true);
    if (!started) greet();
    setTimeout(function () { input.focus({ preventScroll: true }); }, 250);
  }
  function close() {
    root.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    fab.focus({ preventScroll: true });
  }
  function hideTeaser(remember) {
    teaser.classList.remove('show');
    if (remember) { try { sessionStorage.setItem('as-chat-teaser', '1'); } catch (e) {} }
  }

  fab.addEventListener('click', function () { root.classList.contains('open') ? close() : open(); });
  document.getElementById('chatClose').addEventListener('click', close);
  document.getElementById('chatReset').addEventListener('click', function () {
    if (busy) return;
    log.innerHTML = ''; history = []; started = false; greet();
  });
  teaser.addEventListener('click', function (e) { if (e.target.tagName === 'BUTTON') { hideTeaser(true); return; } open(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) close(); });
  input.addEventListener('input', function () { send.disabled = busy || !input.value.trim(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; send.disabled = true; ask(v); });
  log.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.chat-link');
    if (!a || a.getAttribute('href').charAt(0) !== '#') return;
    e.preventDefault();
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      if (innerWidth <= 560) close();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  });

  /* teaser bubble once per session, after the loading screen is done */
  var seen = false;
  try { seen = sessionStorage.getItem('as-chat-teaser') === '1'; } catch (e) {}
  if (!seen) {
    var ready = window.loaderDone && window.loaderDone.then ? window.loaderDone : Promise.resolve();
    ready.then(function () {
      setTimeout(function () {
        if (root.classList.contains('open')) return;
        teaser.classList.add('show');
        setTimeout(function () { teaser.classList.remove('show'); }, 11000);
      }, CHAT_CONFIG.teaserDelay);
    });
  }
})();
