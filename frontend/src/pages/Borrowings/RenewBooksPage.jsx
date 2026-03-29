import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, RefreshCw } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const RenewBooksPageContent = () => {
  const [renewals, setRenewals] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      bookTitle: 'The Great Gatsby',
      isbn: '978-0743273565',
      currentDueDate: '2025-03-24',
      newDueDate: '2025-04-07',
      timesRenewed: 1,
      status: 'approved',
    },
    {
      id: '2',
      memberName: 'Gotta Ibrahim',
      bookTitle: 'Clean Code',
      isbn: '978-0132350884',
      currentDueDate: '2025-03-29',
      newDueDate: null,
      timesRenewed: 0,
      status: 'pending',
    },
    {
      id: '3',
      memberName: 'Robert Johnson',
      bookTitle: '1984',
      isbn: '978-0451524935',
      currentDueDate: '2025-03-25',
      newDueDate: '2025-04-08',
      timesRenewed: 2,
      status: 'rejected',
    },
    {
      id: '4',
      memberName: 'Alice Williams',
      bookTitle: 'Effective Java',
      isbn: '978-0134685991',
      currentDueDate: '2025-03-26',
      newDueDate: '2025-04-09',
      timesRenewed: 1,
      status: 'approved',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'currentDueDate', label: 'Current Due Date' },
    { key: 'newDueDate', label: 'New Due Date' },
    { key: 'timesRenewed', label: 'Times Renewed' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const styles = {
          pending: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
          approved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
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
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-green-600 dark:text-green-400">
        <RefreshCw className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
    </>
  );

  const approved = renewals.filter((r) => r.status === 'approved').length;
  const pending = renewals.filter((r) => r.status === 'pending').length;
  const rejected = renewals.filter((r) => r.status === 'rejected').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Renew Books
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage book renewal requests
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Plus className="w-5 h-5" />
          New Renewal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Renewals
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            {renewals.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Approved
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {approved}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Pending
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {pending}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Rejected
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {rejected}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Renewal Requests"
        columns={columns}
        data={renewals}
        searchPlaceholder="Search by member, book, ISBN..."
        actions={renderActions}
      />
    </div>
  );
};

const RenewBooksPage = () => {
  return (
    <MainLayout>
      <RenewBooksPageContent />
    </MainLayout>
  );
};

export default RenewBooksPage;
