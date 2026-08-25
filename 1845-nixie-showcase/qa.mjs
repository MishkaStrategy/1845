import fs from 'node:fs';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const css=['styles-shell.css','styles-nixie.css','styles-layout.css','styles-responsive.css'].map(f=>fs.readFileSync(new URL('./'+f,import.meta.url),'utf8')).join('\n');
const js=fs.readFileSync(new URL('./script.js',import.meta.url),'utf8');
const failures=[];
if((html.match(/class="tube(?: |")/g)||[]).length!==5) failures.push('expected 5 tubes');
if(!html.includes('tube tube-colon')) failures.push('colon not dedicated tube');
if(!html.includes('id="nixieRig"')) failures.push('missing rig');
if(!js.includes('Math.random')) failures.push('random flicker missing');
if(!css.includes('prefers-reduced-motion')) failures.push('reduced motion missing');
if(/hero-reference|reference-image/.test(html+css+js)) failures.push('reference image used in production');
if(/src="https?:\/\//.test(html)||/href="https?:\/\//.test(html)) failures.push('external runtime asset detected');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('QA OK: native hero, 5 tubes, dedicated colon, random flicker, reduced motion, local assets.');
