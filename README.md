# Sistem Deteksi dan Edukasi Judi Online

Project ini dibuat sesuai laporan PDF kamu, dengan fokus pada:
- frontend HTML/CSS/JS sederhana
- backend Node.js + Express
- REST API sesuai kebutuhan laporan
- database MySQL **belum dihubungkan otomatis**, supaya kamu bisa menjelaskannya manual saat presentasi

## Tools yang digunakan
- Node.js
- Express.js
- CORS
- MySQL2
- MySQL
- NPM
- VS Code
- Postman

## Struktur Project
- `public/` → frontend HTML, CSS, JS
- `src/server.js` → server utama Express
- `src/routes/` → route API
- `src/controllers/` → business logic API
- `src/data/mockData.js` → data sementara tanpa database
- `src/config/db.example.js` → template koneksi MySQL
- `database/schema.sql` → schema database

## Cara Menjalankan Project
1. Buka terminal pada folder project ini.
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   npm run dev
   ```
4. Buka browser:
   - Frontend: `http://localhost:3000`
   - API info: `http://localhost:3000/api`

## Endpoint API
### Blocked Sites
- GET `/api/blocked-sites`
- POST `/api/blocked-sites`
- GET `/api/blocked-sites/:id`
- PUT `/api/blocked-sites/:id`
- DELETE `/api/blocked-sites/:id`

### Detect
- POST `/api/detect`
- GET `/api/detect/result`
- GET `/api/detect/status`

### Report
- POST `/api/report`
- GET `/api/report`
- GET `/api/report/status`
- GET `/api/report/:id`
- PUT `/api/report/:id`
- DELETE `/api/report/:id`

### Education
- GET `/api/education`
- GET `/api/education/:id`
- GET `/api/education/category`
- POST `/api/education`
- PUT `/api/education/:id`
- DELETE `/api/education/:id`

## Step by Step Koneksi MySQL Manual
### 1. Buat database
```sql
CREATE DATABASE deteksi_judi_online;
```

### 2. Pilih database
```sql
USE deteksi_judi_online;
```

### 3. Jalankan schema
Import isi file `database/schema.sql`.

### 4. Aktifkan file koneksi
Copy file `src/config/db.example.js` menjadi `src/config/db.js`.

Contoh isi:
```js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ISI_PASSWORD_KAMU',
  database: 'deteksi_judi_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

### 5. Ganti mock data ke MySQL query
Saat ini project memakai `src/data/mockData.js`.

Nanti kamu bisa ubah controller seperti ini:
```js
const db = require('../config/db');
const [rows] = await db.query('SELECT * FROM blocked_sites');
```

### 6. Testing di Postman
Coba endpoint berikut:
- GET `http://localhost:3000/api/blocked-sites`
- POST `http://localhost:3000/api/detect`
- POST `http://localhost:3000/api/report`
- GET `http://localhost:3000/api/education`

## Contoh Body JSON
### POST `/api/detect`
```json
{
  "url": "https://contohjudi-slot.com"
}
```

### POST `/api/report`
```json
{
  "reporterName": "Achmad Ricky",
  "email": "ricky@example.com",
  "url": "https://website-mencurigakan.com",
  "description": "Website mengandung promosi taruhan online"
}
```

### POST `/api/blocked-sites`
```json
{
  "domain": "contohbaru-judi.com",
  "category": "Casino",
  "reason": "Ditemukan promosi judi online",
  "source": "Admin"
}
```

### POST `/api/education`
```json
{
  "title": "Cara Menghindari Judi Online",
  "category": "Pencegahan",
  "content": "Jangan mudah tergiur iklan cepat kaya dan selalu cek keamanan situs."
}
```

## Catatan Presentasi
Kalau dosen bertanya kenapa database belum aktif, kamu bisa jelaskan:
- backend dan endpoint sudah dibuat dulu
- struktur database sudah disiapkan
- koneksi MySQL sengaja dipisah agar proses penjelasan lebih mudah
- tahap berikutnya adalah mengganti mock data menjadi query database asli
