const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const { hostname } = require('../config');

const {
  udp: { addr, port }
} = require('../config.js');

const _hostName = hostname || process.env.HOSTNAME || '_host_';

const formatMsg = (m = '') => {
  return `PM2.${_hostName}.${m}`;
};

const send = msg => {
  const message = Buffer.from(formatMsg(msg));
  return client.send(message, port, addr, err => {
    if (err) {
      console.error('sendMsg error:', err);
    }
  });
};

const sendMultiple = msgs => {
  return Promise.all(msgs.map(send));
};

module.exports = { send, sendMultiple };
