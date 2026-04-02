import React from 'react';
import MainLayout from './MainLayout';
import BorrowingDetailsSection from '../components/BorrowingDetailsSection';

const BorrowingOverview = () => {
  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Borrowing Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor and manage all borrowing operations</p>
        </div>
        
        <BorrowingDetailsSection />
      </div>
    </MainLayout>
  );
};

export default BorrowingOverview;
