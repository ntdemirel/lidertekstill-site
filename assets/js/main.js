/* ================================================
   Lidertekstill — Ana JavaScript Dosyası
   ================================================ */

const WA_NUMBER = '905323548182';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ================================================
   HEADER — Scroll state
   ================================================ */
const header = document.querySelector('.header');

if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // ilk yüklemede kontrol et
}

/* ================================================
   MOBİL MENÜ
   ================================================ */
const navToggle = document.getElementById('nav-toggle');
const nav       = document.getElementById('main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Link tıklamasında kapat
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Dışarı tıklamasında kapat
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ================================================
   SCROLL REVEAL — IntersectionObserver
   ================================================ */
const revealEls = document.querySelectorAll('[data-reveal]');

if (revealEls.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ================================================
   SAYAÇ ANİMASYONU — Trust strip rakamları
   ================================================ */
function animateCounter(el) {
  const target   = parseInt(el.dataset.countTo, 10);
  const suffix   = el.dataset.countSuffix || '';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1400;
  const start    = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll('[data-count-to]');

if (counterEls.length && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counterEls.forEach(el => counterObserver.observe(el));
}

/* ================================================
   TEKLİF FORMU → WhatsApp
   ================================================ */
const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('form-name').value.trim();
    const phone   = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value;
    const details = document.getElementById('form-details').value.trim();

    const message = [
      'Merhaba, teklif almak istiyorum.',
      name    ? `Ad Soyad: ${name}`    : '',
      phone   ? `Telefon: ${phone}`    : '',
      service ? `Hizmet: ${service}`   : '',
      details ? `Detaylar: ${details}` : '',
    ].filter(Boolean).join('\n');

    const url = `${WA_BASE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

/* ================================================
   YIL — Footer
   ================================================ */
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
