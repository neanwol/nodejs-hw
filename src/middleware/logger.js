import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

let logger;

if (process.env.NODE_ENV === 'production') {
  logger = pino();
} else {
  logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  });
}

export default logger;
