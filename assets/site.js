// Shared behaviour for every page: footer year, mobile nav toggle, scroll-reveal.
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Hero video: click-to-play blob (avoids autoplay + keeps the poster calm)
  const heroPlay = document.getElementById('heroPlay');
  const heroVideo = document.getElementById('heroVideo');
  if (heroPlay && heroVideo) {
    heroPlay.addEventListener('click', () => {
      heroVideo.play();
      heroPlay.setAttribute('data-playing', 'true');
    });
    heroVideo.addEventListener('pause', () => heroPlay.setAttribute('data-playing', 'false'));
    heroVideo.addEventListener('ended', () => heroPlay.setAttribute('data-playing', 'false'));
  }
});
