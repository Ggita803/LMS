const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const { authenticate, authorize } = require('../middleware/auth');
const { bookValidator } = require('../validators/validators');
const { ROLES } = require('../constants/appConstants');

// Public Routes
router.get('/', BookController.getBooks);
router.get('/search', BookController.searchBooks);
router.get('/:id', BookController.getBook);

// Protected Routes (Librarian+)
router.post('/', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), bookValidator, BookController.createBook);
router.put('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.LIBRARIAN), bookValidator, BookController.updateBook);

// Protected Routes (Admin only)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN,ROLES.LIBRARIAN), BookController.deleteBook);

module.exports = router;
