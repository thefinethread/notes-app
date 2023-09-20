import NotesList from '../components/NotesList';
import TopNavBar from '../components/TopNavBar';
import FormModal from '../components/AddNoteModal';
import profilePic from '../assets/dummy-pfp.jpg';

const HomeScreen = {
    render: () => {
        return `<!-- modal for displaying user info -->
        <div class="user-modal flex hidden"></div>

        <div class="modal modal-overlay flex"></div>

        <nav class="top-nav flex">
            <ul class="left-nav flex">
                <li class="app-value flex">
                    <h3>Notes</h3>
                </li>
            </ul>
            <ul class="right-nav flex">
                <li title="toggle-theme" class="dark-light-toggle flex">
                    <i class="ri-sun-fill"></i>
                </li>
                <li title="profile" class="profile-menu flex">
                    <img src=${profilePic} id="profile-pic" alt="profile-picture" />
                </li>
            </ul>
        </nav>
        <section class="add-note flex">
            <div id="note-input-before-expand" class="note-input before-expand">
                Take a note...
            </div>
        </section>

        <section class="notes-container">
            <p class="notes-tag">pinned</p>
            <div class="pinned-notes grid"></div>
            <p class="notes-tag">others</p>
            <div class="others-notes grid"></div>
            <div id="no-notes">
                Start capturing your thoughts and ideas by creating your first note!
            </div>
        </section>

        <div class="loading"></div>`;
    },

    afterRender: () => {
        new NotesList();
        new TopNavBar();
        new FormModal();
    },
};

export default HomeScreen;
