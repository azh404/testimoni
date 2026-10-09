<?php
/* CONTOH konfigurasi chatbot. Cara pakai di Hostinger:
   1. Buat file baru bernama config.php di folder public_html/api/
   2. Salin isi file ini ke sana, lalu ganti ISI_API_KEY_DI_SINI dengan API key dari console.anthropic.com
   File config.php SENGAJA tidak ikut GitHub (rahasia) dan diblokir dari akses browser. */
return [
    'ANTHROPIC_API_KEY' => 'ISI_API_KEY_DI_SINI',
    'model'             => 'claude-opus-5-5',
    'batas_per_jam'     => 15,     // pesan per pengunjung per jam
    'batas_harian'      => 300,    // pesan seluruh website per hari (rem biaya, ±Rp 75 rb maks.)
    'izin_asal'         => ['https://dass.co.id', 'https://www.dass.co.id'],
];
