const Note = require('../models/Note');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({
            updatedAt: 'desc',
        });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            return res.status(200).json({ success: true, data: note });
        }
        res.status(404).json({
            success: false,
            message: 'Requested resource not found.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

const getNotesByUserId = async (req, res) => {
    if (!req.body.username) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    try {
        const notes = await Note.find({ username: req.body.username });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Resource not found' });
    }
};

const createNote = async (req, res) => {
    const newNote = {
        title: req.body.title,
        note: req.body.note,
        user: req.user._id,
        pinned: req.body.pinned,
        background: req.body.background,
    };
    try {
        const savedNote = await Note.create(newNote);
        res.status(201).json({ success: true, data: savedNote });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    note: req.body.note,
                    background: req.body.background,
                    pinned: req.body.pinned,
                },
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Note successfully deleted.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

module.exports = {
    getAllNotes,
    getNotesByUserId,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
