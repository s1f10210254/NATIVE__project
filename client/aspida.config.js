require('dotenv').config();
module.exports = {
  input: 'src/api',
  // baseURL: 'http://localhost:31577',
  baseURL: process.env.base_URL,
};
