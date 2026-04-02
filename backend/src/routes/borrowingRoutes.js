const express = require('express');
const router = express.Router();
const BorrowingController = require('../controllers/BorrowingController');
const { authenticate } = require('../middleware/auth');
const { renewValidator, payFineValidator } = require('../validators/validators');

// ===== USER ROUTES (Protected) =====

// Request to borrow a book (replaces direct checkout)
router.post('/request', authenticate, BorrowingController.requestBorrow);

// Legacy checkout (redirects to request for compatibility)
router.post('/checkout', authenticate, BorrowingController.checkout);

// User borrowing operations
router.post('/return', authenticate, BorrowingController.returnBook);
router.get('/my-books', authenticate, BorrowingController.getActiveBooks);
router.get('/history', authenticate, BorrowingController.getHistory);
router.post('/renew', authenticate, renewValidator, BorrowingController.renewBook);
router.post('/:borrowId/pay-fine', authenticate, payFineValidator, BorrowingController.payFine);
router.get('/stats/user/:userId', authenticate, BorrowingController.getUserBorrowingStats);

// ===== ADMIN/LIBRARIAN ROUTES (Protected + Role Check) =====

// Approval workflow
router.post('/:borrowId/approve', authenticate, BorrowingController.approveBorrow);
router.post('/:borrowId/reject', authenticate, BorrowingController.rejectBorrow);

// Admin management view
router.get('/admin/pending-requests', authenticate, BorrowingController.getPendingRequests);
router.get('/admin/active', authenticate, BorrowingController.getAllActiveBorrowings);
router.get('/admin/overdue', authenticate, BorrowingController.getOverdueBooks);
router.get('/admin/statistics', authenticate, BorrowingController.getBorrowingStats);

module.exports = router;
