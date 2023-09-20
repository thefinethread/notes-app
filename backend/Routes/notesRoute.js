const express = require('express');
const router = express.Router();
const {
    getAllNotes,
    getNotesByUserId,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} = require('../controller/noteController');

const { protect } = require('../middlewares/auth');

router.get('/', protect, getAllNotes);
router.get('/user', getNotesByUserId);
router.get('/:id', getNoteById);
router.post('/', protect, createNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

module.exports = router;
