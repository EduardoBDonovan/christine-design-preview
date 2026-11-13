(() => {
  'use strict';
  const project = document.body.dataset.project;
  if (!project) return;
  const $ = id => document.getElementById(id);
  const image = $('scope-image'), frame = $('scope-frame'), wrapper = $('scope-image-wrap');
  const overlay = $('scope-overlay'), aside = $('scope-aside'), toggle = $('scope-annotations');
  const view = $('scope-view'), device = $('scope-device'), error = $('scope-error');
  const base = '../../assets/current-sites/';
  const note = (label, text, box) => ({label, text, box});
  const shot = (file, width, height, notes) => ({file, width, height, notes});
  const pages = {
    joejo: {
      home: {name:'Homepage', title:'A clearer first impression.', keep:'Keep the dark backdrop, gold logo and existing candle photography.', url:'https://joejonebria.com/',
        desktop:shot('jn-home-desktop.jpg',1440,936,[
          note('Navigation','Give Shop and the product categories more emphasis. Group the secondary links so the header is easier to scan.',[14,11,73,7]),
          note('Opening message','Keep one short headline and put a clear Shop candles button beside it.',[11,37,25,15]),
          note('Photo arrangement','Align the three photographs more closely and shorten the paragraph beneath Bali so the opening feels like one composition.',[11,30,78,68])]),
        mobile:shot('jn-home-mobile.jpg',390,798,[
          note('Header & title','Give the opening title its own breathing room below the compact header. Check spacing in the public mobile view as well.',[2,1,96,20]),
          note('Candle photos','Use a simpler pair of images or one lead image, with consistent crops and fewer competing focal points.',[4,17,90,36]),
          note('Shop action','Replace the long opening paragraph with a short line and a visible Shop candles button beside the photos.',[6,58,88,29])])},
      candles: {name:'Candles', title:'Get to the candles sooner.', keep:'Keep the current photographs, serif headings and simple white product background.',url:'https://joejonebria.com/candles/',
        desktop:shot('jn-candles-desktop.jpg',1440,936,[
          note('Page heading','Make the decorative script quieter and tighten the space around the title and introduction.',[20,20,60,25]),
          note('Photo strip','Reduce this large carousel or fold it into the product grid. Shoppers currently meet two sets of product photos before the buying details.',[10,48,80,34]),
          note('Browse by scent','Add a compact scent-family filter above the product cards, with the name, notes and price grouped consistently.',[4,85,92,14])]),
        mobile:shot('jn-candles-mobile.jpg',390,1600,[
          note('Introduction','Shorten the intro and reduce the blank space below it so the products appear sooner.',[4,6,92,15]),
          note('Repeated photos','Skip the large introductory carousel on phones and lead with the shoppable cards.',[2,23,96,19]),
          note('Product card','Keep the candle name, scent notes, price and Choose a case action together. Use a compact filter above the cards instead of making people scroll through every scent.',[5,47,90,33])])},
      fragrances: {name:'Home + Body', title:'Make scents easier to compare.', keep:'Keep the existing bottle photography and the same visual language as the candle collection.',url:'https://joejonebria.com/home-body-fragrance-spray/',
        desktop:shot('jn-fragrances-desktop.jpg',1440,936,[
          note('Title treatment','Tighten the space around the heading and shorten the introduction. Keep Home + Body Fragrance readable at a glance.',[22,20,56,25]),
          note('Useful photo cards','Pair each bottle image with its scent name, key notes and starting price, instead of making the large image strip a separate step.',[10,48,80,34]),
          note('Collection controls','Give Candles and Home + Body the same filter and card layout, with a clear switch between the two collections.',[4,85,92,14])]),
        mobile:shot('jn-fragrances-mobile.jpg',390,1600,[
          note('Shorter opening','Use a smaller title and a short description so the first fragrance card starts higher on the page.',[4,6,92,16]),
          note('One photo per product','Remove the repeated introductory image strip on phones and use the product photo as the main browsing image.',[2,28,96,20]),
          note('Readable choices','Separate the destination name from the scent notes, with a clear price and one Choose a case button. Keep the format consistent with candles.',[5,47,90,35])])},
      product: {name:'Product & case selection', title:'Bring the choices together.',keep:'Keep the real product photos and existing color options. Bali is the example; use the same pattern for candle and fragrance products.',url:'https://joejonebria.com/product/bali-luxury-scented-candle/',
        desktop:shot('jn-product-desktop.jpg',1440,1150,[
          note('Name & price','Use Bali as the main title, with the fragrance notes in smaller text. Show the base price and the case add-on clearly in one place.',[50,9,40,17]),
          note('Product story','Turn the long scent description into a short summary, with expandable scent notes and details beneath the buying controls.',[50,28,40,43]),
          note('Case & cart','Move case selection and Add to cart up beside the main photo. Use labeled color swatches and show the selected case in the photo gallery.',[50,72,39,20])]),
        mobile:shot('jn-product-mobile.jpg',390,2150,[
          note('Title & price','Use a shorter title and smaller scent-note text. Keep the base price and case upgrade together.',[7,31,87,12]),
          note('Less scrolling','Put the description and scent profile in expandable sections after the purchase controls.',[7,44,87,34]),
          note('Choose & add','Move these controls directly below the price. Use large labeled swatches, a clear no-case option and a full-width Add to cart button.',[7,79,87,15])])},
      cases: {name:'Luxe Cases',title:'Show the cases clearly.',keep:'Keep the existing case colors and reuse photographs, with more emphasis on the product itself.',url:'https://joejonebria.com/luxe-cases/',
        desktop:shot('jn-cases-desktop.jpg',1440,936,[
          note('Clear choices','Add two simple choices near the title: Candle cases and Fragrance cases. Make the fit clear before the lifestyle story.',[30,25,40,21]),
          note('Product first','Lead with full, evenly sized case photos. Keep these reuse photographs as a supporting section below.',[11,50,77,43]),
          note('Shopping action','Add a clear Shop cases button with the introduction so visitors know where to go next.',[35,44,30,7])]),
        mobile:shot('jn-cases-mobile.jpg',390,798,[
          note('Case types','Put Candle cases and Fragrance cases below the title, with a short explanation of which product each fits.',[7,12,86,24]),
          note('Photo crop','Replace these three narrow slices with one complete case at a time, or two evenly sized cards. Keep the entire product visible.',[4,39,92,54]),
          note('Easy browsing','Use clear thumb-sized next/previous controls within the image area, plus a visible Shop cases action above the photos.',[2,57,96,15])])},
      samples: {name:'Samples',title:'Make the sample offer obvious.',keep:'Keep the current sample photography and light page background.',url:'https://joejonebria.com/fragrance-samples/',
        desktop:shot('jn-samples-desktop.jpg',1440,936,[
          note('The offer','Put what comes in the set, the price and a clear Choose samples button near the heading.',[25,24,50,25]),
          note('Lead photograph','Choose one strong set photograph and put the offer beside it. Move the other images into a smaller gallery.',[10,51,80,37]),
          note('Short description','Replace the general headline with a concise description of the sample options and what the customer receives.',[22,88,57,11])]),
        mobile:shot('jn-samples-mobile.jpg',390,1300,[
          note('Compact introduction','Reduce the large gap above Samples and keep the introduction to a short line.',[8,8,84,26]),
          note('Set details','Keep the lead photo, contents, price and Choose samples button together so the offer is understandable in one section.',[8,38,84,29]),
          note('Supporting images','Reduce the empty space and place extra photos in a compact gallery after the buying details.',[8,68,84,30])])}
    },
    cklein: {
      sales: {name:'Sales & recent closings',title:'Let the closings lead.',keep:'Keep the CKlein logo, existing colors and familiar property-card style.',url:'https://ckleinproperties.com/sales/',
        desktop:shot('ck-sales-desktop.jpg',1440,1000,[
          note('Page banner','Replace the luggage-store banner with a strong property photo, or shorten it so the closings appear sooner.',[1,9,98,21]),
          note('Recent closings','Add Arnaz and Montezuma at the top in the existing card style. This is included in the original $300 scope.',[11,47,52,36]),
          note('Card details','Use a consistent photo crop and a short line for address, closing price and date. Make Sold and Leased easy to distinguish without long clipped descriptions.',[11,68,78,16])]),
        mobile:shot('ck-sales-mobile.jpg',390,2928,[
          note('Less overhead','Shorten the banner and combine the title and sorting controls into one compact row.',[2,3,96,8.5]),
          note('Newest first','Add the two new closings before the current first listing, using the existing full-width card style.',[4,12,92,14]),
          note('Easy scanning','Keep each photo large, then show the address, Sold/Leased status and price in a simple group. Replace truncated paragraphs with a clear View property link.',[4,20,92,4.2])])},
      renovations: {name:'Renovations',title:'Make the transformation clear.',keep:'Keep the existing renovation photographs, white background and understated page styling.',url:'https://ckleinproperties.com/interior-design/',
        desktop:shot('ck-renovations-desktop.jpg',1440,1000,[
          note('Simple introduction','Use a short Before & after heading. Clear labels on the photos can replace the instructions about dragging.',[21,16,58,12]),
          note('Photo pairs','Show the full Before and After photos side by side with permanent labels. Align their height and use matching angles where the source photos allow.',[14,30,72,34]),
          note('Project groups','Group related rooms under a short project name and give each project some space, instead of presenting one continuous wall of comparisons.',[14,66,72,33])]),
        mobile:shot('ck-renovations-mobile.jpg',390,844,[
          note('Short heading','Use a compact title and remove the instruction paragraph once the photo labels explain the interaction.',[4,15,92,19]),
          note('Full photos','Show the Before and After images as a clearly labeled stacked pair, or use large Before / After tabs. Avoid hiding half of each room behind a small drag control.',[2,36,96,29]),
          note('One project at a time','Add a small project title and room label between sets. Keep the photos large and the captions short.',[2,66,96,30])])}
    }
  };
  const collection = pages[project];
  if (!collection) return;
  view.replaceChildren(...Object.entries(collection).map(([value,p]) => new Option(p.name,value)));
  const params = new URLSearchParams(location.search);
  if (collection[params.get('page')]) view.value = params.get('page');
  device.value = ['desktop','mobile'].includes(params.get('device')) ? params.get('device') : matchMedia('(max-width:760px)').matches ? 'mobile' : 'desktop';
  function render() {
    const page = collection[view.value], shot = page[device.value];
    image.width = shot.width; image.height = shot.height;
    image.alt = `${page.name}: actual ${device.value} page screenshot, November 13, 2026. Suggested changes are listed alongside it.`;
    error.hidden = true; image.hidden = false; image.src = base + shot.file;
    $('scope-original').href = base + shot.file;
    $('scope-source').href = page.url;
    frame.dataset.device = device.value;
    wrapper.classList.toggle('desktop-image',device.value === 'desktop');
    frame.scrollTop = 0; frame.scrollLeft = 0;
    overlay.replaceChildren(); aside.replaceChildren();
    const kicker = document.createElement('p'); kicker.className = 'scope-kicker'; kicker.textContent = `${device.value} suggestions`;
    const heading = document.createElement('h2'); heading.textContent = page.title;
    const keep = document.createElement('p'); keep.textContent = page.keep;
    const list = document.createElement('ul');
    aside.append(kicker,heading,keep,list);
    shot.notes.forEach((item,index) => {
      const mark = document.createElement('div'); mark.className = 'scope-outline';
      const [x,y,w,h] = item.box;
      Object.assign(mark.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});
      const label = document.createElement('span'); label.textContent = item.label; mark.append(label); overlay.append(mark);
      const li = document.createElement('li'), button = document.createElement('button'), text = document.createElement('span');
      button.type = 'button'; button.textContent = item.label; button.setAttribute('aria-label','Show '+item.label+' on screenshot');
      text.textContent = item.text; li.append(button,text); list.append(li);
      button.addEventListener('click',() => {
        toggle.checked = true; overlay.hidden = false;
        overlay.querySelectorAll('.is-selected').forEach(el=>el.classList.remove('is-selected'));
        aside.querySelectorAll('[aria-pressed]').forEach(el=>el.removeAttribute('aria-pressed'));
        mark.classList.add('is-selected'); button.setAttribute('aria-pressed','true');
        frame.scrollTop = Math.max(0, wrapper.offsetHeight*y/100-40);
        frame.scrollIntoView({block:'nearest',behavior:'auto'});
      });
    });
    overlay.hidden = !toggle.checked;
    const updated = new URL(location.href); updated.searchParams.set('page',view.value); updated.searchParams.set('device',device.value);
    history.replaceState(null,'',updated);
  }
  image.addEventListener('error',()=>{error.hidden=false; image.hidden=true; overlay.hidden=true;});
  toggle.addEventListener('change',()=>{overlay.hidden=!toggle.checked||!error.hidden;});
  view.addEventListener('change',render); device.addEventListener('change',render); render();
})();
