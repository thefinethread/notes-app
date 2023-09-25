import NotesApi from '../services/NotesApi';
import Masonry from 'masonry-layout';
import { hideSpinner } from '../utils/utils';
import notesList from '../components/Notes';

class NotesList {
    #otherNotes;
    #notesContainer;
    #pinnedNotes;
    #notesContainerTag;
    #noNotesContainer;
    constructor() {
        this.#noNotesContainer = document.querySelector('#no-notes');
        this.#pinnedNotes = document.querySelector('.pinned-notes');
        this.#otherNotes = document.querySelector('.others-notes');
        this.#notesContainer = document.querySelector('.notes-container');
        this.#notesContainerTag = document.querySelectorAll('.notes-tag');
        this.getAllNotes();
        this.addEventListeners();
    }

    addEventListeners = () => {
        this.#notesContainer.addEventListener('click', (e) => {
            if (e.target.closest('.right-options')) {
                this.deleteNote(e.target.closest('.note-card').dataset.id);
                e.stopImmediatePropagation();
            } else if (e.target.closest('.pin-note')) {
                this.pinNote(
                    e.target,
                    e.target.closest('.note-card').dataset.id
                );
                e.stopImmediatePropagation();
            }
        });
    };

    getAllNotes = async () => {
        try {
            const res = await NotesApi.getAllNotes();
            const notes = res.data.data;
            notesList.unpinnedArr = notes.filter((note) => !note.pinned);
            notesList.pinnedArr = notes.filter((note) => note.pinned);

            this.render();
            hideSpinner();
        } catch (error) {
            console.log(error);
        }
    };

    addNoteToList = (note) => {
        note.pinned
            ? notesList.pinnedArr.unshift(note)
            : notesList.unpinnedArr.unshift(note);
        this.render();
    };

    updateNotesList = (note) => {
        const allNotes = [...notesList.unpinnedArr, ...notesList.pinnedArr];

        const index = allNotes.findIndex((el) => el._id === note._id);

        if (note.pinned === allNotes[index].pinned) {
            if (note.pinned) {
                notesList.pinnedArr.splice(
                    index - notesList.unpinnedArr.length,
                    1
                );
                notesList.pinnedArr.unshift(note);
            } else {
                notesList.unpinnedArr.splice(index, 1);
                notesList.unpinnedArr.unshift(note);
            }
        } else {
            if (note.pinned) {
                notesList.unpinnedArr.splice(index, 1);
                notesList.pinnedArr.unshift(note);
            } else {
                notesList.pinnedArr.splice(
                    index - notesList.unpinnedArr.length,
                    1
                );
                notesList.unpinnedArr.unshift(note);
            }
        }
        this.render();
    };

    deleteNote = async (id) => {
        this.deleteNoteFromList(id);
        this.render();
        await NotesApi.deleteNote(id);
    };

    deleteNoteFromList = (id) => {
        const list = [...notesList.pinnedArr, ...notesList.unpinnedArr];

        const index = list.findIndex((note) => note._id === id);
        if (index < notesList.pinnedArr.length) {
            notesList.pinnedArr.splice(index, 1);
        } else {
            notesList.unpinnedArr.splice(index - notesList.pinnedArr.length, 1);
        }
    };

    pinNote = async (el, id) => {
        const pinnedNote = {};
        el.className === 'ri-pushpin-2-line'
            ? (el.className = 'ri-pushpin-2-fill')
            : (el.className = 'ri-pushpin-2-line');

        const allNotes = [...notesList.unpinnedArr, ...notesList.pinnedArr];

        allNotes.forEach((note, index) => {
            let noteToMove;
            if (note._id === id) {
                noteToMove = note;
                if (noteToMove.pinned) {
                    noteToMove.pinned = false;
                    notesList.pinnedArr.splice(
                        index - notesList.unpinnedArr.length,
                        1
                    );
                    notesList.unpinnedArr.unshift(noteToMove);
                } else {
                    noteToMove.pinned = true;
                    notesList.unpinnedArr.splice(index, 1);
                    notesList.pinnedArr.unshift(noteToMove);
                }
            }
        });
        this.render();

        const res = await NotesApi.getNoteById(id);
        const note = res.data.data;

        pinnedNote.pinned = !note.pinned;

        await NotesApi.updateNote(id, pinnedNote);
    };

    renderMasonryLayout = () => {
        document.querySelectorAll('.grid').forEach((el) => {
            new Masonry(el, {
                // options
                itemSelector: '.grid-item',
                horizontalOrder: true,
                fitWidth: true,
                originLeft: true,
            });
        });
    };

    render = () => {
        if ([...notesList.unpinnedArr, ...notesList.pinnedArr].length === 0) {
            this.#notesContainerTag.forEach(
                (tag) => (tag.style.display = 'none')
            );
            Array.of(this.#pinnedNotes, this.#otherNotes).forEach((arr) => {
                arr.innerHTML = '';
                arr.style.height = '0px';
            });
            this.#noNotesContainer.style.display = 'block';
        } else {
            this.#noNotesContainer.style.display = 'none';

            if (notesList.pinnedArr.length === 0) {
                this.#notesContainerTag.forEach((tag) => {
                    tag.style.display = 'none';
                });
                this.#pinnedNotes.style.display = 'none';
            } else if (notesList.pinnedArr.length !== 0) {
                this.#notesContainerTag.forEach((tag, index) => {
                    if (index === 1 && notesList.unpinnedArr.length === 0) {
                        tag.style.display = 'none';
                    } else {
                        tag.style.display = 'block';
                    }
                });
                this.#pinnedNotes.style.display = 'block';
                this.renderPinnedNotes();
            }
            this.renderOtherNotes();
            this.renderMasonryLayout();
        }
    };

    renderPinnedNotes = () => {
        this.#pinnedNotes.innerHTML = notesList.pinnedArr
            .map((note) => this.renderInnerHtml(note))
            .join('');
    };

    renderOtherNotes = () => {
        this.#otherNotes.innerHTML = notesList.unpinnedArr
            .map((note) => this.renderInnerHtml(note))
            .join('');
    };

    renderInnerHtml = (note) => {
        return `
        <div data-id="${note._id}" class="note-card grid-item flex ${
            note.background === 'default' ? 'show-border' : ''
        } color-${note.background} ${
            localStorage.getItem('darkLightMode') === 'light' ? '' : 'dark'
        }">
            <div class="note-content">
                <h4 class="note-title">${note.title ? note.title : ''}</h4>
                <p class="note-details">${note.note}</p>
            </div>
            <div class="bottom-icons flex">
                <ul class="left-options flex">
                    <li title="Pin note" class="pin-note"><i class="ri-pushpin-2-${
                        note.pinned ? 'fill' : 'line'
                    }"></i></li>
                </ul>
                <div  title="Delete note" class="right-options">
                    <i class="ri-delete-bin-7-line"></i>
                </div>
            </div>
        </div>
        `;
    };
}

export default NotesList;
