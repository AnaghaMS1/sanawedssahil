/* Update invitation text and event details here. dateISO uses the venue's local time. */
const WEDDING = {
  partnerOne: 'Sahil',
  partnerTwo: 'Sana',
  sahilFamily: 'Son of Mr. Abdul Samad & Mrs. Ramlath',
  sahilAddress: 'Padinjare Karukayil · Neerkunnam, Alappuzha',
  sanaFamily: 'Daughter of Mr. Shanavas (Late) & Mrs. Saleena Shanavas',
  sanaAddress: 'Chirakunnel House · Kangazha, Changanassery, Kottayam',
  inviteMessage: 'We joyfully invite you to celebrate our wedding with us.',
  date: 'Sunday, 20 December 2026',
  dateShort: '20 December 2026',
  hijriDate: '11 Rajab 1448',
  time: '12:30 PM',
  dateISO: '2026-12-20T12:30:00',
  venue: 'Puthurpally Juma Masjid Auditorium',
  location: 'Kangazha, Kottayam',
  mapUrl: 'https://maps.app.goo.gl/xg5C9d4fGTzGc3Fn7'
};

const $ = (selector) => document.querySelector(selector);
const setMeta = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};
const pad2 = (value) => String(value).length < 2 ? `0${value}` : String(value);
const couple = `${WEDDING.partnerOne} & ${WEDDING.partnerTwo}`;
document.title = `${couple} · Wedding Invitation`;
setMeta('meta[name="description"]', 'content', `${couple} invite you to celebrate their wedding on ${WEDDING.date} at ${WEDDING.venue}, ${WEDDING.location}.`);
setMeta('meta[property="og:title"]', 'content', `${couple} · Wedding Invitation`);
setMeta('meta[property="og:description"]', 'content', `${WEDDING.inviteMessage} ${WEDDING.date} · ${WEDDING.time}`);
setMeta('meta[property="og:image"]', 'content', 'assets/sahil-sana-engagement.jpg');
document.querySelector('.hero h1').innerHTML = `<span>${WEDDING.partnerOne}</span><i>&</i><span>${WEDDING.partnerTwo}</span>`;
$('.hero__invite').textContent = WEDDING.inviteMessage;
const weddingDate = new Date(WEDDING.dateISO);
$('#scratchDay').textContent = pad2(weddingDate.getDate());
$('#scratchMonth').textContent = weddingDate.toLocaleString('en', { month: 'long' }).toUpperCase();
$('#scratchYear').textContent = String(weddingDate.getFullYear());
$('#scratchCard').setAttribute('aria-label', `Scratch to reveal ${WEDDING.dateShort}`);
const people = document.querySelectorAll('.person-card');
people[0].querySelector('h3').textContent = WEDDING.partnerOne;
people[0].querySelector('.person-card__family').textContent = WEDDING.sahilFamily;
people[0].querySelector('.person-card__place').textContent = WEDDING.sahilAddress;
people[1].querySelector('h3').textContent = WEDDING.partnerTwo;
people[1].querySelector('.person-card__family').textContent = WEDDING.sanaFamily;
people[1].querySelector('.person-card__place').textContent = WEDDING.sanaAddress;
const eventRows = document.querySelectorAll('.event-details__row');
eventRows[0].querySelector('b').textContent = WEDDING.date;
eventRows[0].querySelector('small').textContent = WEDDING.hijriDate;
eventRows[1].querySelector('b').textContent = WEDDING.time;
eventRows[2].querySelector('b').textContent = WEDDING.venue;
eventRows[2].querySelector('small').textContent = WEDDING.location;
$('#mapButton').href = WEDDING.mapUrl;
$('.footer__names').textContent = couple;
$('.footer__date').textContent = `${WEDDING.dateShort.toUpperCase()} · ${WEDDING.location.toUpperCase()}`;

// The live countdown sits just before the closing blessing.
const countdownTarget = weddingDate.getTime();
function updateCountdown() {
  const remaining = Math.max(0, countdownTarget - Date.now());
  $('#days').textContent = pad2(Math.floor(remaining / 86400000));
  $('#hours').textContent = pad2(Math.floor(remaining / 3600000) % 24);
  $('#minutes').textContent = pad2(Math.floor(remaining / 60000) % 60);
  $('#seconds').textContent = pad2(Math.floor(remaining / 1000) % 60);
}
updateCountdown(); window.setInterval(updateCountdown, 1000);

// Small navigation opens from the round menu button.
const menuButton = $('#menuToggle'), menu = $('#heroMenu');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen)); menu.classList.toggle('open', !isOpen);
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

