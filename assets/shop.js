(() => {
  'use strict';
  if (!document.body.classList.contains('shop-preview')) return;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const catalog = window.JN_CATALOG, sets = window.JN_SAMPLE_SETS;
  const assets = document.body.dataset.assetRoot, themeRoot = document.body.dataset.themeRoot;
  const colors = ['none','black','cream','orange','red','pink','green'];
  const title = value => value[0].toUpperCase() + value.slice(1);
  const money = value => `$${value}`;
  const storageKey = 'jn-design-preview-bag-v6';
  let bag = [];
  const valid = x => x && ['candle','spray','case-candle','case-spray','sample'].includes(x.kind) && colors.includes(x.color) && Number.isInteger(x.qty) && x.qty > 0 && x.qty <= 20 && (x.kind === 'sample' ? sets.some(s => s.id === x.id) : x.kind.startsWith('case-') ? x.id === 'case' && x.color !== 'none' : catalog.some(s => s.id === x.id));
  try { const saved = JSON.parse(sessionStorage.getItem(storageKey)); if (Array.isArray(saved)) bag = saved.filter(valid).slice(0,50); } catch (_) { /* Memory-only bag is available if storage is unavailable. */ }
  const price = item => item.kind === 'sample' ? 20 : item.kind.startsWith('case-') ? 24 : (item.kind === 'spray' ? 52 : 55) + (item.color === 'none' ? 0 : 10);
  const name = item => item.kind === 'sample' ? sets.find(s => s.id === item.id).name + ' Trio' : item.kind.startsWith('case-') ? 'Luxe ' + (item.kind === 'case-spray' ? 'Fragrance' : 'Candle') + ' Case' : catalog.find(p => p.id === item.id).name + (item.kind === 'spray' ? ' Home + Body' : ' Candle');
  const image = item => item.kind === 'sample' ? 'samples-trio' : item.kind.startsWith('case-') ? `case-${item.kind.slice(5)}-${item.color}-cutout` : `${item.kind}-${item.id}`;
  const option = item => item.kind === 'sample' ? '3 mini sprays' : item.color === 'none' ? 'No case' : title(item.color) + (item.kind.startsWith('case-') ? '' : ' case');
  const key = item => `${item.kind}:${item.id}:${item.color}`;
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(bag)); } catch (_) { /* Keep working in memory. */ }
    $$('[data-bag-count]').forEach(e => e.textContent = bag.reduce((n,item) => n + item.qty,0));
    renderBag();
  }
  function add(item) {
    const existing = bag.find(x => key(x) === key(item));
    if (existing) existing.qty = Math.min(20, existing.qty + item.qty); else bag.push(item);
    save();
  }
  function renderBag() {
    const container = $('#bag-items');container.replaceChildren();
    if (!bag.length) {
      const p = document.createElement('p');p.className='bag-empty';p.textContent='Your bag is empty.';
      const link = document.createElement('a');link.className='text-link';link.href=themeRoot+'candles/';link.innerHTML='Explore candles <svg class="ui-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg>';
      container.append(p,link);$('#bag-total').textContent='';return;
    }
    bag.forEach(item => {
      const row=document.createElement('div');row.className='shop-bag-item';
      const photo=document.createElement('img');photo.src=assets+'catalog/'+image(item)+'.webp';photo.alt=name(item);
      if(item.kind.startsWith('case-')){photo.className='case-cutout';photo.dataset.casePhoto=`case-${item.kind.slice(5)}-${item.color}`;}
      const frame=document.createElement('span');frame.className='bag-photo';frame.append(photo);
      const details=document.createElement('div');
      const label=document.createElement('h3');label.textContent=name(item);
      const sub=document.createElement('p');sub.textContent=`${option(item)} · Qty ${item.qty}`;
      const cost=document.createElement('span');cost.textContent=money(price(item)*item.qty);
      const remove=document.createElement('button');remove.textContent='Remove';remove.setAttribute('aria-label',`Remove ${name(item)} ${option(item)}`);
      remove.addEventListener('click',()=>{bag=bag.filter(x=>key(x)!==key(item));save();$('#bag-dialog [data-close]').focus();$('#announcement').textContent=`${name(item)} removed.`;});
      details.append(label,sub,cost,remove);row.append(frame,details);container.append(row);
    });
    $('#bag-total').textContent='Subtotal '+money(bag.reduce((n,x)=>n+price(x)*x.qty,0));
  }
  save();
  let family='all';
  function filter() {
    const query=($('.catalog-search input')?.value||'').toLowerCase().trim();let count=0;
    $$('[data-catalog-item]').forEach(card=>{card.hidden=!(family==='all'||card.dataset.family===family)||!card.dataset.search.toLowerCase().includes(query);if(!card.hidden)count++;});
    $('#catalog-count').textContent=`${count} ${count===1?'scent':'scents'}`;$('#catalog-empty').hidden=count>0;
    $$('[data-family-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.familyFilter===family)));
  }
  $$('[data-family-filter]').forEach(b=>b.addEventListener('click',()=>{family=b.dataset.familyFilter;filter();}));
  $('.catalog-search input')?.addEventListener('input',filter);
  $('[data-reset-catalog]')?.addEventListener('click',()=>{family='all';$('.catalog-search input').value='';filter();$('.catalog-search input').focus();});
  if ($('#product-builder') || $('#case-builder')) {
    const params=new URLSearchParams(location.search), isCase=!!$('#case-builder');
    const product=catalog.find(p=>p.id===params.get('scent'))||catalog.find(p=>p.id==='bali');
    let format=params.get('type')==='spray'?'spray':'candle';
    let color=isCase?'green':'none';
    function update() {
      const asset=isCase?`case-${format}-${color}-cutout`:`${format}-${product.id}`;
      $('.product-main-image').src=assets+'catalog/'+asset+'.webp';
      if(isCase){$('.product-main-image').classList.add('case-cutout');$('.product-main-image').dataset.casePhoto=`case-${format}-${color}`;}
      $('.product-main-image').alt=isCase?`${title(color)} Luxe ${format==='spray'?'Fragrance':'Candle'} Case`:product.name+' '+(format==='spray'?'Home + Body Fragrance':'candle');
      $('#case-label').textContent=color==='none'?'No case':title(color);
      $$('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.case===color)));
      $$('[data-format], [data-case-format]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.format||b.dataset.caseFormat)===format)));
      if (!isCase) {
        $('#shop-product-title').textContent=product.name;$('#shop-product-notes').textContent=product.notes;
        $('#product-category').textContent=format==='spray'?'Home + Body Fragrance':'Destination-inspired candle';
        $('#product-breadcrumb').textContent='/ '+product.name;
        $('#product-price').textContent=money((format==='spray'?52:55)+(color==='none'?0:10));
        $('#product-scent-link').href=themeRoot+'scents/'+product.id+'/';
        $('#selected-case-photo').hidden=color==='none';
        if(color!=='none'){$('#selected-case-photo img').src=assets+`catalog/case-${format}-${color}-cutout.webp`;$('#selected-case-photo img').alt=title(color)+' selected case';$('#selected-case-photo img').dataset.casePhoto=`case-${format}-${color}`;$('#selected-case-caption').textContent=title(color)+' case · +$10';}
        document.title=product.name+' '+(format==='spray'?'Fragrance':'Candle')+' · Design preview';
        const url=new URL(location.href);url.searchParams.set('scent',product.id);url.searchParams.set('type',format);history.replaceState(null,'',url);
      }
      $('#purchase-feedback').textContent='';
    }
    $$('[data-case]').forEach(b=>b.addEventListener('click',()=>{color=b.dataset.case;update();}));
    $$('[data-format], [data-case-format]').forEach(b=>b.addEventListener('click',()=>{format=b.dataset.format||b.dataset.caseFormat;update();}));
    $('[data-add-selection]').addEventListener('click',()=>{
      const qty=$('#product-qty');if(!qty.reportValidity())return;
      const item={id:isCase?'case':product.id,kind:isCase?'case-'+format:format,color,qty:Number(qty.value)};
      add(item);$('#purchase-feedback').textContent=`Added: ${name(item)} · ${option(item)}.`;
    });
    update();
  }
  $$('[data-add-sample]').forEach(button=>button.addEventListener('click',()=>{
    const item={id:button.dataset.addSample,kind:'sample',color:'none',qty:1};add(item);
    button.parentElement.querySelector('.sample-feedback').textContent='Added to your preview bag.';
  }));
})();
