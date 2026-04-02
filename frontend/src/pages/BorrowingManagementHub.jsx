import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BookMarked,
  AlertCircle,
  Clock,
  History,
  CheckCircle2,
  Zap,
  Search,
  Filter,
  ChevronDown,
  CheckIcon,
  XIcon,
  RefreshCw,
  Loader,
  Calendar,
  DollarSign,
  Eye,
  Edit2,
  ArrowUpDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import MainLayout from './MainLayout';
import borrowingService from '../services/borrowingService';

// ============ OVERVIEW COMPONENT ============
const OverviewContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await borrowingService.getBorrowingStats();
      console.log('Received stats:', data);
      setStats(data);
    } catch (error) {
      console.error('Stats error:', error);
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<BookMarked className="w-8 h-8" />}
          label="Active Borrowings"
          value={stats?.activeBorrowings || 0}
          color="bg-sky-500"
        />
        <StatCard
          icon={<AlertCircle className="w-8 h-8" />}
          label="Overdue Items"
          value={stats?.overdueItems || 0}
          color="bg-red-500"
        />
        <StatCard
          icon={<Clock className="w-8 h-8" />}
          label="Pending Requests"
          value={stats?.pendingRequests || 0}
          color="bg-yellow-500"
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8" />}
          label="Outstanding Fines"
          value={`$${(stats?.pendingFines || 0).toFixed(2)}`}
          color="bg-orange-500"
        />
      </div>

      <button
        onClick={fetchStats}
        className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh Stats
      </button>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <p className="text-slate-600 dark:text-slate-400 font-medium">{label}</p>
      <div className={`${color} text-white p-2 rounded-lg`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
);

