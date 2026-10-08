# Kirim semua halaman di sitemap.xml ke IndexNow (Bing, Yandex, dll.) sekaligus.
# Jalankan dari folder DASS-WEB (Windows):
#   powershell -ExecutionPolicy Bypass -File tools\indexnow.ps1
# Syarat: file b963901221a0c688647d3d6f3d058083.txt sudah ter-upload di https://dass.co.id/b963901221a0c688647d3d6f3d058083.txt
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12   # PowerShell 5 di Windows
$key  = 'b963901221a0c688647d3d6f3d058083'
$host_ = 'dass.co.id'
[xml]$peta = Get-Content -Raw -Encoding UTF8 'sitemap.xml'
$urls = @($peta.urlset.url | ForEach-Object { $_.loc })
Write-Host "Jumlah halaman: $($urls.Count)"
$body = @{
  host        = $host_
  key         = $key
  keyLocation = "https://$host_/$key.txt"
  urlList     = $urls
} | ConvertTo-Json -Depth 3
try {
  $res = Invoke-WebRequest -Uri 'https://api.indexnow.org/indexnow' -Method Post -Body ([Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json; charset=utf-8' -UseBasicParsing
  Write-Host "Berhasil dikirim. Kode: $($res.StatusCode) (200/202 = OK)"
} catch {
  Write-Host "Gagal: $($_.Exception.Message)"
  Write-Host "Cek: apakah https://$host_/$key.txt sudah bisa dibuka di browser?"
}
