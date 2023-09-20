class ColorPalette {
    #modalColorPalette;
    #colorPaletteEl;
    #colors;
    #noteInput;
    #colorsList;
    constructor() {
        this.#colorsList = [
            'default',
            'coral',
            'peach',
            'sand',
            'mint',
            'sage',
            'fog',
            'storm',
            'dusk',
            'blossom',
            'clay',
            'chalk',
        ];
        this.createColorPaletteModal();
        this.#colorPaletteEl = document.querySelector(
            '.color-palette-icon.flex'
        );
        this.#noteInput = document.querySelector('.note-input');
        this.addEventListeners();
    }

    addEventListeners = () => {
        this.#colorPaletteEl.addEventListener(
            'click',
            this.openClosePalette.bind(this)
        );

        document.addEventListener(
            'close-color-modal',
            this.openClosePalette.bind(this)
        );

        document.addEventListener('click', this.openClosePalette.bind(this));
    };

    createColorPaletteModal = () => {
        this.#modalColorPalette = document.createElement('div');
        this.#modalColorPalette.className = 'modal-color-palette flex';
        this.render();
    };

    openClosePalette = (e) => {
        if (e.target.closest('.color-palette-icon') && this.#noteInput) {
            if (!this.#modalColorPalette.classList.contains('show')) {
                this.#modalColorPalette.classList.add('show');
                this.#noteInput.appendChild(this.#modalColorPalette);

                this.#colors = document.getElementsByName('colors');
                this.listenForColorInputChange();
            } else {
                this.#modalColorPalette.classList.remove('show');
                this.#modalColorPalette.remove();
            }
            e.stopImmediatePropagation();
        }
    };

    setBackgroundColor = (e) => {
        this.#noteInput = e.target.closest('.note-input');

        e.target.id === 'default'
            ? this.#noteInput.classList.add('show-border')
            : this.#noteInput.classList.remove('show-border');

        const prevClass = Array.from(this.#noteInput.classList).find((cls) =>
            cls.includes('color-')
        );

        this.#noteInput.classList.remove(prevClass);

        this.#noteInput.classList.add(`color-${e.target.id}`);
        e.stopImmediatePropagation();
    };

    listenForColorInputChange = () => {
        this.#colors = document.getElementsByName('color');
        this.#colors.forEach((color) =>
            color.addEventListener('click', this.setBackgroundColor.bind(this))
        );
    };

    render = () => {
        const colorOfContainer = Array.from(
            document.querySelector('.note-input').classList
        )
            .find((cls) => cls.includes('color-'))
            .replace('color-', '');

        this.#modalColorPalette.innerHTML = this.#colorsList
            .map((color) => {
                return `
                <div class="color-container color-${color} ${
                    localStorage.getItem('darkLightMode') === 'light'
                        ? ''
                        : 'dark'
                }">
                    <input
                        type="radio"
                        id="${color}"
                        value="eb6e82"
                        name="color"
                        ${color === colorOfContainer ? 'checked' : ''}
                    />
                    <label title="${color}" for="${color}"></label>
                </div>
                `;
            })
            .join('');
    };
}

export default ColorPalette;
