const fs=require('node:fs');
const path=require('node:path');
const generator=require('../assets/product-pages.js');

const root=path.resolve(__dirname,'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8'));
const START='<!-- structured-data:start -->';
const END='<!-- structured-data:end -->';

function block(schemas){return `${START}<script type="application/ld+json">${generator.jsonLd(schemas.length===1?schemas[0]:schemas)}</script>${END}`}
function replace(file,schemas){
  const target=path.join(root,file),source=fs.readFileSync(target,'utf8');
  const pattern=new RegExp(`${START}[\\s\\S]*?${END}`);
  const output=pattern.test(source)?source.replace(pattern,block(schemas)):source.replace('</head>',`${block(schemas)}</head>`);
  fs.writeFileSync(target,output);
}

replace('index.html',[generator.STORE_SCHEMA]);
for(const category of catalog.categories){
  const filename=generator.CATEGORY_PAGES[category.slug];
  if(!filename)continue;
  const url=generator.categoryUrl(category);
  replace(`categorii/${filename}`,[generator.STORE_SCHEMA,generator.breadcrumb([
    {name:'Acasă',url:`${generator.SITE_URL}/`},
    {name:category.name,url}
  ])]);
}
console.log(`Date structurate statice actualizate: pagina principală + ${catalog.categories.length} categorii`);