// ============ ACTIVE BORROWINGS COMPONENT ============
const ActiveBorrowingsContent = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchActiveBorrowings();
  }, [page, sortBy]);

  const fetchActiveBorrowings = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getAllActiveBorrowings(page, limit);
      console.log('Active borrowings response:', response);
      
      let items = response.records || [];

      // Search filter
      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sorting
      if (sortBy === 'dueDate') {
        items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (sortBy === 'memberName') {
        items.sort((a, b) => a.memberName?.localeCompare(b.memberName));
      } else if (sortBy === 'borrowDate') {
        items.sort((a, b) => new Date(a.borrowDate) - new Date(b.borrowDate));
      }

      setBorrowings(items);
    } catch (error) {
      console.error('Error fetching active borrowings:', error);
      toast.error('Failed to fetch active borrowings');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    if (!window.confirm('Mark this book as returned?')) return;
    try {
      await borrowingService.returnBook(borrowId);
      toast.success('Book returned successfully');
      fetchActiveBorrowings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to return book');
    }
  };

  const handleRenew = async (borrowId) => {
    try {
      await borrowingService.renewBook(borrowId);
      toast.success('Book renewed successfully');
      fetchActiveBorrowings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to renew book');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} sortOptions={['dueDate', 'memberName', 'borrowDate']} />

      <div className="space-y-3">
        {borrowings.length === 0 ? (
          <EmptyState message="No active borrowings" />
        ) : (
          borrowings.map((borrowing) => {
            const daysRemaining = Math.ceil((new Date(borrowing.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            const isOverdue = daysRemaining < 0;

            return (
              <div key={borrowing.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookMarked className="w-4 h-4 text-sky-600" />
                      <h3 className="font-semibold text-slate-900 dark:text-white">{borrowing.bookTitle}</h3>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Member: {borrowing.memberName}</p>
                      <p>Borrowed: {new Date(borrowing.borrowDate).toLocaleDateString()}</p>
                      <p>Due: {new Date(borrowing.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${isOverdue ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}`}>
                      {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleReturn(borrowing.id)} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1">
                        <CheckIcon className="w-4 h-4" />
                        Return
                      </button>
                      <button onClick={() => handleRenew(borrowing.id)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        Renew
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        {borrowings.length === limit && (
          <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// ============ OVERDUE COMPONENT ============
const OverdueContent = () => {
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('daysOverdue');

  useEffect(() => {
    fetchOverdue();
  }, []);

  const fetchOverdue = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getOverdueBooks(1, 20);
      console.log('Overdue response:', response);
      
      let items = response.records || [];

      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sortBy === 'daysOverdue') {
        items.sort((a, b) => Math.abs(new Date(b.dueDate) - new Date()) - Math.abs(new Date(a.dueDate) - new Date()));
      } else if (sortBy === 'fine') {
        items.sort((a, b) => (b.fine || 0) - (a.fine || 0));
      }

      setOverdue(items);
    } catch (error) {
      console.error('Error fetching overdue items:', error);
      toast.error('Failed to fetch overdue items');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = (borrowId, fine) => {
    const amount = prompt(`Enter payment amount (Total: $${fine?.toFixed(2) || 0}):`, fine?.toFixed(2));
    if (amount === null) return;

    borrowingService
      .payFine(borrowId, parseFloat(amount))
      .then(() => {
        toast.success('Fine paid successfully');
        fetchOverdue();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Failed to pay fine');
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} sortOptions={['daysOverdue', 'fine']} />

      <div className="space-y-3">
        {overdue.length === 0 ? (
          <EmptyState message="No overdue items" />
        ) : (
          overdue.map((item) => {
            const daysOverdue = Math.ceil((new Date() - new Date(item.dueDate)) / (1000 * 60 * 60 * 24));
            const fine = item.fine || daysOverdue * 0.5; // $0.50 per day default

            return (
              <div key={item.id} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <h3 className="font-semibold text-slate-900 dark:text-white">{item.bookTitle}</h3>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Member: {item.memberName}</p>
                      <p>Due Date: {new Date(item.dueDate).toLocaleDateString()}</p>
                      <p className="text-red-600 font-semibold">{daysOverdue} days overdue</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 rounded font-semibold mb-3">
                      {`$${fine.toFixed(2)}`} Fine
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handlePayFine(item.id, fine)} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Pay Fine
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ============ DUE SOON COMPONENT ============
const DueSoonContent = () => {
  const [dueSoon, setDueSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDueSoon();
  }, []);

  const fetchDueSoon = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getAllActiveBorrowings(1, 100);
      console.log('Due soon response:', response);
      
      let items = response.records || [];

      // Filter for next 3 days
      const today = new Date();
      const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

      items = items.filter((item) => {
        const dueDate = new Date(item.dueDate);
        return dueDate > today && dueDate <= threeDaysLater;
      });

      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setDueSoon(items);
    } catch (error) {
      console.error('Error fetching due soon items:', error);
      toast.error('Failed to fetch due soon items');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy="dueDate" setSortBy={() => {}} sortOptions={[]} hideSort />

      <div className="space-y-3">
        {dueSoon.length === 0 ? (
          <EmptyState message="No items due soon" />
        ) : (
          dueSoon.map((item) => {
            const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

            return (
              <div key={item.id} className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <h3 className="font-semibold text-slate-900 dark:text-white">{item.bookTitle}</h3>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Member: {item.memberName}</p>
                      <p>Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-2 rounded font-semibold">
                    {daysLeft} days left
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ============ HISTORY COMPONENT ============
const HistoryContent = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getHistory(page, limit);
      console.log('History response:', response);
      
      let items = response.records || [];

      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      setHistory(items);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy="" setSortBy={() => {}} sortOptions={[]} hideSort />

      <div className="space-y-3">
        {history.length === 0 ? (
          <EmptyState message="No borrowing history" />
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.bookTitle}</h3>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p>Member: {item.memberName}</p>
                    <p>Returned: {new Date(item.returnDate).toLocaleDateString()}</p>
                    {item.fine && <p className="text-red-600">Fine: ${item.fine.toFixed(2)}</p>}
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded font-semibold">
                  Returned
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        {history.length === limit && (
          <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// ============ PENDING REQUESTS COMPONENT ============
const ProcessReturnContent = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getPendingRequests(1, 50);
      console.log('Pending requests response:', response);
      
      let items = response.records || [];

      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      setPending(items);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      toast.error('Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (borrowId) => {
    try {
      await borrowingService.approveBorrow(borrowId);
      toast.success('Borrow request approved');
      fetchPending();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    }
  };

  const handleReject = async (borrowId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason === null) return;

    try {
      await borrowingService.rejectBorrow(borrowId, reason);
      toast.success('Borrow request rejected');
      fetchPending();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject request');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy="" setSortBy={() => {}} sortOptions={[]} hideSort />

      <div className="space-y-3">
        {pending.length === 0 ? (
          <EmptyState message="No pending requests" />
        ) : (
          pending.map((request) => (
            <div key={request.id} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{request.bookTitle}</h3>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p>Member: {request.memberName}</p>
                    <p>Requested: {new Date(request.requestDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleApprove(request.id)} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1">
                    <CheckIcon className="w-4 h-4" />
                    Approve
                  </button>
                  <button onClick={() => handleReject(request.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1">
                    <XIcon className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ============ RENEW BOOKS COMPONENT ============
const RenewBooksContent = () => {
  const [renewable, setRenewable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRenewable();
  }, []);

  const fetchRenewable = async () => {
    try {
      setLoading(true);
      const response = await borrowingService.getAllActiveBorrowings(1, 100);
      console.log('Renewable books response:', response);
      
      let items = response.records || [];

      // Filter items that can still be renewed (not overdue yet)
      items = items.filter((item) => {
        const dueDate = new Date(item.dueDate);
        return dueDate > new Date();
      });

      if (search) {
        items = items.filter(
          (item) =>
            item.memberName?.toLowerCase().includes(search.toLowerCase()) ||
            item.bookTitle?.toLowerCase().includes(search.toLowerCase())
        );
      }

      items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setRenewable(items);
    } catch (error) {
      console.error('Error fetching renewable books:', error);
      toast.error('Failed to fetch renewable books');
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (borrowId) => {
    try {
      await borrowingService.renewBook(borrowId);
      toast.success('Book renewed successfully');
      fetchRenewable();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to renew book');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <SearchAndSortBar search={search} setSearch={setSearch} sortBy="" setSortBy={() => {}} sortOptions={[]} hideSort />

      <div className="space-y-3">
        {renewable.length === 0 ? (
          <EmptyState message="No books available for renewal" />
        ) : (
          renewable.map((book) => {
            const daysLeft = Math.ceil((new Date(book.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

            return (
              <div key={book.id} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <h3 className="font-semibold text-slate-900 dark:text-white">{book.bookTitle}</h3>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Member: {book.memberName}</p>
                      <p>Current due: {new Date(book.dueDate).toLocaleDateString()}</p>
                      <p>{daysLeft} days remaining</p>
                    </div>
                  </div>

                  <button onClick={() => handleRenew(book.id)} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Renew
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ============ HELPER COMPONENTS ============
const SearchAndSortBar = ({ search, setSearch, sortBy, setSortBy, sortOptions, hideSort }) => (
  <div className="flex gap-4 mb-6 flex-wrap items-center">
    <div className="flex-1 min-w-64 relative">
      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search by member name or book title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
      />
    </div>

    {!hideSort && (
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer"
      >
        <option value="">Sort by...</option>
        {sortOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/([A-Z])/g, ' $1')}
          </option>
        ))}
      </select>
    )}
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader className="w-8 h-8 text-sky-600 animate-spin" />
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-8 text-slate-500">
    <p>{message}</p>
  </div>
);

// ============ MAIN COMPONENT ============
const BorrowingManagementHub = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      component: OverviewContent,
    },
    {
      id: 'pending',
      label: 'Pending Requests',
      icon: CheckCircle2,
      component: ProcessReturnContent,
    },
    {
      id: 'active',
      label: 'Active',
      icon: BookMarked,
      component: ActiveBorrowingsContent,
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: AlertCircle,
      component: OverdueContent,
      badge: '12',
      badgeColor: 'bg-red-500',
    },
    {
      id: 'due-soon',
      label: 'Due Soon',
      icon: Clock,
      component: DueSoonContent,
    },
    {
      id: 'renew',
      label: 'Renew',
      icon: Zap,
      component: RenewBooksContent,
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      component: HistoryContent,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            📚 Borrowing Management Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all library borrowing operations with real-time data and actions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm overflow-x-auto">
          <div className="px-4 flex gap-2 py-4 min-w-max md:min-w-full">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all relative ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>

                  {tab.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`ml-2 ${tab.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}
                    >
                      {tab.badge}
                    </motion.span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-500">Coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default BorrowingManagementHub;
