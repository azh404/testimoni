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
# Kirim ke 2 alamat: api.indexnow.org (umum) lalu www.bing.com (pesan error lebih jelas)
foreach ($api in @('https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow')) {
  try {
    $res = Invoke-WebRequest -Uri $api -Method Post -Body ([Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json; charset=utf-8' -UseBasicParsing
    Write-Host "$api -> Berhasil. Kode: $($res.StatusCode) (200/202 = OK)"
  } catch {
    Write-Host "$api -> Gagal: $($_.Exception.Message)"
    try {
      $isi = (New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd()
      if ($isi) { Write-Host "  Pesan server: $isi" }
    } catch {}
  }
}
Write-Host "Bila 403: kunci belum terbaca mesin pencari. Pastikan https://$host_/$key.txt bisa dibuka, kosongkan cache CDN Hostinger, tunggu 30-60 menit, lalu ulangi."
