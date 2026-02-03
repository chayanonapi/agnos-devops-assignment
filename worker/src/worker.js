const logger = require('./logger');

logger.info({ service: 'worker' }, 'Worker started');

setInterval(() => {
  logger.info(
    { service: 'worker', event: 'heartbeat', 
    job: "update_timestamp",  timestamp: new Date().toISOString()},
    'Worker alive'
  );
}, 10000);