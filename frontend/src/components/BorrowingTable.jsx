import React from 'react';
import { 
  Calendar, AlertCircle, CheckCircle, XCircle, 
  Clock, DollarSign, RefreshCw, Trash2, Eye
} from 'lucide-react';

const BorrowingTable = ({ 
  data = [], 
  columns = [], 
  onApprove, 
  onReject, 
  onReturn,
  onRenew,
  showActions = false,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <Clock className="w-8 h-8 text-sky-600" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No borrowing records found</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Active' },
      'pending_approval': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'overdue': { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' },
      'returned': { bg: 'bg-green-100', text: 'text-green-800', label: 'Returned' },
      'rejected': { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Rejected' }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>;
  };

  const getApprovalBadge = (approval_status) => {
    if (approval_status === 'pending') {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
        <Clock className="w-4 h-4 mr-1" /> Awaiting Approval
      </span>;
    }
    if (approval_status === 'approved') {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-4 h-4 mr-1" /> Approved
      </span>;
    }
    if (approval_status === 'rejected') {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
        <XCircle className="w-4 h-4 mr-1" /> Rejected
      </span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">Book</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">User</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">Due Date</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">Status</th>
            {showActions && <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">Approval</th>}
            {showActions && <th className="px-6 py-3 text-center font-semibold text-slate-900 dark:text-slate-100">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {data.map((record) => {
            const daysLeft = getDaysUntilDue(record.due_date);
            const isOverdue = daysLeft < 0;

            return (
              <tr key={record.borrow_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{record.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{record.author}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-900 dark:text-slate-100">{record.username || 'N/A'}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{record.email || 'N/A'}</p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-slate-900 dark:text-slate-100">{formatDate(record.due_date)}</p>
                    <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : daysLeft <= 3 ? 'text-amber-600' : 'text-green-600'}`}>
                      {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(record.status)}
                </td>
                {showActions && (
                  <td className="px-6 py-4">
                    {getApprovalBadge(record.approval_status)}
                  </td>
                )}
                {showActions && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {record.approval_status === 'pending' && (
                        <>
                          <button
                            onClick={() => onApprove?.(record.borrow_id)}
                            className="inline-flex items-center px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors text-xs font-medium"
                            title="Approve request"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onReject?.(record.borrow_id)}
                            className="inline-flex items-center px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-xs font-medium"
                            title="Reject request"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {record.status === 'active' && (
                        <>
                          <button
                            onClick={() => onReturn?.(record.borrow_id)}
                            className="inline-flex items-center px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-xs font-medium"
                            title="Return book"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRenew?.(record.borrow_id)}
                            className="inline-flex items-center px-3 py-1 rounded bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors text-xs font-medium"
                            title="Renew borrowing"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingTable;
