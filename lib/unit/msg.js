const parseProcesse = p => {
  const msgs = [];
  const { name, pid, monit, pm2_env } = p;
  return [
    `${name}.${pm2_env.instances}.cpu:${monit.cpu}|t`,
    `${name}.${pm2_env.instances}.mem:${Math.floor(
      monit.memory / (1024 * 1024)
    )}|t`,
    `${name}.${pm2_env.instances}.delay:${pm2_env.axm_monitor[
      'Loop delay'
    ].value.replace('ms', '')}|t`
  ];
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
