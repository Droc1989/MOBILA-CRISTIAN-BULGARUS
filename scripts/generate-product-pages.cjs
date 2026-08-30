const fs=require('node:fs');
const path=require('node:path');
const generator=require('../assets/product-pages.js');

const root=path.resolve(__dirname,'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8'));
const output=path.join(root,'produse');
fs.mkdirSync(output,{recursive:true});
const expected=new Set();
for(const product of catalog.products){
  const category=catalog.categories.find(item=>item.slug===product.category);
  const filename=`${generator.safeId(product.id)}.html`;
  expected.add(filename);
  fs.writeFileSync(path.join(output,filename),generator.generateProductHtml(product,category));
}
for(const filename of fs.readdirSync(output)){
  if(filename.endsWith('.html')&&!expected.has(filename))fs.unlinkSync(path.join(output,filename));
}
console.log(`Pagini statice generate: ${expected.size}`);
