import NotesApi from '../services/NotesApi';
import { showMessage, removeEMessage } from '../utils/showFormError';
import { showSpinner } from '../utils/utils';

const LoginScreen = {
    authenticate: async () => await NotesApi.authenticateUser(),

    render: () => {
        return `<div class="login flex">
        <div class="app-heading">Notes</div>
        <div class="form-container">
            <form>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input class="login-input" type="text" name="email" id="email" required/>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input class="login-input" type="password" name="password" id="password" required/>
                </div>
                <input id="form-submits" type="submit" value="login" />
            </form>
            <div class="sign-up-text">
                Don’t have an account? <a id="redirect-to-signup">Sign up</a>
        </div>
    </div>
    <div class="loading"></div>`;
    },

    renderSignUp: () => {
        return `<div class="login flex">
        <div class="app-heading">Notes</div>
        <div class="form-container">
            <form action="#">
                <div class="form-control">
                    <label for="username">Display name</label>
                    <input class="login-input" type="text" name="username" id="username required" />
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input class="login-input" type="text" name="email" id="email" required />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input class="login-input" type="password" name="password" id="password" required />
                </div>
                <input id="form-submits" type="submit" value="Sign up" />
            </form>
            <div class="sign-up-text">
                Already have an account? <a id="redirect-to-login">Login</a>
        </div>
    </div>
    <div class="loading"></div>`;
    },

    showSignUpScreen: () => {
        document.body.innerHTML = LoginScreen.renderSignUp();
        const form = document.querySelector('form');
        const emailField = document.querySelector('#email').parentElement;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const re = /^\S+@\S+\.\S+$/;

            removeEMessage(emailField);

            const formData = new FormData(form);
            const email = formData.get('email');

            if (!re.test(email)) {
                showMessage(
                    `${email} is not a valid email address.`,
                    emailField
                );
                return;
            }
            try {
                await NotesApi.registerUser({
                    username: formData.get('username'),
                    email,
                    password: formData.get('password'),
                });

                showSpinner();
                document.location.hash = '/';
            } catch (err) {
                if (err.response.status === 409) {
                    showMessage(`${email} already exists.`, emailField);
                } else {
                    showMessage('Internal server Error', emailField);
                }
            }
        });

        document
            .querySelector('#redirect-to-login')
            .addEventListener('click', LoginScreen.showLoginScreen);
    },

    showLoginScreen: () => {
        document.body.innerHTML = LoginScreen.render();

        LoginScreen.afterRender();
    },

    afterRender: () => {
        const form = document.querySelector('form');
        const pswField = document.querySelector('#password').parentElement;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            removeEMessage(pswField);
            const formData = new FormData(form);

            try {
                await NotesApi.authenticateUser({
                    email: formData.get('email'),
                    password: formData.get('password'),
                });
                showSpinner();
                document.location.hash = '/';
            } catch (err) {
                if (err.response.status === 401) {
                    showMessage(`Invalid email or password.`, pswField);
                } else {
                    showMessage('Internal server Error', pswField);
                }
            }
        });

        document
            .querySelector('#redirect-to-signup')
            .addEventListener('click', LoginScreen.showSignUpScreen);
    },
};

export default LoginScreen;
