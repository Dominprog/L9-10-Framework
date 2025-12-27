const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../../data');

async function readJSON(filename) {
    try {
        const filePath = path.join(dataDir, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeJSON(filename, data) {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function generateId(items) {
    const maxId = items.reduce((max, item) => Math.max(max, item.id || 0), 0);
    return maxId + 1;
}

module.exports = { readJSON, writeJSON, generateId };