const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    cards.forEach(card => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.style.display = show ? '' : 'none';
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalTitle = document.getElementById('videoModalTitle');
document.querySelectorAll('.project-card[data-video]').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.video;
    videoModalTitle.textContent = card.dataset.title || 'Project';
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
function closeVideo(){
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden','true');
  videoFrame.src='';
  document.body.style.overflow='';
}
document.querySelectorAll('[data-close-video]').forEach(el => el.addEventListener('click', closeVideo));
document.addEventListener('keydown', e => { if(e.key==='Escape' && videoModal.classList.contains('open')) closeVideo(); });

const heroVideo = document.querySelector('.hero-video');
const soundToggle = document.querySelector('.sound-toggle');
if (heroVideo && soundToggle) {
  soundToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    soundToggle.textContent = heroVideo.muted ? 'SOUND OFF' : 'SOUND ON';
    if (!heroVideo.muted) heroVideo.play().catch(()=>{});
  });
}

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
  cursorGlow.style.opacity = '1';
});
