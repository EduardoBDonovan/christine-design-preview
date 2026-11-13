(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const announce = text => { if ($('#announcement')) $('#announcement').textContent = text; };
  const menu = $('.menu-toggle');
  const closeMenu = () => {
    if (!menu) return;
    menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu');
    $('#site-nav').dataset.open = 'false';
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('#site-nav').dataset.open = String(open);
  });
  $$('#site-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  let lastTrigger;
  const openDialog = (id, trigger) => { lastTrigger = trigger; document.getElementById(id).showModal(); };
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => lastTrigger?.focus());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('[data-open]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.open, button)));
  const setFilter = value => {
    let count = 0;
    $$('[data-status]').forEach(card => { card.hidden = value !== 'all' && card.dataset.status !== value; if (!card.hidden) count++; });
    $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
    $('#filter-empty').hidden = count > 0; $('#filter-count').textContent = `${count} ${count === 1 ? 'property' : 'properties'}`;
  };
  $$('[data-filter]').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
  $('[data-reset-filter]')?.addEventListener('click', () => { setFilter('all'); $('[data-filter=all]').focus(); });
  const properties = {
    spanish: {title:'Spanish Revival',image:'home-spanish',text:'Illustrative closing.'},
    modern: {title:'Desert Modern',image:'home-modern',text:'Illustrative closing.'}
  };
  $$('[data-property]').forEach(button => button.addEventListener('click', () => {
    const p = properties[button.dataset.property];
    $('#property-title').textContent = p.title; $('#property-text').textContent = p.text;
    $('#property-photo').src = `../assets/${p.image}-1536.webp`; $('#property-photo').alt = p.title;
    openDialog('property-dialog', button);
  }));
  if ($('#reno-dialog')) {
    let activeProject;
    const setStage = stage => {
      const label = stage === 'before' ? 'Before' : 'After';
      const source = activeProject.querySelector(`[data-reno-photo="${stage}"] img`);
      const title = activeProject.dataset.renoTitle;
      const photo = $('#reno-dialog-image');
      photo.src = source.src;
      photo.className = source.classList.contains('reno-diptych') ? 'reno-diptych' : '';
      photo.alt = `${label}: illustrative ${title.toLowerCase()}`;
      $('#reno-dialog-visual').dataset.stage = stage;
      $('#reno-dialog-project').textContent = title;
      $('#reno-dialog-title').textContent = label;
      $('#reno-lightbox-status').textContent = `${title}: ${label.toLowerCase()} photo shown.`;
      $$('[data-reno-lightbox-stage]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.renoLightboxStage === stage)));
    };
    $$('[data-reno-photo]').forEach(b => b.addEventListener('click', () => {
      activeProject = b.closest('.transformation');
      setStage(b.dataset.renoPhoto);
      openDialog('reno-dialog', b);
    }));
    $$('[data-reno-lightbox-stage]').forEach(b => b.addEventListener('click', () => setStage(b.dataset.renoLightboxStage)));
  }
})();
