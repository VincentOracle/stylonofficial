/* STYLON OFFICIAL - Global State Layer (cart, wishlist, orders, coupons, auth, sync)
   Persists to localStorage. Future backend API can replace STO_DB functions without UI changes. */
const STO_DB = {
  get(key, fallback){ try{ const v = localStorage.getItem('sto_'+key); return v? JSON.parse(v) : fallback; }catch(e){ return fallback; } },
  set(key, val){ localStorage.setItem('sto_'+key, JSON.stringify(val)); }
};

/* ---------- Data abstraction (swap with API later) ---------- */
const STO_API = {
  products(){ return STO_DB.get('products', null) || STO_PRODUCTS; },
  saveProducts(p){ STO_DB.set('products', p); },
  coupons(){ return STO_DB.get('coupons', null) || STO_COUPONS; },
  saveCoupons(c){ STO_DB.set('coupons', c); },
  orders(){ return STO_DB.get('orders', []); },
  saveOrders(o){ STO_DB.set('orders', o); },
  reviews(){ return STO_DB.get('reviews', this.seedReviews()); },
  seedReviews(){
    const seed = STO_PRODUCTS.slice(0,12).map((p,i)=>({id:'REV-'+i, productId:p.id, name:['Kevin M.','Achieng O.','Brian K.','Sarah W.','Dennis T.','Mercy N.'][i%6], rating:4+ (i%2), text:'Great product, exactly as described. Fast delivery too!', date:'2026-10-'+String(5+i).padStart(2,'0'), status:'approved'}));
    STO_DB.set('reviews', seed); return seed;
  },
  saveReviews(r){ STO_DB.set('reviews', r); },
  customers(){ return STO_DB.get('customers', null) || this.seedCustomers(); },
  seedCustomers(){
    const seed = [['Kevin Maina','+254712345678','Nairobi, CBD'],['Achieng Ochieng','+254723456789','Kisumu, Milimani'],['Brian Kiptoo','+254734567890','Eldoret, Kapsoya']].map((c,i)=>({id:'CUST-'+i, name:c[0], phone:c[1], email:c[0].toLowerCase().replace(' ','.')+'@gmail.com', address:c[2], joined:'2026-0'+(i+2)+'-1'+(i+2), totalSpent:[15497,8998,22450][i], orders:[3,2,5][i], status:'active'}));
    STO_DB.set('customers', seed); return seed;
  },
  saveCustomers(c){ STO_DB.set('customers', c); },
  pages(){ return STO_DB.get('pages', null) || this.seedPages(); },
  seedPages(){
    const mk=(title,content)=>({title, slug:title.toLowerCase().replace(/\s+/g,'-'), content, status:'published', seo:''});
    const seed=[mk('About Us','STYLON OFFICIAL is Nairobi\u2019s premium destination for fashion, fragrances, watches, jewellery and tech accessories. Shop Smart. Live Stylish.'),
      mk('Contact Us','Reach us on +254 743166763 or stylonofficial@co.ke. Visit us at Moi Avenue, 3rd Floor, Nairobi.'),
      mk('FAQs','Q: How long does delivery take? A: Nairobi same/next day, upcountry 2-4 days. Q: Do you accept M-Pesa? A: Yes, plus COD and cards.'),
      mk('Shipping Policy','We deliver countrywide via trusted couriers. Nairobi: KSh 150 (free over KSh 5,000). Upcountry: from KSh 250.'),
      mk('Returns Policy','Return within 7 days if the item is unused and in original packaging. Refunds processed in 3-5 days.'),
      mk('Privacy Policy','We collect only the data needed to process your order and never share it with third parties without consent.'),
      mk('Terms & Conditions','By using STYLON OFFICIAL you agree to our fair-use, payment and delivery terms. All prices in KES.')];
    STO_DB.set('pages', seed); return seed;
  },
  savePages(p){ STO_DB.set('pages', p); },
  banners(){ return STO_DB.get('hero_slides', null) || STO_HERO_SLIDES; },
  saveBanners(b){ STO_DB.set('hero_slides', b); },
  settings(){ return Object.assign({}, STO_SETTINGS, STO_DB.get('settings', {})); },
  saveSettings(s){ STO_DB.set('settings', s); },
  reset(){ ['products','orders','coupons','reviews','customers','pages','hero_slides','settings','cart','wishlist','users','session'].forEach(k=>localStorage.removeItem('sto_'+k)); }
};

/* ---------- Session / Auth (frontend simulation) ---------- */
const STO_Auth = {
  user(){ return STO_DB.get('session', null); },
  users(){ return STO_DB.get('users', [{name:'STO Admin', email:'admin@stylon.co.ke', pass:'admin123', role:'Super Admin'}]); },
  saveUsers(u){ STO_DB.set('users', u); },
  register(name,email,pass){
    const users = this.users();
    if(users.some(u=>u.email===email)) return {ok:false, msg:'An account with this email already exists.'};
    users.push({name,email,pass,role:'Customer'}); this.saveUsers(users);
    return {ok:true, msg:'Account created! You can now sign in.'};
  },
  login(email,pass){
    const u = this.users().find(u=>u.email===email && u.pass===pass);
    if(!u) return {ok:false, msg:'Invalid email or password.'};
    STO_DB.set('session', {name:u.name, email:u.email, role:u.role});
    return {ok:true, user:u};
  },
  adminLogin(email,pass){
    const u = this.users().find(u=>u.email===email && u.pass===pass);
    if(!u || !['Super Admin','Store Manager','Product Manager','Order Manager','Content Manager'].includes(u.role))
      return {ok:false, msg:'Invalid admin credentials. Demo: admin@stylon.co.ke / admin123'};
    STO_DB.set('session', {name:u.name, email:u.email, role:u.role}); return {ok:true, user:u};
  },
  logout(){ localStorage.removeItem('sto_session'); }
};

