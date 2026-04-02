import api from './api';

// Helper function to map snake_case DB fields to camelCase
const mapBorrowingRecord = (record) => ({
  id: record.borrow_id,
  userId: record.user_id,
  bookId: record.book_id,
  memberName: record.username,
  bookTitle: record.title,
  author: record.author,
  borrowDate: record.checkout_date,
  dueDate: record.due_date,
  returnDate: record.return_date,
  status: record.status,
  approvalStatus: record.approval_status,
  fine: record.fine_amount || 0,
  renewalsCount: record.renewals_count || 0,
  requestDate: record.created_at,
});

// API service for borrowing operations
export const borrowingService = {
  // Admin/Librarian endpoints
  getPendingRequests: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get('/borrowing/admin/pending-requests', { params });
      
      console.log('Pending requests response:', response.data); // Debug
      
      const items = response.data.data?.items || [];
      const pagination = response.data.data?.pagination || {};
      
      return {
        records: items.map(mapBorrowingRecord),
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      };
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      throw error;
    }
  },

  getAllActiveBorrowings: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get('/borrowing/admin/active', { params });
      
      console.log('Active borrowings response:', response.data); // Debug
      
      const items = response.data.data?.items || [];
      const pagination = response.data.data?.pagination || {};
      
      return {
        records: items.map(mapBorrowingRecord),
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      };
    } catch (error) {
      console.error('Error fetching active borrowings:', error);
      throw error;
    }
  },

  getOverdueBooks: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = { page, limit, ...filters };
      const response = await api.get('/borrowing/admin/overdue', { params });
      
      console.log('Overdue books response:', response.data); // Debug
      
      const items = response.data.data?.items || [];
      const pagination = response.data.data?.pagination || {};
      
      return {
        records: items.map(mapBorrowingRecord),
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      };
    } catch (error) {
      console.error('Error fetching overdue books:', error);
      throw error;
    }
  },

  getBorrowingStats: async () => {
    try {
      const response = await api.get('/borrowing/admin/statistics');
      
      console.log('Stats response:', response.data); // Debug
      
      const stats = response.data.data?.stats || {};
      
      return {
        activeBorrowings: stats.total_active || 0,
        overdueItems: stats.total_overdue || 0,
        dueSoon: stats.total_pending || 0, // Note: pending might not be the right field
        pendingRequests: stats.total_pending || 0,
        pendingFines: stats.total_outstanding_fines || 0,
        returned: stats.total_returned || 0,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Approval workflows
  approveBorrow: async (borrowId) => {
    try {
      const response = await api.post(`/borrowing/${borrowId}/approve`);
      return response.data.data;
    } catch (error) {
      console.error('Error approving borrow:', error);
      throw error;
    }
  },

  rejectBorrow: async (borrowId, reason = '') => {
    try {
      const response = await api.post(`/borrowing/${borrowId}/reject`, { reason });
      return response.data.data;
    } catch (error) {
      console.error('Error rejecting borrow:', error);
      throw error;
    }
  },

  // User operations (can be called by both users and librarians)
  returnBook: async (borrowId) => {
    try {
      const response = await api.post('/borrowing/return', { borrowId });
      return response.data.data;
    } catch (error) {
      console.error('Error returning book:', error);
      throw error;
    }
  },

  renewBook: async (borrowId) => {
    try {
      const response = await api.post('/borrowing/renew', { borrowId });
      return response.data.data;
    } catch (error) {
      console.error('Error renewing book:', error);
      throw error;
    }
  },

  payFine: async (borrowId, amount) => {
    try {
      const response = await api.post(`/borrowing/${borrowId}/pay-fine`, { amount });
      return response.data.data;
    } catch (error) {
      console.error('Error paying fine:', error);
      throw error;
    }
  },

  // User history
  getHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/borrowing/history', { params: { page, limit } });
      
      console.log('History response:', response.data); // Debug
      
      const items = response.data.data?.items || response.data.data?.records || [];
      const pagination = response.data.data?.pagination || {};
      
      return {
        records: items.map(mapBorrowingRecord),
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || 10,
      };
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },
};

export default borrowingService;
