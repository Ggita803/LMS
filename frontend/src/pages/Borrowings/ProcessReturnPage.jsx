import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, CheckCircle } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const ProcessReturnPageContent = () => {
  const [returns, setReturns] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      bookTitle: 'The Great Gatsby',
      isbn: '978-0743273565',
      borrowDate: '2025-03-10',
      dueDate: '2025-03-24',
      returnDate: '2025-03-23',
      condition: 'good',
      fine: 0,
      status: 'returned',
    },
    {
      id: '2',
      memberName: 'SENTONGO EDRINE',
      bookTitle: 'Python Crash Course',
      isbn: '978-1593279288',
      borrowDate: '2025-02-20',
      dueDate: '2025-03-20',
      returnDate: '2025-03-29',
      condition: 'damaged',
      fine: 2000,
      status: 'returned-with-damage',
    },
    {
      id: '3',
      memberName: 'Gotta Ibrahim',
      bookTitle: 'Clean Code',
      isbn: '978-0132350884',
      borrowDate: '2025-03-15',
      dueDate: '2025-03-29',
      returnDate: null,
      condition: null,
      fine: 0,
      status: 'pending-return',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'returnDate',
      label: 'Return Date',
      render: (value) => value || 'Pending',
    },
    {
      key: 'condition',
      label: 'Condition',
      render: (value) => {
        if (!value) return 'N/A';
        const styles = {
          good: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          damaged: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
          missing: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'fine',
      label: 'Fine',
      render: (value) => (
        <span className="font-semibold">{value > 0 ? `UGX ${value}` : 'Free'}</span>
      ),
    },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-green-600 dark:text-green-400">
        <CheckCircle className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
    </>
  );

  const totalReturned = returns.filter((r) => r.status.includes('returned')).length;
  const totalFines = returns.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Process Return
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Handle book returns and assess conditions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Plus className="w-5 h-5" />
          Log Return
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Returns
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {totalReturned}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Damage Fines
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            UGX {totalFines}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Pending Returns
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {returns.filter((r) => r.status === 'pending-return').length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Returns History"
        columns={columns}
        data={returns}
        searchPlaceholder="Search by member, book, ISBN..."
        actions={renderActions}
      />
    </div>
  );
};

const ProcessReturnPage = () => {
  return (
    <MainLayout>
      <ProcessReturnPageContent />
    </MainLayout>
  );
};

export default ProcessReturnPage;
