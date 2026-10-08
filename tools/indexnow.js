// Versi Node.js dari tools/indexnow.ps1: node tools/indexnow.js
const fs = require('fs');
const KEY = 'b963901221a0c688647d3d6f3d058083', HOST = 'dass.co.id';
const urls = [...fs.readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log('Jumlah halaman:', urls.length);
fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls })
}).then(r => console.log('Kode:', r.status, '(200/202 = OK)')).catch(e => console.log('Gagal:', e.message));
