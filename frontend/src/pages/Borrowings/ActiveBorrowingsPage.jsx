import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const ActiveBorrowingsPageContent = () => {
  const [borrowings, setBorrowings] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      bookTitle: 'The Great Gatsby',
      isbn: '978-0743273565',
      borrowDate: '2025-03-10',
      dueDate: '2025-03-24',
      status: 'active',
      daysLeft: 3,
    },
    {
      id: '2',
      memberName: 'Gotta Ibrahim',
      bookTitle: 'Clean Code',
      isbn: '978-0132350884',
      borrowDate: '2025-03-15',
      dueDate: '2025-03-29',
      status: 'active',
      daysLeft: 14,
    },
    {
      id: '3',
      memberName: 'SENTONGO EDRINE',
      bookTitle: 'Python Crash Course',
      isbn: '978-1593279288',
      borrowDate: '2025-02-20',
      dueDate: '2025-03-20',
      status: 'overdue',
      daysLeft: -9,
    },
    {
      id: '4',
      memberName: 'Wopa Hatim',
      bookTitle: 'To Kill a Mockingbird',
      isbn: '978-0061120084',
      borrowDate: '2025-03-01',
      dueDate: '2025-03-28',
      status: 'active',
      daysLeft: 1,
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'borrowDate', label: 'Borrow Date' },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'daysLeft',
      label: 'Days Left',
      render: (value) => {
        const isOverdue = value < 0;
        return (
          <span className={`font-semibold ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {isOverdue ? `${value} (Overdue)` : value}
          </span>
        );
      },
    },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  const activeBorrowings = borrowings.filter((b) => b.status === 'active');
  const overdueBorrowings = borrowings.filter((b) => b.status === 'overdue');
  const dueSoon = borrowings.filter((b) => b.daysLeft <= 3 && b.daysLeft > 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Active Borrowings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track all active book loans
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Plus className="w-5 h-5" />
          New Borrowing
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Active Borrowings
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
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
            Due Soon (3 days)
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {dueSoon.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Borrowings List"
        columns={columns}
        data={borrowings}
        searchPlaceholder="Search by member, book, ISBN..."
        actions={renderActions}
      />
    </div>
  );
};

const ActiveBorrowingsPage = () => {
  return (
    <MainLayout>
      <ActiveBorrowingsPageContent />
    </MainLayout>
  );
};

export default ActiveBorrowingsPage;
