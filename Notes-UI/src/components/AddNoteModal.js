import NoteInput from './NoteInput';
import NoteForm from '../services/NoteActions';
import ColorPalette from './ColorPalette';
import notesList from '../components/Notes';

class FormModal {
    #notesContainer;
    #modalOverlay;
    #noteInputBeforeExpand;
    #formInput;
    constructor() {
        this.#noteInputBeforeExpand = document.querySelector(
            '#note-input-before-expand'
        );
        this.#modalOverlay = document.querySelector('.modal-overlay');
        this.#notesContainer = document.querySelector('.notes-container');
        this.addEventListeners();
    }

    addEventListeners = () => {
        this.#notesContainer.addEventListener(
            'click',
            this.openModal.bind(this, false)
        );

        this.#noteInputBeforeExpand.addEventListener(
            'click',
            this.openModal.bind(this, true)
        );

        document.addEventListener('close-modal', this.closeModal.bind(this));

        this.#modalOverlay.addEventListener('click', (e) => {
            e.target === this.#modalOverlay && this.closeModal();
        });
    };

    openModal = async (isNewNote, e) => {
        if (isNewNote) {
            this.createFormInput(isNewNote, null);
            this.#modalOverlay.appendChild(this.#formInput);
            this.#modalOverlay.style.display = 'flex';

            this.listenForPinnedIconClick();
            new NoteForm();
            new ColorPalette();
        } else if (
            (e.target.offsetParent.classList.contains('note-card') &&
                !e.target.parentElement.classList.contains('pin-note')) ||
            e.target === this.#noteInputBeforeExpand
        ) {
            const allNotes = [...notesList.pinnedArr, ...notesList.unpinnedArr];
            const note = allNotes.find(
                (noteEl) => noteEl._id === e.target.offsetParent.dataset.id
            );

            this.createFormInput(isNewNote, note);
            this.#modalOverlay.appendChild(this.#formInput);
            this.#modalOverlay.style.display = 'flex';
            this.#formInput.classList.replace(
                'default',
                `color-${note.background}`
            );

            this.#formInput.dataset.id = e.target.offsetParent.dataset.id;

            this.listenForPinnedIconClick();
            new NoteForm();
            new ColorPalette();
        }
    };

    createFormInput = (isNewNote, note) => {
        this.#formInput = document.createElement('div');
        this.#formInput.className = `note-modal note-input after-expand ${
            (note && note.background === 'default') || isNewNote
                ? 'show-border'
                : ''
        } color-${isNewNote ? 'default' : note.background}`;

        localStorage.getItem('darkLightMode') === 'dark' &&
            this.#formInput.classList.add('dark');
        this.#formInput.innerHTML = NoteInput.render(isNewNote, note);
    };

    listenForPinnedIconClick = () => {
        document.querySelector('.note-modal').addEventListener('click', (e) => {
            if (e.target.className.includes('pin-note')) {
                const pushpinEl =
                    e.target.closest('.pin-note').firstElementChild;

                pushpinEl.classList.contains('ri-pushpin-2-line')
                    ? pushpinEl.classList.replace(
                          'ri-pushpin-2-line',
                          'ri-pushpin-2-fill'
                      )
                    : pushpinEl.classList.replace(
                          'ri-pushpin-2-fill',
                          'ri-pushpin-2-line'
                      );
            }
        });
    };

    closeModal = () => {
        if (this.#formInput) {
            this.#formInput.remove();
            this.#modalOverlay.style.display = 'none';
        }
    };
}

export default FormModal;
