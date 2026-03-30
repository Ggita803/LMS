import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import AddUserModal from './AddUserModal';
import MainLayout from '../MainLayout';
import { createUser, getUsers, updateUser, deleteUser } from '../../services/userService';

const UsersPageContent = () => {
  const [users, setUsers] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        // Use paginated response: res.data.items
        const mapped = ((res.data && res.data.items) || []).map(u => ({
          id: u.user_id,
          username: u.username,
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          role: u.role,
          created_at: u.created_at,
        }));
        setUsers(mapped);
      } catch (error) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Handle adding new user
  const handleAddUser = async (formData) => {
    setIsLoading(true);
    try {
      await createUser(formData);
      // Refresh user list
      const res = await getUsers();
      const mapped = ((res.data && res.data.items) || []).map(u => ({
        id: u.user_id,
        username: u.username,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        role: u.role,
        created_at: u.created_at,
      }));
      setUsers(mapped);
      setIsAddModalOpen(false);
    } catch (error) {
      alert('Failed to add user.');
    } finally {
      setIsLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'first_name',
      label: 'First Name',
    },
    {
      key: 'last_name',
      label: 'Last Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
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
      key: 'created_at',
      label: 'Joined',
      render: (value) => value ? value.split('T')[0] : '',
    },
  ];

  // Action handlers
  const handleViewUser = async (row) => {
    alert(`User info:\nUsername: ${row.username || row.email}\nEmail: ${row.email}`);
  };

  const handleEditUser = async (row) => {
    const newFirstName = prompt('Edit first name:', row.first_name || '');
    if (newFirstName && newFirstName !== row.first_name) {
      try {
        await updateUser(row.user_id || row.id, { first_name: newFirstName });
        const res = await getUsers();
        setUsers(res.users || []);
      } catch (error) {
        alert('Failed to update user.');
      }
    }
  };

  const handleDeleteUser = async (row) => {
    if (window.confirm(`Are you sure you want to delete user ${row.username || row.email}?`)) {
      try {
        await deleteUser(row.user_id || row.id);
        const res = await getUsers();
        setUsers(res.users || []);
      } catch (error) {
        alert('Failed to delete user.');
      }
    }
  };

  // Action buttons for each row
  const renderActions = (row) => (
    <>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
        onClick={() => handleViewUser(row)}
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
        onClick={() => handleEditUser(row)}
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
        onClick={() => handleDeleteUser(row)}
      >
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
