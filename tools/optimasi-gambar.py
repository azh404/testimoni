"""
OPTIMASI GAMBAR — supaya website ringan dibuka di HP

Membuat dari foto asli (PNG):
  1. <nama>-kecil.webp : 600x450 untuk kartu produk (±25 KB, bukan ±140 KB)
  2. <nama>-og.jpg     : latar putih untuk pratinjau link WhatsApp/Facebook
                         (PNG asli ±1 MB sering gagal tampil di WhatsApp)
  3. hero/<nama>-og.jpg: 1200x630 untuk pratinjau link halaman umum
Juga mengecilkan logo.png (dipakai di setiap halaman).

Jalankan setelah menambah/mengganti foto:
  python tools/optimasi-gambar.py
(butuh Pillow: pip install pillow)
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / 'assets' / 'images'


def perlu_dibuat(sumber, hasil):
    return not hasil.exists() or hasil.stat().st_mtime < sumber.stat().st_mtime


def latar_putih(im):
    im = im.convert('RGBA')
    bg = Image.new('RGB', im.size, 'white')
    bg.paste(im, mask=im.getchannel('A'))
    return bg


jumlah = 0

# 1 & 2. Foto produk
for png in sorted((IMG / 'produk').glob('*/*.png')):
    kecil = png.with_name(png.stem + '-kecil.webp')
    og = png.with_name(png.stem + '-og.jpg')
    if perlu_dibuat(png, kecil) or perlu_dibuat(png, og):
        im = Image.open(png).convert('RGBA')
        t = im.copy()
        t.thumbnail((600, 450), Image.LANCZOS)
        t.save(kecil, 'WEBP', quality=80, method=6)
        o = latar_putih(im)
        o.thumbnail((1200, 900), Image.LANCZOS)
        o.save(og, 'JPEG', quality=82, optimize=True, progressive=True)
        jumlah += 1

# 3. Gambar hero untuk pratinjau link (rasio 1,91:1)
for png in sorted((IMG / 'hero').glob('*.png')):
    og = png.with_name(png.stem + '-og.jpg')
    if perlu_dibuat(png, og):
        im = latar_putih(Image.open(png))
        w, h = im.size
        tinggi = round(w / 1.91)
        if tinggi <= h:
            atas = (h - tinggi) // 2
            im = im.crop((0, atas, w, atas + tinggi))
        im = im.resize((1200, 630), Image.LANCZOS)
        im.save(og, 'JPEG', quality=82, optimize=True, progressive=True)
        jumlah += 1

# 4. Logo: cukup 400 px lebar (tampil ±60 px di navbar)
logo = IMG / 'logo' / 'logo.png'
im = Image.open(logo)
if im.width > 400:
    im.thumbnail((400, 400), Image.LANCZOS)
    im.save(logo, optimize=True)
    jumlah += 1

print(f'{jumlah} gambar dibuat/diperbarui')
