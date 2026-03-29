import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import MainLayout from '../MainLayout';

const FineReportsPageContent = () => {
  const [reportFilter, setReportFilter] = useState('monthly');

  const reportData = {
    totalFines: 36500,
    paidAmount: 18000,
    outstandingAmount: 18500,
    collectionRate: 49.3,
    totalTransactions: 12,
    averageFine: 3042,
  };

  const monthlyBreakdown = [
    { month: 'January', fines: 8000, paid: 5000, outstanding: 3000 },
    { month: 'February', fines: 12000, paid: 8000, outstanding: 4000 },
    { month: 'March', fines: 16500, paid: 5000, outstanding: 11500 },
  ];

  const finesByType = [
    { type: 'Overdue', count: 15, amount: 15000, percentage: 41 },
    { type: 'Book Damage', count: 8, amount: 13000, percentage: 36 },
    { type: 'Lost Book', count: 3, amount: 5000, percentage: 14 },
    { type: 'Late Return', count: 2, amount: 2500, percentage: 9 },
  ];

  const paymentMethods = [
    { method: 'Cash', amount: 10000, percentage: 56 },
    { method: 'Mobile Money', amount: 6000, percentage: 33 },
    { method: 'Card', amount: 2000, percentage: 11 },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Fine Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Financial reports and analytics
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select
          value={reportFilter}
          onChange={(e) => setReportFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Fines Generated
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            UGX {reportData.totalFines.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {reportData.totalTransactions} transactions
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Total Collected
          </p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            UGX {reportData.paidAmount.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
            {reportData.collectionRate}% collection rate
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Outstanding Amount
          </p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            UGX {reportData.outstandingAmount.toLocaleString()}
          </p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
            {(100 - reportData.collectionRate).toFixed(1)}% pending
          </p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Monthly Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Month
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Fines Generated
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Paid
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Outstanding
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-white font-medium">
                    {row.month}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-slate-900 dark:text-white">
                    UGX {row.fines.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    UGX {row.paid.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-red-600 dark:text-red-400 font-semibold">
                    UGX {row.outstanding.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fines by Type & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Type */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Fines by Type
          </h2>
          <div className="space-y-4">
            {finesByType.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.type} ({item.count})
                  </span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  UGX {item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Payment Methods
          </h2>
          <div className="space-y-4">
            {paymentMethods.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.method}
                  </span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  UGX {item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FineReportsPage = () => {
  return (
    <MainLayout>
      <FineReportsPageContent />
    </MainLayout>
  );
};

export default FineReportsPage;
