import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(cors());
app.use(pinoHttp( logger));
app.use(express.json());

app.get('/notes', (req, res) =>
  res.status(200).json({ "message": "Retrieved all notes" })
);

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ noteId,
    "message": `Retrieved note with ID: ${noteId}`
  });
});

app.get('/test-error', (req, res, next) => {
  try {
  throw new Error('Simulated server error');
} catch (error) {
  next(error);
}
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  req.log.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