// Each date circle has its own touch, pen and mouse scratch layer.
function setupScratchBall(ball) {
  const canvas = ball.querySelector('canvas'), ctx = canvas.getContext('2d', { willReadFrequently: true });
  const hint = ball.querySelector('.date-scratch-ball__hint');
  let isScratching = false, isRevealed = false;
  function paintFoil() {
    const box = canvas.getBoundingClientRect(), scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(box.width * scale); canvas.height = Math.round(box.height * scale); ctx.setTransform(scale, 0, 0, scale, 0, 0);
    const gradient = ctx.createLinearGradient(0, 0, box.width, box.height);
    gradient.addColorStop(0, '#ddb880'); gradient.addColorStop(.48, '#f1dfba'); gradient.addColorStop(.53, '#d2aa72'); gradient.addColorStop(1, '#c9a064');
    ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = gradient; ctx.fillRect(0, 0, box.width, box.height);
    ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 1;
    for (let x = -box.height; x < box.width; x += 13) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + box.height, box.height); ctx.stroke(); }
    ctx.globalCompositeOperation = 'destination-out'; ctx.font = '600 8px DM Sans, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('✧  SCRATCH  ✧', box.width / 2, box.height / 2);
  }
  function scratchAt(event) {
    if (!isScratching || isRevealed) return;
    const box = canvas.getBoundingClientRect(); ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(event.clientX - box.left, event.clientY - box.top, 23, 0, Math.PI * 2); ctx.fill();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data; let clearCount = 0;
    for (let i = 3; i < pixels.length; i += 16) if (pixels[i] < 30) clearCount++;
    if (clearCount / (pixels.length / 16) > .4) {
      isRevealed = true; canvas.classList.add('cleared'); hint.classList.add('hidden'); scatterPetals(ball);
    }
  }
  function repaintIfCovered() { if (!isRevealed) paintFoil(); }
  paintFoil(); window.addEventListener('resize', repaintIfCovered);
  canvas.addEventListener('pointerdown', (event) => { isScratching = true; canvas.setPointerCapture(event.pointerId); scratchAt(event); });
  canvas.addEventListener('pointermove', scratchAt); canvas.addEventListener('pointerup', () => isScratching = false); canvas.addEventListener('pointercancel', () => isScratching = false);
}
document.querySelectorAll('.date-scratch-ball').forEach(setupScratchBall);

function scatterPetals(host) {
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement('i'); petal.className = 'petal';
    petal.style.setProperty('--dx', `${Math.round((Math.random() - .5) * 180)}px`); petal.style.setProperty('--dy', `${Math.round((Math.random() - .5) * 180)}px`);
    petal.style.setProperty('--rot', `${Math.round(Math.random() * 300)}deg`); petal.style.setProperty('--dur', `${.8 + Math.random() * .7}s`); petal.style.animationDelay = `${Math.random() * .2}s`;
    host.appendChild(petal); window.setTimeout(() => petal.remove(), 1800);
  }
}

// Try autoplay on page open. If the browser blocks sound, clearly signal the first-tap fallback.
const music = $('#bgMusic'), musicToggle = $('#musicToggle');
function reflectMusicState() {
  const playing = !music.paused;
  musicToggle.classList.toggle('is-playing', playing);
  if (playing) {
    musicToggle.classList.remove('needs-gesture');
    musicToggle.title = 'Pause background music';
    musicToggle.setAttribute('aria-label', 'Pause background music');
  } else {
    musicToggle.setAttribute('aria-label', 'Play background music');
  }
}
async function startMusic() {
  try { await music.play(); reflectMusicState(); return true; }
  catch { reflectMusicState(); return false; }
}
startMusic().then((started) => {
  if (started) return;
  musicToggle.classList.add('needs-gesture');
  musicToggle.title = 'Tap to start wedding music';
  musicToggle.setAttribute('aria-label', 'Tap to start wedding music');
  const startOnFirstGesture = (event) => {
    if (event.target instanceof Element && event.target.closest('#musicToggle')) return;
    startMusic();
    document.removeEventListener('pointerdown', startOnFirstGesture, true);
    document.removeEventListener('keydown', startOnFirstGesture, true);
  };
  document.addEventListener('pointerdown', startOnFirstGesture, true);
  document.addEventListener('keydown', startOnFirstGesture, true);
});music.addEventListener('play', reflectMusicState);
music.addEventListener('pause', reflectMusicState);
musicToggle.addEventListener('click', async () => {
  if (music.paused) await startMusic();
  else { music.pause(); reflectMusicState(); }
});

// Add the date in the visitor's calendar as a local-time event.
$('#calendarButton').addEventListener('click', () => {
  const [day, month, year] = WEDDING.dateShort.split(' '), monthNumber = new Date(`${month} 1, ${year}`).getMonth() + 1;
  const stamp = `${year}${pad2(monthNumber)}${pad2(day)}T123000`;
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sahil and Sana//Wedding Invitation//EN','BEGIN:VEVENT',`DTSTART;TZID=Asia/Kolkata:${stamp}`,'DURATION:PT4H',`SUMMARY:${couple} · Wedding Celebration`,`LOCATION:${WEDDING.venue}, ${WEDDING.location}`,`DESCRIPTION:${WEDDING.inviteMessage}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const file = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' })), link = document.createElement('a'); link.href = file; link.download = 'sahil-and-sana-wedding.ics'; link.click(); URL.revokeObjectURL(file);
});

// Reveal sections as the guest scrolls; preserve reduced-motion accessibility.
document.querySelectorAll('.couple,.moments,.celebration,.countdown-after,.footer').forEach((section) => section.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach((section) => section.classList.add('visible'));
}

// A gentle, decorative heart fall; it never intercepts taps or scrolling.
const heartLayer = document.querySelector('.heart-fall');
if (heartLayer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const dropHeart = () => {
    const heart = document.createElement('span');
    heart.className = 'falling-heart';
    heart.textContent = Math.random() > .55 ? '♡' : '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 14}px`);
    heart.style.setProperty('--heart-duration', `${6 + Math.random() * 5}s`);
    heart.style.setProperty('--heart-drift', `${Math.round((Math.random() - .5) * 150)}px`);
    heart.style.setProperty('--heart-rotate', `${Math.round((Math.random() - .5) * 90)}deg`);
    heartLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 11500);
  };
  dropHeart();
  const mobileView = window.matchMedia('(max-width: 600px)');
  window.setInterval(dropHeart, mobileView.matches ? 3200 : 1800);
}
