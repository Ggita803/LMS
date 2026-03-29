import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import AddUserModal from './AddUserModal';
import MainLayout from '../MainLayout';

const UsersPageContent = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Muguerwa Dickson',
      email: 'muguerwa@university.edu',
      studentId: '240080737',
      role: 'Student',
      status: 'active',
      joinDate: '2025-03-27',
    },
    {
      id: '2',
      name: 'Gotta Ibrahim',
      email: 'gotta@university.edu',
      studentId: '240080025',
      role: 'Student',
      status: 'active',
      joinDate: '2025-03-27',
    },
    {
      id: '3',
      name: 'SENTONGO EDRINE',
      email: 'sentongo@university.edu',
      studentId: '240081157',
      role: 'Student',
      status: 'active',
      joinDate: '2025-03-27',
    },
    {
      id: '4',
      name: 'Wopa Hatim',
      email: 'wopa@university.edu',
      studentId: '240081245',
      role: 'Student',
      status: 'suspended',
      joinDate: '2025-03-19',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle adding new user
  const handleAddUser = async (formData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: String(users.length + 1),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      };

      setUsers([...users, newUser]);
      setIsAddModalOpen(false);
      // Show success toast here if you have a toast library
    } catch (error) {
      console.error('Failed to add user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Table columns
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'joinDate', label: 'Joined' },
  ];

  // Action buttons for each row
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
            Users Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage library members and administrators
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Users
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {users.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Active
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {users.filter((u) => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Suspended
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {users.filter((u) => u.status === 'suspended').length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Students
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {users.filter((u) => u.role === 'Student').length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Users List"
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name, email..."
        actions={renderActions}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        isLoading={isLoading}
      />
    </div>
  );
};

const UsersPage = () => {
  return (
    <MainLayout>
      <UsersPageContent />
    </MainLayout>
  );
};

export default UsersPage;
