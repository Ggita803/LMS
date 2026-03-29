import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import ProcessReturnModal from './ProcessReturnModal';
import MainLayout from '../MainLayout';

const BorrowingsPageContent = () => {
  const [borrowings, setBorrowings] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      memberEmail: 'muguerwa@university.edu',
      bookTitle: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      borrowDate: '2025-03-15',
      dueDate: '2025-03-29',
      status: 'active',
      daysOverdue: 0,
    },
    {
      id: '2',
      memberName: 'Gotta Ibrahim',
      memberEmail: 'gotta@university.edu',
      bookTitle: 'Python Crash Course',
      author: 'Eric Matthes',
      borrowDate: '2025-03-10',
      dueDate: '2025-03-24',
      status: 'overdue',
      daysOverdue: 5,
    },
    {
      id: '3',
      memberName: 'SENTONGO EDRINE',
      memberEmail: 'sentongo@university.edu',
      bookTitle: 'Clean Code',
      author: 'Robert C. Martin',
      borrowDate: '2025-03-20',
      dueDate: '2025-04-03',
      status: 'active',
      daysOverdue: 0,
    },
    {
      id: '4',
      memberName: 'Wopa Hatim',
      memberEmail: 'wopa@university.edu',
      bookTitle: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      borrowDate: '2025-02-15',
      dueDate: '2025-03-15',
      status: 'overdue',
      daysOverdue: 14,
    },
  ]);

  const [isProcessReturnOpen, setIsProcessReturnOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcessReturn = async (formData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBorrowings(borrowings.filter((b) => b.id !== formData.borrowingId));
      setIsProcessReturnOpen(false);
    } catch (error) {
      console.error('Failed to process return:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'borrowDate', label: 'Borrow Date' },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {value === 'active' ? 'Active' : 'Overdue'}
        </span>
      ),
    },
    {
      key: 'daysOverdue',
      label: 'Days Overdue',
      render: (value) => (
        <span className={value > 0 ? 'text-red-600 font-bold' : 'text-emerald-600'}>
          {value > 0 ? `+${value}` : '—'}
        </span>
      ),
    },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-emerald-600 dark:text-emerald-400">
        <AlertCircle className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  const activeBorrowings = borrowings.filter((b) => b.status === 'active');
  const overdueBorrowings = borrowings.filter((b) => b.status === 'overdue');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Borrowings Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track and manage library member book borrowings
          </p>
        </div>
        <button
          onClick={() => setIsProcessReturnOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Process Return
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Active Borrowings
          </p>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {activeBorrowings.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Overdue
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {overdueBorrowings.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Outstanding Fines
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            Shs 450k
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Return Rate
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            94%
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Borrowing Records"
        columns={columns}
        data={borrowings}
        searchPlaceholder="Search borrowings by member, book..."
        actions={renderActions}
      />

      {/* Process Return Modal */}
      <ProcessReturnModal
        isOpen={isProcessReturnOpen}
        onClose={() => setIsProcessReturnOpen(false)}
        onSubmit={handleProcessReturn}
        isLoading={isLoading}
      />
    </div>
  );
};

const BorrowingsPage = () => {
  return (
    <MainLayout>
      <BorrowingsPageContent />
    </MainLayout>
  );
};

export default BorrowingsPage;
