(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const stage = document.querySelector('#nixieStage');
  const tubes = [...document.querySelectorAll('.tube')];
  const progress = document.querySelector('#pageProgress');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  const timers = new Set();

  const later = (fn, ms) => {
    const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
    return id;
  };

  function igniteTube(tube, index) {
    if (reduced.matches) return;
    later(() => {
      tube.classList.add('is-flare');
      later(() => tube.classList.remove('is-flare'), 115 + Math.random() * 90);
      later(() => {
        tube.classList.add('is-dim');
        later(() => tube.classList.remove('is-dim'), 45 + Math.random() * 55);
      }, 150 + Math.random() * 80);
    }, 220 + index * 130);
  }

  function randomFlicker(tube) {
    if (reduced.matches) return;
    const loop = () => {
      const wait = 700 + Math.random() * 5200;
      later(() => {
        const live = [...tube.querySelectorAll('.live')];
        const haloBefore = tube.style.getPropertyValue('--halo');
        const type = Math.random();
        if (type < .15) {
          tube.classList.add('is-dim');
          tube.style.setProperty('--halo', '.18');
          later(() => {
            tube.classList.remove('is-dim');
            tube.style.setProperty('--halo', haloBefore || '.56');
          }, 35 + Math.random() * 80);
        } else {
          const frames = type > .82 ? [1,.35,.92,.54,1] : [1,.58,1];
          live.forEach(node => node.animate(
            frames.map((opacity, i) => ({opacity, offset:i/(frames.length-1)})),
            {duration: 55 + Math.random() * 115, easing:'steps(2,end)'}
          ));
        }
        if (Math.random() > .72) {
          later(() => {
            live.forEach(node => node.animate([{opacity:.45},{opacity:1}],{duration:70,easing:'steps(2,end)'}));
          }, 90 + Math.random() * 180);
        }
        loop();
      }, wait);
    };
    loop();
  }

  tubes.forEach((tube, index) => { igniteTube(tube, index); randomFlicker(tube); });

  if (stage && fine.matches && !reduced.matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const render = () => {
      cx += (tx - cx) * .065; cy += (ty - cy) * .065;
      stage.style.setProperty('--ry', `${cx.toFixed(2)}deg`);
      stage.style.setProperty('--rx', `${cy.toFixed(2)}deg`);
      raf = requestAnimationFrame(render);
    };
    render();
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      tx = x * 5.5; ty = y * -3.6;
      tubes.forEach((tube, i) => {
        const depth = (i - 2) * 1.7;
        tube.style.transform = `translateZ(${12 + Math.abs(i-2)*5}px) translateX(${x*depth}px)`;
      });
    });
    stage.addEventListener('pointerleave', () => {
      tx = 0; ty = 0; tubes.forEach(t => t.style.transform = '');
    });
    window.addEventListener('pagehide', () => cancelAnimationFrame(raf), {once:true});
  }

  function updateProgress() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (progress) progress.style.transform = `scaleX(${Math.min(1, scrollY/max)})`;
  }
  addEventListener('scroll', updateProgress, {passive:true}); updateProgress();

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      if (!open) {
        nav.style.display = 'flex'; nav.style.position='fixed'; nav.style.inset='66px 0 auto 0'; nav.style.padding='22px'; nav.style.background='#080604f5'; nav.style.flexDirection='column'; nav.style.alignItems='center';
      } else nav.removeAttribute('style');
    });
  }

  reduced.addEventListener('change', () => {
    if (reduced.matches) timers.forEach(id => clearTimeout(id));
  });
})();
