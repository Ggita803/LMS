import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const OutstandingFinesPageContent = () => {
  const [outstandingFines, setOutstandingFines] = useState([
    {
      id: '1',
      memberName: 'SENTONGO EDRINE',
      fineType: 'Overdue',
      amount: 4500,
      daysPending: 9,
      dueDate: '2025-03-29',
      priority: 'high',
    },
    {
      id: '2',
      memberName: 'John Doe',
      fineType: 'Overdue',
      amount: 7000,
      daysPending: 14,
      dueDate: '2025-03-29',
      priority: 'critical',
    },
    {
      id: '3',
      memberName: 'Alice Williams',
      fineType: 'Lost Book',
      amount: 15000,
      daysPending: 14,
      dueDate: '2025-04-05',
      priority: 'critical',
    },
    {
      id: '4',
      memberName: 'Robert Wilson',
      fineType: 'Book Damage',
      amount: 3500,
      daysPending: 21,
      dueDate: '2025-03-15',
      priority: 'high',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'fineType', label: 'Type' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-red-600 dark:text-red-400">
          UGX {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'daysPending',
      label: 'Days Pending',
      render: (value) => (
        <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
      ),
    },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => {
        const styles = {
          low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
          medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
          high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
          critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
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
        <Plus className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
    </>
  );

  const totalOutstanding = outstandingFines.reduce((sum, item) => sum + item.amount, 0);
  const criticalCount = outstandingFines.filter((f) => f.priority === 'critical').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Outstanding Fines
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            View unpaid fines and follow up with members
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-900 dark:text-red-300">
            {criticalCount} critical fines requiring immediate attention
          </p>
          <p className="text-sm text-red-700 dark:text-red-400">
            Total outstanding: UGX {totalOutstanding.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Outstanding Fines
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {outstandingFines.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Amount
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            UGX {(totalOutstanding / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Critical
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {criticalCount}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Average Fine
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            UGX {outstandingFines.length > 0 ? (totalOutstanding / outstandingFines.length).toFixed(0) : 0}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Outstanding Fines List"
        columns={columns}
        data={outstandingFines}
        searchPlaceholder="Search by member, type..."
        actions={renderActions}
      />
    </div>
  );
};

const OutstandingFinesPage = () => {
  return (
    <MainLayout>
      <OutstandingFinesPageContent />
    </MainLayout>
  );
};

export default OutstandingFinesPage;
