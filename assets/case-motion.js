(() => {
  'use strict';
  const palettes = {black:'#282b29',cream:'#d8c9ac',orange:'#bd5b2b',red:'#a0373d',pink:'#c98e9d',green:'#375647'};
  const escapeText = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const product = (format, name) => format === 'candle' ? `
    <ellipse cx="230" cy="183" rx="49" ry="12" fill="#000" opacity=".14"/>
    <path d="M178 76V174C178 193 282 193 282 174V76Z" fill="url(#amber)" stroke="#6a3d19" stroke-width="1"/>
    <ellipse cx="230" cy="76" rx="52" ry="14" fill="#6b3a15"/><ellipse cx="230" cy="77" rx="47" ry="10" fill="#f5e7c9"/>
    <path d="M230 77v-7" stroke="#493522" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M183 86v78" stroke="#fff" opacity=".25" stroke-width="3"/>
    <rect x="188" y="111" width="84" height="49" rx="1" fill="#20231e" stroke="#b99b5e" stroke-width=".8"/>
    <text x="230" y="128" text-anchor="middle" fill="#dcc28a" font-family="Georgia,serif" font-size="7">joejo + nebria</text>
    <text x="230" y="146" text-anchor="middle" fill="#dcc28a" font-family="Georgia,serif" font-size="${name.length>9?11:13}">${escapeText(name.toLowerCase())}</text>` : `
    <ellipse cx="230" cy="207" rx="32" ry="8" fill="#000" opacity=".15"/>
    <rect x="198" y="74" width="64" height="130" rx="10" fill="url(#bottle)" stroke="#262a20" stroke-width="1"/>
    <path d="M202 88v97" stroke="#fff" stroke-width="2" opacity=".18"/>
    <rect x="211" y="62" width="38" height="17" rx="4" fill="url(#gold)"/>
    <rect x="209" y="42" width="42" height="28" rx="14" fill="url(#gold)" stroke="#c3a05b" stroke-width=".6"/>
    <rect x="205" y="104" width="50" height="65" rx="1" fill="#20251e" stroke="#b99b5e" stroke-width=".8"/>
    <text x="230" y="118" text-anchor="middle" fill="#dcc28a" font-family="Georgia,serif" font-size="5.2">joejo + nebria</text>
    <text x="230" y="142" text-anchor="middle" fill="#dcc28a" font-family="Georgia,serif" font-size="${name.length>9?7:9}">${escapeText(name.toLowerCase())}</text>
    <text x="230" y="158" text-anchor="middle" fill="#c8b078" font-family="Arial,sans-serif" font-size="3.7">home + body fragrance</text>`;
  function sceneMarkup(format,name) {
    const spray=format==='spray', left=spray?172:145, width=spray?116:170, rx=width/2, top=spray?112:153, bottom=250, ry=spray?13:18;
    const body=`M${left} ${top}V${bottom-ry}C${left} ${bottom+7} ${left+width} ${bottom+7} ${left+width} ${bottom-ry}V${top}Z`;
    return `<svg class="packing-scene" viewBox="0 0 460 290" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="amber"><stop stop-color="#6e3c16"/><stop offset=".24" stop-color="#bf7e31"/><stop offset=".58" stop-color="#8e4a16"/><stop offset="1" stop-color="#492b16"/></linearGradient>
        <linearGradient id="bottle"><stop stop-color="#171d16"/><stop offset=".25" stop-color="#555139"/><stop offset=".55" stop-color="#262f21"/><stop offset="1" stop-color="#111b13"/></linearGradient>
        <linearGradient id="gold"><stop stop-color="#82622c"/><stop offset=".22" stop-color="#e5cb85"/><stop offset=".47" stop-color="#fff0b1"/><stop offset=".67" stop-color="#b58c43"/><stop offset="1" stop-color="#6c4e24"/></linearGradient>
        <linearGradient id="case-shade"><stop stop-color="#000" stop-opacity=".25"/><stop offset=".28" stop-color="#fff" stop-opacity=".15"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".30"/></linearGradient>
        <pattern id="leather-grain" width="7" height="6" patternUnits="userSpaceOnUse"><path d="M1 2l2-1m1 3 2-1M0 5l1-1" stroke="#000" stroke-opacity=".08" stroke-width=".7"/><path d="m2 5 2-1m1-2 1-1" stroke="#fff" stroke-opacity=".09" stroke-width=".6"/></pattern>
        <radialGradient id="floor"><stop stop-color="#352719" stop-opacity=".23"/><stop offset="1" stop-color="#352719" stop-opacity="0"/></radialGradient>
        <clipPath id="packing-cavity"><rect x="130" y="0" width="200" height="250"/></clipPath>
      </defs>
      <g transform="translate(230 155) scale(1.15) translate(-230 -155)">
      <ellipse class="packing-shadow" cx="230" cy="258" rx="115" ry="15" fill="url(#floor)"/>
      <g class="packing-back"><path d="${body}" fill="var(--case-tone)"/><ellipse cx="230" cy="${top}" rx="${rx}" ry="${ry}" fill="var(--case-tone)"/><ellipse cx="230" cy="${top}" rx="${rx-5}" ry="${ry-4}" fill="#20251f"/><ellipse cx="230" cy="${top+4}" rx="${rx-10}" ry="${ry-6}" fill="#393c30"/></g>
      <g clip-path="url(#packing-cavity)"><g class="packing-product">${product(format,name)}</g></g>
      <g class="packing-front"><path d="${body}" fill="var(--case-tone)"/><path d="${body}" fill="url(#case-shade)"/><path d="${body}" fill="url(#leather-grain)"/>
        <path d="M${left+3} ${top+7}Q230 ${top+ry+16} ${left+width-3} ${top+7}" fill="none" stroke="#bda166" stroke-width="3"/>
        <path d="M${left+3} ${top+7}Q230 ${top+ry+16} ${left+width-3} ${top+7}" fill="none" stroke="#ede0b0" stroke-width="1.1" stroke-dasharray="1.5 2.5"/>
        <path d="M${left+13} ${top+17}v17l6 3 5-3v-13" fill="none" stroke="url(#gold)" stroke-width="3"/>
        <text x="230" y="${spray?193:207}" fill="#dfce9e" text-anchor="middle" font-family="Georgia,serif" font-size="${spray?11:14}">joejo + nebria</text>
        <text x="230" y="${spray?206:221}" fill="#dfce9e" text-anchor="middle" font-family="Arial,sans-serif" font-size="5.5" letter-spacing="1.3">WEST HOLLYWOOD</text>
      </g>
      <g class="packing-lid"><path d="M${left} ${top-6}v12C${left} ${top+ry+18} ${left+width} ${top+ry+18} ${left+width} ${top+6}v-12Z" fill="var(--case-tone)"/><path d="M${left} ${top-6}v12C${left} ${top+ry+18} ${left+width} ${top+ry+18} ${left+width} ${top+6}v-12Z" fill="url(#case-shade)"/><ellipse cx="230" cy="${top-6}" rx="${rx}" ry="${ry}" fill="var(--case-tone)"/><ellipse cx="230" cy="${top-6}" rx="${rx-3}" ry="${ry-3}" fill="url(#case-shade)"/><ellipse cx="230" cy="${top-6}" rx="${rx-3}" ry="${ry-3}" fill="url(#leather-grain)" stroke="#fff" stroke-opacity=".12"/><path d="M${left+2} ${top+8}Q230 ${top+ry+20} ${left+width-2} ${top+8}" fill="none" stroke="url(#gold)" stroke-width="3"/><path d="M${left+2} ${top+8}Q230 ${top+ry+20} ${left+width-2} ${top+8}" fill="none" stroke="#efdfa4" stroke-width="1.1" stroke-dasharray="1.5 2.5"/></g>
      </g>
    </svg>`;
  }
  window.JNCaseMotion = host => {
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const stage=document.createElement('div');stage.className='packing-stage';stage.dataset.phase='none';
    stage.setAttribute('role','img');
    const caption=document.createElement('div');caption.className='packing-caption';
    const label=document.createElement('span');label.id='selected-case-caption';
    const replay=document.createElement('button');replay.type='button';replay.className='packing-replay';replay.setAttribute('aria-label','Replay case packing');
    replay.innerHTML='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8a8 8 0 1 1-1 7M5 3v5h5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Replay</span>';
    caption.append(label,replay);host.replaceChildren(stage,caption);host.hidden=false;host.classList.add('packing-preview');
    let selection, renderedKey='', timers=[], serial=0;
    const cancel=()=>{serial++;timers.forEach(clearTimeout);timers=[];};
    const settle=()=>{cancel();stage.dataset.instant='true';stage.dataset.phase=selection?.color==='none'?'none':'closed';};
    function play(animate) {
      cancel();const token=serial;
      const active=selection.color!=='none';
      replay.hidden=!active;
      stage.dataset.instant=String(!animate||reduced.matches);
      if (!animate||reduced.matches) {stage.dataset.phase=active?'closed':'none';return;}
      if (!active) {stage.dataset.phase='none';return;}
      stage.dataset.phase='open';
      timers.push(setTimeout(()=>{if(token===serial)stage.dataset.phase='loaded';},250));
      timers.push(setTimeout(()=>{if(token===serial)stage.dataset.phase='closed';},530));
    }
    const api={set(next,animate=false){
      const changed=!selection||selection.color!==next.color||selection.format!==next.format||selection.name!==next.name;
      selection={...next};
      const key=next.format+':'+next.name;
      if(key!==renderedKey){stage.innerHTML=sceneMarkup(next.format,next.name);stage.dataset.format=next.format;renderedKey=key;}
      stage.style.setProperty('--case-tone',palettes[next.color]||palettes.cream);
      stage.setAttribute('aria-label',next.color==='none'?`${next.name} ${next.format==='spray'?'fragrance':'candle'} without a case`:`${next.name} ${next.format==='spray'?'fragrance':'candle'} paired with a ${next.color} Luxe Case`);
      label.textContent=next.color==='none'?'Without a case':next.color[0].toUpperCase()+next.color.slice(1)+' case · +$10';
      if(changed)play(animate);
    }};
    replay.addEventListener('click',event=>play(event.detail>0));
    reduced.addEventListener('change',settle);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();});
    return api;
  };
})();
