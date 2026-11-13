(() => {
  'use strict';
  const project = document.body.dataset.project;
  if (!project) return;
  const image = document.querySelector('#scope-image');
  const frame = document.querySelector('#scope-frame');
  const wrapper = document.querySelector('#scope-image-wrap');
  const overlay = document.querySelector('#scope-overlay');
  const aside = document.querySelector('#scope-aside');
  const original = document.querySelector('#scope-original');
  const toggle = document.querySelector('#scope-annotations');
  const view = document.querySelector('#scope-view');
  const device = document.querySelector('#scope-device');
  const error = document.querySelector('#scope-error');
  const salesNotes = aside.innerHTML;
  const base = '../../assets/current-sites/';
  function outline(label, x, y, w, h, review = false) {
    const mark = document.createElement('div');
    mark.className = 'scope-outline' + (review ? ' review' : '');
    Object.assign(mark.style, {left: x+'%', top:y+'%', width:w+'%', height:h+'%'});
    const text = document.createElement('span');
    text.textContent = label;
    mark.append(text);
    overlay.append(mark);
  }
  function render() {
    const renovation = view?.value === 'renovations';
    const mobile = !renovation && device?.value === 'mobile';
    if (device) { device.disabled = renovation; document.querySelector('#device-control').hidden = renovation; }
    const file = project === 'joejo' ? 'jn-home-desktop.png' : renovation ? 'ck-renovations-desktop.png' : mobile ? 'ck-sales-mobile.png' : 'ck-sales-desktop.png';
    image.width = mobile ? 390 : 1440;
    image.height = mobile ? 2928 : project === 'joejo' ? 968 : 1000;
    image.alt = project === 'joejo' ? 'Current Joejo + Nebria homepage, with its original design unchanged' : renovation ? 'Current CKlein renovation photos with the existing draggable before-and-after controls' : mobile ? 'Actual mobile Sales page with its existing single-column property cards' : 'Actual CKlein Sales page with its original logo, banner, colors and property grid';
    error.hidden = true;
    image.hidden = false;
    image.src = base + file;
    original.href = base + file;
    frame.dataset.device = mobile ? 'mobile' : 'desktop';
    wrapper.classList.toggle('desktop-image', !mobile);
    frame.scrollTop = 0;
    frame.scrollLeft = 0;
    overlay.replaceChildren();
    if (project === 'joejo') {
      outline('Current design stays', 11, 32, 79, 65, true);
    } else if (renovation) {
      outline('Review the controls · no rebuild included', 13.5, 29, 73, 36.5, true);
      aside.innerHTML = '<p class="scope-kicker review-kicker">Review only</p><h2>Assess the before &amp; after.</h2><p>Check how the current sliders work on phones and how clearly they explain each transformation.</p><ul><li><strong>Included in the $300 review</strong><span>Identify the main usability issues and recommend the changes that would help most.</span></li><li><strong>Existing page stays as it is</strong><span>Replacing the sliders or redesigning the renovation gallery would be separately quoted.</span></li></ul><div class="scope-boundary"><p>The two closing entries are the only visual site edits included in the original quote.</p></div>';
    } else {
      outline(mobile ? 'Add the two closings before this entry' : 'Add the two closings here · same card style', mobile ? 3.8 : 10.9, mobile ? 11.5 : 46.7, mobile ? 92.3 : 52.2, mobile ? 12.7 : 36.9);
      aside.innerHTML = salesNotes;
    }
    overlay.hidden = !toggle.checked;
  }
  image.addEventListener('error', () => { error.hidden = false; image.hidden = true; overlay.hidden = true; });
  toggle.addEventListener('change', () => { overlay.hidden = !toggle.checked || !error.hidden; });
  view?.addEventListener('change', render);
  device?.addEventListener('change', render);
  render();
})();
