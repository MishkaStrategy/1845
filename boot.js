const main = document.getElementById('main');
const parts = ['./fragments/01.html','./fragments/02.html','./fragments/03.html','./fragments/04a.html','./fragments/04b.html'];
try {
  const responses = await Promise.all(parts.map((url) => fetch(url)));
  if (responses.some((r) => !r.ok)) throw new Error('fragment request failed');
  main.innerHTML = (await Promise.all(responses.map((r) => r.text()))).join('');
  await import('./src/content/offer.js');
  await import('./script.js');
} catch (error) {
  console.error(error);
  main.innerHTML = '<section class="boot-error shell"><p class="eyebrow">18:45 / connection</p><h1>Не удалось загрузить презентацию.</h1><p>Обновите страницу — все материалы находятся в этом же статическом deployment.</p></section>';
}
