import NotesApi from './NotesApi';
import NotesList from '../components/NotesList';

class NoteForm {
    #noteTitle;
    #noteDesc;
    #saveNoteBtn;
    #notesList;
    #notesContainer;
    #noteInputContainer;
    constructor() {
        this.#noteTitle = document.querySelector('#note-title');
        this.#noteDesc = document.querySelector('#note-desc');
        this.#saveNoteBtn =
            document.querySelector('.btn-actions').firstElementChild;
        this.#noteInputContainer = document.querySelector('.note-input');
        this.#notesList = new NotesList();
        this.#notesContainer = document.querySelector('.notes-container');

        this.addEventListeners();
    }

    addEventListeners = () => {
        this.#saveNoteBtn.addEventListener(
            'click',
            this.#saveNoteBtn.id === 'save-note'
                ? this.addNote.bind(this)
                : this.updateNote.bind(this)
        );

        this.#notesContainer.addEventListener('click', (e) => {
            if (e.target.closest('.right-options')) {
                this.deleteNote(e.target.closest('.note-card').dataset.id);
                e.stopImmediatePropagation();
            }
        });
    };

    deleteNote = async (id) => {
        this.deleteNoteFromList(id);
        await NotesApi.deleteNote(id);
        this.render();
    };

    deleteNoteFromList = (id) => {
        const list = [
            ...this.#notesList.pinnedNotesList,
            ...this.#notesList.otherNotesList,
        ];
        const index = list.findIndex((note) => note._id === id);
        if (index < this.#notesList.pinnedNotesList.length) {
            this.#notesList.pinnedNotesList.splice(index, 1);
        } else {
            this.#notesList.otherNotesList.splice(
                index - this.#notesList.pinnedNotesList.length,
                1
            );
        }
    };

    addNote = async () => {
        const pinnedEl =
            this.#noteInputContainer.querySelector('.pin-note-pushpin');
        const note = {
            title: this.#noteTitle.innerText.trim(),
            note: this.#noteDesc.innerText.trim(),
            username: 'default',
            pinned: pinnedEl.classList.contains('ri-pushpin-2-fill'),
            background: `${Array.from(this.#noteInputContainer.classList)
                .find((cls) => cls.includes('color-'))
                .replace('color-', '')}`,
        };

        if (note === '') return;

        const res = await NotesApi.addNote(note);
        const savedNote = res.data.data;

        this.#notesList.addNoteToList(savedNote);

        // dispatch event for closing form modal
        document.dispatchEvent(new Event('close-modal'));
    };

    updateNote = async (e) => {
        const noteId = e.target.closest('.note-modal').dataset.id;
        const pinnedEl =
            this.#noteInputContainer.querySelector('.pin-note-pushpin');

        const note = {
            title: this.#noteTitle.innerText.trim(),
            note: this.#noteDesc.innerText.trim(),
            username: 'default',
            pinned: pinnedEl.classList.contains('ri-pushpin-2-fill'),
            background: `${Array.from(e.target.closest('.note-modal').classList)
                .find((cls) => cls.includes('color-'))
                .replace('color-', '')}`,
        };

        if (note === '') return;

        const res = await NotesApi.updateNote(noteId, note);
        const data = res.data.data;

        this.#notesList.updateNotesList(data);

        // dispatch event to close modal
        document.dispatchEvent(new Event('close-modal'));
    };
}

export default NoteForm;
