(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ProductPageGenerator=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const SITE_URL='https://www.mobilacristian.onl';
  const CATEGORY_PAGES={dormitoare:'dormitoare.html',dulapuri:'dulapuri.html',comode:'comode.html',mese:'mese.html',living:'living.html',canapele:'canapele.html',altele:'altele.html'};
  const STORE_SCHEMA={
    '@context':'https://schema.org','@type':'FurnitureStore','@id':`${SITE_URL}/#store`,
    name:'MOBILA CRISTIAN S.R.L.',legalName:'MOBILA CRISTIAN S.R.L.',url:`${SITE_URL}/`,
    logo:`${SITE_URL}/assets/brand/logo-mobila-cristian.webp`,image:`${SITE_URL}/assets/brand/logo-mobila-cristian.webp`,
    telephone:['+40 765 065 953','+40 768 355 975'],
    address:{'@type':'PostalAddress',streetAddress:'Strada Principală Nr. 444',addressLocality:'Bulgăruș',addressRegion:'Timiș',postalCode:'307241',addressCountry:'RO'},
    geo:{'@type':'GeoCoordinates',latitude:45.9130685,longitude:20.81778},
    sameAs:['https://www.facebook.com/profile.php?id=100063336782201']
  };
  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
  function safeId(value){return String(value??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
  function absoluteUrl(path){const value=String(path||'');if(/^https?:\/\//i.test(value))return value;return `${SITE_URL}/${value.replace(/^\//,'')}`}
  function jsonLd(value){return JSON.stringify(value).replace(/</g,'\\u003c')}
  function breadcrumb(items){return{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:item.url}))}}
  function categoryUrl(category){return `${SITE_URL}/categorii/${CATEGORY_PAGES[category?.slug]||`${safeId(category?.slug||'catalog')}.html`}`}
  function productPath(product){return `produse/${safeId(product.id)}.html`}
  function generateProductHtml(product,category){
    const id=safeId(product.id),name=String(product.name||'Mobilier'),description=String(product.shortDescription||product.description||'Mobilier nou de la Mobilă Cristian Bulgăruș.'),image=absoluteUrl(product.image),url=`${SITE_URL}/produse/${id}.html`,categoryName=String(category?.name||'Mobilier'),categoryPage=categoryUrl(category);
    const robots=product.available===false?'<meta name="robots" content="noindex,follow">':'';
    const productSchema={'@context':'https://schema.org','@type':'Product','@id':`${url}#product`,name,description,image:[image,...(product.gallery||[]).map(absoluteUrl)],category:categoryName,sku:id,url,brand:{'@type':'Brand',name:'Mobilă Cristian Bulgăruș'}};
    const breadcrumbSchema=breadcrumb([{name:'Acasă',url:`${SITE_URL}/`},{name:categoryName,url:categoryPage},{name,url}]);
    return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>${escapeHtml(name)} | Mobilă Cristian Bulgăruș</title>
  <meta name="description" content="${escapeHtml(description)}">${robots}
  <meta name="theme-color" content="#2f211a"><link rel="canonical" href="${escapeHtml(url)}">
  <meta property="og:locale" content="ro_RO"><meta property="og:type" content="product">
  <meta property="og:site_name" content="Mobilă Cristian Bulgăruș">
  <meta property="og:title" content="${escapeHtml(name)} | Mobilă Cristian Bulgăruș">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}"><meta property="og:image:alt" content="${escapeHtml(name)}">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(name)} | Mobilă Cristian Bulgăruș"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(image)}">
  <script type="application/ld+json">${jsonLd(productSchema)}</script>
  <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/site.css">
</head>
<body data-product-id="${escapeHtml(id)}" data-product-category="${escapeHtml(category?.slug||product.category||'')}">
  <div data-site-header></div><main><section class="section"><div class="container" data-product-page><p>Se încarcă ${escapeHtml(name)}...</p></div></section></main><div data-site-footer></div>
  <script src="../assets/site.js"></script>
</body>
</html>
`;
  }
  return{SITE_URL,CATEGORY_PAGES,STORE_SCHEMA,absoluteUrl,escapeHtml,safeId,jsonLd,breadcrumb,categoryUrl,productPath,generateProductHtml};
});
