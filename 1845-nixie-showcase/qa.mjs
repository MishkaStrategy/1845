import fs from 'node:fs';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('./styles.css',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('./script.js',import.meta.url),'utf8');
const fail=[];
for(const id of ['about','offer','solutions','process','contact','nixieStage']) if(!html.includes(`id="${id}"`)) fail.push(`missing #${id}`);
if((html.match(/class="tube/g)||[]).length!==5) fail.push('expected exactly five Nixie tubes');
if(!html.includes('tube-colon')) fail.push('colon is not a dedicated tube');
if(html.includes('nixie-plaque')||html.includes('1845 · NOVOSIBIRSK')) fail.push('plate under tubes detected');
if(!js.includes('Math.random()')) fail.push('random flicker missing');
if(!css.includes('prefers-reduced-motion')) fail.push('reduced motion missing');
if(/src="https?:\/\//.test(html)||/href="https?:\/\//.test(html)) fail.push('external runtime asset detected');
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log('QA OK — five tubes, dedicated colon, random flicker, local assets, reduced motion.');
