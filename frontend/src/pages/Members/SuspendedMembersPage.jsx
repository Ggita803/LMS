import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Lock, Unlock } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const SuspendedMembersPageContent = () => {
  const [suspendedMembers, setSuspendedMembers] = useState([
    {
      id: '1',
      name: 'Robert Jackson',
      email: 'robert@email.com',
      phone: '+256705678901',
      membershipDate: '2023-09-15',
      suspensionDate: '2025-03-01',
      suspensionReason: 'Outstanding fines - UGX 15,000',
      daysLeft: 29,
      status: 'suspended',
    },
    {
      id: '2',
      name: 'Elena Martinez',
      email: 'elena@email.com',
      phone: '+256706789012',
      membershipDate: '2024-01-20',
      suspensionDate: '2025-02-15',
      suspensionReason: 'Lost books not replaced',
      daysLeft: 44,
      status: 'suspended',
    },
    {
      id: '3',
      name: 'Kevin O\'Brien',
      email: 'kevin@email.com',
      phone: '+256707890123',
      membershipDate: '2023-05-10',
      suspensionDate: '2025-03-10',
      suspensionReason: 'Violation of library rules',
      daysLeft: 19,
      status: 'suspended',
    },
  ]);

  const columns = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'suspensionReason', label: 'Reason' },
    { key: 'suspensionDate', label: 'Suspension Date' },
    {
      key: 'daysLeft',
      label: 'Days Left',
      render: (value) => (
        <span className={`font-semibold ${value <= 7 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
          {value}
        </span>
      ),
    },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-green-600 dark:text-green-400">
        <Unlock className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
    </>
  );

  const expiringSoon = suspendedMembers.filter((m) => m.daysLeft <= 7).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Suspended Members
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage suspended member accounts
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Suspended
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {suspendedMembers.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Expiring Soon (≤7 days)
          </p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {expiringSoon}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Average Suspension Time
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            {(suspendedMembers.reduce((sum, m) => sum + m.daysLeft, 0) / suspendedMembers.length).toFixed(0)} days
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Suspended Members List"
        columns={columns}
        data={suspendedMembers}
        searchPlaceholder="Search by name, email, reason..."
        actions={renderActions}
      />
    </div>
  );
};

const SuspendedMembersPage = () => {
  return (
    <MainLayout>
      <SuspendedMembersPageContent />
    </MainLayout>
  );
};

export default SuspendedMembersPage;
