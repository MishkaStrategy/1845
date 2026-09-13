(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hidePreloader = () => {
    window.setTimeout(() => document.querySelector('.preloader')?.classList.add('is-hidden'), 320);
  };
  if (document.readyState === 'complete') hidePreloader();
  else window.addEventListener('load', hidePreloader, { once: true });
  window.setTimeout(hidePreloader, 1800);

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Открыть меню');
  };
  menuButton?.addEventListener('click', () => {
    const nextState = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(nextState));
    menuButton.setAttribute('aria-label', nextState ? 'Закрыть меню' : 'Открыть меню');
    nav?.classList.toggle('is-open', nextState);
    body.classList.toggle('menu-open', nextState);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 960) closeMenu(); });

  document.getElementById('year').textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(item => item.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const emberField = document.querySelector('.hero__embers');
  if (emberField && !reduceMotion) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 28; index += 1) {
      const ember = document.createElement('i');
      ember.className = 'ember';
      ember.style.left = `${4 + Math.random() * 92}%`;
      ember.style.setProperty('--duration', `${5 + Math.random() * 8}s`);
      ember.style.setProperty('--delay', `${-Math.random() * 12}s`);
      ember.style.setProperty('--drift', `${-55 + Math.random() * 110}px`);
      const size = 1 + Math.random() * 2;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      fragment.appendChild(ember);
    }
    emberField.appendChild(fragment);
  }

  const digits = [...document.querySelectorAll('.nixie__digit')];
  if (!reduceMotion) {
    const microFlicker = digit => {
      digit.classList.add('is-blinking');
      window.setTimeout(() => digit.classList.remove('is-blinking'), 35 + Math.random() * 100);
      window.setTimeout(() => {
        if (Math.random() > .55) {
          digit.classList.add('is-blinking');
          window.setTimeout(() => digit.classList.remove('is-blinking'), 24 + Math.random() * 55);
        }
      }, 95 + Math.random() * 90);
    };
    const scheduleFlicker = () => {
      const digit = digits[Math.floor(Math.random() * digits.length)];
      if (digit) microFlicker(digit);
      window.setTimeout(scheduleFlicker, 1700 + Math.random() * 4200);
    };
    window.setTimeout(scheduleFlicker, 1300);
  }

  const stage = document.querySelector('.tube-stage');
  if (stage && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    stage.addEventListener('pointermove', event => {
      const bounds = stage.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - .5;
      const py = (event.clientY - bounds.top) / bounds.height - .5;
      stage.style.setProperty('--stage-ry', `${px * 3.2}deg`);
      stage.style.setProperty('--stage-rx', `${py * -2.2}deg`);
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--stage-ry', '0deg');
      stage.style.setProperty('--stage-rx', '0deg');
    });
  }

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    let pointerX = -600;
    let pointerY = -600;
    let currentX = -600;
    let currentY = -600;
    window.addEventListener('pointermove', event => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }, { passive: true });
    const moveGlow = () => {
      currentX += (pointerX - currentX) * .12;
      currentY += (pointerY - currentY) * .12;
      root.style.setProperty('--cursor-x', `${currentX}px`);
      root.style.setProperty('--cursor-y', `${currentY}px`);
      requestAnimationFrame(moveGlow);
    };
    requestAnimationFrame(moveGlow);

    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        button.style.transform = `translate(${x * .08}px, ${y * .12}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.removeAttribute('aria-current'));
        const active = navLinks.find(link => link.getAttribute('href') === `#${entry.target.id}`);
        active?.setAttribute('aria-current', 'page');
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
