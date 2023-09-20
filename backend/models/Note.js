const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        note: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        background: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
