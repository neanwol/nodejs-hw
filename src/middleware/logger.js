import pino from 'pino';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

let pinoInstance;

if (process.env.NODE_ENV === 'production') {
  pinoInstance = pino();
} else {
  pinoInstance = pino({
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

export const logger = pinoHttp(pinoInstance);
