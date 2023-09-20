import NotesApi from '../services/NotesApi.js';
import HomeScreen from '../screens/HomeScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import { parseRequestUrl } from '../utils/utils.js';
import NotFound from '../screens/NotFound.js';

const routes = {
    '/': HomeScreen,
    '/login': LoginScreen,
};

const router = async () => {
    try {
        const user = await NotesApi.getLoggedInUser();
        if (user) {
            document.location.hash = '/';
        }
    } catch (err) {
        document.location.hash = '/login';
    }

    const request = parseRequestUrl();
    const parseUrl = request ? `/${request}` : '/';
    const screen = routes[parseUrl] ? routes[parseUrl] : NotFound;

    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = screen.render();
    screen.afterRender();
};

export default router;
