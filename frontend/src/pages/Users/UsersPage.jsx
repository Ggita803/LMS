import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Download, ChevronDown } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import AddUserModal from './AddUserModal';
import MainLayout from '../MainLayout';
import { createUser, getUsers, updateUser, deleteUser } from '../../services/userService';
import UserDetailsModal from './UserDetailsModal';
import EditUserModal from './EditUserModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { exportToPDF, exportToExcel, exportToCSV } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

const UsersPageContent = () => {
  const [users, setUsers] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

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

  // Modal state
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Action handlers
  const handleViewUser = (row) => setViewUser(row);

  const handleEditUser = (row) => setEditUser(row);

  const handleEditUserSubmit = async (formData) => {
    setIsEditLoading(true);
    try {
      await updateUser(editUser.user_id || editUser.id, formData);
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
      setEditUser(null);
    } catch (error) {
      alert('Failed to update user.');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDeleteUser = (row) => setDeleteTarget(row);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleteLoading(true);
    try {
      await deleteUser(deleteTarget.user_id || deleteTarget.id);
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
      setDeleteTarget(null);
    } catch (error) {
      alert('Failed to delete user.');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  // Export handlers
  const handleExportUsers = (format) => {
    const exportData = users.map(u => ({
      'Username': u.username,
      'First Name': u.first_name,
      'Last Name': u.last_name,
      'Email': u.email,
      'Role': u.role,
      'Joined': u.created_at ? u.created_at.split('T')[0] : '',
    }));

    const columns = [
      { header: 'Username', dataKey: 'Username' },
      { header: 'First Name', dataKey: 'First Name' },
      { header: 'Last Name', dataKey: 'Last Name' },
      { header: 'Email', dataKey: 'Email' },
      { header: 'Role', dataKey: 'Role' },
      { header: 'Joined', dataKey: 'Joined' },
    ];

    switch(format) {
      case 'pdf':
        exportToPDF(exportData, columns, 'users-list', 'Users Management Report');
        break;
      case 'excel':
        exportToExcel(exportData, 'users-list.xlsx', 'Users');
        break;
      case 'csv':
        exportToCSV(exportData, 'users-list');
        break;
      default:
        toast.error('Invalid format');
    }
    setExportMenuOpen(false);
  };

  // Action buttons for each row
  const renderActions = (row) => (
    <div className="flex gap-2">
      <button
        className="flex items-center gap-1 px-2 py-1 border border-blue-400 dark:border-blue-500 rounded-lg transition-colors text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        onClick={() => handleViewUser(row)}
      >
        <Eye className="w-4 h-4" />
        <span className="text-xs font-medium">View</span>
      </button>
      <button
        className="flex items-center gap-1 px-2 py-1 border border-slate-400 dark:border-slate-500 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        onClick={() => handleEditUser(row)}
      >
        <Edit2 className="w-4 h-4" />
        <span className="text-xs font-medium">Edit</span>
      </button>
      <button
        className="flex items-center gap-1 px-2 py-1 border border-red-400 dark:border-red-500 rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        onClick={() => handleDeleteUser(row)}
      >
        <Trash2 className="w-4 h-4" />
        <span className="text-xs font-medium">Delete</span>
      </button>
    </div>
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
        <div className="flex gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add New User
          </button>
          
          {/* Export Button */}
          <div className="relative">
            <button 
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 px-4 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all font-semibold"
            >
              <Download className="w-5 h-5" /> Export <ChevronDown className="w-4 h-4" />
            </button>
            
            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => handleExportUsers('pdf')}
                  className="w-full text-left px-4 py-2 hover:bg-sky-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700"
                >
                  📄 PDF Export
                </button>
                <button 
                  onClick={() => handleExportUsers('excel')}
                  className="w-full text-left px-4 py-2 hover:bg-sky-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700"
                >
                  📊 Excel Export
                </button>
                <button 
                  onClick={() => handleExportUsers('csv')}
                  className="w-full text-left px-4 py-2 hover:bg-sky-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 rounded-b-lg"
                >
                  📋 CSV Export
                </button>
              </div>
            )}
          </div>
        </div>
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
        {/* You can add more stats here if needed */}
      </div>

      {/* Data Table */}
      <DataTable
        title="Users List"
        columns={columns}
        data={users}
        searchPlaceholder="Search users by username, email..."
        actions={renderActions}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        isLoading={isLoading}
      />

      {/* View User Modal */}
      <UserDetailsModal
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        user={viewUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        user={editUser}
        onSubmit={handleEditUserSubmit}
        isLoading={isEditLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        title="Delete User"
        message={deleteTarget ? `Are you sure you want to delete user '${deleteTarget.username || deleteTarget.email}'? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        isLoading={isDeleteLoading}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
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
