import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import BaseModal from '../../components/Modals/BaseModal';

const ProcessReturnModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    borrowingId: '',
    condition: 'good',
    notes: '',
    fineAmount: 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.borrowingId.trim()) {
      newErrors.borrowingId = 'Borrowing ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
    setFormData({
      borrowingId: '',
      condition: 'good',
      notes: '',
      fineAmount: 0,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fineAmount' ? parseFloat(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Process Book Return"
      size="md"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-semibold"
          >
            {isLoading ? 'Processing...' : 'Process Return'}
          </button>
        </>
      }
    >
      <form className="space-y-4">
        {/* Borrowing ID */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Borrowing ID *
          </label>
          <input
            type="text"
            name="borrowingId"
            value={formData.borrowingId}
            onChange={handleChange}
            placeholder="Enter borrowing ID"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {errors.borrowingId && (
            <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.borrowingId}
            </div>
          )}
        </div>

        {/* Book Condition */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Book Condition
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="good">Good</option>
            <option value="fair">Fair (Minor Damage)</option>
            <option value="poor">Poor (Significant Damage)</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Fine Amount */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Fine Amount (if any)
          </label>
          <input
            type="number"
            name="fineAmount"
            value={formData.fineAmount}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1000"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
            Return Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional notes about the return..."
            rows="3"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </form>
    </BaseModal>
  );
};

export default ProcessReturnModal;
