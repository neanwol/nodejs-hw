import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import logger from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import { getAllNotes, getNoteById } from './controllers/notesController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(pinoHttp( logger));
app.use(express.json());
app.use(cors());


app.get('/notes', getAllNotes);

app.get('/notes/:noteId', getNoteById);


app.get('/test-error', (req, res, next) => {
  try {
  throw new Error('Simulated server error');
} catch (error) {
  next(error);
}
});

app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
