"""
UBAH VIDEO HERO — dari foto-baru/video-1..6.mp4 ke file siap pakai di beranda

Untuk tiap video yang ada di foto-baru/ dibuat 4 file di assets/videos/:
  hero-<nama>.webm      1920px VP9  (utama, lebih kecil dari MP4)
  hero-<nama>.mp4       1920px H.264 (cadangan untuk Safari/iPhone lama)
  hero-<nama>-hp.webm   1280px VP9  (layar HP ≤768px)
  hero-<nama>-hp.mp4    1280px H.264
Lalu index.html diperbarui: atribut data-webm dipasang dan ?v= dinaikkan
(supaya browser tidak memakai video lama dari cache).

Nomor video:
  1 pengering, 2 traktor, 3 tebu, 4 combine, 5 VectorAgr, 6 EAVision

Jalankan:
  pip install imageio-ffmpeg
  python tools/ubah-video.py          (semua video yang ada)
  python tools/ubah-video.py 2 5      (hanya video 2 dan 5)
"""
import re
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
SUMBER = ROOT / 'foto-baru'
TUJUAN = ROOT / 'assets' / 'videos'
INDEX = ROOT / 'index.html'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

NAMA = {
    1: 'hero-drying-machine',
    2: 'hero-tractor',
    3: 'hero-sugarcane-harvester',
    4: 'hero-combine-harvester',
    5: 'hero-vectoragr',
    6: 'hero-eavision',
}

# (lebar, CRF VP9, CRF H.264) — angka CRF kecil = kualitas lebih tinggi
UKURAN = {'': (1920, 30, 18), '-hp': (1280, 36, 23)}


def ffmpeg(*arg):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', *arg], check=True)


def ubah(no):
    asal = SUMBER / f'video-{no}.mp4'
    if not asal.exists():
        return False
    for akhiran, (lebar, crf_vp9, crf_264) in UKURAN.items():
        # Diperkecil/diperbesar ke lebar target (16:9), tanpa suara, 25 fps
        vf = f'scale={lebar}:-2:flags=lanczos,fps=25,format=yuv420p'
        dasar = TUJUAN / f'{NAMA[no]}{akhiran}'
        ffmpeg('-i', str(asal), '-an', '-vf', vf,
               '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', str(crf_vp9),
               '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
               str(dasar) + '.webm')
        ffmpeg('-i', str(asal), '-an', '-vf', vf,
               '-c:v', 'libx264', '-preset', 'slow', '-crf', str(crf_264),
               '-profile:v', 'high', '-movflags', '+faststart',
               str(dasar) + '.mp4')
        for ext in ('webm', 'mp4'):
            f = Path(str(dasar) + '.' + ext)
            print(f'  {f.name:40s} {f.stat().st_size / 1e6:5.1f} MB')
    return True


def perbarui_index(nomor):
    html = INDEX.read_text(encoding='utf-8')
    for no in nomor:
        pola = re.compile(
            r'data-video="assets/videos/' + NAMA[no] + r'\.mp4(?:\?v=(\d+))?"( data-webm)?')
        def ganti(m):
            v = int(m.group(1) or 0) + 1
            return f'data-video="assets/videos/{NAMA[no]}.mp4?v={v}" data-webm'
        html, n = pola.subn(ganti, html)
        if not n:
            print(f'  ! slide {NAMA[no]} tidak ditemukan di index.html')
    INDEX.write_text(html, encoding='utf-8')


if __name__ == '__main__':
    pilih = [int(a) for a in sys.argv[1:]] or list(NAMA)
    selesai = []
    for no in pilih:
        print(f'Video {no} ({NAMA[no]}):')
        if ubah(no):
            selesai.append(no)
        else:
            print('  (tidak ada file, dilewati)')
    if selesai:
        perbarui_index(selesai)
        print('index.html diperbarui untuk video', selesai)
