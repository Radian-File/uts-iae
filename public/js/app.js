const blockedSitesList = document.getElementById('blockedSitesList');
const educationList = document.getElementById('educationList');
const detectForm = document.getElementById('detectForm');
const reportForm = document.getElementById('reportForm');
const detectResult = document.getElementById('detectResult');
const reportResult = document.getElementById('reportResult');

const getBadgeClass = (result) => {
  if (String(result).toLowerCase().includes('judi')) return 'red';
  if (String(result).toLowerCase().includes('review')) return 'yellow';
  return 'green';
};

async function loadBlockedSites() {
  const response = await fetch('/api/blocked-sites');
  const data = await response.json();
  blockedSitesList.innerHTML = data.data.map(site => `
    <div class="item">
      <h3>${site.domain}</h3>
      <p><strong>Kategori:</strong> ${site.category}</p>
      <p><strong>Alasan:</strong> ${site.reason}</p>
      <span class="badge red">${site.status}</span>
    </div>
  `).join('');
}

async function loadEducation() {
  const response = await fetch('/api/education');
  const data = await response.json();
  educationList.innerHTML = data.data.map(item => `
    <div class="item">
      <h3>${item.title}</h3>
      <p><strong>Kategori:</strong> ${item.category}</p>
      <p>${item.content}</p>
    </div>
  `).join('');
}

detectForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('detectUrl').value;
  const response = await fetch('/api/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  const result = data.data;
  detectResult.innerHTML = `
    <div class="item">
      <h3>Hasil Deteksi</h3>
      <p><strong>URL:</strong> ${result.url}</p>
      <p><strong>Status:</strong> ${result.result}</p>
      <p><strong>Skor:</strong> ${result.score}</p>
      <p><strong>Alasan:</strong> ${result.reason}</p>
      <span class="badge ${getBadgeClass(result.result)}">${result.result}</span>
    </div>
  `;
});

reportForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    reporterName: document.getElementById('reporterName').value,
    email: document.getElementById('reportEmail').value,
    url: document.getElementById('reportUrl').value,
    description: document.getElementById('reportDescription').value
  };
  const response = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  reportResult.innerHTML = `
    <div class="item">
      <h3>${data.message}</h3>
      <p><strong>Nama:</strong> ${data.data.reporterName}</p>
      <p><strong>URL:</strong> ${data.data.url}</p>
      <p><strong>Status:</strong> ${data.data.status}</p>
    </div>
  `;
  reportForm.reset();
});

loadBlockedSites();
loadEducation();
