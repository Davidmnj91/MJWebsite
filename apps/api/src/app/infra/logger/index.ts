import * as Pino from 'pino';

const logger = Pino({
  level: process.env.LOG_LEVEL || 'warn',
  prettyPrint: {
    levelFirst: true,
  },
});

export { logger };
