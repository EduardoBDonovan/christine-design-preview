(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const announce = message => { $('#announcement').textContent = message; };
  const menu = $('.menu-toggle');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('#site-nav').dataset.open = String(open);
  });
  const closeMenu = () => {
    if (!menu) return;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    $('#site-nav').dataset.open = 'false';
  };
  $$('#site-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menu.focus();
    }
  });
  let lastTrigger;
  const openDialog = (id, trigger) => {
    lastTrigger = trigger;
    const dialog = document.getElementById(id);
    dialog.showModal();
  };
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => lastTrigger?.focus());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('[data-open]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.open === 'bag-dialog') renderBag();
    openDialog(button.dataset.open, button);
  }));
  const products = {
    bali: {name:'Bali', image:'candle-light', description:'A moment of sunlight, a hint of citrus, and the feeling of being somewhere far away. An airy presentation for a destination-inspired candle.', notes:'Bright citrus · Soft florals'},
    berlin: {name:'Berlin', image:'candle-dark', description:'Evening light, warm amber glass, and a little atmosphere. A moodier presentation for the destination-inspired collection.', notes:'An evening mood'}
  };
  const bag = new Map();
  let selectedProduct = 'bali';
  $$('[data-product]').forEach(button => button.addEventListener('click', () => {
    selectedProduct = button.dataset.product;
    const product = products[selectedProduct];
    $('#product-title').textContent = product.name;
    $('#product-description').textContent = product.description;
    $('#product-notes').textContent = product.notes;
    $('#product-image').src = `../assets/${product.image}-768.webp`;
    $('#product-image').alt = `Illustrative ${product.name} candle`;
    $('#product-feedback').textContent = '';
    openDialog('product-dialog', button);
  }));
  const totalItems = () => [...bag.values()].reduce((a, b) => a + b, 0);
  const updateCount = () => $$('[data-bag-count]').forEach(el => { el.textContent = totalItems(); });
  $('#add-bag')?.addEventListener('click', () => {
    bag.set(selectedProduct, (bag.get(selectedProduct) || 0) + 1);
    updateCount();
    $('#product-feedback').textContent = `${products[selectedProduct].name} added. ${totalItems()} ${totalItems() === 1 ? 'item' : 'items'} in your preview bag.`;
  });
  function renderBag() {
    const container = $('#bag-items');
    container.replaceChildren();
    if (!bag.size) {
      const empty = document.createElement('p');
      empty.className = 'bag-empty';
      empty.textContent = 'Your preview bag is empty. Explore a candle and add it to try the shopping flow.';
      container.append(empty);
      return;
    }
    for (const [key, count] of bag.entries()) {
      const item = document.createElement('div'); item.className = 'bag-item';
      const label = document.createElement('span'); label.textContent = `${products[key].name} × ${count}`;
      const remove = document.createElement('button'); remove.textContent = 'Remove'; remove.setAttribute('aria-label', `Remove ${products[key].name} from preview bag`);
      remove.addEventListener('click', () => { bag.delete(key); updateCount(); renderBag(); $('#bag-dialog [data-close]').focus(); announce(`${products[key].name} removed from your preview bag.`); });
      item.append(label, remove); container.append(item);
    }
  }
  const setFilter = value => {
    let count = 0;
    $$('[data-status]').forEach(card => { card.hidden = value !== 'all' && card.dataset.status !== value; if (!card.hidden) count++; });
    $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    $('#filter-empty').hidden = count > 0;
    $('#filter-count').textContent = `${count} example ${count === 1 ? 'property' : 'properties'}`;
  };
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  $('[data-reset-filter]')?.addEventListener('click', () => { setFilter('all'); $('[data-filter=all]').focus(); });
  const properties = {
    spanish: {title:'A place to call home.',image:'home-spanish',text:'A Spanish-style home with a welcoming garden, soft afternoon light, and timeless architectural details.'},
    modern: {title:'A little desert modern.',image:'home-modern',text:'Low lines, warm materials, and mountain views. A quiet desert home with an inviting indoor-outdoor feel.'}
  };
  $$('[data-property]').forEach(button => button.addEventListener('click', () => {
    const property = properties[button.dataset.property];
    $('#property-title').textContent = property.title;
    $('#property-text').textContent = property.text;
    $('#property-photo').src = `../assets/${property.image}-768.webp`;
    $('#property-photo').alt = 'Illustrative property: ' + property.title;
    openDialog('property-dialog', button);
  }));
  function setComparison(view, shouldAnnounce = true) {
    $('.comparison').dataset.view = view;
    $$('[data-phase]').forEach(figure => { figure.hidden = view !== 'both' && figure.dataset.phase !== view; });
    $$('[data-compare]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.compare === view)));
    if (shouldAnnounce) announce(view === 'both' ? 'Both before and after images shown.' : `${view === 'before' ? 'Before' : 'After'} image shown.`);
  }
  $$('[data-compare]').forEach(button => button.addEventListener('click', () => setComparison(button.dataset.compare)));
  if ($('.comparison') && matchMedia('(max-width:760px)').matches) setComparison('after', false);

  if ($('[data-renovation-mode]')) {
    const stages = {
      before: {label:'Before', alt:'Original kitchen with oak cabinetry, beige tile counters, and a white range', caption:'The original room, with oak cabinetry and tile counters.'},
      after: {label:'After', alt:'Illustrative finished kitchen with cream cabinets, pale stone counters, and an oak island', caption:'A lighter palette, warm wood, and softer lighting.'}
    };
    const modeDescriptions = {
      pair:'See both stages together. Select either photograph for a closer look.',
      toggle:'Tap Before or After to compare the same view at full size.',
      story:'Explore the finished space, the starting point, and the details in between.'
    };
    let currentStage = 'after';
    const showMode = (mode, updateUrl = true) => {
      if (!['pair','toggle','story'].includes(mode)) return;
      $$('[data-renovation-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.renovationMode === mode)));
      $$('[data-renovation-view]').forEach(panel => { panel.hidden = panel.dataset.renovationView !== mode; });
      $('#reno-mode-description').textContent = modeDescriptions[mode];
      if (updateUrl) {
        const url = new URL(location.href);
        url.searchParams.set('view', mode);
        history.replaceState(null, '', url);
      }
    };
    $$('[data-renovation-mode]').forEach(button => button.addEventListener('click', () => showMode(button.dataset.renovationMode)));
    const requestedMode = new URLSearchParams(location.search).get('view');
    if (requestedMode) showMode(requestedMode, false);
    const selectStage = phase => {
      currentStage = phase;
      $('#reno-toggle-image').src = `../assets/kitchen-${phase}-1536.webp`;
      $('#reno-toggle-image').alt = stages[phase].alt;
      $('#reno-toggle-label').textContent = stages[phase].label;
      $('#reno-toggle-caption').textContent = stages[phase].caption;
      $$('[data-reno-stage]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.renoStage === phase)));
      announce(`${stages[phase].label} photograph shown.`);
    };
    $$('[data-reno-stage]').forEach(button => button.addEventListener('click', () => selectStage(button.dataset.renoStage)));
    const showEnlargedStage = phase => {
      $('#reno-dialog-image').src = `../assets/kitchen-${phase}-1536.webp`;
      $('#reno-dialog-image').alt = stages[phase].alt;
      $('#reno-dialog-title').textContent = stages[phase].label;
      $('#reno-lightbox-status').textContent = `${stages[phase].label} photograph shown.`;
      $$('[data-reno-lightbox-stage]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.renoLightboxStage === phase)));
    };
    $$('[data-reno-photo]').forEach(button => button.addEventListener('click', () => {
      showEnlargedStage(button.dataset.renoPhoto);
      openDialog('reno-dialog', button);
    }));
    $('[data-reno-enlarge-current]').addEventListener('click', event => {
      showEnlargedStage(currentStage);
      openDialog('reno-dialog', event.currentTarget);
    });
    $$('[data-reno-lightbox-stage]').forEach(button => button.addEventListener('click', () => showEnlargedStage(button.dataset.renoLightboxStage)));
    const detailText = {
      cabinetry:'Cream cabinet fronts brighten the room, while a natural oak island adds warmth.',
      surfaces:'Pale stone replaces the tiled counters and continues onto the backsplash for a calmer, more continuous surface.',
      lighting:'Two simple pendant lights replace the larger ceiling fixture and give the island a clearer focal point.'
    };
    $$('[data-reno-detail]').forEach(button => button.addEventListener('click', () => {
      $$('[data-reno-detail]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      $('#reno-detail-text').textContent = detailText[button.dataset.renoDetail];
    }));
  }
})();
