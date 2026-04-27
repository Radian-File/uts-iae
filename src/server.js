const express = require('express');
const cors = require('cors');

const blockedSitesRoutes = require('./routes/blockedSitesRoutes');
const detectRoutes = require('./routes/detectRoutes');
const reportRoutes = require('./routes/reportRoutes');
const educationRoutes = require('./routes/educationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API Sistem Deteksi dan Edukasi Judi Online aktif',
    endpoints: {
      blockedSites: '/api/blocked-sites',
      detect: '/api/detect',
      report: '/api/report',
      education: '/api/education'
    }
  });
});

app.use('/api/blocked-sites', blockedSitesRoutes);
app.use('/api/detect', detectRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/education', educationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan'
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
