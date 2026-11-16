/* STYLON OFFICIAL - Admin Dashboard SPA (shares store.js data layer) */
const A = s => document.querySelector(s);
const AA = s => Array.from(document.querySelectorAll(s));

function adminBoot(){
  const u = STO_Auth.user();
  if(!u || !['Super Admin','Store Manager','Product Manager','Order Manager','Content Manager'].includes(u.role)){ pageAdminLogin(); return; }
  renderAdminShell();
  adminRoute();
}
function pageAdminLogin(){
  A('#adminApp').innerHTML = `<div class="ad-login-wrap">
    <div class="ad-login-card">
      <span class="logo-text big gold"><b>STYLON</b> <small>OFFICIAL</small></span>
      <p class="ad-sub">Admin Dashboard</p>
      <h3>Sign In to Dashboard</h3>
      <form onsubmit="adminDoLogin(event)">
        <label>Email<input required type="email" id="adEmail" placeholder="admin@stylon.co.ke"></label>
        <label>Password<div class="pass-wrap"><input required type="password" id="adPass" placeholder="••••••••"><button type="button" onclick="togglePass()"><i class="fas fa-eye"></i></button></div></label>
        <label class="fg-check"><input type="checkbox"> Remember me</label>
        <button class="btn btn-gold w-100 btn-lg">Sign In</button>
      </form>
      <div class="auth-links"><a href="#" onclick="toast('Contact the Super Admin to reset your password (demo).','info');return false;">Forgot password?</a> • <a href="index.html">← Back to Store</a></div>
      <div class="demo-box"><b>Demo admin account</b><br>Email: admin@stylon.co.ke<br>Password: admin123</div>
      <small class="text-muted d-block mt-2 text-center">Frontend demo only — enforce real auth server-side.</small>
    </div></div>`;
}
function togglePass(){ const p=A('#adPass'); p.type = p.type==='password'?'text':'password'; }
function adminDoLogin(e){
  e.preventDefault();
  const r = STO_Auth.adminLogin(A('#adEmail').value.trim(), A('#adPass').value);
  if(r.ok){ toast('Welcome, '+r.user.name+' ('+r.user.role+')'); adminBoot(); }
  else toast(r.msg,'error');
}
function adminLogout(){ STO_Auth.logout(); adminBoot(); }

/* ---------- Shell ---------- */
const ADMIN_NAV = [
  ['dashboard','fa-gauge-high','Dashboard'],
  ['products','fa-box','Products'],
  ['categories','fa-layer-group','Categories'],
  ['inventory','fa-warehouse','Inventory'],
  ['orders','fa-receipt','Orders'],
  ['customers','fa-users','Customers'],
  ['reviews','fa-star-half-stroke','Reviews'],
  ['coupons','fa-ticket','Coupons & Discounts'],
  ['banners','fa-images','Promotions & Banners'],
  ['pages','fa-file-lines','Website Pages'],
  ['media','fa-photo-film','Media Library'],
  ['analytics','fa-chart-pie','Reports & Analytics'],
  ['users','fa-user-shield','Users & Roles'],
  ['settings','fa-gear','Store Settings'],
];
function renderAdminShell(){
  const u = STO_Auth.user();
  A('#adminApp').innerHTML = `
  <div class="ad-shell">
    <aside class="ad-sidebar" id="adSidebar">
      <div class="ad-logo"><span class="logo-text gold"><b>STYLON</b></span><small>ADMIN</small></div>
      ${ADMIN_NAV.map(n=>`<a href="#ad/${n[0]}" class="ad-nav-link" data-nav="${n[0]}"><i class="fas ${n[1]}"></i> ${n[2]}</a>`).join('')}
      <a href="index.html" class="ad-nav-link"><i class="fas fa-store"></i> View Storefront</a>
      <a href="#" class="ad-nav-link danger" onclick="adminLogout();return false;"><i class="fas fa-right-from-bracket"></i> Logout</a>
    </aside>
    <div class="ad-main">
      <header class="ad-topbar">
        <button class="ad-burger" onclick="document.getElementById('adSidebar').classList.toggle('open')"><i class="fas fa-bars"></i></button>
        <div class="ad-search"><i class="fas fa-magnifying-glass"></i><input placeholder="Search products, orders, customers..."></div>
        <div class="ad-top-right">
          <span class="ad-user"><span class="acct-avatar sm">${esc(u.name[0].toUpperCase())}</span><span class="d-none d-md-inline"><b>${esc(u.name)}</b><small>${esc(u.role)}</small></span></span>
        </div>
      </header>
      <main class="ad-content" id="adContent"></main>
    </div>
  </div>`;
}

/* ---------- Router ---------- */
function adminRoute(){
  const u = STO_Auth.user();
  if(!u || !['Super Admin','Store Manager','Product Manager','Order Manager','Content Manager'].includes(u.role)){ pageAdminLogin(); return; }
  if(!A('.ad-shell')) renderAdminShell();
  const hash = location.hash.replace('#ad/','') || 'dashboard';
  AA('.ad-nav-link').forEach(a=>a.classList.toggle('active', a.dataset.nav===hash));
  A('#adSidebar').classList.remove('open');
  const pages = {dashboard:adDashboard, products:adProducts, categories:adCategories, inventory:adInventory, orders:adOrders, customers:adCustomers, reviews:adReviews, coupons:adCoupons, banners:adBanners, pages:adPages, media:adMedia, analytics:adAnalytics, users:adUsers, settings:adSettings};
  (pages[hash]||adDashboard)();
}
window.addEventListener('hashchange', ()=>{ if(A('#adminApp')) adminRoute(); });

/* ---------- helpers ---------- */
function statCard(icon, label, val, sub, color='gold'){
  return `<div class="ad-stat reveal"><div class="as-icon" style="background:${color}"><i class="fas ${icon}"></i></div><div><span>${label}</span><b>${val}</b>${sub?`<small>${sub}</small>`:''}</div></div>`;
}
function seedDemoOrders(){
  if(STO_API.orders().length) return;
  const names=[['Vincent Were','vincent@gmail.com','+254743166763','Moi Avenue, Nairobi'],['Mercy Njeri','mercy.n@gmail.com','+254712000111','Kisumu, Milimani'],['Dennis Too','dtoo@yahoo.com','+254733000222','Eldoret, Kapsoya']];
  const demo=[];
  names.forEach((n,i)=>{
    const its = STO_PRODUCTS.slice(i*3, i*3+2).map(p=>({id:p.id,name:p.name,qty:i+1,price:p.price,variant:{}}));
    const sub = its.reduce((s,x)=>s+x.price*x.qty,0);
    demo.push({number:'STO-DEMO-00'+(i+1), id:'STO-DEMO-00'+(i+1), customer:n[0], email:n[1], phone:n[2], address:n[3], delivery:'Door Delivery', payment:['M-Pesa','Cash on Delivery','Card'][i], items:its, subtotal:sub, discount:0, shipping:150, total:sub+150, status:['Delivered','Processing','Pending'][i], paymentStatus:i===0?'Paid':'Pending', date:'2026-11-0'+(i+1), timeline:[], coupon:null});
  });
  STO_API.saveOrders(demo);
}

