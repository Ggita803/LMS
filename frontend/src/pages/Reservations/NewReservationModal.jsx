import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const NewReservationModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    memberName: '',
    bookTitle: '',
    author: '',
    expiryDate: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.memberName.trim()) {
      newErrors.memberName = 'Member name is required';
    }

    if (!formData.bookTitle.trim()) {
      newErrors.bookTitle = 'Book title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        memberName: '',
        bookTitle: '',
        author: '',
        expiryDate: '',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            New Reservation
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Member Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Member Name
            </label>
            <input
              type="text"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="Enter member name"
              className={`w-full px-3 py-2 rounded-lg border transition-colors dark:bg-slate-700 dark:text-white ${
                errors.memberName
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-300 dark:border-slate-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.memberName && (
              <div className="flex items-center gap-2 mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.memberName}
              </div>
            )}
          </div>

          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Book Title
            </label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="Enter book title"
              className={`w-full px-3 py-2 rounded-lg border transition-colors dark:bg-slate-700 dark:text-white ${
                errors.bookTitle
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-300 dark:border-slate-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.bookTitle && (
              <div className="flex items-center gap-2 mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.bookTitle}
              </div>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={`w-full px-3 py-2 rounded-lg border transition-colors dark:bg-slate-700 dark:text-white ${
                errors.author
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-300 dark:border-slate-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.author && (
              <div className="flex items-center gap-2 mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.author}
              </div>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border transition-colors dark:bg-slate-700 dark:text-white ${
                errors.expiryDate
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-300 dark:border-slate-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.expiryDate && (
              <div className="flex items-center gap-2 mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.expiryDate}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReservationModal;
