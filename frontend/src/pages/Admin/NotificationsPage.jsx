import React, { useState } from 'react';
import { Bell, Archive, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const NotificationsPageContent = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Book Overdue Reminder',
      message: 'The Great Gatsby is now 3 days overdue',
      recipient: 'Muguerwa Dickson',
      type: 'overdue',
      sentDate: '2025-03-29 10:30',
      read: false,
    },
    {
      id: '2',
      title: 'Reservation Ready',
      message: 'Your reserved book Clean Code is ready for pickup',
      recipient: 'Gotta Ibrahim',
      type: 'ready',
      sentDate: '2025-03-28 14:15',
      read: true,
    },
    {
      id: '3',
      title: 'Fine Payment Due',
      message: 'Outstanding fine of UGX 4,500 is due tomorrow',
      recipient: 'SENTONGO EDRINE',
      type: 'payment',
      sentDate: '2025-03-27 09:00',
      read: false,
    },
    {
      id: '4',
      title: 'Book Available',
      message: 'To Kill a Mockingbird has been returned and is available',
      recipient: 'Alice Williams',
      type: 'available',
      sentDate: '2025-03-26 16:45',
      read: true,
    },
  ]);

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    { key: 'recipient', label: 'Recipient' },
    {
      key: 'type',
      label: 'Type',
      render: (value) => {
        const styles = {
          overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
          ready: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          payment: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
          available: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    { key: 'sentDate', label: 'Date Sent' },
    {
      key: 'read',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${value ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
          {value ? 'Read' : 'Unread'}
        </span>
      ),
    },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Archive className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-red-600 dark:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage system notifications
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-semibold">
          <Bell className="w-5 h-5" />
          {unread} Unread
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Notifications
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            {notifications.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Unread
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {unread}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Read
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {notifications.filter((n) => n.read).length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="All Notifications"
        columns={columns}
        data={notifications}
        searchPlaceholder="Search by title, recipient, type..."
        actions={renderActions}
      />
    </div>
  );
};

const NotificationsAdminPage = () => {
  return (
    <MainLayout>
      <NotificationsPageContent />
    </MainLayout>
  );
};

export default NotificationsAdminPage;
