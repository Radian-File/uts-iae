const { blockedSites } = require('../config/db');

// const getAllBlockedSites = (req, res) => {
//   res.json({ success: true, data: blockedSites });
// };

exports.getBlockedSites = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blocked_sites');
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil data blocked sites',
      error: err.message
    });
  }
};

const getBlockedSiteById = (req, res) => {
  const site = blockedSites.find(item => item.id === Number(req.params.id));
  if (!site) {
    return res.status(404).json({ success: false, message: 'Data situs tidak ditemukan' });
  }
  res.json({ success: true, data: site });
};

const createBlockedSite = (req, res) => {
  const { domain, category, reason, source } = req.body;
  if (!domain || !category || !reason) {
    return res.status(400).json({ success: false, message: 'domain, category, dan reason wajib diisi' });
  }

  const newSite = {
    id: blockedSites.length ? blockedSites[blockedSites.length - 1].id + 1 : 1,
    domain,
    category,
    reason,
    source: source || 'Manual input',
    status: 'blocked',
    createdAt: new Date().toISOString()
  };

  blockedSites.push(newSite);
  res.status(201).json({ success: true, message: 'Situs berhasil ditambahkan', data: newSite });
};

const updateBlockedSite = (req, res) => {
  const index = blockedSites.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Data situs tidak ditemukan' });
  }

  blockedSites[index] = {
    ...blockedSites[index],
    ...req.body
  };

  res.json({ success: true, message: 'Data situs berhasil diupdate', data: blockedSites[index] });
};

const deleteBlockedSite = (req, res) => {
  const index = blockedSites.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Data situs tidak ditemukan' });
  }

  const deleted = blockedSites.splice(index, 1);
  res.json({ success: true, message: 'Data situs berhasil dihapus', data: deleted[0] });
};

module.exports = {
  getAllBlockedSites,
  getBlockedSiteById,
  createBlockedSite,
  updateBlockedSite,
  deleteBlockedSite
};
