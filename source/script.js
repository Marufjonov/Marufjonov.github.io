// --- Navbar open/close ---
const navbar = document.querySelector('.navbar');
const openBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-navbar');

openBtn?.addEventListener('click', () => navbar.classList.add('active'));
closeBtn?.addEventListener('click', () => navbar.classList.remove('active'));
navbar?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navbar.classList.remove('active')));

// --- Dynamic year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Books data (EDIT ONLY THIS ARRAY) ---
// title: karta sarlavhasi
// id: Play Market packageName (kartaga bosilganda shu ilovaga olib boradi)
// tag: kichik belgi/yozuv
// cover: ixtiyoriy lokal rasm (agar qo‘ymasangiz harfli gradient chiqariladi)
const BOOKS = [
  {
    title: "Savdogarlar Ustozi (1–2)",
    id: "com.sadirboyprogrammer.savdogar",
    tag: "Uzbek (Lotin/Kiril)",
    cover: "" // masalan: "source/picture/savdogar.webp"
  },
  {
    title: "Ruhlantiruvchi Hikoyalar 2024",
    id: "com.sadirboyprogrammer.ruhlantiruvchihikoyalar2020",
    tag: "Motivatsion",
    cover: ""
  },
  {
    title: "Iblis Hamlasi — 1",
    id: "com.sadirboyprogrammer.iblisxamlasi1",
    tag: "Sarguzasht",
    cover: ""
  },
  {
    title: "Duo Taqdirni O‘zgartiradi",
    id: "com.sadirboyprogrammer.duoyoqutqaradi", // agar boshqacha bo‘lsa almashtiring
    tag: "Diniy/Ilhom",
    cover: ""
  },
  {
    title: "Hayot Yutqazgan Joy...",
    id: "com.sadirboyprogrammer.hayotyutqazganjoy", // o‘zingizning paket nomingiz bilan
    tag: "Psixologiya",
    cover: ""
  },
  {
    title: "Kitoblar To‘plami (Super-App)",
    id: "com.sadirboyprogrammer.booknew", // super-app bo‘lsa
    tag: "Multi-til / Xatcho‘p",
    cover: ""
  }
];

// --- Render books grid ---
const grid = document.getElementById('books-grid');

function createCard(b) {
  const a = document.createElement('a');
  a.className = 'card';
  a.href = `https://play.google.com/store/apps/details?id=${encodeURIComponent(b.id)}`;
  a.target = '_blank';
  a.rel = 'noopener';

  const thumb = document.createElement('div');
  thumb.className = 'card__thumb';
  if (b.cover) {
    const img = document.createElement('img');
    img.src = b.cover;
    img.alt = b.title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.loading = 'lazy';
    thumb.textContent = '';
    thumb.appendChild(img);
  } else {
    // Fallback — birinchi harflar
    thumb.textContent = b.title.split(/\s+/).slice(0,2).map(s=>s[0] ?? '').join('').toUpperCase();
  }

  const body = document.createElement('div');
  body.className = 'card__body';

  const h = document.createElement('div');
  h.className = 'card__title';
  h.textContent = b.title;

  const d = document.createElement('div');
  d.className = 'card__desc';
  d.textContent = "Play Market’dagi ilova sahifasi";

  const badges = document.createElement('div');
  badges.className = 'card__badges';
  const badge1 = document.createElement('span');
  badge1.className = 'badge';
  badge1.textContent = b.tag || 'Kitob ilovasi';
  badges.appendChild(badge1);

  body.appendChild(h);
  body.appendChild(d);
  body.appendChild(badges);

  a.appendChild(thumb);
  a.appendChild(body);
  return a;
}

if (grid) {
  BOOKS.forEach(b => grid.appendChild(createCard(b)));
}

// --- Simple mailto fallback (mobile email client) ---
document.querySelector('#contact-form')?.addEventListener('submit', (e) => {
  // form action="mailto:" bilan ishlaydi; bu yerda faqat menyuni yopamiz
  navbar?.classList.remove('active');
});
