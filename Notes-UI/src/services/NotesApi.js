import axios from 'axios';
axios.defaults.withCredentials = true;

class NotesApi {
    #apiUrl;
    #userUrl;
    constructor() {
        this.#apiUrl = `/api/notes`;
        this.#userUrl = `/api/users`;
    }

    getAllNotes = async () => {
        return await axios.get(this.#apiUrl);
    };

    addNote = async (note) => {
        return axios.post(this.#apiUrl, note);
    };

    getNoteById = async (id) => {
        return await axios.get(`${this.#apiUrl}/${id}`);
    };

    deleteNote = async (id) => {
        return axios.delete(`${this.#apiUrl}/${id}`);
    };

    updateNote = async (id, note) => {
        return axios.put(`${this.#apiUrl}/${id}`, note, {
            headers: {
                'Access-Control-Request-Method': 'PUT',
            },
        });
    };

    // get logged in user info
    getLoggedInUser = async () => {
        return axios.get(`${this.#userUrl}/profile`);
    };

    // call backend auth api
    authenticateUser = async (user) => {
        return axios.post(`${this.#userUrl}/auth`, user);
    };

    logout = async () => {
        return axios.post(`${this.#userUrl}/logout`);
    };

    registerUser = async (user) => {
        return axios.post(`${this.#userUrl}/register`, user);
    };

    updateUser = async (user) => {
        return axios.put(`${this.#userUrl}/profile`, user);
    };
}

export default new NotesApi();
