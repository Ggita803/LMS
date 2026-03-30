const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../constants/appConstants');

// Protected Routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);

// Admin Routes
router.get('/', authenticate, authorize(ROLES.ADMIN,ROLES.LIBRARIAN), UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUser);

module.exports = router;
