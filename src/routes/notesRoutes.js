import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { createNotes } from '../controllers/notesController.js';
import { noteIdSchema, notesSchema } from '../validations/notesValidation.js';
import { getAllNotesSchema } from '../validations/studentsValidation.js';
import { updateNoteSchema } from '../validations/notesValidation.js';



const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

router.post('/notes', celebrate(notesSchema), createNotes);

export default router;
