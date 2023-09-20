import router from './routes/router';

import './css/style.css';
import './css/loading.css';

window.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('darkLightMode') === 'dark' &&
        document.documentElement.classList.add('dark');
});
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
