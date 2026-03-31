const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../constants/appConstants');

// Protected Routes
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);


// Admin & Librarian Routes
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUser);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), UserController.deleteUser);

module.exports = router;
