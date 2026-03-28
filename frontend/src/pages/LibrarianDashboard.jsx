import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, AlertCircle, Plus, FileText } from 'lucide-react';

const LibrarianDashboard = () => {
  const stats = [
    { label: 'Total Books', value: '1,284', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Members', value: '452', icon: Users, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Pending Returns', value: '12', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Monthly Growth', value: '+14%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="heading-lg">Librarian Command Center</h1>
            <p className="text-muted">Institutional overview and collection management</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline flex items-center gap-2">
              <FileText className="w-4 h-4" /> Reports
            </button>
            <button className="btn-primary flex items-center gap-2 shadow-lg shadow-accent-200">
              <Plus className="w-4 h-4" /> Add New Book
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="card bg-white dark:bg-slate-900 border-none shadow-subtle"
            >
              <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Analytics Chart Placeholder */}
          <div className="lg:col-span-2 card h-[400px] flex flex-col justify-center items-center">
            <TrendingUp className="w-12 h-12 text-slate-200 mb-4" />
            <p className="text-muted font-medium italic">Borrowing Trends Visualization (Chart.js)</p>
            <div className="w-full h-48 bg-gradient-to-t from-accent-50/50 to-transparent mt-8 rounded-b-2xl" />
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="font-bold text-lg mb-6">Recent Transactions</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">User #{i*12} borrowed "Clean Code"</p>
                    <p className="text-xs text-muted">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
