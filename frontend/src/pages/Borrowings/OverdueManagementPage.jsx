import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const OverdueManagementPageContent = () => {
  const [overdueItems, setOverdueItems] = useState([
    {
      id: '1',
      memberName: 'SENTONGO EDRINE',
      bookTitle: 'Python Crash Course',
      isbn: '978-1593279288',
      dueDate: '2025-03-20',
      daysOverdue: 9,
      fine: 4500,
      status: 'not-paid',
    },
    {
      id: '2',
      memberName: 'John Doe',
      bookTitle: 'The Clean Coder',
      isbn: '978-0137081073',
      dueDate: '2025-03-15',
      daysOverdue: 14,
      fine: 7000,
      status: 'not-paid',
    },
    {
      id: '3',
      memberName: 'Jane Smith',
      bookTitle: 'Design Patterns',
      isbn: '978-0201633610',
      dueDate: '2025-03-10',
      daysOverdue: 19,
      fine: 9500,
      status: 'partial',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'daysOverdue',
      label: 'Days Overdue',
      render: (value) => (
        <span className="font-semibold text-red-600 dark:text-red-400">{value}</span>
      ),
    },
    {
      key: 'fine',
      label: 'Fine Amount',
      render: (value) => (
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          UGX {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Payment Status',
      render: (value) => {
        const styles = {
          'not-paid': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
          partial: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
          paid: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value === 'not-paid' ? 'Not Paid' : value === 'partial' ? 'Partial' : 'Paid'}
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

  const totalFines = overdueItems.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Overdue Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage overdue books and collect fines
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-900 dark:text-red-300">
            {overdueItems.length} items overdue
          </p>
          <p className="text-sm text-red-700 dark:text-red-400">
            Total outstanding fines: UGX {totalFines.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Overdue
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {overdueItems.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Fines
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            UGX {(totalFines / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Paid
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">0</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Overdue Items"
        columns={columns}
        data={overdueItems}
        searchPlaceholder="Search by member, book, ISBN..."
        actions={renderActions}
      />
    </div>
  );
};

const OverdueManagementPage = () => {
  return (
    <MainLayout>
      <OverdueManagementPageContent />
    </MainLayout>
  );
};

export default OverdueManagementPage;
