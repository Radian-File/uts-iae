const db = require('../config/db.js');
const [rows] = await db.query('SELECT * FROM blocked_sites');

const blockedSites = [
  {
    id: 1,
    domain: 'contohjudi-slot.com',
    category: 'Slot Online',
    reason: 'Terindikasi promosi judi online',
    status: 'blocked',
    source: 'Kominfo / internal monitoring',
    createdAt: '2026-04-20T09:00:00.000Z'
  },
  {
    id: 2,
    domain: 'taruhanbola-cepat.net',
    category: 'Taruhan Bola',
    reason: 'Mengandung kata kunci dan pola transaksi mencurigakan',
    status: 'blocked',
    source: 'Laporan pengguna',
    createdAt: '2026-04-20T10:00:00.000Z'
  }
];

const detectionHistory = [
  {
    id: 1,
    url: 'https://contohjudi-slot.com',
    result: 'Terdeteksi Judi Online',
    score: 92,
    reason: 'Domain cocok dengan daftar blokir dan mengandung kata kunci perjudian.',
    checkedAt: '2026-04-20T11:00:00.000Z'
  }
];

const reports = [
  {
    id: 1,
    reporterName: 'Pengguna Demo',
    email: 'demo@example.com',
    url: 'https://taruhanbola-cepat.net',
    description: 'Website menampilkan promosi taruhan dan deposit.',
    status: 'pending',
    createdAt: '2026-04-20T12:00:00.000Z'
  }
];

const educationMaterials = [
  {
    id: 1,
    title: 'Bahaya Judi Online untuk Pelajar',
    category: 'Bahaya',
    content: 'Judi online dapat menyebabkan kecanduan, masalah finansial, dan gangguan akademik.',
    createdAt: '2026-04-20T08:00:00.000Z'
  },
  {
    id: 2,
    title: 'Cara Melaporkan Situs Judi Online',
    category: 'Panduan',
    content: 'Kumpulkan URL, screenshot, dan deskripsi singkat lalu kirim melalui sistem laporan.',
    createdAt: '2026-04-20T08:30:00.000Z'
  },
  {
    id: 3,
    title: 'Tips Menjaga Keamanan Digital',
    category: 'Pencegahan',
    content: 'Hindari klik iklan mencurigakan, aktifkan verifikasi akun, dan edukasi keluarga tentang risiko judi online.',
    createdAt: '2026-04-20T09:00:00.000Z'
  }
];

module.exports = {
  blockedSites,
  detectionHistory,
  reports,
  educationMaterials
};
