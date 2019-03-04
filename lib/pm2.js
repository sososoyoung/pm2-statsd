const axios = require('axios');
const {
  web: { addr, port }
} = require('../config');

const pm2Web = axios.create({
  baseURL: `http://${addr}:${port}`,
  responseType: 'json',
  timeout: 1000
});

const getSnapshot = async () => {
  const res = await pm2Web.get();
  // console.log(JSON.stringify(res.data, null, 2));
  return res.data;
};

getSnapshot();
module.exports = { getSnapshot };
