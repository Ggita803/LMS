import React, { useState } from 'react';
import { AlertCircle, DollarSign } from 'lucide-react';
import Button from './Button';

const FinePaymentForm = ({
  borrowId,
  totalFine = 0,
  bookTitle = '',
  onPaymentSuccess,
  onCancel,
  isLoading = false
}) => {
  const [paymentAmount, setPaymentAmount] = useState(totalFine.toString());
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setPaymentAmount(value);
    setError('');

    // Validation
    if (value && parseFloat(value) > totalFine) {
      setError(`Cannot pay more than the outstanding fine (Php ${totalFine.toFixed(2)})`);
    } else if (value && parseFloat(value) <= 0) {
      setError('Payment amount must be greater than 0');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0 || amount > totalFine) {
      setError('Please enter a valid payment amount');
      return;
    }

    onPaymentSuccess?.(borrowId, amount);
  };

  const remainingBalance = (totalFine - (paymentAmount ? parseFloat(paymentAmount) : 0)).toFixed(2);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Pay Overdue Fine
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Book: <span className="font-medium text-slate-900 dark:text-slate-100">{bookTitle}</span>
        </p>
      </div>

      {/* Outstanding Fine Alert */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6 border border-red-200 dark:border-red-800/50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-100 mb-1">
              Outstanding Fine
            </p>
            <p className="text-2xl font-bold text-red-600 mb-1">
              Php {totalFine.toFixed(2)}
            </p>
            <p className="text-sm text-red-800 dark:text-red-200">
              Fine accumulates at Php 10 per day until the book is returned.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Payment Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
            Payment Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              step="0.01"
              min="0"
              max={totalFine}
              value={paymentAmount}
              onChange={handleAmountChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Remaining Balance */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/50">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Remaining Balance After Payment: 
            <span className="font-bold ml-2">Php {remainingBalance}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800/50">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
            Payment Method
          </label>
          <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="card">Card</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
            Payment Notes (Optional)
          </label>
          <textarea
            placeholder="Add any additional notes..."
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows="2"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || error !== '' || !paymentAmount}
            loading={isLoading}
            className="flex-1"
          >
            Proceed to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FinePaymentForm;
