const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('colors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dbConnect = require('./config/db');
const notesRouter = require('./Routes/notesRoute');
const userRoute = require('./Routes/userRoute');
const cors = require('cors');

global.appRoot = path.resolve(__dirname);

const port = process.env.SERVER_PORT || 8850;

const app = express();

dbConnect();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3001',
    })
);

app.use('/', (req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
});
// middleware for parsing json and url params
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// middleware for using morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// middleware for routing api end point
app.use('/api/users', userRoute);
app.use('/api/notes', notesRouter);

app.use(express.static(path.join(__dirname, './public')));

app.listen(port, () => {
    console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${port}...`.red
    );
});