/* ---------- Dashboard ---------- */
function adDashboard(){
  seedDemoOrders();
  const prods = STO_API.products(), orders = STO_API.orders(), custs = STO_API.customers();
  const revenue = orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0);
  const pending = orders.filter(o=>o.status==='Pending').length;
  const lowStock = prods.filter(p=>p.stock>0 && p.stock<=5).length;
  const outStock = prods.filter(p=>p.stock<=0).length;
  const top = [...prods].sort((a,b)=>(b.sold||0)-(a.sold||0)).slice(0,5);
  const catSales = {};
  prods.forEach(p=>{ catSales[p.category]=(catSales[p.category]||0)+(p.sold||0)*p.price; });
  const catData = Object.entries(catSales).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxCat = catData.length? catData[0][1] : 1;
  // 12-month demo sales series
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const series=[42,58,51,67,74,69,88,95,84,102,96,118];
  const maxS = Math.max(...series);
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Dashboard</h2><div class="ad-filters">${['Today','7 Days','30 Days','90 Days','This Year'].map((f,i)=>`<button class="chip ${i===2?'chip-active':''}">${f}</button>`).join('')}</div></div>
    <div class="ad-stats">
      ${statCard('fa-box', 'Total Products', prods.length, null, '#C6A36A')}
      ${statCard('fa-receipt', 'Total Orders', orders.length, pending+' pending', '#111111')}
      ${statCard('fa-users', 'Customers', custs.length, null, '#198754')}
      ${statCard('fa-money-bill-wave', 'Revenue', fmt(revenue), 'demo data', '#0d6efd')}
      ${statCard('fa-triangle-exclamation', 'Low Stock', lowStock, outStock+' out of stock', '#DC3545')}
    </div>
    <div class="ad-grid-2">
      <div class="ad-card"><div class="ad-card-head"><h4>Sales Overview</h4><span class="text-muted">Last 12 months (demo)</span></div>
        <div class="bar-chart">${series.map((v,i)=>`<div class="bc-col" title="${months[i]}: KSh ${(v*1000).toLocaleString()}"><span class="bc-val">${v}k</span><div class="bc-bar" style="height:${Math.round(v/maxS*180)}px"></div><span class="bc-lbl">${months[i]}</span></div>`).join('')}</div></div>
      <div class="ad-card"><div class="ad-card-head"><h4>Top Categories</h4></div>
        ${catData.map(([c,v])=>`<div class="hbar-row"><span>${esc(c)}</span><div class="hbar-track"><div class="hbar-fill" style="width:${Math.round(v/maxCat*100)}%"></div></div><b>${fmt(v)}</b></div>`).join('')}</div>
    </div>
    <div class="ad-grid-2">
      <div class="ad-card"><div class="ad-card-head"><h4>Recent Orders</h4><a href="#ad/orders" class="link-gold">View all →</a></div>
        <table class="admin-table"><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
        ${orders.slice(0,6).map(o=>`<tr><td>${esc(o.number)}</td><td>${esc(o.customer)}</td><td>${fmt(o.total)}</td><td><span class="status-pill st-${o.status.toLowerCase().replace(/\s/g,'-')}">${esc(o.status)}</span></td></tr>`).join('')}</table></div>
      <div class="ad-card"><div class="ad-card-head"><h4>Best Sellers</h4></div>
        ${top.map(p=>`<div class="bs-row">${imgHTML(p.images[0],p.name,'bs-img')}<div><b>${esc(p.name)}</b><small>${p.sold||0} sold • ${fmt(p.price)}</small></div><a href="#" class="link-gold" onclick="openProductForm('${p.id}');return false;">Edit</a></div>`).join('')}</div>
    </div>`;
  revealInit();
}

/* ---------- Products CRUD ---------- */
let prodFilter = {q:'', cat:'all', status:'all'};
function adProducts(){
  prodFilter = {q:'', cat:'all', status:'all'};
  renderProductTable();
}
function filteredProds(){
  let list = STO_API.products();
  if(prodFilter.q){ const q=prodFilter.q.toLowerCase(); list=list.filter(p=>(p.name+' '+p.sku+' '+p.subcategory).toLowerCase().includes(q)); }
  if(prodFilter.cat!=='all') list=list.filter(p=>p.category===prodFilter.cat);
  if(prodFilter.status!=='all') list=list.filter(p=>prodFilter.status==='active'? p.status==='active' : p.status!=='active');
  return list;
}
function renderProductTable(){
  const list = filteredProds();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Products <span class="text-muted">(${list.length})</span></h2>
      <div class="ad-actions">
        <button class="btn btn-outline btn-sm" onclick="exportCSV()"><i class="fas fa-file-export"></i> Export CSV</button>
        <button class="btn btn-gold btn-sm" onclick="openProductForm()"><i class="fas fa-plus"></i> Add Product</button></div></div>
    <div class="ad-card">
      <div class="ad-toolbar">
        <input class="f-input" placeholder="Search name, SKU..." value="${esc(prodFilter.q)}" oninput="prodFilter.q=this.value;renderProductTable()">
        <select class="sort-sel" onchange="prodFilter.cat=this.value;renderProductTable()">
          <option value="all">All Categories</option>${STO_CATEGORIES.map(c=>`<option ${prodFilter.cat===c.name?'selected':''}>${esc(c.name)}</option>`).join('')}</select>
        <select class="sort-sel" onchange="prodFilter.status=this.value;renderProductTable()">
          <option value="all">All Status</option><option value="active" ${prodFilter.status==='active'?'selected':''}>Active</option><option value="inactive" ${prodFilter.status==='inactive'?'selected':''}>Inactive</option></select>
      </div>
      <div class="table-scroll"><table class="admin-table">
        <tr><th><input type="checkbox" onclick="AA('.prod-cb').forEach(c=>c.checked=this.checked)"></th><th>Image</th><th>Name</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Badges</th><th>Status</th><th>Actions</th></tr>
        ${list.map(p=>`<tr>
          <td><input type="checkbox" class="prod-cb" value="${p.id}"></td>
          <td>${imgHTML(p.images[0],p.name,'tbl-img')}</td>
          <td><b>${esc(p.name)}</b><small class="d-block text-muted">${esc(p.subcategory)}</small></td>
          <td>${esc(p.sku)}</td><td>${esc(p.category)}</td>
          <td><b>${fmt(p.price)}</b>${p.originalPrice>p.price?`<small class="d-block text-muted"><s>${fmt(p.originalPrice)}</s></small>`:''}</td>
          <td>${p.stock<=0?'<span class="text-danger">Out</span>':p.stock<=5?'<span class="text-warning">'+p.stock+' (low)</span>':p.stock}</td>
          <td>${p.isBestSeller?'<span class="badge badge-hot">BS</span> ':''}${p.isNewArrival?'<span class="badge badge-new">NEW</span> ':''}${(p.tags||[]).includes('Trending')?'<span class="badge badge-sale">TR</span>':''}</td>
          <td><button class="status-toggle ${p.status==='active'?'on':''}" onclick="toggleProdStatus('${p.id}')" title="Toggle status">${p.status==='active'?'Active':'Inactive'}</button></td>
          <td class="tbl-acts">
            <button onclick="openProductForm('${p.id}')" title="Edit"><i class="fas fa-pen"></i></button>
            <button onclick="dupProduct('${p.id}')" title="Duplicate"><i class="fas fa-copy"></i></button>
            <button class="danger" onclick="delProduct('${p.id}')" title="Delete"><i class="fas fa-trash"></i></button></td>
        </tr>`).join('') || '<tr><td colspan="10" class="text-center text-muted py-4">No products found.</td></tr>'}
      </table></div></div>`;
}
function toggleProdStatus(id){
  const prods = STO_API.products(); const p = prods.find(p=>p.id===id);
  p.status = p.status==='active'?'inactive':'active'; STO_API.saveProducts(prods);
  toast(p.name+' is now '+(p.status==='active'?'active':'inactive'));
  renderProductTable();
}
function dupProduct(id){
  const prods = STO_API.products(); const p = prods.find(p=>p.id===id);
  const copy = JSON.parse(JSON.stringify(p));
  copy.id = 'STO-'+Date.now().toString(36).toUpperCase();
  copy.sku = p.sku+'-COPY'; copy.name = p.name+' (Copy)'; copy.slug = p.slug+'-copy-'+Date.now().toString(36);
  prods.unshift(copy); STO_API.saveProducts(prods);
  toast('Product duplicated'); renderProductTable();
}
function delProduct(id){
  const p = STO_API.products().find(p=>p.id===id);
  Swal.fire({title:'Delete "'+esc(p.name)+'"?', text:'This removes it from the storefront immediately.', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545', confirmButtonText:'Yes, delete'}).then(r=>{
    if(r.isConfirmed){ STO_API.saveProducts(STO_API.products().filter(x=>x.id!==id)); toast('Product deleted'); renderProductTable(); }
  });
}
function openProductForm(id){
  const p = id? STO_API.products().find(p=>p.id===id) : null;
  const v = p? JSON.parse(JSON.stringify(p)) : {name:'',sku:'',category:'Fashion',subcategory:'',description:'',price:'',originalPrice:'',stock:20,status:'active',isFeatured:false,isBestSeller:false,isNewArrival:false,tags:[],images:['assets/img/products/new_product_1.jpg'],gender:'Unisex',sold:0,rating:4.5,reviewCount:0,views:0,likes:0,slug:'',id:null,variants:{}};
  const allSubs = STO_CATEGORIES.flatMap(c=>c.subcategories);
  Swal.fire({
    title: p? 'Edit Product' : 'Add New Product',
    width: 720,
    html: `<div class="pf-grid">
      <label>Product Name *<input id="pfName" value="${esc(v.name)}" oninput="document.getElementById('pfSlug').value=this.value.toLowerCase().replace(/[^a-z0-9]+/g,'-')"></label>
      <label>Slug<input id="pfSlug" value="${esc(v.slug)}"></label>
      <label>SKU<input id="pfSku" value="${esc(v.sku)}"></label>
      <label>Category *<select id="pfCat" onchange="pfCatChange()">${STO_CATEGORIES.map(c=>`<option ${v.category===c.name?'selected':''}>${esc(c.name)}</option>`).join('')}</select></label>
      <label>Subcategory *<select id="pfSub">${(STO_CATEGORIES.find(c=>c.name===v.category)||STO_CATEGORIES[0]).subcategories.map(s=>`<option ${v.subcategory===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
      <label>Gender<select id="pfGender">${['Men','Women','Unisex'].map(g=>`<option ${v.gender===g?'selected':''}>${g}</option>`).join('')}</select></label>
      <label>Price (KES) *<input id="pfPrice" type="number" min="1" value="${v.price}"></label>
      <label>Previous Price<input id="pfOrig" type="number" min="0" value="${v.originalPrice||''}"></label>
      <label>Stock *<input id="pfStock" type="number" min="0" value="${v.stock}"></label>
      <label>Status<select id="pfStatus"><option value="active" ${v.status==='active'?'selected':''}>Active</option><option value="inactive" ${v.status==='inactive'?'selected':''}>Inactive</option></select></label>
      <label class="pf-full">Short Description<textarea id="pfDesc">${esc(v.description)}</textarea></label>
      <label class="pf-full">Image Path (placeholder — replace with your image later)<input id="pfImg" value="${esc((v.images&&v.images[0])||'')}"></label>
      <label class="fg-check"><input type="checkbox" id="pfBS" ${v.isBestSeller?'checked':''}> Best Seller</label>
      <label class="fg-check"><input type="checkbox" id="pfNA" ${v.isNewArrival?'checked':''}> New Arrival</label>
      <label class="fg-check"><input type="checkbox" id="pfFeat" ${v.isFeatured?'checked':''}> Featured</label>
      <label class="fg-check"><input type="checkbox" id="pfTrend" ${(v.tags||[]).includes('Trending')?'checked':''}> Trending</label>
    </div>
    <small class="text-muted d-block mt-2"><i class="fas fa-circle-info"></i> Saved products appear in the storefront instantly (shared mock data).</small>`,
    showCancelButton: true, confirmButtonText: p? 'Save Changes' : 'Create Product', confirmButtonColor:'#C6A36A',
    preConfirm: ()=>{
      const name=A('#pfName').value.trim(), price=+A('#pfPrice').value, stock=+A('#pfStock').value;
      if(!name){ Swal.showValidationMessage('Product name is required'); return false; }
      if(!price || price<=0){ Swal.showValidationMessage('Enter a valid price'); return false; }
      if(isNaN(stock) || stock<0){ Swal.showValidationMessage('Enter a valid stock quantity'); return false; }
      const tags=[]; if(A('#pfTrend').checked) tags.push('Trending');
      if(A('#pfBS').checked) tags.push('Best Seller'); if(A('#pfNA').checked) tags.push('New');
      const img = A('#pfImg').value.trim() || 'assets/img/products/new_product_1.jpg';
      return {
        id: p? p.id : 'STO-'+Date.now().toString(36).toUpperCase(),
        name, slug: A('#pfSlug').value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
        sku: A('#pfSku').value.trim() || 'STO-NEW-'+Date.now().toString(36).toUpperCase().slice(-4),
        category: A('#pfCat').value, subcategory: A('#pfSub').value, gender: A('#pfGender').value,
        description: A('#pfDesc').value.trim() || 'Premium quality product from STYLON OFFICIAL.',
        price, originalPrice: +A('#pfOrig').value || price, stock,
        status: A('#pfStatus').value, images:[img],
        isBestSeller: A('#pfBS').checked, isNewArrival: A('#pfNA').checked, isFeatured: A('#pfFeat').checked,
        tags, rating: p? p.rating : 4.5, reviewCount: p? p.reviewCount : 0, views: p? p.views : 0, likes: p? p.likes : 0, sold: p? p.sold : 0,
        variants: (A('#pfCat').value==='Fashion') ? {sizes:['S','M','L','XL'],colors:['Black','White']} : {}
      };
    }
  }).then(r=>{
    if(!r.isConfirmed || !r.value) return;
    const prods = STO_API.products();
    const i = prods.findIndex(x=>x.id===r.value.id);
    if(i>=0) prods[i]=r.value; else prods.unshift(r.value);
    STO_API.saveProducts(prods);
    toast(p? 'Product updated — storefront synced' : 'Product created — live on storefront');
    if(A('#adContent')) renderProductTable();
  });
}
function pfCatChange(){
  const cat = STO_CATEGORIES.find(c=>c.name===A('#pfCat').value);
  A('#pfSub').innerHTML = cat.subcategories.map(s=>`<option>${esc(s)}</option>`).join('');
}
function exportCSV(){
  const rows = [['ID','Name','SKU','Category','Subcategory','Price','Stock','Status']].concat(STO_API.products().map(p=>[p.id,p.name,p.sku,p.category,p.subcategory,p.price,p.stock,p.status]));
  const csv = rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = 'stylon_products.csv'; a.click();
  toast('CSV exported');
}

/* ---------- Categories ---------- */
function adCategories(){
  const cats = STO_DB.get('categories_admin', null) || STO_CATEGORIES.map((c,i)=>({name:c.name, subs:[...c.subcategories], visible:true, position:i+1, desc:''}));
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Category Management</h2><button class="btn btn-gold btn-sm" onclick="addCategory()"><i class="fas fa-plus"></i> Add Category</button></div>
    <div class="ad-grid-3">${cats.map((c,i)=>`
      <div class="ad-card cat-card-ad">
        <div class="ad-card-head"><h4>${esc(c.name)}</h4>
          <div><button class="tbl-btn" onclick="renameCategory(${i})" title="Rename"><i class="fas fa-pen"></i></button>
          <button class="tbl-btn danger" onclick="delCategory(${i})" title="Delete"><i class="fas fa-trash"></i></button></div></div>
        <p class="text-muted">${c.subs.length} subcategories</p>
        <div class="chip-box">${c.subs.map((s,j)=>`<span class="chip">${esc(s)} <i class="fas fa-xmark chip-x" onclick="delSubcat(${i},${j})"></i></span>`).join('')}</div>
        <div class="ad-toolbar mt-2"><input class="f-input" placeholder="New subcategory..." onkeydown="if(event.key==='Enter')addSubcat(${i},this)"><button class="btn btn-dark btn-sm" onclick="addSubcat(${i},this.previousElementSibling)"><i class="fas fa-plus"></i></button></div>
      </div>`).join('')}</div>`;
}
function saveAdminCats(cats){ STO_DB.set('categories_admin', cats); syncCatsToStorefront(cats); }
function syncCatsToStorefront(cats){
  // storefront reads STO_CATEGORIES — mutate in place so nav/filters update
  STO_CATEGORIES.length = 0;
  cats.filter(c=>c.visible!==false).forEach(c=>STO_CATEGORIES.push({name:c.name, subcategories:[...c.subs]}));
}
function addCategory(){
  Swal.fire({title:'Add Category', input:'text', inputPlaceholder:'e.g. Home & Lifestyle', showCancelButton:true, confirmButtonColor:'#C6A36A',
    preConfirm:(v)=>{ if(!v || !v.trim()){ Swal.showValidationMessage('Enter a category name'); return false; } return v.trim(); }
  }).then(r=>{
    if(!r.isConfirmed) return;
    const cats = STO_DB.get('categories_admin', null) || STO_CATEGORIES.map(c=>({name:c.name, subs:[...c.subcategories], visible:true}));
    if(cats.some(c=>c.name.toLowerCase()===r.value.toLowerCase())){ toast('Category already exists','error'); return; }
    cats.push({name:r.value, subs:[], visible:true}); saveAdminCats(cats);
    toast('Category added — storefront navigation updated'); adCategories();
  });
}
function renameCategory(i){
  const cats = STO_DB.get('categories_admin');
  Swal.fire({title:'Rename Category', input:'text', inputValue:cats[i].name, showCancelButton:true, confirmButtonColor:'#C6A36A'}).then(r=>{
    if(r.isConfirmed && r.value.trim()){ cats[i].name = r.value.trim(); saveAdminCats(cats); toast('Category renamed'); adCategories(); }
  });
}
function delCategory(i){
  const cats = STO_DB.get('categories_admin');
  Swal.fire({title:'Delete "'+cats[i].name+'"?', text:'Products in this category remain but it disappears from navigation.', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ cats.splice(i,1); saveAdminCats(cats); toast('Category deleted'); adCategories(); }
  });
}
function addSubcat(i, input){
  const v = (input.value||'').trim(); if(!v) return;
  const cats = STO_DB.get('categories_admin');
  if(cats[i].subs.includes(v)){ toast('Subcategory already exists','error'); return; }
  cats[i].subs.push(v); input.value=''; saveAdminCats(cats); toast('Subcategory added'); adCategories();
}
function delSubcat(i,j){
  const cats = STO_DB.get('categories_admin');
  cats[i].subs.splice(j,1); saveAdminCats(cats); adCategories();
}

/* ---------- Inventory ---------- */
function adInventory(){
  const prods = STO_API.products();
  const low = prods.filter(p=>p.stock>0 && p.stock<=5);
  const out = prods.filter(p=>p.stock<=0);
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Inventory Management</h2></div>
    <div class="ad-stats">
      ${statCard('fa-warehouse','Total SKUs', prods.length, null, '#111111')}
      ${statCard('fa-triangle-exclamation','Low Stock (≤5)', low.length, null, '#DC3545')}
      ${statCard('fa-circle-xmark','Out of Stock', out.length, null, '#DC3545')}
      ${statCard('fa-boxes-stacked','Units in Stock', prods.reduce((s,p)=>s+p.stock,0), null, '#198754')}
    </div>
    <div class="ad-card">
      ${out.length?`<div class="notice-box warn"><i class="fas fa-circle-exclamation"></i> <b>${out.length} product(s) out of stock:</b> ${out.map(p=>esc(p.name)).join(', ')}</div>`:''}
      ${low.length?`<div class="notice-box warn"><i class="fas fa-triangle-exclamation"></i> <b>${low.length} low-stock:</b> ${low.map(p=>esc(p.name)+' ('+p.stock+')').join(', ')}</div>`:''}
      <div class="table-scroll"><table class="admin-table">
      <tr><th>SKU</th><th>Product</th><th>Category</th><th>Stock</th><th>Adjustment</th><th></th></tr>
      ${prods.map(p=>`<tr>
        <td>${esc(p.sku)}</td><td>${esc(p.name)}</td><td>${esc(p.subcategory)}</td>
        <td><span class="${p.stock<=0?'text-danger':p.stock<=5?'text-warning':'text-success'}"><b>${p.stock}</b></span></td>
        <td><div class="qty-sel sm"><button onclick="adjStock('${p.id}',-5)">−5</button><button onclick="adjStock('${p.id}',-1)">−1</button><button onclick="adjStock('${p.id}',1)">+1</button><button onclick="adjStock('${p.id}',5)">+5</button></div></td>
        <td><button class="tbl-btn" onclick="setStock('${p.id}')" title="Set exact stock"><i class="fas fa-pen"></i></button></td>
      </tr>`).join('')}</table></div></div>`;
}
function adjStock(id, d){
  const prods = STO_API.products(); const p = prods.find(p=>p.id===id);
  p.stock = Math.max(0, p.stock+d); STO_API.saveProducts(prods);
  toast(p.name+': stock now '+p.stock); adInventory();
}
function setStock(id){
  const prods = STO_API.products(); const p = prods.find(p=>p.id===id);
  Swal.fire({title:'Set stock — '+p.name, input:'number', inputValue:p.stock, inputAttributes:{min:0}, showCancelButton:true, confirmButtonColor:'#C6A36A',
    preConfirm:(v)=>{ if(isNaN(+v)||+v<0){ Swal.showValidationMessage('Enter a valid number'); return false; } return +v; }
  }).then(r=>{ if(r.isConfirmed){ p.stock=r.value; STO_API.saveProducts(prods); toast('Stock updated — storefront synced'); adInventory(); } });
}

/* ---------- Orders ---------- */
const ORDER_STATUSES = ['Pending','Confirmed','Processing','Ready for Dispatch','Dispatched','Out for Delivery','Delivered','Cancelled','Refunded'];
function adOrders(){
  seedDemoOrders();
  const orders = STO_API.orders();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Orders <span class="text-muted">(${orders.length})</span></h2></div>
    <div class="ad-card"><div class="table-scroll"><table class="admin-table">
      <tr><th>Order #</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
      ${orders.map(o=>`<tr>
        <td><b>${esc(o.number)}</b></td><td>${esc(o.date)}</td>
        <td>${esc(o.customer)}<small class="d-block text-muted">${esc(o.phone||'')}</small></td>
        <td>${o.items.reduce((s,i)=>s+i.qty,0)}</td><td><b>${fmt(o.total)}</b></td>
        <td>${esc(o.payment)}<small class="d-block text-muted">${esc(o.paymentStatus||'')}</small></td>
        <td><select class="sort-sel" onchange="setOrderStatus('${o.number}',this.value)">${ORDER_STATUSES.map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}</select></td>
        <td class="tbl-acts"><button onclick="viewOrder('${o.number}')" title="View"><i class="fas fa-eye"></i></button>
        <button onclick="printOrder('${o.number}')" title="Invoice"><i class="fas fa-print"></i></button></td>
      </tr>`).join('') || '<tr><td colspan="8" class="text-center text-muted py-4">No orders yet. Place a demo order from the storefront checkout.</td></tr>'}
    </table></div></div>`;
}
function setOrderStatus(num, status){
  STO_Orders.setStatus(num, status);
  const orders = STO_API.orders(); const o = orders.find(o=>o.number===num);
  o.status = status; STO_API.saveOrders(orders);
  toast('Order '+num+' → '+status+' — customer tracking synced');
}
function viewOrder(num){
  const o = STO_API.orders().find(o=>o.number===num);
  Swal.fire({title:'Order '+o.number, width:640, html:`
    <div class="review-box" style="text-align:left">
      <div class="rv-col"><h5>Customer</h5><p>${esc(o.customer)}<br>${esc(o.email||'')}<br>${esc(o.phone||'')}</p></div>
      <div class="rv-col"><h5>Delivery</h5><p>${esc(o.address||'')}<br>${esc(o.delivery)}</p></div>
      <div class="rv-col"><h5>Payment</h5><p>${esc(o.payment)} — ${esc(o.paymentStatus||'Pending')}</p></div>
    </div>
    <table class="spec-table" style="text-align:left"><tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
    ${o.items.map(i=>`<tr><td>${esc(i.name)}</td><td>${i.qty}</td><td>${fmt(i.price*i.qty)}</td></tr>`).join('')}
    <tr><th colspan="2">Shipping</th><td>${fmt(o.shipping||0)}</td></tr>
    ${o.discount?`<tr><th colspan="2">Discount</th><td>−${fmt(o.discount)}</td></tr>`:''}
    <tr><th colspan="2">Total</th><th>${fmt(o.total)}</th></tr></table>`,
    showConfirmButton:true, confirmButtonText:'Close'});
}
function printOrder(num){ viewOrder(num); setTimeout(()=>window.print(), 500); }

/* ---------- Customers ---------- */
function adCustomers(){
  const custs = STO_API.customers();
  const orders = STO_API.orders();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Customers <span class="text-muted">(${custs.length})</span></h2></div>
    <div class="ad-card"><div class="table-scroll"><table class="admin-table">
      <tr><th>Customer</th><th>Contact</th><th>Joined</th><th>Orders</th><th>Total Spent</th><th>Status</th><th>Actions</th></tr>
      ${custs.map((c,i)=>`<tr>
        <td><span class="acct-avatar sm inline">${esc(c.name[0])}</span> <b>${esc(c.name)}</b></td>
        <td>${esc(c.phone)}<small class="d-block text-muted">${esc(c.email)}</small></td>
        <td>${esc(c.joined)}</td><td>${orders.filter(o=>o.email===c.email||o.customer===c.name).length}</td>
        <td><b>${fmt(c.totalSpent)}</b></td>
        <td><button class="status-toggle ${c.status==='active'?'on':''}" onclick="toggleCust(${i})">${c.status}</button></td>
        <td class="tbl-acts"><button onclick="editCust(${i})"><i class="fas fa-pen"></i></button></td>
      </tr>`).join('')}</table></div></div>`;
}
function toggleCust(i){ const c=STO_API.customers(); c[i].status=c[i].status==='active'?'blocked':'active'; STO_API.saveCustomers(c); adCustomers(); }
function editCust(i){
  const custs = STO_API.customers(); const c = custs[i];
  Swal.fire({title:'Edit Customer', width:480, html:`<div class="pf-grid">
    <label>Name<input id="ecName" value="${esc(c.name)}"></label>
    <label>Phone<input id="ecPhone" value="${esc(c.phone)}"></label>
    <label>Email<input id="ecEmail" value="${esc(c.email)}"></label>
    <label>Address<input id="ecAddr" value="${esc(c.address)}"></label></div>`,
    showCancelButton:true, confirmButtonColor:'#C6A36A', preConfirm:()=>({name:A('#ecName').value.trim(),phone:A('#ecPhone').value.trim(),email:A('#ecEmail').value.trim(),address:A('#ecAddr').value.trim()})
  }).then(r=>{ if(r.isConfirmed){ Object.assign(c, r.value); STO_API.saveCustomers(custs); toast('Customer updated'); adCustomers(); } });
}

/* ---------- Reviews ---------- */
function adReviews(){
  const revs = STO_API.reviews();
  const prods = STO_API.products();
  const name = id => (prods.find(p=>p.id===id)||{}).name || id;
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Reviews Moderation <span class="text-muted">(${revs.length})</span></h2></div>
    <div class="ad-card">${revs.map((r,i)=>`
      <div class="rev-row-ad">
        <div class="rev-main"><b>${esc(r.name)}</b> on <i>${esc(name(r.productId))}</i> <span class="p-rating">${stars(r.rating)}</span>
          <p>${esc(r.text)}</p><small class="text-muted">${esc(r.date)} • ${r.status.toUpperCase()}</small></div>
        <div class="rev-acts">
          ${r.status!=='approved'?`<button class="btn btn-dark btn-sm" onclick="modReview(${i},'approved')"><i class="fas fa-check"></i> Approve</button>`:''}
          ${r.status!=='rejected'?`<button class="btn btn-outline btn-sm" onclick="modReview(${i},'rejected')"><i class="fas fa-xmark"></i> Reject</button>`:''}
          <button class="btn btn-outline btn-sm danger" onclick="delReview(${i})"><i class="fas fa-trash"></i></button>
        </div>
      </div>`).join('') || '<p class="text-muted">No reviews yet.</p>'}</div>`;
}
function modReview(i, status){
  const revs = STO_API.reviews(); revs[i].status = status; STO_API.saveReviews(revs);
  toast('Review '+status+' — '+(status==='approved'?'now visible on the product page':'hidden from storefront'));
  adReviews();
}
function delReview(i){
  Swal.fire({title:'Delete review?', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ const revs=STO_API.reviews(); revs.splice(i,1); STO_API.saveReviews(revs); adReviews(); }
  });
}

/* ---------- Coupons ---------- */
function adCoupons(){
  const cps = STO_API.coupons();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Coupons & Discounts</h2><button class="btn btn-gold btn-sm" onclick="openCouponForm()"><i class="fas fa-plus"></i> Create Coupon</button></div>
    <div class="ad-card"><div class="table-scroll"><table class="admin-table">
      <tr><th>Code</th><th>Discount</th><th>Min Order</th><th>Max Discount</th><th>Usage</th><th>Expires</th><th>Status</th><th>Actions</th></tr>
      ${cps.map((c,i)=>`<tr>
        <td><b>${esc(c.code)}</b></td>
        <td>${c.type==='percent'? c.value+'% off' : fmt(c.value)+' off'}</td>
        <td>${fmt(c.minOrder)}</td><td>${fmt(c.maxDiscount)}</td>
        <td>${c.used||0} / ${c.usageLimit||'∞'}</td><td>${esc(c.expiryDate)}</td>
        <td><button class="status-toggle ${c.active?'on':''}" onclick="toggleCoupon(${i})">${c.active?'Active':'Inactive'}</button></td>
        <td class="tbl-acts"><button onclick="openCouponForm(${i})"><i class="fas fa-pen"></i></button>
        <button class="danger" onclick="delCoupon(${i})"><i class="fas fa-trash"></i></button></td>
      </tr>`).join('')}</table></div></div>`;
}
function openCouponForm(i){
  const cps = STO_API.coupons();
  const c = (i!=null)? cps[i] : {code:'',type:'percent',value:10,minOrder:0,maxDiscount:1000,usageLimit:100,startDate:'2026-01-01',expiryDate:'2026-12-31',active:true,used:0};
  Swal.fire({title: i!=null? 'Edit Coupon':'Create Coupon', width:520, html:`<div class="pf-grid">
    <label>Code *<input id="cpCode" value="${esc(c.code)}" placeholder="e.g. STO30"></label>
    <label>Type<select id="cpType"><option value="percent" ${c.type==='percent'?'selected':''}>Percentage (%)</option><option value="fixed" ${c.type==='fixed'?'selected':''}>Fixed (KES)</option></select></label>
    <label>Value *<input id="cpVal" type="number" min="1" value="${c.value}"></label>
    <label>Min Order (KES)<input id="cpMin" type="number" min="0" value="${c.minOrder}"></label>
    <label>Max Discount (KES)<input id="cpMax" type="number" min="0" value="${c.maxDiscount}"></label>
    <label>Usage Limit<input id="cpLim" type="number" min="1" value="${c.usageLimit||''}"></label>
    <label>Start Date<input id="cpStart" type="date" value="${c.startDate}"></label>
    <label>Expiry Date<input id="cpExp" type="date" value="${c.expiryDate}"></label></div>`,
    showCancelButton:true, confirmButtonColor:'#C6A36A',
    preConfirm:()=>{
      const code=A('#cpCode').value.trim().toUpperCase(), val=+A('#cpVal').value;
      if(!code){ Swal.showValidationMessage('Code required'); return false; }
      if(!val||val<=0){ Swal.showValidationMessage('Enter a valid value'); return false; }
      if(i==null && cps.some(x=>x.code===code)){ Swal.showValidationMessage('Code already exists'); return false; }
      return {code, type:A('#cpType').value, value:val, minOrder:+A('#cpMin').value||0, maxDiscount:+A('#cpMax').value||val, usageLimit:+A('#cpLim').value||999, startDate:A('#cpStart').value, expiryDate:A('#cpExp').value, active:true, used:c.used||0};
    }
  }).then(r=>{
    if(!r.isConfirmed) return;
    if(i!=null) cps[i]=r.value; else cps.push(r.value);
    STO_API.saveCoupons(cps); toast('Coupon saved — usable at checkout now'); adCoupons();
  });
}
function toggleCoupon(i){ const cps=STO_API.coupons(); cps[i].active=!cps[i].active; STO_API.saveCoupons(cps); adCoupons(); }
function delCoupon(i){
  Swal.fire({title:'Delete coupon '+cpsSafe(i)+'?', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ const cps=STO_API.coupons(); cps.splice(i,1); STO_API.saveCoupons(cps); adCoupons(); }
  });
}
function cpsSafe(i){ return (STO_API.coupons()[i]||{}).code || ''; }

/* ---------- Banners / Hero ---------- */
function adBanners(){
  const slides = STO_API.banners();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Promotions & Banners</h2><button class="btn btn-gold btn-sm" onclick="openSlideForm()"><i class="fas fa-plus"></i> Add Slide</button></div>
    <div class="ad-grid-3">${slides.map((s,i)=>`
      <div class="ad-card slide-card">
        <div class="slide-thumb" style="background-image:linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)),url('${s.img}')"><span class="hero-badge">${esc(s.badge)}</span></div>
        <h4>${esc(s.title)}</h4><p class="text-muted">${esc(s.text)}</p>
        <div class="tbl-acts"><button class="tbl-btn" onclick="openSlideForm(${i})"><i class="fas fa-pen"></i> Edit</button>
        <button class="tbl-btn danger" onclick="delSlide(${i})"><i class="fas fa-trash"></i></button></div>
      </div>`).join('')}</div>
    <small class="text-muted d-block mt-2"><i class="fas fa-circle-info"></i> Slide image paths are placeholders — hero updates reflect on the storefront homepage instantly.</small>`;
}
function openSlideForm(i){
  const slides = STO_API.banners();
  const s = (i!=null)? slides[i] : {badge:'NEW ARRIVALS', title:'Your Headline Here', text:'Supporting text...', cta:'Shop Now', img:'assets/img/banners/hero_custom.jpg'};
  Swal.fire({title: i!=null? 'Edit Slide':'Add Slide', width:520, html:`<div class="pf-grid">
    <label>Badge<input id="slBadge" value="${esc(s.badge)}"></label>
    <label>CTA Button Text<input id="slCta" value="${esc(s.cta||'Shop Now')}"></label>
    <label class="pf-full">Title<input id="slTitle" value="${esc(s.title)}"></label>
    <label class="pf-full">Subtitle<input id="slText" value="${esc(s.text)}"></label>
    <label class="pf-full">Image Path<input id="slImg" value="${esc(s.img)}"></label></div>`,
    showCancelButton:true, confirmButtonColor:'#C6A36A',
    preConfirm:()=>({badge:A('#slBadge').value, title:A('#slTitle').value, text:A('#slText').value, cta:A('#slCta').value, img:A('#slImg').value, theme:'dark'})
  }).then(r=>{
    if(!r.isConfirmed) return;
    if(i!=null) slides[i]=r.value; else slides.push(r.value);
    STO_API.saveBanners(slides); toast('Banner saved — homepage updated'); adBanners();
  });
}
function delSlide(i){
  Swal.fire({title:'Delete this slide?', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ const slides=STO_API.banners(); slides.splice(i,1); STO_API.saveBanners(slides); adBanners(); }
  });
}

