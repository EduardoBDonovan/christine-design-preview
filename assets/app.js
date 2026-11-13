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
})();
