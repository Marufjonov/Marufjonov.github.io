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

// --- Play Developer sahifasi URL-lari ---
// Nom bo‘yicha (ishlaydi, lekin nom o‘zgarsa URL ham o‘zgarishi mumkin)
const DEV_NAME = "Kitoblar Olami";
const DEV_URL_BY_NAME = "https://play.google.com/store/apps/developer?id=" + encodeURIComponent(DEV_NAME);

// Barqaror (tavsiya etiladi): raqamli developer ID bo‘lsa — SHUNINI yozing
const DEV_URL_NUMERIC = ""; // masalan: "https://play.google.com/store/apps/dev?id=1234567890123456789"

// Fallback (qidiruv) — agar yuqoridagilar ishlamasa
const DEV_URL_FALLBACK = "https://play.google.com/store/search?q=" + encodeURIComponent(DEV_NAME) + "&c=apps";

// Qaysi URL ishlatiladi?
const DEV_URL = DEV_URL_NUMERIC || DEV_URL_BY_NAME || DEV_URL_FALLBACK;

// Navbar dagi “Barcha ilovalar” linkini DOM tayyor bo‘lgach ulaymiz
function wireDeveloperLinks() {
  const devLink = document.getElementById('dev-page');
  if (devLink) {
    devLink.setAttribute('href', DEV_URL);
    devLink.setAttribute('target', '_blank');
    devLink.setAttribute('rel', 'noopener');

    // Agar qandaydir sabab bilan href "#" bo‘lib qolsa — kafolat bilan ochamiz
    devLink.addEventListener('click', (e) => {
      const href = devLink.getAttribute('href') || "";
      if (href === "#" || href.trim() === "") {
        e.preventDefault();
        window.open(DEV_URL, "_blank", "noopener");
      }
    });
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireDeveloperLinks);
} else {
  wireDeveloperLinks();
}

// --- Rasmlar uchun bazaviy yo‘l ---
const IMG_BASE = "source/picture/";

// --- Books data (faqat shu massivni tahrir qiling) ---
// title: karta nomi
// id: Play Market package name (paket nomi)
// downloads: badge matn, masalan "121k+"
// cover: fayl nomi (faqat nomi) yoki to‘liq URL; bo‘sh bo‘lsa fallback harf-ikon chiqadi
const BOOKS = [
  { title: "Duo taqdirni o’zgartiradi", id: "com.sadirboyprogrammer.duotaqdirniuzgartiradi", downloads: "121k+", cover: "cover_duo.webp" },
  { title: "Chunki Sen Allohsan", id: "com.sadirboyprogrammer.chunkisen", downloads: "—", cover: "cover_chunkisen.webp" },
  { title: "Hayot yutqazgan joyingdan boshlanar", id: "com.sadirboyprogrammer.hayotyutqazganjoyingdan", downloads: "91k+", cover: "cover_hayot.webp" },
  { title: "To’siqlarga qaramay sevdik", id: "com.sadirboyprogrammer.tusiqlargaqaramaysevdik", downloads: "86.5k+", cover: "cover_sevdik.webp" },
  { title: "O’zingga xush kelding", id: "com.sadirboyprogrammer.uzinggaxushkelding", downloads: "79k+", cover: "cover_kelding.webp" },
  { title: "Dunyoning Ishlari", id: "com.sadirboyprogrammer.dunyoningishlari", downloads: "—", cover: "cover_dunyo.webp" },
  { title: "Ikki eshik orasi", id: "com.sadirboyprogrammer.ikkieshikorasi", downloads: "69.5k+", cover: "cover_eshik.webp" },
  { title: "Kaktuslar ham gullaydi", id: "com.sadirboyprogrammer.kaktuslarhamgullaydi", downloads: "53k+", cover: "cover_kaktus.webp" },
  { title: "Do‘st orttirish", id: "com.sadirboyprogrammer.dustorttirish", downloads: "—", cover: "cover_dust.webp" },
  { title: "Savdogarlar ustozi", id: "com.sadirboyprogrammer.savdogar", downloads: "58.8k+", cover: "cover_savdogar.webp" },
  { title: "Ibodati islomiya", id: "com.sadirboyprogrammer.ibodatiislomiya", downloads: "60k+", cover: "cover_ibodat.webp" },
  { title: "Faqat ahmoqlar 8 soat uhlaydi", id: "com.sadirboyprogrammer.faqatahmoqlargina", downloads: "57k+", cover: "cover_ahmoqlar.webp" }
];

