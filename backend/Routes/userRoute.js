const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} = require('../controller/userController');

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
