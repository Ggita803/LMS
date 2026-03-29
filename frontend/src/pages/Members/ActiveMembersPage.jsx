import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, UserCheck } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const ActiveMembersPageContent = () => {
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Muguerwa Dickson',
      email: 'muguerwa@email.com',
      phone: '+256701234567',
      membershipDate: '2024-01-15',
      status: 'active',
      booksLoaned: 2,
      totalBorrowed: 15,
    },
    {
      id: '2',
      name: 'Gotta Ibrahim',
      email: 'gotta@email.com',
      phone: '+256702345678',
      membershipDate: '2024-02-20',
      status: 'active',
      booksLoaned: 1,
      totalBorrowed: 8,
    },
    {
      id: '3',
      name: 'SENTONGO EDRINE',
      email: 'sentongo@email.com',
      phone: '+256703456789',
      membershipDate: '2023-11-10',
      status: 'active',
      booksLoaned: 0,
      totalBorrowed: 25,
    },
    {
      id: '4',
      name: 'Wopa Hatim',
      email: 'wopa@email.com',
      phone: '+256704567890',
      membershipDate: '2024-03-01',
      status: 'active',
      booksLoaned: 3,
      totalBorrowed: 5,
    },
  ]);

  const columns = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'membershipDate', label: 'Joined' },
    {
      key: 'booksLoaned',
      label: 'Current Loans',
      render: (value) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">{value}</span>
      ),
    },
    { key: 'totalBorrowed', label: 'Total Borrowed' },
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

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Active Members
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            View all active library members
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Members
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {members.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Active Loans
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {members.reduce((sum, m) => sum + m.booksLoaned, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Average Books/Member
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            {(members.reduce((sum, m) => sum + m.totalBorrowed, 0) / members.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Active Members List"
        columns={columns}
        data={members}
        searchPlaceholder="Search by name, email, phone..."
        actions={renderActions}
      />
    </div>
  );
};

const ActiveMembersPage = () => {
  return (
    <MainLayout>
      <ActiveMembersPageContent />
    </MainLayout>
  );
};

export default ActiveMembersPage;
