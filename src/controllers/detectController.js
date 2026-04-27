const { blockedSites, detectionHistory } = require('../config/db');

const gamblingKeywords = ['judi', 'slot', 'casino', 'bet', 'taruhan', 'togel', 'poker'];

const detectUrl = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL wajib diisi' });
  }

  const normalizedUrl = String(url).toLowerCase();
  const blockedMatch = blockedSites.find(site => normalizedUrl.includes(site.domain.toLowerCase()));
  const keywordMatch = gamblingKeywords.filter(keyword => normalizedUrl.includes(keyword));

  let result = 'Aman';
  let score = 15;
  let reason = 'URL tidak cocok dengan daftar blokir dan tidak mengandung indikasi kuat.';

  if (blockedMatch) {
    result = 'Terdeteksi Judi Online';
    score = 92;
    reason = `URL cocok dengan domain terblokir: ${blockedMatch.domain}`;
  } else if (keywordMatch.length > 0) {
    result = 'Perlu Review';
    score = 68;
    reason = `Ditemukan kata kunci mencurigakan: ${keywordMatch.join(', ')}`;
  }

  const detection = {
    id: detectionHistory.length ? detectionHistory[detectionHistory.length - 1].id + 1 : 1,
    url,
    result,
    score,
    reason,
    checkedAt: new Date().toISOString()
  };

  detectionHistory.push(detection);

  res.status(201).json({
    success: true,
    message: 'Deteksi URL berhasil dilakukan',
    data: detection
  });
};

const getDetectionResult = (req, res) => {
  const latest = detectionHistory[detectionHistory.length - 1] || null;
  res.json({ success: true, data: latest, history: detectionHistory });
};

const getDetectionStatus = (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'Detection Service',
      status: 'active',
      totalChecks: detectionHistory.length,
      lastCheckedAt: detectionHistory.length ? detectionHistory[detectionHistory.length - 1].checkedAt : null
    }
  });
};

module.exports = {
  detectUrl,
  getDetectionResult,
  getDetectionStatus
};
