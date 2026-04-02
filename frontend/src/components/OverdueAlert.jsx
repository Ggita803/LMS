import React from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';

const OverdueAlert = ({ 
  book = {}, 
  daysOverdue = 0,
  fineAmount = 0,
  onReturnClick,
  onPayFineClick
}) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/50">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1">
          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
            Overdue: {book.title}
          </h4>
          <p className="text-sm text-red-800 dark:text-red-200 mb-3">
            This book is <span className="font-semibold">{daysOverdue} days overdue</span>. 
            Please return it as soon as possible.
          </p>
          
          {fineAmount > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded p-2 mb-3">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Outstanding Fine: <span className="text-red-600 font-bold">Php {fineAmount.toFixed(2)}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Fine accumulating at Php 10 per day
              </p>
            </div>
          )}

          <div className="flex gap-2">
            {onReturnClick && (
              <button
                onClick={onReturnClick}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Return Book
              </button>
            )}
            {onPayFineClick && fineAmount > 0 && (
              <button
                onClick={onPayFineClick}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors"
              >
                Pay Fine
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueAlert;
