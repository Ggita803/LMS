import React, { useState } from 'react';
import { X, AlertCircle, Check } from 'lucide-react';
import Button from './Button';

const BorrowingRequestModal = ({ 
  request = null, 
  onClose, 
  onApprove, 
  onReject,
  isLoading = false 
}) => {
  const [rejectionReason, setRejectionReason] = useState('');

  if (!request) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Borrow Request Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Book Info */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
              Book Title
            </label>
            <p className="text-slate-900 dark:text-slate-100 font-semibold">
              {request.title}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              by {request.author}
            </p>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
                Requested By
              </label>
              <p className="text-slate-900 dark:text-slate-100">{request.username}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{request.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
                Phone
              </label>
              <p className="text-slate-900 dark:text-slate-100">{request.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Request Date & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
                Requested Date
              </label>
              <p className="text-slate-900 dark:text-slate-100">
                {formatDate(request.checkout_date)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">
                Proposed Due Date
              </label>
              <p className="text-slate-900 dark:text-slate-100">
                {formatDate(request.due_date)}
              </p>
            </div>
          </div>

          {/* Status Alert */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Pending Approval
              </p>
              <p className="text-blue-700 dark:text-blue-200 text-xs mt-1">
                Please review the request and approve or reject it.
              </p>
            </div>
          </div>

          {/* Rejection Reason (shown when rejecting) */}
          {request.approval_status === 'pending' && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                Rejection Reason (if rejecting)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                rows="3"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {request.approval_status === 'pending' && (
          <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              onClick={() => onReject?.(request.borrow_id, rejectionReason)}
              disabled={isLoading}
              variant="secondary"
              className="flex-1"
            >
              Reject
            </Button>
            <Button
              onClick={() => onApprove?.(request.borrow_id)}
              disabled={isLoading}
              icon={Check}
              className="flex-1"
            >
              Approve
            </Button>
          </div>
        )}

        {request.approval_status !== 'pending' && (
          <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowingRequestModal;
