import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const FineManagementPageContent = () => {
  const [fines, setFines] = useState([
    {
      id: '1',
      memberName: 'SENTONGO EDRINE',
      fineType: 'Overdue - 9 days',
      bookTitle: 'Python Crash Course',
      amount: 4500,
      status: 'not-paid',
      dueDate: '2025-03-29',
      dateCreated: '2025-03-20',
    },
    {
      id: '2',
      memberName: 'John Doe',
      fineType: 'Overdue - 14 days',
      bookTitle: 'The Clean Coder',
      amount: 7000,
      status: 'not-paid',
      dueDate: '2025-03-29',
      dateCreated: '2025-03-15',
    },
    {
      id: '3',
      memberName: 'Jane Smith',
      fineType: 'Book Damage',
      bookTitle: 'Design Patterns',
      amount: 5000,
      status: 'paid',
      dueDate: '2025-03-20',
      dateCreated: '2025-03-10',
    },
    {
      id: '4',
      memberName: 'Alice Williams',
      fineType: 'Lost Book',
      bookTitle: 'Effective Java',
      amount: 15000,
      status: 'partial',
      dueDate: '2025-04-05',
      dateCreated: '2025-03-15',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'fineType', label: 'Type' },
    { key: 'bookTitle', label: 'Book Title' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-slate-900 dark:text-white">
          UGX {value.toLocaleString()}
        </span>
      ),
    },
    { key: 'dateCreated', label: 'Date Created' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const styles = {
          'not-paid': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
          paid: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          partial: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
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

  const totalFines = fines.reduce((sum, item) => sum + item.amount, 0);
  const paidFines = fines.filter((f) => f.status === 'paid').reduce((sum, item) => sum + item.amount, 0);
  const unpaid = fines.filter((f) => f.status === 'not-paid').reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Fine Collection
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track and manage all fines
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Plus className="w-5 h-5" />
          Add Fine
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Fines
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            UGX {totalFines.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Paid
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            UGX {paidFines.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Outstanding
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            UGX {unpaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Collection Rate
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalFines > 0 ? ((paidFines / totalFines) * 100).toFixed(0) : 0}%
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="All Fines"
        columns={columns}
        data={fines}
        searchPlaceholder="Search by member, type, book..."
        actions={renderActions}
      />
    </div>
  );
};

const FineManagementPage = () => {
  return (
    <MainLayout>
      <FineManagementPageContent />
    </MainLayout>
  );
};

export default FineManagementPage;