/* ---------- Website Pages ---------- */
function adPages(){
  const pages = STO_API.pages();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Website Pages (CMS)</h2><button class="btn btn-gold btn-sm" onclick="openPageForm()"><i class="fas fa-plus"></i> New Page</button></div>
    <div class="ad-card"><div class="table-scroll"><table class="admin-table">
      <tr><th>Title</th><th>Slug</th><th>Status</th><th>Actions</th></tr>
      ${pages.map((p,i)=>`<tr><td><b>${esc(p.title)}</b></td><td class="text-muted">/${esc(p.slug)}</td>
      <td><button class="status-toggle ${p.status==='published'?'on':''}" onclick="togglePage(${i})">${p.status}</button></td>
      <td class="tbl-acts"><button onclick="openPageForm(${i})"><i class="fas fa-pen"></i></button>
      <button class="tbl-btn" onclick="previewPage(${i})"><i class="fas fa-eye"></i></button>
      <button class="danger" onclick="delPage(${i})"><i class="fas fa-trash"></i></button></td></tr>`).join('')}</table></div></div>`;
}
function openPageForm(i){
  const pages = STO_API.pages();
  const p = (i!=null)? pages[i] : {title:'', slug:'', content:'', status:'published', seo:''};
  Swal.fire({title: i!=null? 'Edit Page':'New Page', width:640, html:`<div class="pf-grid">
    <label>Title<input id="pgTitle" value="${esc(p.title)}"></label>
    <label>Slug<input id="pgSlug" value="${esc(p.slug)}"></label>
    <label class="pf-full">Content<textarea id="pgContent" rows="6">${esc(p.content)}</textarea></label>
    <label class="pf-full">SEO Description<input id="pgSeo" value="${esc(p.seo||'')}" placeholder="Meta description (optional)"></label></div>`,
    showCancelButton:true, confirmButtonColor:'#C6A36A',
    preConfirm:()=>({title:A('#pgTitle').value.trim(), slug:A('#pgSlug').value.trim()||A('#pgTitle').value.toLowerCase().replace(/\s+/g,'-'), content:A('#pgContent').value, status:'published', seo:A('#pgSeo').value})
  }).then(r=>{
    if(!r.isConfirmed) return;
    if(i!=null) pages[i]=r.value; else pages.push(r.value);
    STO_API.savePages(pages); toast('Page saved — storefront updated'); adPages();
  });
}
function togglePage(i){ const pages=STO_API.pages(); pages[i].status=pages[i].status==='published'?'draft':'published'; STO_API.savePages(pages); adPages(); }
function previewPage(i){ const p=STO_API.pages()[i]; Swal.fire({title:p.title, html:`<div style="text-align:left"><p>${esc(p.content)}</p></div>`, width:600}); }
function delPage(i){
  Swal.fire({title:'Delete page?', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ const pages=STO_API.pages(); pages.splice(i,1); STO_API.savePages(pages); adPages(); }
  });
}

/* ---------- Media Library ---------- */
function adMedia(){
  const prods = STO_API.products();
  const media = prods.flatMap(p=>p.images.map(img=>({img, name:img.split('/').pop(), type:'JPG (placeholder)', dims:'600 × 600', cat:p.category})));
  const uniq = [...new Map(media.map(m=>[m.img,m])).values()];
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Media Library</h2><label class="btn btn-gold btn-sm" style="margin:0"><i class="fas fa-upload"></i> Upload (demo)<input type="file" accept="image/*" hidden onchange="mediaUpload(this)"></label></div>
    <div class="ad-toolbar"><input class="f-input" placeholder="Search files..." oninput="AA('.media-card').forEach(c=>c.style.display=c.dataset.name.toLowerCase().includes(this.value.toLowerCase())?'':'none')">
      <select class="sort-sel" onchange="AA('.media-card').forEach(c=>c.style.display=(this.value==='all'||c.dataset.cat===this.value)?'':'none')"><option value="all">All Categories</option>${STO_CATEGORIES.map(c=>`<option>${esc(c.name)}</option>`).join('')}</select></div>
    <div class="media-grid">${uniq.map(m=>`
      <div class="media-card" data-name="${esc(m.name)}" data-cat="${esc(m.cat)}">
        ${imgHTML(m.img, m.name, 'media-img')}
        <div class="media-meta"><b>${esc(m.name)}</b><small>${esc(m.type)} • ${m.dims}</small><small class="text-muted">${esc(m.cat)}</small></div>
      </div>`).join('')}</div>
    <small class="text-muted d-block mt-3"><i class="fas fa-circle-info"></i> Files are local placeholders. Wire Cloudinary/S3 for real uploads — filenames are ready for drop-in replacement.</small>`;
}
function mediaUpload(input){
  const f = input.files[0]; if(!f) return;
  const rd = new FileReader();
  rd.onload = e => {
    const grid = A('.media-grid');
    if(grid) grid.insertAdjacentHTML('afterbegin', `<div class="media-card"><img src="${e.target.result}" class="media-img"><div class="media-meta"><b>${esc(f.name)}</b><small>Local preview only</small></div></div>`);
    toast('Image selected (local preview — no remote storage in demo)');
  };
  rd.readAsDataURL(f);
}

