import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const DueSoonPageContent = () => {
  const [dueSoonItems, setDueSoonItems] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      bookTitle: 'The Great Gatsby',
      isbn: '978-0743273565',
      borrowDate: '2025-03-10',
      dueDate: '2025-03-24',
      daysLeft: 3,
      status: 'critical',
    },
    {
      id: '2',
      memberName: 'Wopa Hatim',
      bookTitle: 'To Kill a Mockingbird',
      isbn: '978-0061120084',
      borrowDate: '2025-03-01',
      dueDate: '2025-03-28',
      daysLeft: 1,
      status: 'critical',
    },
    {
      id: '3',
      memberName: 'Robert Johnson',
      bookTitle: '1984',
      isbn: '978-0451524935',
      borrowDate: '2025-03-05',
      dueDate: '2025-03-26',
      daysLeft: 2,
      status: 'warning',
    },
    {
      id: '4',
      memberName: 'Alice Williams',
      bookTitle: 'The Catcher in the Rye',
      isbn: '978-0316769174',
      borrowDate: '2025-03-12',
      dueDate: '2025-03-27',
      daysLeft: 3,
      status: 'warning',
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
        const styles = value <= 1 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400';
        return <span className={`font-semibold ${styles}`}>{value} days</span>;
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
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-green-600 dark:text-green-400">
        <Plus className="w-4 h-4" />
      </button>
    </>
  );

  const critical = dueSoonItems.filter((item) => item.daysLeft <= 1);
  const warning = dueSoonItems.filter((item) => item.daysLeft > 1 && item.daysLeft <= 3);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Books Due Soon
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Books due within the next 3 days
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-orange-900 dark:text-orange-300">
            {dueSoonItems.length} items due within 3 days
          </p>
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Send reminders to members to prevent overdue items
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Due Soon
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {dueSoonItems.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Critical (1 day)
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {critical.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Warning (2-3 days)
          </p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {warning.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Items Due Soon"
        columns={columns}
        data={dueSoonItems}
        searchPlaceholder="Search by member, book, ISBN..."
        actions={renderActions}
      />
    </div>
  );
};

const DueSoonPage = () => {
  return (
    <MainLayout>
      <DueSoonPageContent />
    </MainLayout>
  );
};

export default DueSoonPage;