// --- Helper: cover yo‘lini yechish ---
function resolveCoverPath(cover) {
  if (!cover) return null;
  if (/^https?:\/\//i.test(cover)) return cover; // to‘liq URL bo‘lsa
  return IMG_BASE + cover;                       // faqat nom bo‘lsa — papkaga qo‘shamiz
}

// --- Render books grid ---
const grid = document.getElementById('books-grid');

// 4 ta ustun (agar CSS’da boshqacha bo‘lsa ham majburlab qo‘yamiz)
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
    img.src = `${coverUrl}?v=${Date.now()}`; // cache-busting
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

// --- Progressive render: 12 ta → “Ko‘proq ko‘rsatish” bilan davom ---
const INITIAL_COUNT = 12;  // birinchi ko‘rinish
const BATCH = 10;          // keyingi yuklanish
let rendered = 0;

function renderBatch(n){
  BOOKS.slice(rendered, rendered + n).forEach(b => grid.appendChild(createCard(b)));
  rendered += n;
  if (rendered >= BOOKS.length) {
    document.getElementById('more-btn')?.classList.add('hidden');
  }
}

// grid tayyorlangach, tugmalarni yaratamiz
if (grid) {
  grid.innerHTML = '';
  renderBatch(INITIAL_COUNT);

  // “Ko‘proq ko‘rsatish” tugmasi (agar hali yo‘q bo‘lsa yaratamiz)
  if (!document.getElementById('more-btn') && BOOKS.length > INITIAL_COUNT){
    const moreBtn = document.createElement('button');
    moreBtn.id = 'more-btn';
    moreBtn.className = 'more';
    moreBtn.type = 'button';
    moreBtn.textContent = 'Ko‘proq ko‘rsatish';
    moreBtn.addEventListener('click', () => renderBatch(BATCH));
    grid.insertAdjacentElement('afterend', moreBtn);
  }

  // Developer CTA tugmasi — griddan keyin qo‘shamiz
  const devCta = document.createElement('a');
  devCta.className = 'more';
  devCta.href = DEV_URL;
  devCta.target = '_blank';
  devCta.rel = 'noopener';
  devCta.style.display = 'inline-block';
  devCta.style.marginLeft = '12px';
  devCta.textContent = 'Barcha ilovalar (Play)';
  grid.insertAdjacentElement('afterend', devCta);
}

// --- Kontakt (EMAIL) — faqat shu bo‘lim qo‘shildi ---
const CONTACT_EMAIL = "sadirboyprogrammer@gmail.com";

(function setupContact(){
  // pastdagi “Bizning email” havolasini to‘ldiramiz
  const emailEl = document.getElementById('contact-email');
  if (emailEl) {
    emailEl.setAttribute('href', `mailto:${CONTACT_EMAIL}`);
    emailEl.textContent = CONTACT_EMAIL;
  }

  // form submit — mailto ochish va menyuni yopish
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (form.elements['name']?.value || '').trim() || 'Anonim';
      const from = (form.elements['email']?.value || '').trim();
      const message = (form.elements['message']?.value || '').trim();

      if (!message) {
        alert("Iltimos, xabaringizni yozing.");
        return;
      }

      const subject = encodeURIComponent(`Saytdan murojaat — ${name}`);
      const body = encodeURIComponent(
        `Ism: ${name}\nEmail: ${from}\n\nXabar:\n${message}`
      );

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      // menyuni yopamiz
      navbar?.classList.remove('active');
    });
  }
})();