/* ---------- Analytics ---------- */
function adAnalytics(){
  const prods = STO_API.products(), orders = STO_API.orders();
  const revenue = orders.reduce((s,o)=>s+o.total,0);
  const aov = orders.length? Math.round(revenue/orders.length) : 0;
  const topSold = [...prods].sort((a,b)=>(b.sold||0)-(a.sold||0)).slice(0,6);
  const maxSold = topSold.length? (topSold[0].sold||1) : 1;
  const cps = STO_API.coupons();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Reports & Analytics</h2><button class="btn btn-outline btn-sm" onclick="exportCSV()"><i class="fas fa-download"></i> Export CSV</button></div>
    <div class="ad-stats">
      ${statCard('fa-money-bill-trend-up','Total Revenue', fmt(revenue), null, '#0d6efd')}
      ${statCard('fa-receipt','Orders', orders.length, null, '#111111')}
      ${statCard('fa-scale-balanced','Avg. Order Value', fmt(aov), null, '#C6A36A')}
      ${statCard('fa-ticket','Coupons Redeemed', cps.reduce((s,c)=>s+(c.used||0),0), null, '#198754')}
      ${statCard('fa-users','Customer Growth', '+'+STO_API.customers().length, 'this period', '#6f42c1')}
    </div>
    <div class="ad-grid-2">
      <div class="ad-card"><h4>Best-Selling Products (units)</h4>
        ${topSold.map(p=>`<div class="hbar-row"><span>${esc(p.name)}</span><div class="hbar-track"><div class="hbar-fill gold" style="width:${Math.round((p.sold||0)/maxSold*100)}%"></div></div><b>${p.sold||0}</b></div>`).join('')}</div>
      <div class="ad-card"><h4>Coupon Performance</h4>
        <table class="admin-table"><tr><th>Code</th><th>Discount</th><th>Used</th><th>Limit</th></tr>
        ${cps.map(c=>`<tr><td><b>${esc(c.code)}</b></td><td>${c.type==='percent'?c.value+'%':fmt(c.value)}</td><td>${c.used||0}</td><td>${c.usageLimit||'∞'}</td></tr>`).join('')}</table>
        <h4 class="mt-4">Inventory Performance</h4>
        <p class="text-muted">${prods.filter(p=>p.stock<=0).length} out of stock • ${prods.filter(p=>p.stock>0&&p.stock<=5).length} low stock • ${prods.reduce((s,p)=>s+p.stock,0)} total units.</p></div>
    </div>`;
}

/* ---------- Users & Roles ---------- */
function adUsers(){
  const users = STO_Auth.users();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Users & Roles</h2></div>
    <div class="ad-card"><div class="table-scroll"><table class="admin-table">
      <tr><th>User</th><th>Email</th><th>Role</th><th></th></tr>
      ${users.map((u,i)=>`<tr><td><span class="acct-avatar sm inline">${esc(u.name[0])}</span> <b>${esc(u.name)}</b></td>
        <td>${esc(u.email)}</td>
        <td><select class="sort-sel" onchange="setRole(${i},this.value)">${['Super Admin','Store Manager','Product Manager','Order Manager','Content Manager','Customer'].map(r=>`<option ${u.role===r?'selected':''}>${r}</option>`).join('')}</select></td>
        <td>${u.role!=='Super Admin'?`<button class="tbl-btn danger" onclick="delUser(${i})"><i class="fas fa-trash"></i></button>`:''}</td></tr>`).join('')}</table></div>
      <small class="text-muted d-block mt-2"><i class="fas fa-circle-info"></i> Roles are UI labels only — enforce authorization server-side before production.</small></div>`;
}
function setRole(i, role){ const users=STO_Auth.users(); users[i].role=role; STO_Auth.saveUsers(users); toast('Role updated to '+role); }
function delUser(i){
  Swal.fire({title:'Remove this user?', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545'}).then(r=>{
    if(r.isConfirmed){ const users=STO_Auth.users(); users.splice(i,1); STO_Auth.saveUsers(users); adUsers(); }
  });
}

