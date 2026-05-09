/* ============================================
   EXPOSIR — Main JavaScript
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---- Navigation ---- */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- Hero Entrance ---- */
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
  .to('.hero__icon-wrap', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'power3.out'
  })
  .to('.hero__eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5')
  .to('.hero__title-line', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out'
  }, '-=0.4')
  .to('.hero__subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5')
  .to('.hero__cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4');

/* ---- Feature Section ---- */
const featureItems = document.querySelectorAll('.feature-item');
const screenshotImgs = document.querySelectorAll('.features__screenshot-img');
const progressBar = document.getElementById('featuresProgressBar');
const progressWrap = document.querySelector('.features__progress');
let currentFeature = 0;

function activateFeature(index) {
  if (index === currentFeature) return;
  currentFeature = index;

  featureItems.forEach((item, i) => {
    item.classList.toggle('feature-item--active', i === index);
  });

  screenshotImgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function forceActivateFeature(index) {
  currentFeature = index;

  featureItems.forEach((item, i) => {
    item.classList.toggle('feature-item--active', i === index);
  });

  screenshotImgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
  // Click to switch
  featureItems.forEach((item, i) => {
    item.addEventListener('click', () => forceActivateFeature(i));
  });

  // ScrollTrigger for progress bar visibility
  ScrollTrigger.create({
    trigger: '.features',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => progressWrap.classList.add('visible'),
    onLeave: () => progressWrap.classList.remove('visible'),
    onEnterBack: () => progressWrap.classList.add('visible'),
    onLeaveBack: () => progressWrap.classList.remove('visible'),
  });

  // Scroll-driven feature switching
  const totalFeatures = featureItems.length;
  ScrollTrigger.create({
    trigger: '.features',
    start: 'top 60%',
    end: 'bottom 40%',
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const progress = self.progress;
      progressBar.style.width = `${progress * 100}%`;
      const idx = Math.min(Math.floor(progress * totalFeatures), totalFeatures - 1);
      activateFeature(idx);
    }
  });
}

// Feature list items stagger in
gsap.from('.feature-item', {
  scrollTrigger: {
    trigger: '.features__list',
    start: 'top 80%',
  },
  opacity: 0,
  x: -30,
  stagger: 0.1,
  duration: 0.7,
  ease: 'power2.out',
  immediateRender: false,
  clearProps: 'opacity,transform'
});

// Screenshot frame entrance
gsap.from('.features__screenshot-frame', {
  scrollTrigger: {
    trigger: '.features__mockup',
    start: 'top 80%',
  },
  opacity: 0,
  y: 60,
  scale: 0.9,
  duration: 1,
  ease: 'power3.out',
  immediateRender: false,
  clearProps: 'opacity,transform'
});

/* ---- Screenshots horizontal drag scroll ---- */
const track = document.getElementById('screenshotsTrack');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('dragging');
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// Screenshots scroll-in animation
gsap.from('.screenshots__item', {
  scrollTrigger: {
    trigger: '.screenshots__track',
    start: 'top 85%',
  },
  opacity: 0,
  y: 40,
  stagger: 0.08,
  duration: 0.7,
  ease: 'power2.out'
});

/* ---- Section generic fade-ups ---- */
gsap.utils.toArray('.section-eyebrow, .section-title, .section-subtitle').forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out'
  });
});

/* ---- Download section ---- */
gsap.from('.download__icon-wrap', {
  scrollTrigger: { trigger: '.download', start: 'top 75%' },
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: 'back.out(1.5)'
});
gsap.from('.download__title, .download__subtitle, .download__badges, .download__note', {
  scrollTrigger: { trigger: '.download', start: 'top 70%' },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.7,
  ease: 'power2.out'
});

/* ---- Support section ---- */
gsap.from('.support__card', {
  scrollTrigger: { trigger: '.support__grid', start: 'top 80%' },
  opacity: 0,
  x: -40,
  duration: 0.8,
  ease: 'power2.out'
});
gsap.from('.support__links > *', {
  scrollTrigger: { trigger: '.support__grid', start: 'top 80%' },
  opacity: 0,
  x: 40,
  stagger: 0.1,
  duration: 0.8,
  ease: 'power2.out'
});

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ---- Contact Form (Formspree) ---- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const isJa = document.documentElement.lang === 'ja';

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    type: contactForm.type.value,
    message: contactForm.message.value.trim(),
  };

  formNote.textContent = isJa ? '送信中...' : 'Sending…';
  formNote.className = 'form-note';

  try {
    const res = await fetch('https://formspree.io/f/mnjwglok', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error();

    formNote.textContent = isJa
      ? 'お問い合わせを受け付けました。ありがとうございます！'
      : "Message sent! We'll get back to you within 2 business days.";
    formNote.className = 'form-note success';
    contactForm.reset();
  } catch (err) {
    formNote.textContent = isJa
      ? '送信に失敗しました。しばらく後にお試しください。'
      : 'Something went wrong. Please try again or email exposir.app@gmail.com.';
    formNote.className = 'form-note error';
  }
});

/* ---- Hero parallax on scroll ---- */
gsap.to('.hero__content', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 80,
  opacity: 0.3,
  ease: 'none'
});

gsap.to('.hero__grid', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 40,
  ease: 'none'
});

/* ---- App icon subtle pulse ---- */
gsap.to('.hero__icon-wrap .app-icon', {
  boxShadow: '0 0 80px rgba(240,192,0,0.25), 0 0 0 1px rgba(255,255,255,0.14), 0 24px 48px rgba(0,0,0,0.55)',
  duration: 2.5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
