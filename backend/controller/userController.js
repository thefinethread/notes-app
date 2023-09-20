const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, {
                _id: user._id,
                username: user.username,
                email: user.email,
            });
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: `Internal server error. ${err}` });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const newUser = await User.create({ username, email, password });

        if (newUser) {
            generateToken(res, {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            });

            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user details.' });
        }
    } catch (err) {
        res.status(500).json({ message: `Internal server error. ${err}` });
    }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: new Date(0),
    });

    res.status(200).json({ message: 'User logged out' });
};

const getUserProfile = (req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    };

    res.status(200).json(user);
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.body._id);

    if (user) {
        user.username = req.body.username || user.username;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
};

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};
