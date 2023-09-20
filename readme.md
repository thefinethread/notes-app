# Notes Taking App

This is a full-stack vanilla JavaScript notes-taking application that allows users to create, update, delete, and organize notes. It utilizes MongoDB, Express.js, and Webpack to provide a seamless user experience.

## Features

-   Create new notes with titles and content.
-   Edit existing notes.
-   Delete unwanted notes.
-   Add background color to the notes
-   Organize notes into categories.
-   User authentication: login and account creation.
-   User profile editing.
-   Theme switching between dark and light modes.
-   Responsive design for mobile and desktop.

## Technologies Used

-   **Frontend**:

    -   HTML5
    -   CSS3
    -   Vanilla JavaScript
    -   Webpack for bundling and module management

-   **Backend**:
    -   Node.js
    -   Express.js for server-side routing
    -   MongoDB for data storage
    -   JWT for user authentication

## JWT Authentication via HTTP-only Cookie

User authentication in this app is handled using JSON Web Tokens (JWT), which are securely stored in HTTP-only cookies. This method provides enhanced security by preventing client-side JavaScript from accessing the JWT, reducing the risk of certain attacks like Cross-Site Scripting (XSS).

-   When a user logs in or creates an account, a JWT token is generated on the server.
-   This JWT token is securely stored in an HTTP-only cookie.
-   Subsequent requests to protected routes include the JWT token from the cookie, enabling authentication.
-   The server validates the JWT token, ensuring the user's identity and protecting sensitive user data.

By using HTTP-only cookies, this app ensures that JWT tokens are kept safe from client-side JavaScript, enhancing security and protecting user authentication.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/thefinethread/notes-app.git
    cd notes-app
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    cd Notes-UI
    npm install
    cd ../backend
    npm install
    ```

3. Configure your MongoDB connection:

    - Create a `.env` file in the `backend` directory.
    - Add your MongoDB connection string as `MONGO_URI` in the `.env` file.

4. Configure the port for your server in the `.env` file:

    - Open the `.env` file in the `backend` directory.
    - Add the following line to set the port (replace `your_port_number` with your desired port number):
        ```
        PORT=your_port_number
        ```

5. Build the frontend using Webpack:

    ```bash
    cd frontend
    npm run build
    ```

6. Start the server:

    ```bash
    cd ../backend
    npm start
    ```

7. Open your browser and navigate to `http://localhost:your_port_number` to access the app.

## Usage

-   Create a new note by clicking the "Take a note..." input field.
-   Click on a note to edit its title and content.
-   Use the "Delete" button to remove unwanted notes.
-   Organize notes into categories as needed.
-   Log in or create an account to save and manage your notes using JWT authentication.
-   Edit your user profile.
-   Switch between dark and light modes using the theme switcher

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them with clear messages.
4. Push your changes to your fork.
5. Create a pull request to the original repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact Kartikey Shukla at kartikey8604@gmail.com.

---

Feel free to customize this README with your project-specific details, such as your project's name, screenshot, installation instructions, and contact information. Additionally, replace `[Your Name]`, `[Your Email Address]`, and other placeholders with your actual information.
