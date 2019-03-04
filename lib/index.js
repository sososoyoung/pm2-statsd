const { getSnapshot } = require('./pm2');
const { send, sendMultiple } = require('./udp');
const { parseMsg } = require('./unit/msg');
const { refresh } = require('../config');

const start = () => {
  setInterval(async () => {
    try {
      const data = await getSnapshot();
      const msgs = parseMsg(data);
      await sendMultiple(msgs);
    } catch (error) {
      console.error('error:', error);
    }
  }, refresh);
};

module.exports = { start };
