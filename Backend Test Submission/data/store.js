const database = {};

function saveEntry(code, url, expiry) {
  database[code] = {
    url,
    expiry,
    created: new Date().toISOString(),
    clicks: [],
  };
}

function isCodeUsed(code) {
  return Boolean(database[code]);
}

function getEntryByCode(code) {
  return database[code] || null;
}

function getStatsByCode(code) {
  const entry = database[code];
  if (!entry) return null;

  return {
    originalUrl: entry.url,
    createdAt: entry.created,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clickDetails: entry.clicks,
  };
}

module.exports = {
  saveEntry,
  isCodeUsed,
  getEntryByCode,
  getStatsByCode,
};
