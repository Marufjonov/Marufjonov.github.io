// ===============================
// Kitoblar Olami — script.js
// ===============================

// --- Navbar open/close ---
const navbar = document.querySelector('.navbar');
const openBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-navbar');

openBtn?.addEventListener('click', () => navbar.classList.add('active'));
closeBtn?.addEventListener('click', () => navbar.classList.remove('active'));
navbar?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navbar.classList.remove('active'))
);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navbar?.classList.remove('active');
});

// --- Dynamic year in footer (guarded) ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Rasmlar uchun bazaviy yo‘l ---
const IMG_BASE = "source/picture/";

// --- Books data (faqat shu massivni tahrir qiling) ---
// title: karta nomi
// id: Play Market package name
// downloads: badge matn, masalan "121k+"
// cover: fayl nomi (faqat nomi) yoki to‘liq URL; bo‘sh bo‘lsa fallback harf-ikon chiqadi
const BOOKS = [
  { title: "Duo taqdirni o’zgartiradi", id: "com.sadirboyprogrammer.duotaqdirniuzgartiradi", downloads: "121k+", cover: "cover_duo.webp" },
  { title: "Chunki Sen Allohsan", id: "com.sadirboyprogrammer.chunkisen", downloads: "—", cover: "cover_chunkisen.webp" },
  { title: "Hayot yutqazgan joyingdan boshlanar", id: "com.sadirboyprogrammer.hayotyutqazganjoyingdan", downloads: "91k+", cover: "cover_hayot.webp" },
  { title: "To’siqlarga qaramay sevdik", id: "com.sadirboyprogrammer.tusiqlargaqaramaysevdik", downloads: "86.5k+", cover: "" },
  { title: "O’zingga xush kelding", id: "com.sadirboyprogrammer.uzinggaxushkelding", downloads: "79k+", cover: "" },
  { title: "Payg'ambarlar tarixi", id: "com.sadirboyprogrammer.paygambarlartarixi", downloads: "71.8k+", cover: "" },
  { title: "Ikki eshik orasi", id: "com.sadirboyprogrammer.ikkieshikorasi", downloads: "69.5k+", cover: "" },
  { title: "Kaktuslar ham gullaydi", id: "com.sadirboyprogrammer.kaktuslarhamgullaydi", downloads: "53k+", cover: "" },
  { title: "Pul topish sirlari", id: "com.sadirboyprogrammer.pultopishsirlari", downloads: "62.3k+", cover: "" },
  { title: "Savdogarlar ustozi", id: "com.sadirboyprogrammer.savdogar", downloads: "58.8k+", cover: "" },
  { title: "Ibodati islomiya", id: "com.sadirboyprogrammer.ibodatiislomiya", downloads: "60k+", cover: "" },
  { title: "Faqat ahmoqlar 8 soat uhlaydi", id: "com.sadirboyprogrammer.faqatahmoqlargina", downloads: "57k+", cover: "" }

];

// --- Helper: cover yo‘lini yechish ---
function resolveCoverPath(cover) {
  if (!cover) return null;
  if (/^https?:\/\//i.test(cover)) return cover;       // to‘liq URL bo‘lsa — shuni ishlatamiz
  return IMG_BASE + cover;                              // faqat nom bo‘lsa — papkaga qo‘shamiz
}

// --- Render books grid ---
const grid = document.getElementById('books-grid');

// ✅ 4 ta ustunni majburan o‘rnatamiz (CSS’da 3 bo‘lsa ham)
if (grid) grid.style.setProperty('--cols', '4');

function createCard(b) {
  const a = document.createElement('a');
  a.className = 'card';

  // UTM referrer + package
  const ref = 'utm_source=site&utm_medium=card&utm_campaign=top_grid';
  a.href = `https://play.google.com/store/apps/details?id=${encodeURIComponent(b.id)}&referrer=${encodeURIComponent(ref)}`;
  a.target = '_blank';
  a.rel = 'noopener';

  // Thumb
  const thumb = document.createElement('div');
  thumb.className = 'card__thumb';

  const coverUrl = resolveCoverPath(b.cover);
  if (coverUrl) {
    const img = document.createElement('img');
    // cache-busting (GitHub Pages kechikkan cache’ni yangilash uchun)
    img.src = `${coverUrl}?v=${Date.now()}`;
    img.alt = b.title;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.onerror = () => {
      // 404/yuklanmasa fallback — birinchi harflar
      thumb.textContent = b.title.split(/\s+/).slice(0, 2).map(s => s[0] ?? '').join('').toUpperCase();
      img.remove();
    };
    thumb.appendChild(img);
  } else {
    // Fallback — birinchi harflar
    thumb.textContent = b.title.split(/\s+/).slice(0, 2).map(s => s[0] ?? '').join('').toUpperCase();
  }

  // Body
  const body = document.createElement('div');
  body.className = 'card__body';

  const h = document.createElement('div');
  h.className = 'card__title';
  h.textContent = b.title;

  const d = document.createElement('div');
  d.className = 'card__desc';
  d.textContent = "Play Market’dagi ilova sahifasi";

  // Badges
  const badges = document.createElement('div');
  badges.className = 'card__badges';

  const badge1 = document.createElement('span');
  badge1.className = 'badge';
  badge1.textContent = "Kitob ilovasi";
  badges.appendChild(badge1);

  if (b.downloads && b.downloads !== "—") {
    const badge2 = document.createElement('span');
    badge2.className = 'badge';
    badge2.textContent = b.downloads;
    badges.appendChild(badge2);
  }

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

// --- Kontakt form (faqat menyuni yopish) ---
document.querySelector('#contact-form')?.addEventListener('submit', () => {
  navbar?.classList.remove('active');
});
