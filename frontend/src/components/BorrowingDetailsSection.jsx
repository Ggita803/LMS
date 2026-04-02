import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookMarked, AlertCircle, Clock, CheckCircle2, Zap,
  Plus, ArrowRight, Download, RefreshCw
} from 'lucide-react';
import api from '../services/api';
import BorrowingStats from './BorrowingStats';
import BorrowingTable from './BorrowingTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import toast from 'react-hot-toast';

const BorrowingDetailsSection = () => {
  const [stats, setStats] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeBooks, setActiveBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetchBorrowingData();
  }, []);

  const fetchBorrowingData = async () => {
    try {
      setIsLoading(true);

      // Fetch stats
      const statsRes = await api.get('/borrowing/admin/statistics');
      setStats(statsRes.data.data.stats);

      // Fetch pending requests (first 5)
      const pendingRes = await api.get(
        '/borrowing/admin/pending-requests?page=1&limit=5'
      );
      setPendingRequests(pendingRes.data.data.records || []);

      // Fetch active borrowings (first 5)
      const activeRes = await api.get(
        '/borrowing/admin/active?page=1&limit=5'
      );
      setActiveBooks(activeRes.data.data.records || []);

      // Fetch overdue books (first 5)
      const overdueRes = await api.get(
        '/borrowing/admin/overdue?page=1&limit=5'
      );
      setOverdueBooks(overdueRes.data.data.records || []);

      // Generate trend data (mock for now)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      setTrendData(
        months.map((month) => ({
          month,
          pending: Math.floor(Math.random() * 20 + 5),
          active: Math.floor(Math.random() * 50 + 20),
          returned: Math.floor(Math.random() * 80 + 40)
        }))
      );
    } catch (error) {
      console.error('Error fetching borrowing data:', error);
      toast.error('Failed to load borrowing data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RefreshCw className="w-8 h-8 text-sky-600 mx-auto" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading borrowing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-blue-600" />
            Borrowing Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all borrowing requests, active borrowings, and overdue items
          </p>
        </div>
        <Link
          to="/admin/borrowing"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-smooth font-semibold shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" /> View All
        </Link>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/active-borrowings"
          className="px-6 py-3 bg-sky-600 text-white rounded-lg flex items-center gap-2 hover:bg-sky-700 transition-smooth font-semibold shadow-lg hover:shadow-xl"
        >
          <BookMarked className="w-5 h-5" /> Active Borrowings
        </Link>
        <Link
          to="/overdue-management"
          className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-smooth font-semibold"
        >
          <AlertCircle className="w-5 h-5" /> Manage Overdue
        </Link>
        <Link
          to="/process-return"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-smooth font-semibold"
        >
          <CheckCircle2 className="w-5 h-5" /> Process Return
        </Link>
        <Link
          to="/renew-books"
          className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth font-semibold"
        >
          <Zap className="w-5 h-5" /> Renew Books
        </Link>
      </div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {stats && <BorrowingStats stats={stats} />}
      </motion.div>

      {/* Quick Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Pending Requests */}
        <div className="card border-l-4 border-l-amber-600 bg-white dark:bg-slate-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Pending Requests
              </p>
              <h3 className="text-4xl font-bold text-amber-600">{stats?.total_pending || 0}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Awaiting approval
              </p>
            </div>
            <Clock className="w-12 h-12 text-amber-100 dark:text-amber-900/30" />
          </div>
          <Link
            to="/active-borrowings?tab=pending"
            className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-2 mt-4"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Active Borrowings */}
        <div className="card border-l-4 border-l-blue-600 bg-white dark:bg-slate-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Active Borrowings
              </p>
              <h3 className="text-4xl font-bold text-blue-600">{stats?.total_active || 0}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Currently checked out
              </p>
            </div>
            <BookMarked className="w-12 h-12 text-blue-100 dark:text-blue-900/30" />
          </div>
          <Link
            to="/active-borrowings"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-4"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Overdue Books */}
        <div className="card border-l-4 border-l-red-600 bg-white dark:bg-slate-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Overdue Books
              </p>
              <h3 className="text-4xl font-bold text-red-600">{stats?.total_overdue || 0}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Requires attention
              </p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-100 dark:text-red-900/30" />
          </div>
          <Link
            to="/overdue-management"
            className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-2 mt-4"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Borrowing Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">
            6-Month Borrowing Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend />
                <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="active" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="returned" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">
            Status Distribution
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Active', value: stats?.total_active || 0, color: 'bg-blue-500' },
              { label: 'Pending', value: stats?.total_pending || 0, color: 'bg-amber-500' },
              { label: 'Returned', value: stats?.total_returned || 0, color: 'bg-green-500' },
              { label: 'Overdue', value: stats?.total_overdue || 0, color: 'bg-red-500' }
            ].map((item, idx) => {
              const total = (stats?.total_active || 0) + (stats?.total_pending || 0) + (stats?.total_returned || 0) + (stats?.total_overdue || 0);
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                      {item.value} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Pending Requests Table */}
      {pendingRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-white dark:bg-slate-900 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Recent Pending Requests
            </h3>
            <Link
              to="/active-borrowings?tab=pending"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all →
            </Link>
          </div>
          <BorrowingTable data={pendingRequests.slice(0, 5)} showActions={false} />
        </motion.div>
      )}

      {/* Active Borrowings Table */}
      {activeBooks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card bg-white dark:bg-slate-900 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Recent Active Borrowings
            </h3>
            <Link
              to="/active-borrowings"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all →
            </Link>
          </div>
          <BorrowingTable data={activeBooks.slice(0, 5)} showActions={false} />
        </motion.div>
      )}

      {/* Overdue Books Table */}
      {overdueBooks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-white dark:bg-slate-900 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Overdue Books Alert
            </h3>
            <Link
              to="/overdue-management"
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View all →
            </Link>
          </div>
          <BorrowingTable data={overdueBooks.slice(0, 5)} showActions={false} />
        </motion.div>
      )}
    </div>
  );
};

export default BorrowingDetailsSection;
