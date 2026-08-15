(() => {
  const root = document.documentElement;
  const body = document.body;
  const progress = document.querySelector('.scroll-progress span');
  const cursor = document.querySelector('.cursor-glow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const offer = window.OFFER || {};
  const bind = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };
  bind('offer-price', offer.price);
  bind('offer-timeline', offer.timeline);
  bind('offer-payment', offer.payment);
  bind('offer-package', offer.package);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const decimals = Number(el.dataset.decimals || 0);
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals);
      } else {
        const start = performance.now();
        const duration = 1100;
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
      metricObserver.unobserve(el);
    });
  }, { threshold: 0.65 });
  document.querySelectorAll('.metric').forEach((el) => metricObserver.observe(el));

  document.querySelectorAll('[data-accordion] .accordion-row').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
      const icon = button.querySelector('i');
      if (icon) icon.textContent = open ? '+' : '−';
    });
  });

  const marqueeToggle = document.querySelector('.marquee-toggle');
  const quoteStage = document.querySelector('.quote-stage');
  marqueeToggle?.addEventListener('click', () => {
    const paused = marqueeToggle.getAttribute('aria-pressed') === 'true';
    marqueeToggle.setAttribute('aria-pressed', String(!paused));
    marqueeToggle.textContent = paused ? 'Пауза движения' : 'Продолжить движение';
    quoteStage?.classList.toggle('is-paused', !paused);
  });

  document.querySelector('.skip-link')?.addEventListener('click', () => {
    requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const p = Math.min(1, Math.max(0, scrollY / max));
      progress.style.transform = `scaleX(${p})`;
      root.style.setProperty('--scroll', p.toFixed(4));
      root.style.setProperty('--heat', Math.min(1, p * 1.55).toFixed(3));

      if (!reduceMotion) {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const r = el.getBoundingClientRect();
          const ratio = Number(el.dataset.parallax || 0.05);
          const y = (innerHeight * 0.5 - (r.top + r.height * 0.5)) * ratio;
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        });
      }
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.classList.add('active');
    }, { passive: true });
    addEventListener('pointerleave', () => cursor.classList.remove('active'));
  }

  document.querySelector('.booking-submit')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = 'Prototype only <span>✓</span>';
    setTimeout(() => { btn.innerHTML = original; }, 1400);
  });

  body.classList.add('js-ready');
})();
