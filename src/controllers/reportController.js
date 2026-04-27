const { reports } = require('../config/db');

const createReport = (req, res) => {
  const { reporterName, email, url, description } = req.body;
  if (!reporterName || !url || !description) {
    return res.status(400).json({ success: false, message: 'reporterName, url, dan description wajib diisi' });
  }

  const newReport = {
    id: reports.length ? reports[reports.length - 1].id + 1 : 1,
    reporterName,
    email: email || '',
    url,
    description,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  reports.push(newReport);
  res.status(201).json({ success: true, message: 'Laporan berhasil dikirim', data: newReport });
};

const getAllReports = (req, res) => {
  res.json({ success: true, data: reports });
};

const getReportStatus = (req, res) => {
  const summary = {
    pending: reports.filter(item => item.status === 'pending').length,
    reviewed: reports.filter(item => item.status === 'reviewed').length,
    rejected: reports.filter(item => item.status === 'rejected').length,
    total: reports.length
  };

  res.json({ success: true, data: summary });
};

const getReportById = (req, res) => {
  const report = reports.find(item => item.id === Number(req.params.id));
  if (!report) {
    return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' });
  }
  res.json({ success: true, data: report });
};

const updateReport = (req, res) => {
  const index = reports.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' });
  }

  reports[index] = {
    ...reports[index],
    ...req.body
  };

  res.json({ success: true, message: 'Laporan berhasil diupdate', data: reports[index] });
};

const deleteReport = (req, res) => {
  const index = reports.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' });
  }

  const deleted = reports.splice(index, 1);
  res.json({ success: true, message: 'Laporan berhasil dihapus', data: deleted[0] });
};

module.exports = {
  createReport,
  getAllReports,
  getReportStatus,
  getReportById,
  updateReport,
  deleteReport
};
