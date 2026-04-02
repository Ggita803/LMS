import React from 'react';
import { BarChart3, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const BorrowingStats = ({ stats = {} }) => {
  const {
    total_active = 0,
    total_pending = 0,
    total_overdue = 0,
    total_returned = 0,
    total_outstanding_fines = 0,
    active_count = 0,
    pending_count = 0,
    overdue_count = 0,
    returned_count = 0,
    total_fines = 0
  } = stats;

  // Ensure all numeric values are numbers (API might return strings)
  const activeValue = Number(total_active || active_count || 0);
  const pendingValue = Number(total_pending || pending_count || 0);
  const overdueValue = Number(total_overdue || overdue_count || 0);
  const returnedValue = Number(total_returned || returned_count || 0);

  const statCards = [
    {
      icon: CheckCircle,
      label: 'Active Borrowings',
      value: activeValue,
      color: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600',
      trend: 'Current'
    },
    {
      icon: Clock,
      label: 'Pending Approval',
      value: pendingValue,
      color: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600',
      trend: 'Awaiting'
    },
    {
      icon: AlertCircle,
      label: 'Overdue Books',
      value: overdueValue,
      color: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600',
      trend: 'Alert'
    },
    {
      icon: BarChart3,
      label: 'Total Returned',
      value: returnedValue,
      color: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600',
      trend: 'Completed'
    }
  ];

  // Ensure fines amount is a number before calling toFixed
  const finesAmount = Number(total_outstanding_fines || total_fines || 0);
  
  const finesCard = {
    icon: XCircle,
    label: 'Outstanding Fines',
    value: `Php ${finesAmount.toFixed(2)}`,
    color: 'bg-rose-100 dark:bg-rose-900/30',
    iconColor: 'text-rose-600'
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`${card.color} rounded-lg p-6 border border-slate-200 dark:border-slate-700`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 ${card.iconColor}`} />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                  {card.trend}
                </span>
              </div>
              <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                {card.label}
              </h3>
              <p className={`text-3xl font-bold ${card.iconColor}`}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Outstanding Fines Card */}
      <div className={`${finesCard.color} rounded-lg p-6 border border-slate-200 dark:border-slate-700`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${finesCard.color}`}>
            <XCircle className={`w-8 h-8 ${finesCard.iconColor}`} />
          </div>
          <div>
            <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              {finesCard.label}
            </h3>
            <p className={`text-2xl font-bold ${finesCard.iconColor}`}>
              {finesCard.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingStats;
