import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, DollarSign, AlertTriangle, X } from 'lucide-react';

const BorrowConfirmationModal = ({ book, isOpen, onConfirm, onCancel, isLoading }) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  if (!isOpen || !book) return null;

  // Calculate due date (14 days from now)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  const formattedDueDate = dueDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const maxFine = 14 * (book.fine_per_day || 500); // Max fine if not returned

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal Container - Full Screen Centered */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Borrow Book?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Confirm borrowing details</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-smooth"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Book Info */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Book Title</p>
              <p className="font-bold text-slate-900 dark:text-white">{book.title}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Author</p>
              <p className="text-slate-700 dark:text-slate-300">{book.author}</p>
            </div>
          </div>

          {/* Due Date */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Return by</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formattedDueDate}</p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">14 days from today</p>
            </div>
          </div>

          {/* Late Fees Info */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300">Late Fee</p>
                <p className="text-sm text-amber-700 dark:text-amber-200">Shs {book.fine_per_day || 500}/day after due date</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-2 border-t border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-300">Max Fine</p>
                <p className="text-xs text-amber-700 dark:text-amber-200">Up to Shs {maxFine.toLocaleString()} if not returned</p>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-2 border-slate-300 dark:border-slate-600 accent-sky-600 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer flex-1">
              I understand the due date and late fees, and agree to return the book on time.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(book.id)}
              disabled={!agreeToTerms || isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Borrow'
              )}
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </>
  );
};

export default BorrowConfirmationModal;
