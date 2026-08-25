(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rig = document.getElementById('nixieRig');
  const tubes = Array.from(document.querySelectorAll('[data-flicker]'));
  const timers = new Set();

  function schedule(fn, delay) {
    const id = window.setTimeout(() => { timers.delete(id); fn(); }, delay);
    timers.add(id);
    return id;
  }

  function randomFlicker(tube) {
    if (reduced.matches) return;
    const wait = 850 + Math.random() * 2850;
    schedule(() => {
      const flare = Math.random() < 0.28;
      tube.classList.add(flare ? 'is-flare' : 'is-dim');
      const pulseCount = Math.random() < .22 ? 2 + Math.floor(Math.random()*3) : 1;
      let n = 0;
      const pulse = () => {
        schedule(() => {
          tube.classList.toggle('is-dim');
          tube.classList.toggle('is-flare', flare && Math.random() > .35);
          n += 1;
          if (n < pulseCount * 2) pulse();
          else {
            schedule(() => {
              tube.classList.remove('is-dim','is-flare');
              randomFlicker(tube);
            }, 40 + Math.random()*110);
          }
        }, 32 + Math.random()*90);
      };
      pulse();
    }, wait);
  }

  if (!reduced.matches) {
    tubes.forEach((tube, i) => {
      tube.classList.add('is-dim');
      schedule(() => {
        tube.classList.remove('is-dim');
        tube.classList.add('is-flare');
        schedule(() => {
          tube.classList.remove('is-flare');
          randomFlicker(tube);
        }, 130 + Math.random()*180);
      }, 180 + i*115 + Math.random()*90);
    });
  }

  if (rig && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced.matches) {
    let tx=0, ty=0, cx=0, cy=0, raf=0;
    const animate=()=>{cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;rig.style.setProperty('--tilt-y',`${cx}deg`);rig.style.setProperty('--tilt-x',`${cy}deg`);raf=requestAnimationFrame(animate)};
    animate();
    rig.addEventListener('pointermove', e=>{const r=rig.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*1.5;ty=((e.clientY-r.top)/r.height-.5)*-1.1});
    rig.addEventListener('pointerleave',()=>{tx=0;ty=0});
    window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  }


  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  if (header && menu) {
    const setMenu = (open) => {
      header.classList.toggle('menu-open', open);
      menu.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  }

  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      timers.forEach(id => clearTimeout(id)); timers.clear();
      tubes.forEach(t => t.classList.remove('is-dim','is-flare'));
    } else tubes.forEach(randomFlicker);
  });
})();