/* ---------- Cart / Wishlist / Coupons ---------- */
const STO_Cart = {
  items(){ return STO_DB.get('cart', []); },
  save(items){ STO_DB.set('cart', items); document.dispatchEvent(new CustomEvent('sto:cart')); },
  add(product, qty=1, variant={}){
    const items = this.items();
    const key = product.id + '|' + (variant.size||'') + '|' + (variant.color||'');
    const ex = items.find(i=>i.key===key);
    if(ex) ex.qty = Math.min(ex.qty + qty, product.stock || 99);
    else items.push({key, id:product.id, qty:Math.min(qty, product.stock||99), variant});
    this.save(items); return true;
  },
  remove(key){ this.save(this.items().filter(i=>i.key!==key)); },
  setQty(key, qty){
    const items = this.items(); const it = items.find(i=>i.key===key); if(!it) return;
    it.qty = Math.max(1, qty); this.save(items);
  },
  clear(){ this.save([]); },
  count(){ return this.items().reduce((s,i)=>s+i.qty,0); },
  subtotal(){ return this.items().reduce((s,i)=>{ const p=STO_API.products().find(p=>p.id===i.id); return p? s+p.price*i.qty : s; },0); },
  coupon(){ return STO_DB.get('coupon', null); },
  applyCoupon(code){
    const c = STO_API.coupons().find(c=>c.code.toUpperCase()===code.toUpperCase() && c.active);
    if(!c) return {ok:false, msg:'Invalid or expired coupon code.'};
    if(this.subtotal() < c.minOrder) return {ok:false, msg:'Minimum order of KSh '+c.minOrder.toLocaleString()+' required for '+c.code+'.'};
    STO_DB.set('coupon', c.code); return {ok:true, msg:'Coupon '+c.code+' applied!'};
  },
  removeCoupon(){ localStorage.removeItem('sto_coupon'); },
  discount(){
    const c = this.coupon(); if(!c) return 0;
    const cp = STO_API.coupons().find(x=>x.code===c); if(!cp) return 0;
    let d = cp.type==='percent' ? Math.round(this.subtotal()*cp.value/100) : cp.value;
    return Math.min(d, cp.maxDiscount || d);
  },
  shipping(){
    const s = STO_API.settings();
    return this.subtotal() >= s.freeShippingThreshold ? 0 : (this.items().length? s.shippingFee : 0);
  },
  total(){ return Math.max(0, this.subtotal() - this.discount() + this.shipping()); }
};

const STO_Wishlist = {
  items(){ return STO_DB.get('wishlist', []); },
  toggle(id){
    let w = this.items();
    if(w.includes(id)){ w = w.filter(x=>x!==id); }
    else w.push(id);
    STO_DB.set('wishlist', w); return w.includes(id);
  },
  has(id){ return this.items().includes(id); },
  remove(id){ STO_DB.set('wishlist', this.items().filter(x=>x!==id)); }
};

const STO_Orders = {
  all(){ return STO_API.orders(); },
  create(order){
    const orders = this.all();
    order.number = 'STO-' + Date.now().toString(36).toUpperCase();
    order.id = order.number;
    order.status = 'Pending'; order.paymentStatus = order.payment==='mpesa' ? 'Paid (simulated)' : 'Pending';
    order.timeline = [{step:'Order Placed', date:new Date().toLocaleString(), done:true}];
    order.date = new Date().toLocaleDateString();
    orders.unshift(order); STO_API.saveOrders(orders);
    // decrement stock
    const prods = STO_API.products();
    order.items.forEach(it=>{ const p=prods.find(p=>p.id===it.id); if(p) p.stock=Math.max(0,p.stock-it.qty); });
    STO_API.saveProducts(prods);
    const cps = STO_API.coupons(); const cp = cps.find(c=>c.code===STO_Cart.coupon()); if(cp) cp.used=(cp.used||0)+1; STO_API.saveCoupons(cps);
    return order;
  },
  setStatus(number, status){
    const orders = this.all(); const o = orders.find(o=>o.number===number); if(!o) return;
    o.status = status;
    const steps=['Order Placed','Payment Confirmed','Processing','Dispatched','Out for Delivery','Delivered'];
    o.timeline = steps.map((s,i)=>({step:s, done:true, date:o.date}));
    STO_API.saveOrders(orders);
  }
};

const STO_Recent = {
  add(id){
    let r = STO_DB.get('recent', []).filter(x=>x!==id); r.unshift(id);
    STO_DB.set('recent', r.slice(0,8));
  },
  items(){ return STO_DB.get('recent',[]).map(id=>STO_API.products().find(p=>p.id===id)).filter(Boolean); }
};

const STO_Age = {
  confirmed(){ return sessionStorage.getItem('sto_age_ok')==='1'; },
  confirm(){ sessionStorage.setItem('sto_age_ok','1'); }
};

/* ---------- Helpers ---------- */
const fmt = n => 'KSh ' + Number(n||0).toLocaleString();
const esc = s => String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stars = r => { let h=''; for(let i=1;i<=5;i++) h+=`<i class="fa${i<=Math.round(r)?'s':'r'} fa-star"></i>`; return h; };
function toast(msg, type='success'){
  if(typeof Swal!=='undefined'){
    const Toast = Swal.mixin({toast:true, position:'top-end', showConfirmButton:false, timer:2200, timerProgressBar:true});
    Toast.fire({icon:type, title:msg});
  } else { console.log(msg); }
}
function waLink(msg){ return 'https://wa.me/254743166763?text='+encodeURIComponent(msg); }