/* ---------- Settings ---------- */
function adSettings(){
  const s = STO_API.settings();
  A('#adContent').innerHTML = `
    <div class="ad-head"><h2>Store Settings</h2><button class="btn btn-outline btn-sm danger" onclick="resetDemo()"><i class="fas fa-rotate-left"></i> Reset Demo Data</button></div>
    <div class="ad-card"><form class="pf-grid" onsubmit="saveSettings(event)">
      <label>Store Name<input name="storeName" value="${esc(s.storeName)}"></label>
      <label>Tagline<input name="tagline" value="${esc(s.tagline)}"></label>
      <label>Phone<input name="phone" value="${esc(s.phone)}"></label>
      <label>WhatsApp (intl format)<input name="whatsapp" value="${esc(s.whatsapp)}"></label>
      <label>Email<input name="email" type="email" value="${esc(s.email)}"></label>
      <label>Physical Address<input name="address" value="${esc(s.address)}"></label>
      <label>Shipping Fee (KES)<input name="shippingFee" type="number" min="0" value="${s.shippingFee}"></label>
      <label>Free Shipping Threshold (KES)<input name="freeShippingThreshold" type="number" min="0" value="${s.freeShippingThreshold}"></label>
      <label>Opening Hours<input name="openingHours" value="${esc(s.openingHours)}"></label>
      <label>Facebook URL<input name="fb" value="${esc(s.social.facebook)}"></label>
      <label>Instagram URL<input name="ig" value="${esc(s.social.instagram)}"></label>
      <label>TikTok URL<input name="tt" value="${esc(s.social.tiktok)}"></label>
      <label>Telegram URL<input name="tg" value="${esc(s.social.telegram)}"></label>
      <label>X / Twitter URL<input name="xx" value="${esc(s.social.x)}"></label>
      <div class="pf-full"><button class="btn btn-gold"><i class="fas fa-save"></i> Save Settings</button>
      <small class="text-muted d-block mt-2"><i class="fas fa-circle-info"></i> Settings sync to the storefront instantly (top bar, footer, contact page, checkout).</small></div>
    </form></div>`;
}
function saveSettings(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const cur = STO_API.settings();
  const s = Object.assign({}, cur, {
    storeName:fd.get('storeName'), tagline:fd.get('tagline'), phone:fd.get('phone'), whatsapp:fd.get('whatsapp'),
    email:fd.get('email'), address:fd.get('address'), shippingFee:+fd.get('shippingFee'), freeShippingThreshold:+fd.get('freeShippingThreshold'),
    openingHours:fd.get('openingHours'),
    social:{facebook:fd.get('fb'), instagram:fd.get('ig'), tiktok:fd.get('tt'), telegram:fd.get('tg'), x:fd.get('xx')}
  });
  STO_API.saveSettings(s);
  toast('Settings saved — storefront updated');
}
function resetDemo(){
  Swal.fire({title:'Reset all demo data?', text:'Products, orders, settings and CMS return to defaults.', icon:'warning', showCancelButton:true, confirmButtonColor:'#DC3545', confirmButtonText:'Yes, reset'}).then(r=>{
    if(r.isConfirmed){ STO_API.reset(); toast('Demo data reset'); setTimeout(()=>location.reload(), 800); }
  });
}

document.addEventListener('DOMContentLoaded', adminBoot);
