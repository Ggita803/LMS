import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, AlertCircle, RefreshCw, RotateCcw, Eye } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const MyBorrowingStatus = () => {
  const [activeBooks, setActiveBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchMyBorrowingData();
  }, []);

  const fetchMyBorrowingData = async () => {
    try {
      setIsLoading(true);

      // Fetch active books
      const activeRes = await api.get('/borrowing/my-books');
      setActiveBooks(activeRes.data.data.books || []);

      // Fetch borrowing history
      const historyRes = await api.get('/borrowing/history?page=1&limit=10');
      setHistoryBooks(historyRes.data.data.records || []);
    } catch (error) {
      console.error('Error fetching borrowing data:', error);
      toast.error('Failed to load your borrowing data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active', icon: CheckCircle2 },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending', icon: Clock },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue', icon: AlertCircle },
      returned: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Returned', icon: BookOpen },
    };
    return badges[status] || badges.pending;
  };

  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RefreshCw className="w-8 h-8 text-sky-600 mx-auto" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading your borrowing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            My Borrowing
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Track your active borrowings and borrowing history
          </p>
        </div>
        <button
          onClick={fetchMyBorrowingData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-smooth flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-semibold transition-smooth ${
            activeTab === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Active ({activeBooks.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-semibold transition-smooth ${
            activeTab === 'history'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          History ({historyBooks.length})
        </button>
      </div>

      {/* Active Borrowings */}
      {activeTab === 'active' && (
        <div className="space-y-3">
          {activeBooks.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400">No active borrowings</p>
            </div>
          ) : (
            activeBooks.map((book, idx) => {
              const daysLeft = getDaysRemaining(book.due_date);
              const badge = getStatusBadge(book.status || 'active');
              const StatusIcon = badge.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-smooth"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        by {book.author}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Due Date</p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {new Date(book.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Days Remaining</p>
                          <p
                            className={`font-semibold ${
                              daysLeft <= 3
                                ? 'text-red-600'
                                : daysLeft <= 7
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }`}
                          >
                            {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                          </p>
                        </div>
                      </div>

                      {/* Renewals */}
                      {book.renewals_count !== undefined && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Renewals: {book.renewals_count}/2
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${badge.bg}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className={`text-xs font-semibold ${badge.text}`}>
                          {badge.label}
                        </span>
                      </div>

                      <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-smooth flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        Renew
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyBooks.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400">No borrowing history</p>
            </div>
          ) : (
            historyBooks.map((book, idx) => {
              const badge = getStatusBadge(book.status || 'returned');
              const StatusIcon = badge.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        by {book.author}
                      </p>
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>
                          Borrowed: {new Date(book.checkout_date).toLocaleDateString()}
                        </p>
                        {book.return_date && (
                          <p>
                            Returned: {new Date(book.return_date).toLocaleDateString()}
                          </p>
                        )}
                        {book.fine_amount > 0 && (
                          <p className="text-red-600 font-semibold">
                            Fine: Shs {book.fine_amount}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${badge.bg}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className={`text-xs font-semibold ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyBorrowingStatus;
