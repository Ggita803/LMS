import React from 'react';

const UnauthorizedPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
    <h1 className="text-4xl font-bold text-sky-600 mb-4">Unauthorized</h1>
    <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">You do not have permission to access this page.</p>
    <a href="/" className="px-6 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">Go Home</a>
  </div>
);

export default UnauthorizedPage;
