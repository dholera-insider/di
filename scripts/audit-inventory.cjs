const fs=require('node:fs'),path=require('node:path');
const parser=require('@babel/parser'),traverse=require('@babel/traverse').default;
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name).replaceAll('\\','/')]);
const files=walk('src').filter(f=>/\.(jsx?|mjs)$/.test(f));
const all=new Set(files),nodes=new Map();
function resolve(from,value){
  const base=value.startsWith('@/')?'src/'+value.slice(2):value.startsWith('.')?path.posix.normalize(path.posix.join(path.posix.dirname(from),value)):null;
  if(!base)return null;
  return [base,...['.js','.jsx','/index.js','/index.jsx'].map(x=>base+x)].find(f=>all.has(f));
}
for(const file of files){
  const ast=parser.parse(fs.readFileSync(file,'utf8'),{sourceType:'module',plugins:['jsx']});
  const node={file,imports:[],forms:[],links:[]};nodes.set(file,node);
  traverse(ast,{
    ImportDeclaration(p){const f=resolve(file,p.node.source.value);if(f)node.imports.push(f);},
    CallExpression(p){if(p.node.callee.type==='Import'&&p.node.arguments[0]?.value){const f=resolve(file,p.node.arguments[0].value);if(f)node.imports.push(f);}},
    JSXOpeningElement(p){if(p.node.name.name==='form')node.forms.push(p.node.loc.start.line);},
    JSXAttribute(p){if(p.node.name.name==='href'&&p.node.value?.type==='StringLiteral')node.links.push({line:p.node.loc.start.line,href:p.node.value.value});},
  });
}
const roots=files.filter(f=>/\/(page|layout|route|robots|sitemap)\.(js|jsx)$/.test(f));
const reached=new Set();function visit(f){if(reached.has(f))return;reached.add(f);nodes.get(f)?.imports.forEach(visit);}roots.forEach(visit);
const pages=roots.filter(f=>/\/page\./.test(f)).map(f=>f.replace(/^src\/app/,'').replace(/\/page\.(js|jsx)$/,'')||'/');
const matches=href=>pages.some(route=>new RegExp('^'+route.replace(/\[\[\.\.\.[^\]]+\]\]/g,'.*').replace(/\[\.\.\.[^\]]+\]/g,'.+').replace(/\[[^\]]+\]/g,'[^/]+')+'/?$').test(href));
const missing=[];
for(const [f,n] of nodes){if(!reached.has(f))continue;for(const l of n.links){const href=l.href.split(/[?#]/)[0];if(!href.startsWith('/')||href.startsWith('//')||!href)continue;if(matches(href))continue;let decoded;try{decoded=decodeURIComponent(href);}catch{decoded=href;}if(fs.existsSync('public'+decoded))continue;missing.push({file:f,...l});}}
const inventory={sourceFiles:files.length,routes:pages,apis:roots.filter(f=>f.includes('/api/')),forms:[...nodes.values()].filter(n=>n.forms.length).map(n=>({file:n.file,lines:n.forms,reachable:reached.has(n.file)})),unmatchedStaticLinks:missing};
fs.mkdirSync('audit',{recursive:true});fs.writeFileSync('audit/inventory.json',JSON.stringify(inventory,null,2));
console.log(JSON.stringify(inventory,null,2));
