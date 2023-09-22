import appLogo from '../assets/dummy-pfp.jpg';
import NotesApi from '../services/NotesApi';
import { removeEMessage, showMessage } from '../utils/showFormError';
import { showSpinner, hideSpinner } from '../utils/utils';

class TopNavBar {
    #darkLightMode;
    #profileIcon;
    #profileModal;
    #user;
    #modalOverlay;
    constructor() {
        this.#user = {};
        this.#darkLightMode = document.querySelector('.dark-light-toggle');
        this.#profileIcon = document.querySelector('#profile-pic');
        this.#profileModal = document.querySelector('.user-modal');
        this.#modalOverlay = document.querySelector('.modal-overlay');
        this.getLoggedInUser();
        this.addEventListener();
    }

    addEventListener = () => {
        this.#darkLightMode.addEventListener(
            'click',
            this.toggleDarkMode.bind(this)
        );

        this.#profileIcon.addEventListener('click', this.openUserModal);

        document.addEventListener('click', this.closeUserModal);
    };

    getLoggedInUser = async () => {
        try {
            const res = await NotesApi.getLoggedInUser();
            const userData = res.data;

            this.#user = {
                _id: userData._id,
                email: userData.email,
                username: userData.username,
                image: userData.image,
            };
        } catch (err) {
            console.log(err);
        }
    };

    setProfilePicture = () => {
        this.#profileIcon.src = this.#user.image;
    };

    openUserModal = async () => {
        this.#profileModal.classList.toggle('hidden');

        this.#profileModal.innerHTML = `
            <p class="email">${this.#user.email}</p>
            <img pfp src="${appLogo}" alt="" />
            <p class="displayName">Hi, ${this.#user.username}!</p>
            <div class="profile-options flex">
                <a id="edit-profile" class="flex">
                    <i class="ri-pencil-line"></i>
                    <p>Edit profile</p>
                </a>
                <a id="logout" class="flex">
                    <i class="ri-logout-box-r-line"></i>
                    <p>Sign out</p>
                </a>
            </div>
            
            `;
        document
            .querySelector('#logout')
            .addEventListener('click', async () => {
                showSpinner();
                try {
                    await NotesApi.logout();
                    hideSpinner();
                    document.location.hash = '/#/login';
                } catch (err) {
                    console.log('Something went wrong');
                }
            });

        document
            .querySelector('#edit-profile')
            .addEventListener('click', this.openEditProfileModal);
    };

    openEditProfileModal = () => {
        this.#modalOverlay.style.display = 'flex';

        const formModal = document.createElement('div');
        formModal.classList.add('form-container', 'edit-profile-form');
        formModal.innerHTML = `
        <form action="#">
            <h3>Edit your profile</h3>
            <div class="form-header">Leave the fields blank which you don't want to update</div>
            <div class="form-control">
                <label for="username">Display name</label>
                <input type="text" name="username" id="username" value="${
                    this.#user.username
                }"/>
            </div>
            <div class="form-control">
                <label for="password">New Password</label>
                <input type="password" name="password" id="password" value=''/>
            </div>
            <input id="form-submits" type="submit" value="Submit" />
        </form>`;

        this.#modalOverlay.appendChild(formModal);

        const form = document.querySelector('form');
        const pswField = document.querySelector('#password').parentElement;

        this.submitEditProfileForm(form, pswField);

        document.addEventListener('click', (e) => {
            if (e.target === this.#modalOverlay) {
                this.closeEditProfileModal();
            }
        });
    };

    submitEditProfileForm = (form, pswField) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            removeEMessage(pswField);
            const formData = new FormData(form);

            const userObj = {
                ...({} && { _id: this.#user._id }),
                ...(formData.get('username') !== '' && {
                    username: formData.get('username'),
                }),
                ...(formData.get('password') !== '' && {
                    password: formData.get('password'),
                }),
            };

            if (
                formData.get('username') === '' &&
                formData.get('password') === ''
            ) {
                showMessage(`Please enter at least one field.`, pswField);
                return;
            }
            showSpinner();
            const res = await NotesApi.updateUser(userObj);
            if (userObj.password) {
                await NotesApi.logout();
                document.location.hash = '/login';
            }
            this.closeEditProfileModal();
            hideSpinner();
            this.#user.username = res.data.username;
        });
    };

    closeEditProfileModal = () => {
        this.#modalOverlay.style.display = 'none';
        this.#modalOverlay.innerHTML = '';
    };

    closeUserModal = (e) => {
        if (
            !e.target.closest('.user-modal') &&
            e.target !== this.#profileIcon
        ) {
            this.#profileModal.classList.add('hidden');
        }
    };

    toggleDarkMode = () => {
        const noteCard = document.querySelectorAll('.note-card');
        noteCard.forEach((note) => note.classList.toggle('dark'));
        document.documentElement.classList.toggle('dark');

        if (document.documentElement.classList.contains('dark')) {
            this.#darkLightMode.firstElementChild.className = 'ri-sun-fill';
            localStorage.setItem('darkLightMode', 'dark');
        } else {
            this.#darkLightMode.firstElementChild.className = 'ri-moon-fill';
            localStorage.setItem('darkLightMode', 'light');
        }
    };

    setMode = () => {
        localStorage.getItem('darkLightMode') === 'dark' &&
            document.documentElement.classList.add('dark');
    };
}
export default TopNavBar;
