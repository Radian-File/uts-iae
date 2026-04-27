const { educationMaterials } = require('../config/db');

const getAllEducation = (req, res) => {
  res.json({ success: true, data: educationMaterials });
};

const getEducationById = (req, res) => {
  const material = educationMaterials.find(item => item.id === Number(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Materi edukasi tidak ditemukan' });
  }
  res.json({ success: true, data: material });
};

const getEducationCategory = (req, res) => {
  const categories = [...new Set(educationMaterials.map(item => item.category))];
  res.json({ success: true, data: categories });
};

const createEducation = (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ success: false, message: 'title, category, dan content wajib diisi' });
  }

  const newMaterial = {
    id: educationMaterials.length ? educationMaterials[educationMaterials.length - 1].id + 1 : 1,
    title,
    category,
    content,
    createdAt: new Date().toISOString()
  };

  educationMaterials.push(newMaterial);
  res.status(201).json({ success: true, message: 'Materi edukasi berhasil ditambahkan', data: newMaterial });
};

const updateEducation = (req, res) => {
  const index = educationMaterials.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Materi edukasi tidak ditemukan' });
  }

  educationMaterials[index] = {
    ...educationMaterials[index],
    ...req.body
  };

  res.json({ success: true, message: 'Materi edukasi berhasil diupdate', data: educationMaterials[index] });
};

const deleteEducation = (req, res) => {
  const index = educationMaterials.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Materi edukasi tidak ditemukan' });
  }

  const deleted = educationMaterials.splice(index, 1);
  res.json({ success: true, message: 'Materi edukasi berhasil dihapus', data: deleted[0] });
};

module.exports = {
  getAllEducation,
  getEducationById,
  getEducationCategory,
  createEducation,
  updateEducation,
  deleteEducation
};
