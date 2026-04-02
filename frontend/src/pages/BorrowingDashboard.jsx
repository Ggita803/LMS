import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, AlertCircle, Clock, DollarSign, RefreshCw, Plus,
  ChevronRight, Eye, Filter, MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import MainLayout from './MainLayout';
import BorrowingStats from '../components/BorrowingStats';
import BorrowingTable from '../components/BorrowingTable';
import OverdueAlert from '../components/OverdueAlert';
import FinePaymentForm from '../components/FinePaymentForm';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const BorrowingDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [activeBooks, setActiveBooks] = useState([]);
  const [history, setHistory] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [tab, setTab] = useState('active'); // active, overdue, history, fines
  const [isLoading, setIsLoading] = useState(false);
  const [showFinePayment, setShowFinePayment] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch data on mount
  useEffect(() => {
    fetchAllData();
  }, [page, tab]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Get user stats
      const statsRes = await api.get(`/borrowing/stats/user/${user?.userId}`);
      setStats(statsRes.data.data.stats);

      // Get active books
      const activeRes = await api.get('/borrowing/my-books');
      const active = activeRes.data.data.books || [];
      setActiveBooks(active);

      // Get overdue books
      const overdue = active.filter(book => new Date(book.due_date) < new Date());
      setOverdueBooks(overdue);

      // Get history
      const historyRes = await api.get(
        `/borrowing/history?page=${page}&limit=${limit}`
      );
      setHistory(historyRes.data.data.records || []);
    } catch (error) {
      console.error('Error fetching borrowing data:', error);
      toast.error('Failed to load borrowing information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnBook = async (borrowId) => {
    try {
      setIsLoading(true);
      await api.post('/borrowing/return', { borrowId });
      toast.success('Book returned successfully');
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to return book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenewBook = async (borrowId) => {
    try {
      setIsLoading(true);
      await api.post('/borrowing/renew', { borrowId });
      toast.success('Book renewed successfully');
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to renew book');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayFine = async (borrowId, amount) => {
    try {
      setIsLoading(true);
      const response = await api.post(
        `/borrowing/${borrowId}/pay-fine`,
        { amount }
      );
      toast.success('Fine payment processed successfully');
      setShowFinePayment(false);
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            My Borrowing
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your book borrowings, renewals, and fines
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <BorrowingStats stats={stats} />
        </motion.div>

        {/* Overdue Alert */}
        {overdueBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-3"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Overdue Books
            </h3>
            {overdueBooks.map((book) => {
              const daysOverdue = Math.ceil(
                (new Date() - new Date(book.due_date)) / (1000 * 60 * 60 * 24)
              );
              return (
                <OverdueAlert
                  key={book.borrow_id}
                  book={book}
                  daysOverdue={daysOverdue}
                  fineAmount={book.fine_amount || 0}
                  onReturnClick={() => handleReturnBook(book.borrow_id)}
                  onPayFineClick={() => {
                    setSelectedBorrow(book);
                    setShowFinePayment(true);
                  }}
                />
              );
            })}
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Tab Buttons */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            {[
              { id: 'active', label: 'Currently Borrowed', icon: CheckCircle },
              { id: 'overdue', label: 'Overdue', icon: AlertCircle },
              { id: 'history', label: 'Return History', icon: Calendar },
              { id: 'fines', label: 'Outstanding Fines', icon: DollarSign }
            ].map((tabItem) => {
              const Icon = tabItem.icon;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                    tab === tabItem.id
                      ? 'text-sky-600 border-sky-600 bg-sky-50 dark:bg-sky-900/20'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tabItem.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tab === 'active' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Books You're Currently Borrowing
                </h3>
                <BorrowingTable
                  data={activeBooks}
                  isLoading={isLoading}
                  onReturn={handleReturnBook}
                  onRenew={handleRenewBook}
                />
              </div>
            )}

            {tab === 'overdue' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Overdue Books
                </h3>
                {overdueBooks.length > 0 ? (
                  <BorrowingTable
                    data={overdueBooks}
                    isLoading={isLoading}
                    onReturn={handleReturnBook}
                  />
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No overdue books. You're all caught up!</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Return History
                </h3>
                <BorrowingTable
                  data={history}
                  isLoading={isLoading}
                />
              </div>
            )}

            {tab === 'fines' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Outstanding Fines
                </h3>
                {stats.pending_fines_count > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-red-900 dark:text-red-100 mb-1">
                            Total Outstanding Fine
                          </p>
                          <p className="text-3xl font-bold text-red-600">
                            Php {stats.total_fines?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                        <DollarSign className="w-12 h-12 text-red-200 opacity-50" />
                      </div>
                      <Button
                        onClick={() =>
                          overdueBooks[0] &&
                          (setSelectedBorrow(overdueBooks[0]), setShowFinePayment(true))
                        }
                        className="w-full"
                      >
                        Pay Fine Now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No outstanding fines. Great job!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Fine Payment Modal */}
        {showFinePayment && selectedBorrow && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full"
            >
              <FinePaymentForm
                borrowId={selectedBorrow.borrow_id}
                bookTitle={selectedBorrow.title}
                totalFine={selectedBorrow.fine_amount || 0}
                isLoading={isLoading}
                onPaymentSuccess={handlePayFine}
                onCancel={() => setShowFinePayment(false)}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

// Import missing icon
const CheckCircle = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default BorrowingDashboard;
