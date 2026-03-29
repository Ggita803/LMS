import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import MainLayout from '../MainLayout';

const SendNotificationsPageContent = () => {
  const [formData, setFormData] = useState({
    recipientType: 'all',
    notificationType: 'general',
    subject: '',
    message: '',
    scheduleType: 'immediate',
    scheduledDate: '',
    scheduledTime: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsLoading(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Send Notifications
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Send mass notifications to members
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Notification sent successfully!
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6">
          {/* Recipient Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Send To
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { value: 'all', label: 'All Members' },
                { value: 'active', label: 'Active Only' },
                { value: 'overdue', label: 'With Overdue' },
                { value: 'custom', label: 'Custom List' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="recipientType"
                    value={option.value}
                    checked={formData.recipientType === option.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Notification Type
            </label>
            <select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="general">General Announcement</option>
              <option value="overdue">Overdue Reminder</option>
              <option value="ready">Reservation Ready</option>
              <option value="payment">Payment Due</option>
              <option value="system">System Maintenance</option>
              <option value="event">Library Event</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter notification subject"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message here..."
              rows="6"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              required
            ></textarea>
          </div>

          {/* Schedule Options */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Send Option
            </label>
            <div className="space-y-3">
              {[
                { value: 'immediate', label: 'Send Immediately' },
                { value: 'scheduled', label: 'Schedule for Later' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="scheduleType"
                    value={option.value}
                    checked={formData.scheduleType === option.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Scheduled Date/Time */}
          {formData.scheduleType === 'scheduled' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Scheduled Time
                </label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                Note
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                Members will receive notifications via their registered email address and SMS (if enabled on their profile).
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3  bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {isLoading ? 'Sending...' : 'Send Notification'}
          </button>
        </div>
      </form>
    </div>
  );
};

const SendNotificationsPage = () => {
  return (
    <MainLayout>
      <SendNotificationsPageContent />
    </MainLayout>
  );
};

export default SendNotificationsPage;
