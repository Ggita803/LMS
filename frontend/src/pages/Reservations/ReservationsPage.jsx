import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import NewReservationModal from './NewReservationModal';
import MainLayout from '../MainLayout';

const ReservationsPageContent = () => {
  const [reservations, setReservations] = useState([
    {
      id: '1',
      memberName: 'Muguerwa Dickson',
      bookTitle: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      reservationDate: '2025-03-25',
      expiryDate: '2025-04-08',
      status: 'pending',
      position: 1,
    },
    {
      id: '2',
      memberName: 'Gotta Ibrahim',
      bookTitle: 'Clean Code',
      author: 'Robert C. Martin',
      reservationDate: '2025-03-22',
      expiryDate: '2025-04-05',
      status: 'ready',
      position: 2,
    },
    {
      id: '3',
      memberName: 'SENTONGO EDRINE',
      bookTitle: 'Python Crash Course',
      author: 'Eric Matthes',
      reservationDate: '2025-03-18',
      expiryDate: '2025-04-01',
      status: 'pending',
      position: 3,
    },
    {
      id: '4',
      memberName: 'Wopa Hatim',
      bookTitle: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      reservationDate: '2025-03-20',
      expiryDate: '2025-04-03',
      status: 'expired',
      position: 4,
    },
  ]);

  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReservation = async (formData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReservation = {
        id: String(reservations.length + 1),
        ...formData,
        reservationDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        position: reservations.filter((r) => r.status === 'pending').length + 1,
      };

      setReservations([...reservations, newReservation]);
      setIsNewReservationOpen(false);
    } catch (error) {
      console.error('Failed to add reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'bookTitle', label: 'Book Title' },
    { key: 'author', label: 'Author' },
    { key: 'reservationDate', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const styles = {
          pending: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
          ready: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
          expired: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[value]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'position',
      label: 'Queue Position',
      render: (value) => <span className="font-semibold"># {value}</span>,
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

  const pendingReservations = reservations.filter((r) => r.status === 'pending');
  const readyReservations = reservations.filter((r) => r.status === 'ready');
  const expiredReservations = reservations.filter((r) => r.status === 'expired');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Reservations Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage book reservations and queue
          </p>
        </div>
        <button
          onClick={() => setIsNewReservationOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Reservation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Reservations
          </p>
          <p className="text-3xl font-bold text-pink-600 mt-2">
            {reservations.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Pending
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {pendingReservations.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Ready for Pickup
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {readyReservations.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Expired
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {expiredReservations.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Reservations List"
        columns={columns}
        data={reservations}
        searchPlaceholder="Search reservations by member, book..."
        actions={renderActions}
      />

      {/* New Reservation Modal */}
      <NewReservationModal
        isOpen={isNewReservationOpen}
        onClose={() => setIsNewReservationOpen(false)}
        onSubmit={handleAddReservation}
        isLoading={isLoading}
      />
    </div>
  );
};

const ReservationsPage = () => {
  return (
    <MainLayout>
      <ReservationsPageContent />
    </MainLayout>
  );
};

export default ReservationsPage;
