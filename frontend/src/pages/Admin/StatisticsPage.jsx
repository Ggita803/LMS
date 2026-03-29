import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, AlertCircle, DollarSign } from 'lucide-react';
import MainLayout from '../MainLayout';

const StatisticsPageContent = () => {
  const [period, setPeriod] = useState('monthly');

  const systemStats = [
    {
      label: 'Total Members',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Active Loans',
      value: '42',
      change: '+18%',
      icon: BookOpen,
      color: 'emerald',
    },
    {
      label: 'Overdue Books',
      value: '4',
      change: '-3%',
      icon: AlertCircle,
      color: 'red',
    },
    {
      label: 'Total Revenue',
      value: 'UGX 18K',
      change: '+25%',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  const yearlyData = [
    { month: 'Jan', loans: 65, returns: 58, newMembers: 12 },
    { month: 'Feb', loans: 78, returns: 72, newMembers: 15 },
    { month: 'Mar', loans: 92, returns: 85, newMembers: 23 },
    { month: 'Apr', loans: 88, returns: 80, newMembers: 18 },
    { month: 'May', loans: 105, returns: 98, newMembers: 26 },
    { month: 'Jun', loans: 120, returns: 112, newMembers: 32 },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      emerald:
        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      orange:
        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      red: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            System Statistics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Overall library system performance and metrics
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`rounded-xl p-6 border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Monthly Trends */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Activity Trends
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Month
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Total Loans
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Returns
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  New Members
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-4 px-4 text-sm font-medium text-slate-900 dark:text-white">
                    {row.month}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {row.loans}
                      </span>
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                          style={{ width: `${(row.loans / 120) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {row.returns}
                      </span>
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                          style={{ width: `${(row.returns / 112) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      +{row.newMembers}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-semibold">
                      High
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Performance Metrics
          </h2>
          <div className="space-y-4">
            {[
              { label: 'System Availability', value: 99.8 },
              { label: 'Average Response Time', value: 85 },
              { label: 'Data Integrity', value: 100 },
              { label: 'User Satisfaction', value: 94 },
            ].map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {metric.label}
                  </span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Key Insights
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-blue-600 rounded-full"></div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                New member registration is up 23% this month
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-emerald-600 rounded-full"></div>
              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                Loan return rate improved by 8% compared to last month
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-orange-600 rounded-full"></div>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                Fine collection increased by 25% in the last 30 days
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex-shrink-0 w-2 h-2 mt-1.5 bg-red-600 rounded-full"></div>
              <p className="text-sm text-red-800 dark:text-red-300">
                4 books currently overdue - immediate follow-up recommended
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatisticsPage = () => {
  return (
    <MainLayout>
      <StatisticsPageContent />
    </MainLayout>
  );
};

export default StatisticsPage;
