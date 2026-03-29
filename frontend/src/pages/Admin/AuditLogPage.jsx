import React, { useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const AuditLogPageContent = () => {
  const [logs, setLogs] = useState([
    {
      id: '1',
      timestamp: '2025-03-29 14:30:22',
      user: 'Admin User',
      action: 'Book Added',
      target: 'The Great Gatsby (ISBN: 978-0743273565)',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: '2025-03-29 14:20:15',
      user: 'Muguerwa Dickson',
      action: 'Book Borrowed',
      target: 'Clean Code (ISBN: 978-0132350884)',
      status: 'success',
      ipAddress: '192.168.1.101',
    },
    {
      id: '3',
      timestamp: '2025-03-29 14:10:08',
      user: 'Admin User',
      action: 'Member Suspended',
      target: 'Robert Jackson (ID: 45)',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '4',
      timestamp: '2025-03-29 13:55:42',
      user: 'SENTONGO EDRINE',
      action: 'Fine Payment',
      target: 'Payment of UGX 4,500',
      status: 'success',
      ipAddress: '192.168.1.102',
    },
    {
      id: '5',
      timestamp: '2025-03-29 13:45:20',
      user: 'Admin User',
      action: 'Book Return Processed',
      target: 'Python Crash Course (ISBN: 978-1593279288)',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
  ]);

  const columns = [
    { key: 'timestamp', label: 'Date & Time' },
    { key: 'user', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'target', label: 'Target' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    { key: 'ipAddress', label: 'IP Address' },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
    </>
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            System Audit Log
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track all system activities and changes
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-all font-semibold">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Logged Events
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            1,245
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Today's Events
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {logs.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Failed Events
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">0</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Activity Log"
        columns={columns}
        data={logs}
        searchPlaceholder="Search by user, action, target..."
        actions={renderActions}
      />
    </div>
  );
};

const AuditLogPage = () => {
  return (
    <MainLayout>
      <AuditLogPageContent />
    </MainLayout>
  );
};

export default AuditLogPage;
