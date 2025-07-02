const fs = require('fs').promises;

exports.readData = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data || '[]');
};

exports.writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
