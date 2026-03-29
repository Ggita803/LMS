import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, CheckCircle2 } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import MainLayout from '../MainLayout';

const PaidFinesPageContent = () => {
  const [paidFines, setPaidFines] = useState([
    {
      id: '1',
      memberName: 'Jane Smith',
      fineType: 'Book Damage',
      amount: 5000,
      paymentDate: '2025-03-25',
      paymentMethod: 'Cash',
      reference: 'PAY-001',
    },
    {
      id: '2',
      memberName: 'Michael Brown',
      fineType: 'Overdue',
      amount: 3500,
      paymentDate: '2025-03-24',
      paymentMethod: 'Mobile Money',
      reference: 'PAY-002',
    },
    {
      id: '3',
      memberName: 'Sarah Davis',
      fineType: 'Late Return',
      amount: 2000,
      paymentDate: '2025-03-23',
      paymentMethod: 'Card',
      reference: 'PAY-003',
    },
    {
      id: '4',
      memberName: 'James Wilson',
      fineType: 'Book Damage',
      amount: 8000,
      paymentDate: '2025-03-20',
      paymentMethod: 'Cash',
      reference: 'PAY-004',
    },
  ]);

  const columns = [
    { key: 'memberName', label: 'Member Name' },
    { key: 'fineType', label: 'Type' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          UGX {value.toLocaleString()}
        </span>
      ),
    },
    { key: 'paymentDate', label: 'Payment Date' },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'reference', label: 'Reference' },
  ];

  const renderActions = (row) => (
    <>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-green-600 dark:text-green-400">
        <CheckCircle2 className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400">
        <Edit2 className="w-4 h-4" />
      </button>
    </>
  );

  const totalPaid = paidFines.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Paid Fines
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            View collected fines and payment records
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Paid Fines
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {paidFines.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Collection
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            UGX {totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Average Payment
          </p>
          <p className="text-3xl font-bold text-slate-600 mt-2">
            UGX {(totalPaid / paidFines.length).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Paid Fines History"
        columns={columns}
        data={paidFines}
        searchPlaceholder="Search by member, type, reference..."
        actions={renderActions}
      />
    </div>
  );
};

const PaidFinesPage = () => {
  return (
    <MainLayout>
      <PaidFinesPageContent />
    </MainLayout>
  );
};

export default PaidFinesPage;
