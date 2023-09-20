class NoteInput {
    formatDate = (note, isCreatedAtOrUpdatedAt) => {
        const date = new Date(
            isCreatedAtOrUpdatedAt === 'createdAt'
                ? note.createdAt
                : note.updatedAt
        )
            .toDateString()
            .split(' ')
            .splice(1, 2)
            .reverse()
            .join(' ');
        return date;
    };

    render = (isNewNote, note) => {
        const date = !isNewNote && this.formatDate(note, 'createdAt');

        const dateEl = `<div title="${
            isNewNote ? '' : 'Created ' + this.formatDate(note, '')
        }" class="timestamp">${isNewNote ? '' : `Edited ` + date}</div>`;

        const pinEl = `<i class="pin-note-pushpin ri-pushpin-2-${
            isNewNote ? 'line' : note.pinned ? 'fill' : 'line'
        }"></i>`;

        return `
                <div
                    id="note-title"
                    contenteditable="true"
                    placeholder="Title"
                >${isNewNote ? '' : note.title}</div>
                <div
                    id="note-desc"
                    contenteditable="true"
                    placeholder="Take a note..."
                >${isNewNote ? '' : note.note}</div>
                <div class="note-bottom flex">
                    <ul class="note-option flex">
                        <li  title="Pin note" class="pin-note flex">${pinEl}</li>
                        <li  title="Background color" class="color-palette-icon  flex">
                            <i class="ri-palette-line"></i>
                        </li>
                    </ul>
                    ${dateEl}
                    <ul class="btn-actions flex">
                        <li id="${isNewNote ? 'save' : 'update'}-note">${
            isNewNote ? 'Save' : 'Update'
        }</li>
                    </ul>
                </div>
        `;
    };
}

export default new NoteInput();
