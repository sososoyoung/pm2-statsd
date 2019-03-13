const fixName = (n = '') => n.replace(/\.|:|\|/g, '_');

const parseProcesse = p => {
  const msgs = [];
  const { name, pid, monit, pm2_env } = p;
  return [
    `${fixName(name)}.${pm2_env.NODE_APP_INSTANCE}.cpu:${monit.cpu}|g`,
    `${fixName(name)}.${pm2_env.NODE_APP_INSTANCE}.mem:${Math.floor(
      monit.memory / (1024 * 1024)
    )}|g`,
    `${fixName(name)}.${pm2_env.NODE_APP_INSTANCE}.restart:${Math.floor(
      pm2_env.restart_time
    )}|g`
  ];
  // `${name}.${pm2_env.NODE_APP_INSTANCE}.delay:${pm2_env.axm_monitor[
  //   'Loop delay'
  // ].value.replace('ms', '')}|t`
};

const parseMsg = raw => {
  const { monit, processes = [], system_info } = raw;
  let msgs = [];
  processes.forEach(p => {
    msgs = msgs.concat(parseProcesse(p));
  });
  return msgs;
};

module.exports = { parseMsg };
