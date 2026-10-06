"""
UBAH VIDEO HERO — MP4 dari pengguna → file ringan siap pakai di beranda

Untuk tiap video dibuat 4 file di assets/videos/ + 2 foto sampul di assets/images/hero/:
  <nama>.webm        1920px VP9  (utama laptop)
  <nama>-hp.webm     1280px VP9  (layar HP ≤768px)
  <nama>.mp4         1920px H.264 (cadangan Safari/iPhone lama)
  <nama>-hp.mp4      1280px H.264
  hero/<nama>.webp   foto sampul 1920px (tampil sebelum video berjalan)
  hero/<nama>-hp.webp foto sampul 1280px
Video dipotong maksimal MAKS_DETIK detik, tanpa suara, 25 fps.

Jalankan:
  pip install imageio-ffmpeg
  python tools/ubah-video.py foto-baru/hero-zoomlion-1.mp4 foto-baru/hero-eavision.mp4
  (nama hasil = nama file sumber, mis. hero-zoomlion-1)
Lalu pasang di index.html: <div class="hero__slide" data-video="assets/videos/<nama>.mp4?v=1" data-webm ...>
"""
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
VIDEO = ROOT / 'assets' / 'videos'
HERO = ROOT / 'assets' / 'images' / 'hero'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
MAKS_DETIK = 20

# lebar, VP9 (crf, bitrate target, maks), H.264 crf
UKURAN = {
    '':    (1920, ('28', '4500k', '6500k'), '23'),
    '-hp': (1280, ('32', '1800k', '2600k'), '26'),
}


def ffmpeg(*arg):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', *arg], check=True)


def ubah(sumber):
    nama = sumber.stem
    print(f'{nama}:')
    for akhiran, (lebar, (crf, br, maks), crf264) in UKURAN.items():
        vf = f'scale={lebar}:-2:flags=lanczos,format=yuv420p'
        dasar = VIDEO / f'{nama}{akhiran}'
        umum = ['-i', str(sumber), '-t', str(MAKS_DETIK), '-an', '-vf', vf]
        ffmpeg(*umum, '-c:v', 'libvpx-vp9', '-crf', crf, '-b:v', br, '-maxrate', maks,
               '-bufsize', str(int(maks[:-1]) * 2) + 'k', '-row-mt', '1',
               '-deadline', 'good', '-cpu-used', '2', f'{dasar}.webm')
        ffmpeg(*umum, '-c:v', 'libx264', '-preset', 'slow', '-crf', crf264,
               '-maxrate', maks, '-bufsize', str(int(maks[:-1]) * 2) + 'k',
               '-profile:v', 'high', '-movflags', '+faststart', f'{dasar}.mp4')
        # Foto sampul = gambar detik ke-1 (banyak video diawali layar hitam)
        ffmpeg('-ss', '1', '-i', str(sumber), '-frames:v', '1', '-vf', f'scale={lebar}:-2:flags=lanczos',
               '-c:v', 'libwebp', '-quality', '82', str(HERO / f'{nama}{akhiran}.webp'))
        for f in (f'{dasar}.webm', f'{dasar}.mp4', HERO / f'{nama}{akhiran}.webp'):
            print(f'  {Path(f).name:34s} {Path(f).stat().st_size / 1e6:5.2f} MB')


if __name__ == '__main__':
    for arg in sys.argv[1:]:
        ubah(Path(arg))
