/* ================================================
   Lidertekstill — Ana JavaScript Dosyası
   ================================================ */

const WA_NUMBER = '905323548182';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ---------- Mobil Menü ---------- */
const navToggle = document.getElementById('nav-toggle');
const nav       = document.getElementById('main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Bir linke tıklanınca menüyü kapat
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Teklif Formu → WhatsApp ---------- */
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
      name    ? `Ad Soyad: ${name}`         : '',
      phone   ? `Telefon: ${phone}`         : '',
      service ? `Hizmet: ${service}`        : '',
      details ? `Detaylar: ${details}`      : '',
    ].filter(Boolean).join('\n');

    const url = `${WA_BASE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
