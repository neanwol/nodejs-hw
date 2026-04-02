import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

const notes = express();
const PORT = process.env.PORT || 3000;

notes.use(cors());
notes.use(pinoHttp());
notes.use(express.json());
notes.use(cors());
notes.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

notes.get('/', (req, res) =>
  res.status(200).json({ "message": "Retrieved all notes" })
);

notes.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

notes.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ noteId,
    "message": `Retrieved note with ID: ${noteId}`
  });
});

notes.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

notes.get('/test-error', () => {
  // eslint-disable-next-line no-undef
  res.status(500).json({ message: 'Simulated server error' });
  throw new Error('Simulated server error');
});
