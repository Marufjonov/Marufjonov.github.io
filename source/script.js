// --- Navbar open/close ---
const navbar = document.querySelector('.navbar');
const openBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-navbar');

openBtn?.addEventListener('click', () => navbar.classList.add('active'));
closeBtn?.addEventListener('click', () => navbar.classList.remove('active'));
navbar?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navbar.classList.remove('active')));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') navbar?.classList.remove('active'); });

// --- Dynamic year in footer (guarded) ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Books data (EDIT ONLY THIS ARRAY) ---
// title: karta sarlavhasi
// id: Play Market packageName (kartaga bosilganda shu ilovaga olib boradi)
// tag: kichik belgi/yozuv
// cover: lokaldagi rasm (ixtiyoriy). Qo'ymasangiz — harf-ikon chiqadi.
const BOOKS = [
  {
    title: "Duo Taqdirni O‘zgartiradi",
    id: "com.sadirboyprogrammer.duotaqdirniuzgartiradi",
    tag: "Diniy / Ilhom",
    cover: "source/picture/cover_duo.webp"
  },
  {
    title: "Chunki Sen Allohsan",
    id: "com.sadirboyprogrammer.chunkisen",
    tag: "Diniy / Motivatsion",
    cover: "source/picture/cover_chunki_sen.webp"
  },
  {
    title: "Saodat Asri Qissalari To‘liq",
    id: "com.sadirboyprogrammer.saodatasri",
    tag: "Diniy / Tarixiy",
    cover: "source/picture/cover_saodat_asri.webp"
  },
  {
    title: "Ikki Eshik Orasi",
    id: "com.sadirboyprogrammer.ikkieshikorasi",
    tag: "Adabiy / Tarixiy",
    cover: "source/picture/cover_eshik.webp"
  },
  {
    title: "Savdogarlar Ustozi",
    id: "com.sadirboyprogrammer.savdogar",
    tag: "Biznes / Hayotiy",
    cover: "source/picture/cover_savdogar.webp"
  },
  {
    title: "Mavlono Rumiy Hikmatlari",
    id: "com.sadirboyprogrammer.mavlonorumiyhikmatlari",
    tag: "Tasavvuf / Ilhom",
    cover: "source/picture/cover_rumiy.webp"
  },
  {
    title: "Seni Sevama Dema Sev",
    id: "com.sadirboyprogrammer.senisevamandema",
    tag: "Romantik / Hayotiy",
    cover: "source/picture/cover_sev.webp"
  },
  {
    title: "Dunyoning Ishlari",
    id: "com.sadirboyprogrammer.dunyoningishlari",
    tag: "Adabiy / Psixologik",
    cover: "source/picture/cover_dunyo.webp"
  },
  {
    title: "Tanbehul G‘ofilin",
    id: "com.sadirboyprogrammer.tanbehulgofilin",
    tag: "Diniy / Nasihat",
    cover: "source/picture/cover_tanbeh.webp"
  },
  {
    title: "Ilm Olish Sirlari",
    id: "com.sadirboyprogrammer.ilmolishsirlari",
    tag: "Ilm / Rivojlanish",
    cover: "source/picture/cover_ilm.webp"
  },
  {
    title: "Qu’ron Karim Ilmiy Mo‘jizalari",
    id: "com.sadirboyprogrammer.quronningilmiymujizalari",
    tag: "Diniy / Ilmiy",
    cover: "source/picture/cover_quran_mujiza.webp"
  },
  {
    title: "Kaktuslar Ham Gullaydi",
    id: "com.sadirboyprogrammer.kaktuslarhamgullaydi",
    tag: "Hayotiy / Motivatsion",
    cover: "source/picture/cover_kaktus.webp"
  }
];

// --- Render books grid ---
const grid = document.getElementById('books-grid');

function createCard(b) {
  const a = document.createElement('a');
  a.className = 'card';
  // UTM referrer bilan
  const ref = 'utm_source=site&utm_medium=card&utm_campaign=top12';
  a.href = `https://play.google.com/store/apps/details?id=${encodeURIComponent(b.id)}&referrer=${encodeURIComponent(ref)}`;
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
    thumb.textContent = b.title.split(/\s+/).slice(0, 2).map(s => s[0] ?? '').join('').toUpperCase();
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
  // faqat 12 tasini chiqaramiz (xavfsizlik uchun slice)
  BOOKS.slice(0, 12).forEach(b => grid.appendChild(createCard(b)));
}

// --- Simple mailto fallback (mobile email client) ---
document.querySelector('#contact-form')?.addEventListener('submit', () => {
  navbar?.classList.remove('active');
});
