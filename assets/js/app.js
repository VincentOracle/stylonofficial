/* STYLON OFFICIAL - Storefront SPA (hash router) */
const $ = s => document.querySelector(s);
const app = () => $('#app');

/* ---------- Product image with graceful placeholder fallback ---------- */
function imgHTML(src, name, cls=''){
  return `<img src="${src}" alt="${esc(name)}" class="${cls}" loading="lazy"
    onerror="this.onerror=null;this.src=placeholderImg('${esc(name)}','${esc(src.split('/').pop().split('_')[0])}');">`;
}
function placeholderImg(name, cat){
  const colors={Fashion:['#111111','#C6A36A'],'Perfumes':['#2b1b3d','#C6A36A'],Watches:['#0d1b2a','#C6A36A'],Jewellery:['#1b1b1b','#e8c97a'],Accessories:['#263238','#C6A36A'],Tech:['#101418','#4dd0e1'],default:['#1B1B1B','#C6A36A']};
  let k='default'; const n=(cat||'')+name;
  if(/tshirt|shirt|hoodie|dress|sneaker|sandals|cargo|top|polo/i.test(n))k='Fashion';
  else if(/perfume|mist|oud|attar/i.test(n))k='Perfumes';
  else if(/watch/i.test(n))k='Watches';
  else if(/chain|bracelet|ring|earring|anklet|jewel/i.test(n))k='Jewellery';
  else if(/wallet|belt|cap|bag|sunglass|keyholder/i.test(n))k='Accessories';
  else if(/earbud|speaker|power|cable|charger|holder|phone|smart/i.test(n))k='Tech';
  const [bg,fg]=colors[k];
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='600' height='600' fill='${bg}'/><circle cx='300' cy='250' r='70' fill='none' stroke='${fg}' stroke-width='3' opacity='.5'/><text x='300' y='262' font-family='Arial' font-size='34' font-weight='bold' fill='${fg}' text-anchor='middle'>STO</text><text x='300' y='390' font-family='Arial' font-size='22' fill='#fff' text-anchor='middle'>${name.replace(/'/g,'')}</text></svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}

/* ---------- Product Card ---------- */
function productCard(p){
  const disc = p.originalPrice>p.price ? Math.round((1-p.price/p.originalPrice)*100) : 0;
  const badge = p.isNewArrival?'<span class="badge badge-new">NEW</span>':p.isBestSeller?'<span class="badge badge-hot">BEST SELLER</span>':disc?`<span class="badge badge-sale">-${disc}%</span>`:'';
  const wished = STO_Wishlist.has(p.id);
  const out = p.stock<=0;
  return `<div class="p-card reveal" data-id="${p.id}">
    <div class="p-img">
      <a href="#/product/${p.slug}">${imgHTML(p.images[0], p.name)}</a>
      ${badge}
      <button class="p-wish ${wished?'active':''}" onclick="toggleWish(event,'${p.id}')" title="Wishlist"><i class="${wished?'fas':'far'} fa-heart"></i></button>
      <button class="p-quick" onclick="quickView('${p.id}')" title="Quick View"><i class="fas fa-eye"></i></button>
    </div>
    <div class="p-body">
      <span class="p-cat">${esc(p.subcategory)}</span>
      <a href="#/product/${p.slug}" class="p-title">${esc(p.name)}</a>
      <div class="p-rating">${stars(p.rating)} <span>(${p.reviewCount}) \u2022 <i class="far fa-eye"></i> ${p.views}</span></div>
      <div class="p-price"><b>${fmt(p.price)}</b> ${disc?`<s>${fmt(p.originalPrice)}</s>`:''}</div>
      <div class="p-actions">
        <button class="btn btn-gold btn-sm" ${out?'disabled':''} onclick="addToCartById('${p.id}')"><i class="fas fa-cart-plus"></i> ${out?'Out of Stock':'Add to Cart'}</button>
        <button class="btn btn-dark btn-sm" ${out?'disabled':''} onclick="buyNow('${p.id}')"><i class="fas fa-bolt"></i> Buy</button>
      </div>
    </div>
  </div>`;
}
function gridHTML(list){ return list.length? `<div class="p-grid">${list.map(productCard).join('')}</div>` : emptyState('No products found','Try adjusting your filters or search.'); }
function emptyState(title, text, icon='fa-box-open'){
  return `<div class="empty-state"><i class="fas ${icon}"></i><h3>${esc(title)}</h3><p>${esc(text)}</p><a href="#/shop" class="btn btn-gold">Continue Shopping</a></div>`;
}

/* ---------- Cart / Wishlist actions ---------- */
function addToCartById(id, qty=1){
  const p = STO_API.products().find(p=>p.id===id); if(!p) return;
  if(p.stock<=0){ toast('Sorry, this item is out of stock.','error'); return; }
  STO_Cart.add(p, qty); toast(p.name+' added to cart');
}
function buyNow(id){ const p=STO_API.products().find(p=>p.id===id); if(!p||p.stock<=0)return; STO_Cart.add(p,1); location.hash='#/checkout'; }
function toggleWish(e,id){
  e.preventDefault(); const added = STO_Wishlist.toggle(id);
  toast(added?'Added to wishlist':'Removed from wishlist', added?'success':'info');
  route();
}
function quickView(id){
  const p = STO_API.products().find(p=>p.id===id); if(!p) return;
  Swal.fire({title:p.name, html:`<div style="text-align:left">${imgHTML(p.images[0],p.name,'qv-img')}<p>${esc(p.description)}</p><div class="p-rating">${stars(p.rating)} (${p.reviewCount})</div><h3 style="color:#C6A36A">${fmt(p.price)}</h3></div>`, showCancelButton:true, confirmButtonText:'<i class="fas fa-cart-plus"></i> Add to Cart', cancelButtonText:'View Details', confirmButtonColor:'#C6A36A',
  preConfirm:()=>{ addToCartById(p.id); }}).then(r=>{ if(r.dismiss==='cancel') location.hash='#/product/'+p.slug; });
}

/* ---------- Age Gate ---------- */
function ageGate(){
  Swal.fire({
    title:'<div style="display:flex;align-items:center;gap:10px;justify-content:center"><span class="age-badge">18+</span><span>AGE VERIFICATION</span></div>',
    html:'<p>This section contains products intended for adults aged 18 years and above.</p><p><b>Are you 18 years or older?</b></p>',
    showDenyButton:true, showCancelButton:false, confirmButtonText:'YES, ENTER', denyButtonText:'NO, GO BACK',
    confirmButtonColor:'#198754', denyButtonColor:'#DC3545',
    allowOutsideClick:false, allowEscapeKey:false
  }).then(r=>{
    if(r.isConfirmed){ STO_Age.confirm(); location.hash='#/intimate-wellness'; }
    else location.hash='#/';
  });
}

/* ================= LAYOUT ================= */
function renderLayout(){
  const s = STO_API.settings(); const u = STO_Auth.user();
  const navCats = STO_CATEGORIES;
  const cartCount = STO_Cart.count();
  const wishCount = STO_Wishlist.items().length;
  $('#layout').innerHTML = `
  <div class="topbar">
    <div class="container topbar-in">
      <div class="topbar-left">
        <a href="tel:+254743166763"><i class="fas fa-phone"></i> +254 743166763</a>
        <a href="${waLink('Hello STYLON OFFICIAL!')}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        <a href="mailto:${s.email}"><i class="fas fa-envelope"></i> ${s.email}</a>
        <span class="d-none d-md-inline"><i class="fas fa-location-dot"></i> ${s.address}</span>
      </div>
      <div class="topbar-right">
        <a href="${s.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="${s.social.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>
        <a href="${s.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="${s.social.telegram}" target="_blank"><i class="fab fa-telegram"></i></a>
        <a href="${s.social.x}" target="_blank"><i class="fab fa-x-twitter"></i></a>
      </div>
    </div>
  </div>
  <header class="main-header" id="mainHeader">
    <div class="container header-in">
      <button class="hamburger d-lg-none" onclick="toggleMobileMenu()" aria-label="Menu"><i class="fas fa-bars"></i></button>
      <a href="#/" class="logo"><img src="assets/img/logo/stylon_logo_dark.svg" alt="STYLON OFFICIAL" onerror="this.outerHTML='<span class=logo-text><b>STYLON</b><small>OFFICIAL</small></span>'"></a>
      <div class="search-box d-none d-md-flex">
        <input id="searchInput" type="search" placeholder="Search products, brands & categories..." oninput="searchSuggest(this.value)" onkeydown="if(event.key==='Enter')doSearch(this.value)">
        <button onclick="doSearch(document.getElementById('searchInput').value)"><i class="fas fa-magnifying-glass"></i></button>
        <div id="searchSuggest" class="search-suggest"></div>
      </div>
      <div class="header-actions">
        <a href="#/${u?'account':'login'}" class="h-act" title="Account"><i class="fas fa-user"></i><span class="d-none d-lg-inline">${u?esc(u.name.split(' ')[0]):'Sign In'}</span></a>
        <a href="#/wishlist" class="h-act" title="Wishlist"><i class="fas fa-heart"></i><span class="count-badge" id="wishBadge">${wishCount}</span></a>
        <button class="h-act" onclick="toggleCartDrawer()" title="Cart"><i class="fas fa-cart-shopping"></i><span class="count-badge" id="cartBadge">${cartCount}</span></button>
      </div>
    </div>
    <nav class="main-nav d-none d-lg-block">
      <div class="container nav-in">
        <a href="#/" class="nav-link">Home</a>
        <a href="#/collection/best-sellers" class="nav-link">Best Sellers</a>
        <a href="#/collection/new-arrivals" class="nav-link">New Arrivals</a>
        <a href="#/men" class="nav-link">Men</a>
        <a href="#/women" class="nav-link">Women</a>
        ${navCats.slice(0,5).map((c,i)=>`<div class="nav-drop"><a href="#/category/${slugify(c.name)}" class="nav-link">${c.name.split(' ')[0]} <i class="fas fa-chevron-down"></i></a>
          <div class="mega-menu">${c.subcategories.map(s=>`<a href="#/category/${slugify(c.name)}?sub=${encodeURIComponent(s)}">${s}</a>`).join('')}</div></div>`).join('')}
        <a href="#/collection/deals" class="nav-link">Special Offers</a>
        <a href="#/intimate-wellness" class="nav-link nav-18"><span class="age-badge-sm">18+</span> Intimate</a>
      </div>
    </nav>
  </header>
  <div class="mobile-search d-md-none container"><input type="search" placeholder="Search products..." onkeydown="if(event.key==='Enter')doSearch(this.value)"><button onclick="doSearch(this.parentElement.querySelector('input').value)"><i class="fas fa-magnifying-glass"></i></button></div>
  <div class="mobile-menu" id="mobileMenu">
    <div class="mm-head"><span class="logo-text"><b>STYLON</b> <small>OFFICIAL</small></span><button onclick="toggleMobileMenu()"><i class="fas fa-xmark"></i></button></div>
    <div class="mm-body">
      <a href="#/" onclick="closeMM()"><i class="fas fa-house"></i> Home</a>
      <a href="#/collection/best-sellers" onclick="closeMM()">🔥 Best Sellers</a>
      <a href="#/collection/new-arrivals" onclick="closeMM()">🆕 New Arrivals</a>
      <a href="#/men" onclick="closeMM()">👨 Men</a>
      <a href="#/women" onclick="closeMM()">👩 Women</a>
      ${navCats.map(c=>`<div class="mm-cat"><button onclick="this.nextElementSibling.classList.toggle('open')"><i class="fas fa-tag"></i> ${c.name} <i class="fas fa-chevron-down"></i></button>
        <div class="mm-subs">${c.subcategories.map(s=>`<a href="#/category/${slugify(c.name)}?sub=${encodeURIComponent(s)}" onclick="closeMM()">${s}</a>`).join('')}</div></div>`).join('')}
      <a href="#/shop" onclick="closeMM()">🛍️ Shop All Products</a>
      <a href="#/collection/gift-ideas" onclick="closeMM()">🎁 Gift Ideas</a>
      <a href="#/collection/bundle-deals" onclick="closeMM()">📦 Bundle Deals</a>
      <a href="#/intimate-wellness" class="nav-18" onclick="closeMM()"><span class="age-badge-sm">18+</span> Intimate Wellness</a>
      <div class="mm-foot"><a href="tel:+254743166763"><i class="fas fa-phone"></i> +254 743166763</a><a href="mailto:${s.email}"><i class="fas fa-envelope"></i> ${s.email}</a></div>
    </div>
  </div>
  <main id="app"></main>
  ${footerHTML(s)}
  <div class="cart-drawer" id="cartDrawer"><div class="cd-head"><h4><i class="fas fa-cart-shopping"></i> Your Cart</h4><button onclick="toggleCartDrawer()"><i class="fas fa-xmark"></i></button></div><div class="cd-body" id="cdBody"></div><div class="cd-foot" id="cdFoot"></div></div>
  <div class="drawer-overlay" id="drawerOverlay" onclick="closeDrawers()"></div>
  <a class="wa-float" href="${waLink('Hello STYLON OFFICIAL! I need help with my order.')}" target="_blank" title="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>
  <nav class="bottom-nav d-lg-none">
    <a href="#/"><i class="fas fa-house"></i><span>Home</span></a>
    <a href="#/shop"><i class="fas fa-magnifying-glass"></i><span>Shop</span></a>
    <a href="#/cart"><i class="fas fa-cart-shopping"></i><span>Cart</span></a>
    <a href="#/wishlist"><i class="fas fa-heart"></i><span>Wishlist</span></a>
    <a href="#/${u?'account':'login'}"><i class="fas fa-user"></i><span>Account</span></a>
  </nav>`;
  renderCartDrawer();
}
function slugify(s){ return s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function toggleMobileMenu(){ $('#mobileMenu').classList.toggle('open'); $('#drawerOverlay').classList.toggle('show'); }
function closeMM(){ $('#mobileMenu').classList.remove('open'); $('#drawerOverlay').classList.remove('show'); }
function closeDrawers(){ closeMM(); $('#cartDrawer').classList.remove('open'); $('#drawerOverlay').classList.remove('show'); }
function footerHTML(s){
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div><img src="assets/img/logo/stylon_logo_dark.svg" alt="STYLON" class="footer-logo" onerror="this.outerHTML='<b class=logo-text>STYLON</b>'">
        <p class="tagline">${s.tagline}</p><p>Premium fashion, fragrances, watches, jewellery & tech accessories delivered across Kenya.</p>
        <p><i class="fas fa-location-dot"></i> ${s.address}</p></div>
      <div><h5>Quick Links</h5><a href="#/">Home</a><a href="#/about">About Us</a><a href="#/collection/best-sellers">Best Sellers</a><a href="#/collection/new-arrivals">New Arrivals</a><a href="#/collection/deals">Special Offers</a><a href="#/contact">Contact Us</a></div>
      <div><h5>Categories</h5>${STO_CATEGORIES.slice(0,6).map(c=>`<a href="#/category/${slugify(c.name)}">${c.name}</a>`).join('')}</div>
      <div><h5>Customer Support</h5><a href="#/contact">Contact</a><a href="#/faq">FAQs</a><a href="#/shipping">Shipping</a><a href="#/returns">Returns</a><a href="#/track-order">Order Tracking</a><a href="#/terms">Terms & Conditions</a></div>
      <div><h5>Follow Us</h5>
        <a href="${s.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i> Facebook</a>
        <a href="${s.social.tiktok}" target="_blank"><i class="fab fa-tiktok"></i> TikTok</a>
        <a href="${s.social.instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
        <a href="${s.social.telegram}" target="_blank"><i class="fab fa-telegram"></i> Telegram</a>
        <a href="${s.social.x}" target="_blank"><i class="fab fa-x-twitter"></i> X / Twitter</a>
        <form class="newsletter" onsubmit="subscribeNL(event)"><input type="email" required placeholder="Your email address"><button class="btn btn-gold btn-sm">Subscribe</button></form></div>
    </div>
    <div class="footer-bottom"><div class="container fb-in"><span>© 2026 STYLON OFFICIAL. All Rights Reserved.</span>
      <span class="pay-icons"><i class="fas fa-mobile-screen"></i> M-Pesa <i class="fab fa-cc-visa"></i> <i class="fab fa-cc-mastercard"></i></span></div></div>
  </footer>`;
}
function subscribeNL(e){ e.preventDefault(); e.target.reset(); toast('Subscribed! Welcome to the STO family.'); }
function doSearch(q){ if(q && q.trim()) location.hash='#/shop?q='+encodeURIComponent(q.trim()); }
function searchSuggest(q){
  const box = $('#searchSuggest'); if(!box) return;
  if(!q || q.length<2){ box.innerHTML=''; box.classList.remove('show'); return; }
  const hits = STO_API.products().filter(p=>(p.name+p.subcategory+p.category).toLowerCase().includes(q.toLowerCase())).slice(0,6);
  box.innerHTML = hits.map(p=>`<a href="#/product/${p.slug}" class="sg-item" onclick="document.getElementById('searchSuggest').classList.remove('show')">${imgHTML(p.images[0],p.name,'sg-img')}<span>${esc(p.name)}<small>${fmt(p.price)}</small></span></a>`).join('') || '<div class="sg-item">No matches</div>';
  box.classList.add('show');
}
document.addEventListener('click', e=>{ const sg=$('#searchSuggest'); if(sg && !e.target.closest('.search-box')) sg.classList.remove('show'); });

/* ---------- Cart Drawer ---------- */
function toggleCartDrawer(){
  renderCartDrawer();
  $('#cartDrawer').classList.toggle('open'); $('#drawerOverlay').classList.toggle('show');
}
function renderCartDrawer(){
  const body=$('#cdBody'), foot=$('#cdFoot');
  const items = STO_Cart.items();
  const prods = STO_API.products();
  if(!items.length){
    body.innerHTML = emptyState('Your cart is empty','Add some products to get started.');
    foot.innerHTML = `<a href="#/shop" class="btn btn-gold w-100" onclick="closeDrawers()">Start Shopping</a>`; return;
  }
  body.innerHTML = items.map(i=>{
    const p = prods.find(p=>p.id===i.id); if(!p) return '';
    const v = [i.variant.size,i.variant.color].filter(Boolean).join(' \u2022 ');
    return `<div class="cd-item">
      ${imgHTML(p.images[0],p.name)}
      <div class="cd-info"><a href="#/product/${p.slug}" onclick="closeDrawers()">${esc(p.name)}</a>
        ${v?`<small>${esc(v)}</small>`:''}
        <div class="cd-qty"><button onclick="drawerQty('${i.key}',-1)">−</button><span>${i.qty}</span><button onclick="drawerQty('${i.key}',1)">+</button></div></div>
      <div class="cd-right"><b>${fmt(p.price*i.qty)}</b><button class="cd-rm" onclick="STO_Cart.remove('${i.key}');refreshCartUI();renderCartDrawer()"><i class="fas fa-trash"></i></button></div>
    </div>`;
  }).join('');
  foot.innerHTML = `<div class="cd-total"><span>Subtotal</span><b>${fmt(STO_Cart.subtotal())}</b></div>
    <a href="#/checkout" class="btn btn-gold w-100" onclick="closeDrawers()"><i class="fas fa-lock"></i> Proceed to Checkout</a>
    <a href="${waLink('Hello! I would like to order: '+items.map(i=>{const p=prods.find(p=>p.id===i.id);return (p?p.name:'')+' x'+i.qty;}).join(', '))}" target="_blank" class="btn btn-wa w-100"><i class="fab fa-whatsapp"></i> Order via WhatsApp</a>`;
}
function drawerQty(key,d){ const items=STO_Cart.items(); const it=items.find(i=>i.key===key); if(it) STO_Cart.setQty(key,it.qty+d); refreshCartUI(); renderCartDrawer(); }
function refreshCartUI(){ const b=$('#cartBadge'); if(b) b.textContent=STO_Cart.count(); const w=$('#wishBadge'); if(w) w.textContent=STO_Wishlist.items().length; }
document.addEventListener('sto:cart', refreshCartUI);

/* ================= PAGES ================= */
function heroHTML(slides){
  return `<section class="hero" id="hero">
    ${slides.map((s,i)=>`<div class="hero-slide ${i===0?'active':''}" style="background-image:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.2)),url('${s.img}')">
      <div class="container hero-content">
        <span class="hero-badge">${esc(s.badge)}</span>
        <h1>${esc(s.title)}</h1>
        <p>${esc(s.text)}</p>
        <a href="#/shop" class="btn btn-gold btn-lg">${esc(s.cta||'Shop Now')} <i class="fas fa-arrow-right"></i></a>
      </div></div>`).join('')}
    <button class="hero-arrow prev" onclick="heroGo(-1)"><i class="fas fa-chevron-left"></i></button>
    <button class="hero-arrow next" onclick="heroGo(1)"><i class="fas fa-chevron-right"></i></button>
    <div class="hero-dots">${slides.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="heroTo(${i})"></span>`).join('')}</div>
  </section>`;
}
let heroIdx=0, heroTimer=null;
function heroGo(d){ const slides=$$('.hero-slide'); if(!slides.length) return; heroIdx=(heroIdx+d+slides.length)%slides.length; heroTo(heroIdx); }
function heroTo(i){ heroIdx=i; $$('.hero-slide').forEach((s,j)=>s.classList.toggle('active',j===i)); $$('.hero .dot').forEach((d,j)=>d.classList.toggle('active',j===i)); }
function heroAuto(){ clearInterval(heroTimer); heroTimer=setInterval(()=>heroGo(1),5000); }
const $$ = s => Array.from(document.querySelectorAll(s));

function catCardsHTML(){
  const icons = {'Fashion':'fa-shirt','Perfumes & Fragrance':'fa-spray-can-sparkles','Watches':'fa-clock','Jewellery':'fa-gem','Fashion Accessories':'fa-sunglasses','Phone & Tech Accessories':'fa-mobile-screen-button'};
  return `<section class="section container">
    <div class="section-head"><h2>Shop by Category</h2><a href="#/shop" class="link-gold">View All →</a></div>
    <div class="cat-scroll">${STO_CATEGORIES.map(c=>`<a href="#/category/${slugify(c.name)}" class="cat-card">
      <div class="cat-icon"><i class="fas ${icons[c.name]||'fa-tag'}"></i></div><span>${esc(c.name)}</span></a>`).join('')}
      <a href="#/intimate-wellness" class="cat-card cat-18"><div class="cat-icon"><span class="age-badge">18+</span></div><span>Intimate Wellness</span></a>
    </div></section>`;
}
function sectionHTML(title, link, list){
  if(!list.length) return '';
  return `<section class="section container"><div class="section-head"><h2>${title}</h2>${link?`<a href="${link}" class="link-gold">View All →</a>`:''}</div>${gridHTML(list)}</section>`;
}
function benefitsHTML(){
  const b=[['fa-truck-fast','Reliable Delivery','Countrywide, fast & tracked'],['fa-lock','Secure Checkout','M-Pesa, cards & COD'],['fa-star','Quality Products','Genuine & premium-grade'],['fa-headset','Customer Support','WhatsApp & phone support'],['fa-tag','Exclusive Deals','Coupons & bundle offers']];
  return `<section class="section container"><div class="benefits">${b.map(x=>`<div class="benefit reveal"><i class="fas ${x[0]}"></i><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div></section>`;
}
function testimonialsHTML(){
  return `<section class="section container"><div class="section-head"><h2>What Our Customers Say</h2></div>
    <div class="t-grid">${STO_TESTIMONIALS.map(t=>`<div class="t-card reveal"><div class="p-rating">${stars(t.rating)}</div><p>"${esc(t.text)}"</p><b>${esc(t.name)}</b><small>${esc(t.role)}</small></div>`).join('')}</div></section>`;
}

function pageHome(){
  const prods = STO_API.products().filter(p=>p.status==='active');
  const deals = prods.filter(p=>p.originalPrice>p.price).sort((a,b)=>(1-b.price/b.originalPrice)-(1-a.price/a.originalPrice)).slice(0,6);
  app().innerHTML = heroHTML(STO_API.banners()) + catCardsHTML()
    + sectionHTML("🔥 Today's Top Deals", '#/collection/deals', deals)
    + sectionHTML('🔥 Best Sellers', '#/collection/best-sellers', prods.filter(p=>p.isBestSeller).slice(0,8))
    + sectionHTML('🆕 New Arrivals', '#/collection/new-arrivals', prods.filter(p=>p.isNewArrival).slice(0,8))
    + sectionHTML('✨ Trending Now', '#/collection/trending', prods.filter(p=>(p.tags||[]).includes('Trending')).slice(0,8))
    + benefitsHTML() + testimonialsHTML()
    + (STO_Recent.items().length? sectionHTML('🕘 Recently Viewed', null, STO_Recent.items().slice(0,4)):'');
  heroAuto(); const h=$('#hero'); if(h){ h.addEventListener('mouseenter',()=>clearInterval(heroTimer)); h.addEventListener('mouseleave',heroAuto); }
  revealInit();
}

/* ---------- Shop / Catalogue ---------- */
let shopState = {cat:'all', sub:null, q:null, sort:'featured', min:null, max:null, rating:0, page:1, per:12, pre:null};
function pageShop(params){
  const sp = new URLSearchParams(params||'');
  shopState = {cat: sp.get('cat')||'all', sub: sp.get('sub')||null, q: sp.get('q')||null, sort:'featured', min:null, max:null, rating:0, page:1, per:12, pre:null};
  renderShop();
}
function filteredProducts(){
  let list = STO_API.products().filter(p=>p.status==='active');
  if(shopState.pre) list = list.filter(shopState.pre);
  if(shopState.cat!=='all') list = list.filter(p=>p.category===shopState.cat || slugify(p.category)===shopState.cat);
  if(shopState.sub) list = list.filter(p=>p.subcategory===shopState.sub);
  if(shopState.q){ const q=shopState.q.toLowerCase(); list=list.filter(p=>(p.name+' '+p.subcategory+' '+p.category+' '+(p.tags||[]).join(' ')).toLowerCase().includes(q)); }
  if(shopState.min!=null) list=list.filter(p=>p.price>=shopState.min);
  if(shopState.max!=null) list=list.filter(p=>p.price<=shopState.max);
  if(shopState.rating) list=list.filter(p=>p.rating>=shopState.rating);
  const sorts={featured:(a,b)=>(b.isFeatured-a.isFeatured)||(b.views-a.views), newest:(a,b)=>(b.isNewArrival-a.isNewArrival)||b.id.localeCompare(a.id), bestselling:(a,b)=>(b.sold||0)-(a.sold||0),
    priceAsc:(a,b)=>a.price-b.price, priceDesc:(a,b)=>b.price-a.price, rating:(a,b)=>b.rating-a.rating, views:(a,b)=>b.views-a.views};
  list.sort(sorts[shopState.sort]||sorts.featured);
  return list;
}
function renderShop(){
  const all = filteredProducts();
  const total = all.length;
  const pages = Math.max(1, Math.ceil(total/shopState.per));
  if(shopState.page>pages) shopState.page=pages;
  const list = all.slice(0, shopState.page*shopState.per);
  const chips = [];
  if(shopState.cat!=='all') chips.push(shopState.cat);
  if(shopState.sub) chips.push(shopState.sub);
  if(shopState.q) chips.push('"'+shopState.q+'"');
  if(shopState.min!=null||shopState.max!=null) chips.push(fmt(shopState.min||0)+' – '+fmt(shopState.max||999999));
  if(shopState.rating) chips.push(shopState.rating+'★ & up');
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>Shop</span></nav>
    <div class="shop-layout">
      <aside class="filters" id="filters">
        <div class="f-head"><h4>Filters</h4><button class="link-gold" onclick="clearFilters()">Clear All</button></div>
        <div class="f-group"><h5>Search</h5><input type="search" class="f-input" placeholder="Search..." value="${esc(shopState.q||'')}" onkeydown="if(event.key==='Enter'){shopState.q=this.value;shopState.page=1;renderShop()}"></div>
        <div class="f-group"><h5>Category</h5>
          <label class="f-check"><input type="radio" name="fcat" ${shopState.cat==='all'?'checked':''} onchange="shopState.cat='all';shopState.sub=null;shopState.page=1;renderShop()"> All Categories</label>
          ${STO_CATEGORIES.map(c=>`<label class="f-check"><input type="radio" name="fcat" ${shopState.cat===c.name||shopState.cat===slugify(c.name)?'checked':''} onchange="shopState.cat='${esc(c.name)}';shopState.page=1;renderShop()"> ${esc(c.name)}</label>`).join('')}</div>
        <div class="f-group"><h5>Price (KES)</h5><div class="f-price"><input type="number" class="f-input" placeholder="Min" value="${shopState.min??''}" onchange="shopState.min=this.value?+this.value:null;shopState.page=1;renderShop()"><input type="number" class="f-input" placeholder="Max" value="${shopState.max??''}" onchange="shopState.max=this.value?+this.value:null;shopState.page=1;renderShop()"></div></div>
        <div class="f-group"><h5>Rating</h5>${[4.5,4,3].map(r=>`<label class="f-check"><input type="radio" name="frate" ${shopState.rating===r?'checked':''} onchange="shopState.rating=${r};shopState.page=1;renderShop()"> ${r}★ & up</label>`).join('')}
          <label class="f-check"><input type="radio" name="frate" ${!shopState.rating?'checked':''} onchange="shopState.rating=0;shopState.page=1;renderShop()"> Any rating</label></div>
        <div class="f-group"><h5>Availability</h5>
          <label class="f-check"><input type="radio" name="favail" ${!shopState.instock?'checked':''} onchange="shopState.instock=false;shopState.page=1;renderShop()"> All</label>
          <label class="f-check"><input type="radio" name="favail" ${shopState.instock?'checked':''} onchange="shopState.instock=true;shopState.page=1;renderShop()"> In stock only</label></div>
      </aside>
      <div class="shop-main">
        <div class="shop-toolbar">
          <button class="btn btn-dark btn-sm d-lg-none" onclick="document.getElementById('filters').classList.toggle('open')"><i class="fas fa-filter"></i> Filters</button>
          <span class="res-count">${total} product${total!==1?'s':''} found</span>
          ${chips.length?`<div class="chips">${chips.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}<button class="chip chip-x" onclick="clearFilters()"><i class="fas fa-xmark"></i></button></div>`:''}
          <select class="sort-sel" onchange="shopState.sort=this.value;shopState.page=1;renderShop()">
            <option value="featured" ${shopState.sort==='featured'?'selected':''}>Sort: Featured</option>
            <option value="newest" ${shopState.sort==='newest'?'selected':''}>Newest Arrivals</option>
            <option value="bestselling" ${shopState.sort==='bestselling'?'selected':''}>Best Selling</option>
            <option value="priceAsc" ${shopState.sort==='priceAsc'?'selected':''}>Price: Low to High</option>
            <option value="priceDesc" ${shopState.sort==='priceDesc'?'selected':''}>Price: High to Low</option>
            <option value="rating" ${shopState.sort==='rating'?'selected':''}>Highest Rated</option>
            <option value="views" ${shopState.sort==='views'?'selected':''}>Most Viewed</option>
          </select>
        </div>
        ${gridHTML(list)}
        ${shopState.page<pages?`<div class="text-center mt-4"><button class="btn btn-dark" onclick="shopState.page++;renderShop()">Load More (${total-shopState.page*shopState.per} remaining)</button></div>`:''}
      </div>
    </div></div>`;
  revealInit();
}
function clearFilters(){ const s=shopState.sort; shopState={cat:'all',sub:null,q:null,sort:s,min:null,max:null,rating:0,page:1,per:12,pre:shopState.pre}; renderShop(); }

function catHeroHTML(title, desc){
  return `<div class="cat-hero"><div class="container"><h1>${title}</h1><p>${desc}</p></div></div>`;
}
function pageCategory(slug, params){
  const sp = new URLSearchParams(params||'');
  const cat = STO_CATEGORIES.find(c=>slugify(c.name)===slug);
  if(!cat){ app().innerHTML = `<div class="container page-wrap">`+emptyState('Category not found','The category you are looking for does not exist.','fa-folder-open')+`</div>`; return; }
  pageShop('cat='+encodeURIComponent(cat.name)+(sp.get('sub')?'&sub='+encodeURIComponent(sp.get('sub')):''));
  const hero = catHeroHTML(esc(cat.name), `${cat.subcategories.length} curated subcategories • Premium quality • Fast delivery across Kenya`);
  const subs = `<div class="container"><div class="cat-scroll sub-scroll">${cat.subcategories.map(s=>`<button class="cat-card sub-card ${sp.get('sub')===s?'active':''}" onclick="location.hash='#/category/${slug}?sub=${encodeURIComponent(s)}'"><span>${esc(s)}</span></button>`).join('')}</div></div>`;
  app().innerHTML = hero + subs + app().innerHTML;
}
function pageCollection(type){
  const conf={'best-sellers':['🔥 Best Sellers','Our most-loved products, verified by thousands of customers.'],
    'trending':['✨ Trending Products','What everyone is buying right now.'],
    'new-arrivals':['🆕 New Arrivals','Fresh drops across all categories.'],
    'deals':['🏷️ Discount Deals','Grab these offers before they’re gone.'],
    'gift-ideas':['🎁 Gift Ideas','Perfect presents for every occasion.'],
    'bundle-deals':['📦 Bundle Deals','Save more when you buy combos.']};
  const [title,desc]=conf[type]||['Collection',''];
  pageShop('');
  shopState.pre = {'best-sellers':p=>p.isBestSeller,'new-arrivals':p=>p.isNewArrival,'trending':p=>(p.tags||[]).includes('Trending'),
    'deals':p=>p.originalPrice>p.price,'gift-ideas':p=>['Jewellery','Watches','Perfumes & Fragrance'].includes(p.category),'bundle-deals':p=>p.price>=2000}[type];
  renderShop();
  app().innerHTML = catHeroHTML(title, desc) + app().innerHTML;
}
function pageGender(g){
  pageShop('');
  shopState.pre = g==='men' ? (p=>p.gender==='Men'||["Men's Perfumes","Men's Watches","Men's Chains"].includes(p.subcategory))
    : (p=>p.gender==='Women'||["Women's Tops","Dresses","Women's Perfumes","Handbags","Women's Watches","Women's Chains"].includes(p.subcategory));
  renderShop();
  app().innerHTML = catHeroHTML(g==='men'?'👨 Men’s Collection':'👩 Women’s Collection', `Fashion, fragrances, watches & accessories curated for ${g}.`) + app().innerHTML;
}

/* ---------- Product Detail ---------- */
function pageProduct(slug){
  const p = STO_API.products().find(p=>p.slug===slug || p.id===slug);
  if(!p){ app().innerHTML = `<div class="container page-wrap">`+emptyState('Product not found','This product may have been removed.','fa-box-open')+`</div>`; return; }
  STO_Recent.add(p.id);
  const reviews = STO_API.reviews().filter(r=>r.productId===p.id && r.status==='approved');
  const related = STO_API.products().filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  const disc = p.originalPrice>p.price? Math.round((1-p.price/p.originalPrice)*100):0;
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <a href="#/category/${slugify(p.category)}">${esc(p.category)}</a> / <span>${esc(p.name)}</span></nav>
    <div class="pd-layout">
      <div class="pd-gallery">
        <div class="pd-main" onclick="this.classList.toggle('zoomed')">${imgHTML(p.images[0],p.name)}<span class="zoom-hint"><i class="fas fa-magnifying-glass-plus"></i></span></div>
        <div class="pd-thumbs">${p.images.map((im,i)=>`<button class="pd-thumb ${i===0?'active':''}" onclick="swapImg(this,'${im}')">${imgHTML(im,p.name)}</button>`).join('')}</div>
      </div>
      <div class="pd-info">
        <span class="p-cat">${esc(p.subcategory)} • SKU: ${esc(p.sku)}</span>
        <h1>${esc(p.name)}</h1>
        <div class="p-rating">${stars(p.rating)} <span>${p.rating} (${p.reviewCount} reviews) • <i class="far fa-eye"></i> ${p.views} views • <i class="far fa-heart"></i> ${p.likes} likes</span></div>
        <div class="pd-price"><b>${fmt(p.price)}</b> ${disc?`<s>${fmt(p.originalPrice)}</s><span class="badge badge-sale">SAVE ${disc}%</span>`:''}</div>
        <p class="pd-desc">${esc(p.description)}</p>
        ${p.stock>0?`<p class="in-stock"><i class="fas fa-circle-check"></i> In Stock (${p.stock} available)</p>`:`<p class="out-stock"><i class="fas fa-circle-xmark"></i> Out of Stock</p>`}
        <div class="pd-variants" id="pdVariants">
          ${p.variants&&p.variants.sizes?`<div class="v-group"><label>Size:</label><div class="v-opts">${p.variants.sizes.map((s,i)=>`<button class="v-opt ${i===0?'sel':''}" onclick="selVariant(this,'size')">${s}</button>`).join('')}</div></div>`:''}
          ${p.variants&&p.variants.colors?`<div class="v-group"><label>Color:</label><div class="v-opts">${p.variants.colors.map((c,i)=>`<button class="v-opt ${i===0?'sel':''}" onclick="selVariant(this,'color')">${c}</button>`).join('')}</div></div>`:''}
        </div>
        <div class="pd-buy">
          <div class="qty-sel"><button onclick="pdQty(-1)">−</button><input id="pdQty" value="1" readonly><button onclick="pdQty(1)">+</button></div>
          <button class="btn btn-gold btn-lg" ${p.stock<=0?'disabled':''} onclick="pdAdd('${p.id}',false)"><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <button class="btn btn-dark btn-lg" ${p.stock<=0?'disabled':''} onclick="pdAdd('${p.id}',true)"><i class="fas fa-bolt"></i> Buy Now</button>
          <button class="btn btn-outline ${STO_Wishlist.has(p.id)?'wished':''}" onclick="toggleWish(event,'${p.id}')"><i class="${STO_Wishlist.has(p.id)?'fas':'far'} fa-heart"></i></button>
        </div>
        <div class="pd-actions2">
          <a class="btn btn-wa btn-sm" target="_blank" href="${waLink('Hello STYLON! I’m interested in: '+p.name+' ('+fmt(p.price)+')')}"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
          <button class="btn btn-outline btn-sm" onclick="shareProduct('${esc(p.name)}')"><i class="fas fa-share-nodes"></i> Share</button>
        </div>
        <div class="pd-meta">
          <div><i class="fas fa-truck-fast"></i> <div><b>Reliable Delivery</b><small>Nairobi same/next day, countrywide 2-4 days</small></div></div>
          <div><i class="fas fa-rotate-left"></i> <div><b>7-Day Returns</b><small>Easy returns on unused items</small></div></div>
          <div><i class="fas fa-shield-halved"></i> <div><b>Secure Payment</b><small>M-Pesa, cards & cash on delivery</small></div></div>
        </div>
      </div>
    </div>
    <div class="pd-tabs">
      <div class="tab-btns">
        <button class="tab-btn active" onclick="pdTab(this,'tab-desc')">Description</button>
        <button class="tab-btn" onclick="pdTab(this,'tab-rev')">Reviews (${reviews.length})</button>
        <button class="tab-btn" onclick="pdTab(this,'tab-ship')">Shipping & Returns</button>
      </div>
      <div id="tab-desc" class="tab-pane active">
        <p>${esc(p.description)}</p>
        <table class="spec-table">
          <tr><th>SKU</th><td>${esc(p.sku)}</td></tr><tr><th>Category</th><td>${esc(p.category)}</td></tr>
          <tr><th>Subcategory</th><td>${esc(p.subcategory)}</td></tr>
          ${p.variants&&p.variants.sizes?`<tr><th>Sizes</th><td>${p.variants.sizes.join(', ')}</td></tr>`:''}
          ${p.variants&&p.variants.colors?`<tr><th>Colours</th><td>${p.variants.colors.join(', ')}</td></tr>`:''}
          <tr><th>Stock</th><td>${p.stock} units</td></tr>
        </table>
      </div>
      <div id="tab-rev" class="tab-pane">
        ${reviews.length? reviews.map(r=>`<div class="rev"><b>${esc(r.name)}</b> <span class="p-rating">${stars(r.rating)}</span><small>${esc(r.date)}</small><p>${esc(r.text)}</p></div>`).join('') : '<p>No approved reviews yet. Be the first to review!</p>'}
        <form class="rev-form" onsubmit="submitReview(event,'${p.id}')">
          <h4>Write a Review</h4>
          <div class="rev-row"><input required placeholder="Your name" id="revName"><select id="revRating"><option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option></select></div>
          <textarea required placeholder="Share your experience..." id="revText"></textarea>
          <button class="btn btn-gold">Submit Review</button>
          <small class="d-block mt-2 text-muted">Reviews are moderated and appear after admin approval (demo).</small>
        </form>
      </div>
      <div id="tab-ship" class="tab-pane">
        <h4>Shipping Information</h4><p>We deliver countrywide via trusted courier partners. Nairobi orders are delivered same/next day; upcountry within 2-4 business days. Shipping is KSh 150 and FREE for orders above KSh 5,000.</p>
        <h4>Return Policy</h4><p>Return unused items in original packaging within 7 days of delivery for a refund or exchange. Refunds are processed within 3-5 business days.</p>
      </div>
    </div>
    ${related.length?`<div class="section"><div class="section-head"><h2>Related Products</h2></div>${gridHTML(related)}</div>`:''}
  </div>`;
  revealInit();
}
function swapImg(btn,src){ btn.parentElement.querySelectorAll('.pd-thumb').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const m=btn.closest('.pd-gallery').querySelector('.pd-main img'); m.src=src; m.onerror=function(){this.onerror=null;this.src=placeholderImg(this.alt,'');}; }
function selVariant(btn,type){ btn.parentElement.querySelectorAll('.v-opt').forEach(b=>b.classList.remove('sel')); btn.classList.add('sel'); }
function pdQty(d){ const q=$('#pdQty'); q.value=Math.max(1,+q.value+d); }
function pdAdd(id, buy){
  const p=STO_API.products().find(p=>p.id===id); const q=+($('#pdQty')?.value||1);
  const v={}; document.querySelectorAll('#pdVariants .v-group').forEach(g=>{ const l=g.querySelector('label').textContent.replace(':','').trim().toLowerCase(); const s=g.querySelector('.v-opt.sel'); if(s) v[l]=s.textContent; });
  STO_Cart.add(p,q,v); toast(q+' × '+p.name+' added to cart');
  if(buy) location.hash='#/checkout';
}
function shareProduct(name){ const url=location.href; if(navigator.share) navigator.share({title:name,url}).catch(()=>{}); else { navigator.clipboard&&navigator.clipboard.writeText(url); toast('Product link copied to clipboard'); } }
function pdTab(btn,id){ btn.parentElement.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); btn.closest('.pd-tabs').querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function submitReview(e,pid){ e.preventDefault(); const r=STO_API.reviews(); r.unshift({id:'REV-'+Date.now(), productId:pid, name:$('#revName').value, rating:+$('#revRating').value, text:$('#revText').value, date:new Date().toISOString().slice(0,10), status:'pending'}); STO_API.saveReviews(r); e.target.reset(); toast('Review submitted! It will appear after moderation.','info'); }

/* ---------- Wishlist ---------- */
function pageWishlist(){
  const prods = STO_API.products();
  const list = STO_Wishlist.items().map(id=>prods.find(p=>p.id===id)).filter(Boolean);
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>Wishlist</span></nav>
    <div class="section-head"><h2><i class="fas fa-heart"></i> My Wishlist (${list.length})</h2></div>
    ${list.length? gridHTML(list) : emptyState('Your wishlist is empty','Tap the heart on any product to save it here.','fa-heart-crack')}
  </div>`;
  revealInit();
}

/* ---------- Cart Page ---------- */
function pageCart(){
  const items = STO_Cart.items(); const prods = STO_API.products();
  if(!items.length){
    const rec = prods.filter(p=>p.isBestSeller).slice(0,4);
    app().innerHTML = `<div class="container page-wrap">${emptyState('Your shopping cart is empty','Looks like you haven\u2019t added anything yet.','fa-cart-shopping')}
      <div class="section"><div class="section-head"><h2>Recommended for You</h2></div>${gridHTML(rec)}</div></div>`;
    revealInit(); return;
  }
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>Shopping Cart</span></nav>
    <div class="section-head"><h2><i class="fas fa-cart-shopping"></i> Your Shopping Cart (${STO_Cart.count()} items)</h2><a href="#/shop" class="link-gold">Continue Shopping →</a></div>
    <div class="cart-layout">
      <div class="cart-items">
        ${items.map(i=>{
          const p=prods.find(p=>p.id===i.id); if(!p) return '';
          const v=[i.variant.size,i.variant.color].filter(Boolean).join(' • ');
          return `<div class="cart-row">
            <a href="#/product/${p.slug}">${imgHTML(p.images[0],p.name)}</a>
            <div class="ci-info"><a href="#/product/${p.slug}" class="p-title">${esc(p.name)}</a>
              ${v?`<small class="d-block">${esc(v)}</small>`:''}
              <small class="text-muted">${fmt(p.price)} each</small></div>
            <div class="qty-sel"><button onclick="cartQty('${i.key}',-1)">−</button><input value="${i.qty}" readonly><button onclick="cartQty('${i.key}',1)">+</button></div>
            <b class="ci-sub">${fmt(p.price*i.qty)}</b>
            <div class="ci-acts">
              <button class="btn btn-outline btn-sm" onclick="STO_Wishlist.toggle('${p.id}');STO_Cart.remove('${i.key}');toast('Saved for later');pageCart();refreshCartUI()" title="Save for later"><i class="fas fa-heart"></i></button>
              <button class="btn btn-outline btn-sm" onclick="STO_Cart.remove('${i.key}');pageCart();refreshCartUI()" title="Remove"><i class="fas fa-trash"></i></button>
            </div>
          </div>`;
        }).join('')}
        <button class="btn btn-outline btn-sm mt-3" onclick="Swal.fire({title:'Clear cart?',showCancelButton:true,confirmButtonText:'Yes, clear'}).then(r=>{if(r.isConfirmed){STO_Cart.clear();STO_Cart.removeCoupon();pageCart();refreshCartUI();}})"><i class="fas fa-trash"></i> Clear Cart</button>
      </div>
      <aside class="cart-summary">
        <h4>Order Summary</h4>
        <div class="coupon-box">
          <input id="couponInput" placeholder="Coupon code (try STYLON10)" value="${STO_Cart.coupon()||''}">
          <button class="btn btn-dark btn-sm" onclick="applyCouponUI()">Apply</button>
        </div>
        ${STO_Cart.coupon()?`<div class="cs-row ok"><span>Coupon ${STO_Cart.coupon()} <a href="#" onclick="STO_Cart.removeCoupon();pageCart();return false" class="link-gold">(remove)</a></span><span>−${fmt(STO_Cart.discount())}</span></div>`:''}
        <div class="cs-row"><span>Subtotal</span><span>${fmt(STO_Cart.subtotal())}</span></div>
        <div class="cs-row"><span>Discount</span><span>−${fmt(STO_Cart.discount())}</span></div>
        <div class="cs-row"><span>Shipping</span><span>${STO_Cart.shipping()===0?'<b class="free-ship">FREE</b>':fmt(STO_Cart.shipping())}</span></div>
        ${STO_Cart.shipping()>0?`<small class="d-block mb-2 text-muted">Free shipping on orders over ${fmt(STO_API.settings().freeShippingThreshold)}</small>`:''}
        <div class="cs-row total"><span>Total</span><b>${fmt(STO_Cart.total())}</b></div>
        <a href="#/checkout" class="btn btn-gold w-100"><i class="fas fa-lock"></i> Proceed to Checkout</a>
        <a href="${waLink('Hello STYLON! I would like to order: '+items.map(i=>{const p=prods.find(p=>p.id===i.id);return (p?p.name:'')+' x'+i.qty;}).join(', ')+' — Total: '+fmt(STO_Cart.total()))}" target="_blank" class="btn btn-wa w-100"><i class="fab fa-whatsapp"></i> Order via WhatsApp</a>
        <small class="text-muted d-block text-center mt-2"><i class="fas fa-shield-halved"></i> Secure Checkout</small>
      </aside>
    </div></div>`;
}
function cartQty(key,d){ const it=STO_Cart.items().find(i=>i.key===key); if(it) STO_Cart.setQty(key,it.qty+d); pageCart(); refreshCartUI(); }
function applyCouponUI(){
  const code = $('#couponInput').value.trim(); if(!code) return;
  const r = STO_Cart.applyCoupon(code);
  toast(r.msg, r.ok?'success':'error'); pageCart();
}

/* ---------- Checkout ---------- */
const COUNTIES = ['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Machakos','Kakamega','Kitale','Garissa','Nyeri','Meru','Kericho','Bungoma','Kisii','Malindi','Kitui','Embu','Kilifi','Narok','Machakos','Murang\u2019a','Nyandarua','Laikipia','Baringo','Bomet','Busia','Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga','Kisii','Kitui','Kwale','Makueni','Mandera','Marsabit','Migori','Mombasa','Nairobi','Nakuru','Nandi','Nyamira','Samburu','Siaya','Taita Taveta','Tana River','Trans Nzoia','Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot'];
let checkoutState = {step:1, data:{}};
function pageCheckout(){
  if(!STO_Cart.items().length){ app().innerHTML = `<div class="container page-wrap">${emptyState('Your cart is empty','Add products before checking out.','fa-cart-shopping')}</div>`; return; }
  checkoutState = {step:1, data: checkoutState.data||{}};
  renderCheckout();
}
function renderCheckout(){
  const d = checkoutState.data; const s = checkoutState.step;
  const steps = ['Details','Shipping','Payment','Review'];
  app().innerHTML = `<div class="container page-wrap checkout-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <a href="#/cart">Cart</a> / <span>Checkout</span></nav>
    <div class="section-head"><h2><i class="fas fa-lock"></i> Secure Checkout</h2></div>
    <div class="steps-bar">${steps.map((t,i)=>`<div class="step ${i+1<s?'done':i+1===s?'active':''}"><span>${i+1<s?'<i class=\'fas fa-check\'></i>':i+1}</span>${t}</div>`).join('')}</div>
    <div class="checkout-grid">
      <div class="co-main" id="coMain">${checkoutStepHTML()}</div>
      <aside class="cart-summary co-summary">
        <h4>Order Summary</h4>
        ${STO_Cart.items().map(i=>{const p=STO_API.products().find(p=>p.id===i.id); return p?`<div class="co-item">${imgHTML(p.images[0],p.name)}<div><small>${esc(p.name)} × ${i.qty}</small></div><b>${fmt(p.price*i.qty)}</b></div>`:'';}).join('')}
        <div class="cs-row"><span>Subtotal</span><span>${fmt(STO_Cart.subtotal())}</span></div>
        <div class="cs-row"><span>Discount ${STO_Cart.coupon()?'('+STO_Cart.coupon()+')':''}</span><span>−${fmt(STO_Cart.discount())}</span></div>
        <div class="cs-row"><span>Shipping</span><span>${STO_Cart.shipping()===0?'FREE':fmt(STO_Cart.shipping())}</span></div>
        <div class="cs-row total"><span>Total</span><b>${fmt(STO_Cart.total())}</b></div>
        <small class="text-muted d-block mt-2"><i class="fas fa-circle-info"></i> Demo checkout — no real payment is processed.</small>
      </aside>
    </div></div>`;
}
function checkoutStepHTML(){
  const d = checkoutState.data;
  if(checkoutState.step===1) return `<h4>Customer Details</h4>
    <form class="form-grid" onsubmit="return coNext(1,event)">
      <label>Full Name *<input required name="name" value="${esc(d.name||'')}" placeholder="e.g. Vincent Were"></label>
      <label>Email *<input required type="email" name="email" value="${esc(d.email||'')}" placeholder="you@email.com"></label>
      <label>Phone Number *<input required name="phone" value="${esc(d.phone||'')}" placeholder="07XX XXX XXX"></label>
      <label>WhatsApp Number<input name="whatsapp" value="${esc(d.whatsapp||'')}" placeholder="07XX XXX XXX"></label>
      <label class="fg-check"><input type="checkbox" name="createAcct" ${d.createAcct?'checked':''}> Create an account with these details</label>
      <div class="co-nav"><a href="#/cart" class="btn btn-outline">← Back to Cart</a><button class="btn btn-gold">Continue to Shipping →</button></div>
    </form>`;
  if(checkoutState.step===2) return `<h4>Delivery Information</h4>
    <form class="form-grid" onsubmit="return coNext(2,event)">
      <label>County *<select required name="county"><option value="">Select county...</option>${[...new Set(COUNTIES)].map(c=>`<option ${d.county===c?'selected':''}>${c}</option>`).join('')}</select></label>
      <label>Town / City *<input required name="town" value="${esc(d.town||'')}" placeholder="e.g. Nairobi CBD"></label>
      <label>Estate / Area *<input required name="estate" value="${esc(d.estate||'')}" placeholder="e.g. Moi Avenue, 3rd Floor"></label>
      <label>Building / Street<input name="street" value="${esc(d.street||'')}" placeholder="Optional"></label>
      <label>Delivery Method *<select required name="delivery"><option value="door" ${d.delivery==='door'?'selected':''}>Door Delivery (${fmt(STO_Cart.shipping())})</option><option value="pickup" ${d.delivery==='pickup'?'selected':''}>Store Pickup (Moi Avenue — FREE)</option></select></label>
      <label>Delivery Instructions<textarea name="instructions" placeholder="e.g. Call on arrival">${esc(d.instructions||'')}</textarea></label>
      <div class="co-nav"><button type="button" class="btn btn-outline" onclick="checkoutState.step=1;renderCheckout()">← Back</button><button class="btn btn-gold">Continue to Payment →</button></div>
    </form>`;
  if(checkoutState.step===3) return `<h4>Payment Method</h4>
    <div class="pay-methods">
      ${[['mpesa','fa-mobile-screen','M-Pesa','Pay instantly via M-Pesa STK push (simulated)'],['card','fa-credit-card','Credit / Debit Card','Visa, Mastercard (simulated)'],['cod','fa-money-bill-wave','Cash on Delivery','Pay when your order arrives'],['bank','fa-building-columns','Bank Transfer','Pay via bank / SACCO transfer']].map(m=>`
      <label class="pay-card ${d.payment===m[0]?'sel':''}"><input type="radio" name="payment" value="${m[0]}" ${d.payment===m[0]?'checked':''} onchange="pickPay('${m[0]}')"><i class="fas ${m[1]}"></i><div><b>${m[2]}</b><small>${m[3]}</small></div></label>`).join('')}
    </div>
    <div id="payDetail" class="pay-detail">${payDetailHTML(d.payment)}</div>
    <div class="co-nav mt-3"><button class="btn btn-outline" onclick="checkoutState.step=2;renderCheckout()">← Back</button><button class="btn btn-gold" id="payNext" onclick="payContinue()">Continue to Review →</button></div>`;
  return `<h4>Review Your Order</h4>
    <div class="review-box">
      <div class="rv-col"><h5><i class="fas fa-user"></i> Customer</h5><p>${esc(d.name)}<br>${esc(d.email)}<br>${esc(d.phone)}</p></div>
      <div class="rv-col"><h5><i class="fas fa-location-dot"></i> Delivery</h5><p>${esc(d.estate)}, ${esc(d.town)}<br>${esc(d.county)}<br>${d.delivery==='pickup'?'Store Pickup':'Door Delivery'} ${esc(d.instructions?'• '+d.instructions:'')}</p></div>
      <div class="rv-col"><h5><i class="fas fa-wallet"></i> Payment</h5><p>${{mpesa:'M-Pesa',card:'Card',cod:'Cash on Delivery',bank:'Bank Transfer'}[d.payment]}<br><small class="text-muted">${d.payment==='mpesa'?'STK push to '+esc(d.mpesaPhone||d.phone)+' (simulated)':d.payment==='card'?'Card ending '+esc((d.cardNum||'').slice(-4)||'••••'):''}</small></p></div>
    </div>
    <div class="co-nav mt-3"><button class="btn btn-outline" onclick="checkoutState.step=3;renderCheckout()">← Back</button><button class="btn btn-gold btn-lg" onclick="placeOrder()"><i class="fas fa-bag-shopping"></i> Place Order — ${fmt(STO_Cart.total())}</button></div>`;
}
function pickPay(v){ checkoutState.data.payment=v; renderCheckout(); }
function payDetailHTML(v){
  const d = checkoutState.data;
  if(v==='mpesa') return `<div class="mpesa-box">
    <div class="mpesa-head"><b>M-PESA</b> <span>Lipa na M-Pesa — SIMULATED</span></div>
    <label>M-Pesa Phone Number *<input id="mpesaPhone" placeholder="2547XX XXX XXX" value="${esc(d.mpesaPhone||d.phone||'')}"></label>
    <div class="mpesa-amt">Amount: <b>${fmt(STO_Cart.total())}</b></div>
    <small class="text-muted">A simulated STK push will be sent. No real payment occurs.</small></div>`;
  if(v==='card') return `<div class="mpesa-box"><label>Card Number *<input id="cardNum" placeholder="4242 4242 4242 4242" value="${esc(d.cardNum||'')}"></label>
    <div class="f-price"><label>Expiry *<input id="cardExp" placeholder="MM/YY"></label><label>CVV *<input id="cardCvv" placeholder="123" type="password"></label></div>
    <small class="text-muted">Card processing is simulated for this demo.</small></div>`;
  if(v==='bank') return `<div class="mpesa-box"><small>Pay to: <b>STYLON OFFICIAL Ltd</b> • KCB Bank • A/C 1234567890<br>Use your phone number as the reference. Simulated for demo.</small></div>`;
  return `<div class="mpesa-box"><small>Pay in cash when your order is delivered. Please have the exact amount ready.</small></div>`;
}
function coNext(step, e){
  e.preventDefault();
  const fd = new FormData(e.target);
  Object.assign(checkoutState.data, Object.fromEntries(fd.entries()));
  if(step===2 && checkoutState.data.delivery==='pickup'){ /* pickup = free shipping override handled at order time */ }
  if(step===3){}
  checkoutState.step = step+1; renderCheckout(); return false;
}
function payContinue(){
  const d = checkoutState.data;
  if(!d.payment){ toast('Please select a payment method','error'); return; }
  if(d.payment==='mpesa'){ const ph=$('#mpesaPhone').value.trim(); if(!/^(?:254|0)7\d{8}$/.test(ph.replace(/\s/g,''))){ toast('Enter a valid Safaricom number (e.g. 2547XXXXXXXX)','error'); return; } d.mpesaPhone=ph; simulateMpesa(ph); return; }
  if(d.payment==='card'){ const n=$('#cardNum').value.replace(/\s/g,''); if(n.length<12){ toast('Enter a valid card number','error'); return; } d.cardNum=n; }
  checkoutState.step=4; renderCheckout();
}
function simulateMpesa(phone){
  const d = checkoutState.data;
  Swal.fire({title:'M-Pesa STK Push Sent', html:`<p>Check your phone <b>${esc(phone)}</b> and enter your M-Pesa PIN.</p><p class="text-muted">Simulated — no real charge occurs.</p><div class="stk-wait"><i class="fas fa-circle-notch fa-spin"></i> Waiting for confirmation...</div>`, showConfirmButton:false, allowOutsideClick:false, timer:3000, timerProgressBar:true})
  .then(()=>Swal.fire({icon:'success', title:'Payment Confirmed (Simulated)', text:fmt(STO_Cart.total())+' received via M-Pesa.', confirmButtonColor:'#198754', confirmButtonText:'Continue'}))
  .then(()=>{ checkoutState.step=4; checkoutState.data.mpesaPaid=true; renderCheckout(); });
}
function placeOrder(){
  const d = checkoutState.data;
  if(d.createAcct && d.email && !STO_Auth.users().some(u=>u.email===d.email)){ const users=STO_Auth.users(); users.push({name:d.name,email:d.email,pass:'stylon123',role:'Customer'}); STO_Auth.saveUsers(users); }
  const items = STO_Cart.items().map(i=>{ const p=STO_API.products().find(p=>p.id===i.id); return {id:i.id, name:p?p.name:i.id, qty:i.qty, price:p?p.price:0, variant:i.variant}; });
  const ship = d.delivery==='pickup' ? 0 : STO_Cart.shipping();
  const total = Math.max(0, STO_Cart.subtotal()-STO_Cart.discount()+ship);
  const order = STO_Orders.create({customer:d.name, email:d.email, phone:d.phone, address:`${d.estate}, ${d.town}, ${d.county}`, delivery:d.delivery==='pickup'?'Store Pickup':'Door Delivery', payment:d.payment==='mpesa'?'M-Pesa':d.payment==='card'?'Card':d.payment==='bank'?'Bank Transfer':'Cash on Delivery', items, subtotal:STO_Cart.subtotal(), discount:STO_Cart.discount(), shipping:ship, total, coupon:STO_Cart.coupon(), status:'Pending'});
  STO_Cart.clear(); STO_Cart.removeCoupon(); refreshCartUI();
  location.hash = '#/order-success/'+order.number;
}

/* ---------- Order Success ---------- */
function pageOrderSuccess(num){
  const o = STO_Orders.all().find(o=>o.number===num);
  if(!o){ app().innerHTML = `<div class="container page-wrap">${emptyState('Order not found','We could not find this order reference.','fa-receipt')}</div>`; return; }
  app().innerHTML = `<div class="container page-wrap">
    <div class="success-box">
      <div class="success-icon"><i class="fas fa-circle-check"></i></div>
      <h1>Thank You, ${esc(o.customer.split(' ')[0])}!</h1>
      <p>Your order has been placed successfully.</p>
      <div class="order-ref">Order Reference: <b>${esc(o.number)}</b></div>
      <div class="success-grid">
        <div><h5>Amount ${o.payment==='Cash on Delivery'?'Payable':'Paid'}</h5><b class="text-gold">${fmt(o.total)}</b></div>
        <div><h5>Payment Method</h5><p>${esc(o.payment)}</p></div>
        <div><h5>Delivery</h5><p>${esc(o.delivery)}<br><small>${esc(o.address)}</small></p></div>
        <div><h5>Estimated Delivery</h5><p>${o.delivery==='Store Pickup'?'Ready in 1-2 hours (Moi Avenue)':(o.address.includes('Nairobi')?'Same / Next day':'2-4 business days')}</p></div>
      </div>
      <h5 class="mt-4">Items Ordered</h5>
      <table class="spec-table"><tr><th>Item</th><th>Qty</th><th>Price</th></tr>${o.items.map(i=>`<tr><td>${esc(i.name)}</td><td>${i.qty}</td><td>${fmt(i.price*i.qty)}</td></tr>`).join('')}<tr><th colspan="2">Total</th><th>${fmt(o.total)}</th></tr></table>
      <div class="success-actions">
        <a href="#/track-order?n=${o.number}" class="btn btn-dark"><i class="fas fa-location-crosshairs"></i> Track Order</a>
        <button class="btn btn-outline" onclick="window.print()"><i class="fas fa-print"></i> Print Receipt</button>
        <a href="#/shop" class="btn btn-gold"><i class="fas fa-bag-shopping"></i> Continue Shopping</a>
      </div>
    </div></div>`;
}

/* ---------- Track Order ---------- */
function pageTrackOrder(params){
  const sp = new URLSearchParams(params||'');
  const n = sp.get('n')||''; const o = n? STO_Orders.all().find(o=>o.number.toUpperCase()===n.toUpperCase()) : null;
  const steps = ['Order Placed','Payment Confirmed','Processing','Dispatched','Out for Delivery','Delivered'];
  const statusIdx = o? Math.max(0, ['Pending','Confirmed','Processing','Dispatched','Out for Delivery','Delivered'].indexOf(o.status)) : -1;
  app().innerHTML = `<div class="container page-wrap narrow">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>Track Order</span></nav>
    <div class="section-head"><h2><i class="fas fa-location-crosshairs"></i> Track Your Order</h2></div>
    <form class="track-form" onsubmit="trackOrder(event)"><input id="trackInput" placeholder="Enter order number (e.g. STO-XXXXXX)" value="${esc(n)}"><button class="btn btn-gold"><i class="fas fa-magnifying-glass"></i> Track</button></form>
    ${n && !o ? `<p class="text-danger mt-3"><i class="fas fa-circle-exclamation"></i> No order found with reference "${esc(n)}". Try placing a demo order first.</p>`:''}
    ${o? `<div class="track-result">
      <div class="track-head"><div><b>${esc(o.number)}</b> • ${esc(o.date)}</div><span class="status-pill st-${o.status.toLowerCase().replace(/\s/g,'-')}">${esc(o.status)}</span></div>
      <div class="timeline">${steps.map((s,i)=>`<div class="tl-step ${i<=statusIdx?'done':''}"><div class="tl-dot">${i<=statusIdx?'<i class="fas fa-check"></i>':i+1}</div><span>${s}</span></div>`).join('')}</div>
      <div class="track-items">${o.items.map(i=>`<div class="co-item"><div><small>${esc(i.name)} × ${i.qty}</small></div><b>${fmt(i.price*i.qty)}</b></div>`).join('')}
        <div class="cs-row total"><span>Total (${esc(o.payment)})</span><b>${fmt(o.total)}</b></div></div>
    </div>`:''}
  </div>`;
}
function trackOrder(e){ e.preventDefault(); const v=$('#trackInput').value.trim(); if(v) location.hash='#/track-order?n='+encodeURIComponent(v); }

/* ---------- Auth & Account ---------- */
function pageLogin(){
  app().innerHTML = `<div class="auth-wrap">
    <div class="auth-card">
      <span class="logo-text big"><b>STYLON</b> <small>OFFICIAL</small></span>
      <h3>Sign In</h3>
      <form onsubmit="doLogin(event)">
        <label>Email<input required type="email" id="liEmail" placeholder="you@email.com"></label>
        <label>Password<input required type="password" id="liPass" placeholder="••••••••"></label>
        <button class="btn btn-gold w-100">Sign In</button>
      </form>
      <div class="auth-links"><a href="#/forgot-password">Forgot password?</a> • <a href="#/register">Create account</a></div>
      <small class="text-muted d-block text-center">Demo: register any account, or use admin@stylon.co.ke / admin123</small>
      <small class="text-muted d-block text-center mt-1"><i class="fas fa-circle-info"></i> Frontend demo authentication — connect a secure backend before production.</small>
    </div></div>`;
}
function doLogin(e){ e.preventDefault(); const r=STO_Auth.login($('#liEmail').value.trim(), $('#liPass').value); if(r.ok){ toast('Welcome back, '+r.user.name.split(' ')[0]+'!'); renderLayout(); location.hash='#/account'; } else toast(r.msg,'error'); }
function pageRegister(){
  app().innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <span class="logo-text big"><b>STYLON</b> <small>OFFICIAL</small></span>
    <h3>Create Account</h3>
    <form onsubmit="doRegister(event)">
      <label>Full Name<input required id="rgName" placeholder="Your full name"></label>
      <label>Email<input required type="email" id="rgEmail" placeholder="you@email.com"></label>
      <label>Password<input required type="password" id="rgPass" minlength="6" placeholder="Min. 6 characters"></label>
      <button class="btn btn-gold w-100">Create Account</button>
    </form>
    <div class="auth-links">Already have an account? <a href="#/login">Sign in</a></div>
  </div></div>`;
}
function doRegister(e){ e.preventDefault(); const r=STO_Auth.register($('#rgName').value.trim(), $('#rgEmail').value.trim(), $('#rgPass').value); if(r.ok){ toast(r.msg); location.hash='#/login'; } else toast(r.msg,'error'); }
function pageForgot(){
  app().innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <span class="logo-text big"><b>STYLON</b> <small>OFFICIAL</small></span>
    <h3>Reset Password</h3>
    <form onsubmit="event.preventDefault(); toast('If that email exists, a reset link has been sent (demo).','info'); location.hash='#/login';">
      <label>Email<input required type="email" placeholder="you@email.com"></label>
      <button class="btn btn-gold w-100">Send Reset Link</button>
    </form>
    <div class="auth-links"><a href="#/login">← Back to sign in</a></div>
  </div></div>`;
}
function pageAccount(tab){
  const u = STO_Auth.user();
  if(!u){ location.hash='#/login'; return; }
  const orders = STO_Orders.all().filter(o=>o.email===u.email || o.customer===u.name);
  tab = tab||'overview';
  const tabs = [['overview','fa-gauge','Overview'],['orders','fa-box','My Orders'],['addresses','fa-location-dot','Addresses'],['settings','fa-gear','Settings']];
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>My Account</span></nav>
    <div class="acct-layout">
      <aside class="acct-nav">
        <div class="acct-user"><div class="acct-avatar">${esc(u.name[0].toUpperCase())}</div><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div>
        ${tabs.map(t=>`<a href="#/account/${t[0]}" class="${tab===t[0]?'active':''}"><i class="fas ${t[1]}"></i> ${t[2]}</a>`).join('')}
        <a href="#" onclick="STO_Auth.logout();renderLayout();location.hash='#/';return false"><i class="fas fa-right-from-bracket"></i> Logout</a>
      </aside>
      <div class="acct-main">
        ${tab==='overview'? `<h3>Hello, ${esc(u.name.split(' ')[0])}!</h3>
          <div class="stat-row">
            <div class="stat-card"><b>${orders.length}</b><span>Total Orders</span></div>
            <div class="stat-card"><b>${fmt(orders.reduce((s,o)=>s+o.total,0))}</b><span>Total Spent</span></div>
            <div class="stat-card"><b>${STO_Wishlist.items().length}</b><span>Wishlist Items</span></div>
          </div>
          <h4 class="mt-4">Recent Orders</h4>
          ${orders.length? `<table class="admin-table"><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr>${orders.slice(0,5).map(o=>`<tr><td>${esc(o.number)}</td><td>${esc(o.date)}</td><td>${fmt(o.total)}</td><td><span class="status-pill st-${o.status.toLowerCase().replace(/\s/g,'-')}">${esc(o.status)}</span></td><td><a class="link-gold" href="#/track-order?n=${o.number}">Track</a></td></tr>`).join('')}</table>` : '<p class="text-muted">No orders yet. <a class="link-gold" href="#/shop">Start shopping →</a></p>'}`:''}
        ${tab==='orders'? `<h3>My Orders</h3>${orders.length? `<table class="admin-table"><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>${orders.map(o=>`<tr><td>${esc(o.number)}</td><td>${esc(o.date)}</td><td>${o.items.reduce((s,i)=>s+i.qty,0)}</td><td>${fmt(o.total)}</td><td><span class="status-pill st-${o.status.toLowerCase().replace(/\s/g,'-')}">${esc(o.status)}</span></td><td><a class="link-gold" href="#/track-order?n=${o.number}">Track</a></td></tr>`).join('')}</table>` : '<p class="text-muted">You haven\u2019t placed any orders yet.</p>'}`:''}
        ${tab==='addresses'? `<h3>Saved Addresses</h3><p class="text-muted">Address book syncs with your checkout delivery details (demo).</p><div class="addr-card"><b>Default Delivery</b><p>${orders[0]? esc(orders[0].address) : 'No saved address yet — it will appear here after your first order.'}</p></div>`:''}
        ${tab==='settings'? `<h3>Account Settings</h3><form class="form-grid narrow-form" onsubmit="event.preventDefault();toast('Profile updated (demo)');">
          <label>Full Name<input value="${esc(u.name)}"></label>
          <label>Email<input type="email" value="${esc(u.email)}" disabled></label>
          <label>New Password<input type="password" placeholder="Leave blank to keep current"></label>
          <button class="btn btn-gold">Save Changes</button></form>`:''}
      </div>
    </div></div>`;
}

/* ---------- Intimate Wellness (18+) ---------- */
function pageIntimate(){
  if(!STO_Age.confirmed()){ ageGate(); return; }
  const prods = STO_API.products().filter(p=>p.category==='Intimate Wellness');
  app().innerHTML = catHeroHTML('<span class="age-badge">18+</span> Intimate Wellness', 'Discreet, premium wellness products for adults. Tasteful placeholders — add your products via the admin dashboard.') +
    `<div class="container page-wrap">
      <div class="notice-box"><i class="fas fa-circle-info"></i> This section is age-restricted. A frontend age gate is only a UI restriction — enforce server-side age verification before production.</div>
      ${prods.length? gridHTML(prods) : emptyState('Coming Soon','Adult wellness products will be listed here. Add them via Admin → Products.','fa-eye-slash')}
      <div class="text-center mt-4"><a href="#/" class="btn btn-outline"><i class="fas fa-arrow-left"></i> Leave this section</a></div>
    </div>`;
  revealInit();
}

/* ---------- Info pages ---------- */
function pageInfo(key){
  const pages = STO_API.pages().filter(p=>p.status==='published');
  const map = {'about':'about-us','contact':'contact-us','faq':'faqs','shipping':'shipping-policy','returns':'returns-policy','privacy-policy':'privacy-policy','terms':'terms-conditions','help':'faqs'};
  if(key==='contact'){ pageContact(); return; }
  const pg = pages.find(p=>p.slug===map[key]) || {title:key.replace(/-/g,' '), content:'Content coming soon.'};
  app().innerHTML = `<div class="container page-wrap narrow">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>${esc(pg.title)}</span></nav>
    <div class="info-page"><h1>${esc(pg.title)}</h1>${key==='faq'||key==='help'? faqHTML() : `<p>${esc(pg.content)}</p>`}</div></div>`;
}
function faqHTML(){
  const faqs=[['How long does delivery take?','Nairobi: same/next day. Upcountry: 2-4 business days.'],['Which payment methods do you accept?','M-Pesa, credit/debit cards, bank transfer and cash on delivery.'],['How do I track my order?','Use the Track Order page with your order reference number.'],['What is your return policy?','7-day returns on unused items in original packaging.'],['Do you deliver outside Nairobi?','Yes! We deliver countrywide via trusted courier partners.']];
  return faqs.map((f,i)=>`<div class="faq-item"><button class="faq-q" onclick="this.parentElement.classList.toggle('open')">${f[0]} <i class="fas fa-chevron-down"></i></button><div class="faq-a">${f[1]}</div></div>`).join('');
}
function pageContact(){
  const s = STO_API.settings();
  app().innerHTML = `<div class="container page-wrap">
    <nav class="breadcrumb"><a href="#/">Home</a> / <span>Contact Us</span></nav>
    <div class="section-head"><h1>Get in Touch</h1></div>
    <div class="contact-grid">
      <div class="contact-info">
        <div class="ci-row"><i class="fas fa-phone"></i><div><b>Phone / WhatsApp</b><a href="tel:+254743166763">+254 743166763</a></div></div>
        <div class="ci-row"><i class="fas fa-envelope"></i><div><b>Email</b><a href="mailto:${s.email}">${s.email}</a></div></div>
        <div class="ci-row"><i class="fas fa-location-dot"></i><div><b>Visit Us</b><p>${s.address}</p></div></div>
        <div class="ci-row"><i class="fas fa-clock"></i><div><b>Opening Hours</b><p>${s.openingHours}</p></div></div>
        <div class="map-ph"><i class="fas fa-map"></i> Map embed placeholder — Moi Avenue, 3rd Floor, Nairobi</div>
        <div class="social-row">${Object.entries(s.social).map(([k,v])=>`<a href="${v}" target="_blank" title="${k}"><i class="fab fa-${k==='x'?'x-twitter':k}"></i></a>`).join('')}</div>
      </div>
      <form class="contact-form" onsubmit="event.preventDefault();toast('Message sent! We\u2019ll get back to you shortly.');this.reset();">
        <label>Name<input required placeholder="Your name"></label>
        <label>Email<input required type="email" placeholder="you@email.com"></label>
        <label>Subject<input required placeholder="How can we help?"></label>
        <label>Message<textarea required placeholder="Write your message..."></textarea></label>
        <button class="btn btn-gold btn-lg"><i class="fas fa-paper-plane"></i> Send Message</button>
      </form>
    </div></div>`;
}

/* ---------- 404 ---------- */
function page404(){
  app().innerHTML = `<div class="container page-wrap">${emptyState('404 — Page Not Found','The page you are looking for doesn\u2019t exist.','fa-compass')}</div>`;
}

/* ---------- Reveal animations ---------- */
function revealInit(){
  if(!('IntersectionObserver' in window)){ $$('.reveal').forEach(el=>el.classList.add('visible')); return; }
  const obs = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target);} }),{threshold:.08});
  $$('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}

/* ================= ROUTER ================= */
function route(){
  closeDrawers();
  const hash = location.hash.slice(1) || '/';
  const [path, qs] = hash.split('?');
  const parts = path.split('/').filter(Boolean);
  window.scrollTo({top:0});
  const p0 = parts[0]||'';
  if(p0==='') pageHome();
  else if(p0==='shop') pageShop(qs);
  else if(p0==='category') pageCategory(parts[1], qs);
  else if(p0==='collection') pageCollection(parts[1]);
  else if(p0==='men') pageGender('men');
  else if(p0==='women') pageGender('women');
  else if(p0==='product') pageProduct(parts[1]);
  else if(p0==='wishlist') pageWishlist();
  else if(p0==='cart') pageCart();
  else if(p0==='checkout') pageCheckout();
  else if(p0==='order-success') pageOrderSuccess(parts[1]);
  else if(p0==='track-order') pageTrackOrder(qs);
  else if(p0==='login') pageLogin();
  else if(p0==='register') pageRegister();
  else if(p0==='forgot-password') pageForgot();
  else if(p0==='account') pageAccount(parts[1]);
  else if(p0==='intimate-wellness') pageIntimate();
  else if(['about','contact','faq','shipping','returns','privacy-policy','terms','help'].includes(p0)) pageInfo(p0);
  else page404();
  // highlight active nav
  $$('.main-nav .nav-link').forEach(a=>{ a.classList.toggle('active', a.getAttribute('href')==='#'+path); });
}
window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', ()=>{ renderLayout(); route(); });
