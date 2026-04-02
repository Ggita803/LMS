import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, XCircle, AlertCircle, Clock, Eye, Filter,
  Search, Loader, User, Mail, PhoneIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import MainLayout from './MainLayout';
import BorrowingStats from '../components/BorrowingStats';
import BorrowingTable from '../components/BorrowingTable';
import BorrowingRequestModal from '../components/BorrowingRequestModal';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const AdminBorrowingManagement = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('pending'); // pending, active, overdue
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Fetch data
  useEffect(() => {
    fetchData();
    fetchStats();
  }, [page, tab, searchTerm]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/borrowing/admin/statistics');
      setStats(res.data.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let endpoint = '';
      const params = new URLSearchParams({
        page,
        limit
      });

      switch (tab) {
        case 'pending':
          endpoint = `/api/borrowing/admin/pending-requests?${params}`;
          break;
        case 'active':
          endpoint = `/api/borrowing/admin/active?${params}`;
          break;
        case 'overdue':
          endpoint = `/api/borrowing/admin/overdue?${params}`;
          break;
        default:
          endpoint = `/api/borrowing/admin/pending-requests?${params}`;
      }

      const res = await api.get(endpoint);
      setData(res.data.data.records || []);
      setTotal(res.data.data.total || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load borrowing data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (borrowId) => {
    try {
      setIsLoading(true);
      await api.post(`/borrowing/${borrowId}/approve`);
      toast.success('Borrow request approved');
      fetchData();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (borrowId, reason) => {
    try {
      setIsLoading(true);
      await api.post(`/borrowing/${borrowId}/reject`, {
        reason: reason || 'Request rejected by librarian'
      });
      toast.success('Borrow request rejected');
      fetchData();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject request');
    } finally {
      setIsLoading(false);
    }
  };

  const openRequestModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setRejectionReason('');
  };

  const getTabs = () => [
    {
      id: 'pending',
      label: 'Pending Requests',
      icon: Clock,
      badge: stats.total_pending || 0
    },
    {
      id: 'active',
      label: 'Active Borrowings',
      icon: CheckCircle,
      badge: stats.total_active || 0
    },
    {
      id: 'overdue',
      label: 'Overdue Books',
      icon: AlertCircle,
      badge: stats.total_overdue || 0
    }
  ];

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
            Borrowing Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review, approve, and manage borrowing requests and transactions
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

        {/* Main Management Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {getTabs().map((tabItem) => {
              const Icon = tabItem.icon;
              const isActive = tab === tabItem.id;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => {
                    setTab(tabItem.id);
                    setPage(1);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'text-sky-600 border-sky-600 bg-sky-50 dark:bg-sky-900/20'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tabItem.label}
                  {tabItem.badge > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                    }`}>
                      {tabItem.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by user, book, or ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <Button variant="secondary">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Loader className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">Loading data...</p>
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No {tab} borrowing records found</p>
              </div>
            ) : (
              <>
                <BorrowingTable
                  data={data}
                  showActions={true}
                  onApprove={
                    tab === 'pending'
                      ? (id) => {
                          const request = data.find((r) => r.borrow_id === id);
                          openRequestModal(request);
                        }
                      : undefined
                  }
                  onReject={
                    tab === 'pending'
                      ? (id) => {
                          const request = data.find((r) => r.borrow_id === id);
                          openRequestModal(request);
                        }
                      : undefined
                  }
                  onReturn={
                    tab === 'active'
                      ? async (id) => {
                          try {
                            await api.post('/borrowing/return', {
                              borrowId: id
                            });
                            toast.success('Book returned successfully');
                            fetchData();
                          } catch (error) {
                            toast.error('Failed to process return');
                          }
                        }
                      : undefined
                  }
                />

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} records
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={page * limit >= total}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Request Modal */}
        <BorrowingRequestModal
          request={selectedRequest}
          onClose={() => setShowModal(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          isLoading={isLoading}
        />
      </div>
    </div>
    </MainLayout>
  );
};

export default AdminBorrowingManagement;
