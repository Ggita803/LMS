import React, { useState } from 'react';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import MainLayout from '../MainLayout';

const MemberStatsPageContent = () => {
  const [period, setPeriod] = useState('monthly');

  const statsData = {
    totalMembers: 156,
    newMembers: 23,
    activeMembers: 142,
    inactiveMembers: 14,
    totalLoans: 486,
    activeLoans: 42,
    topBorrower: 'Muguerwa Dickson',
    topBorrowerLoans: 35,
  };

  const topMembers = [
    { rank: 1, name: 'Muguerwa Dickson', loans: 35, fine: 0 },
    { rank: 2, name: 'SENTONGO EDRINE', loans: 28, fine: 0 },
    { rank: 3, name: 'Robert Johnson', loans: 24, fine: 5000 },
    { rank: 4, name: 'Alice Williams', loans: 22, fine: 0 },
    { rank: 5, name: 'Michael Brown', loans: 18, fine: 3500 },
  ];

  const memberActivity = [
    { activity: 'New Registrations', value: 23, change: '+15%', color: 'emerald' },
    { activity: 'Active Borrowers', value: 142, change: '+8%', color: 'blue' },
    { activity: 'Inactive Members', value: 14, change: '-2%', color: 'orange' },
    { activity: 'Suspended Members', value: 3, change: '+1%', color: 'red' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Member Statistics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive member analytics and insights
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
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Total Members
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {statsData.totalMembers}
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-500/20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                New Members
              </p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                {statsData.newMembers}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                This month
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-emerald-500/20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Active Loans
              </p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {statsData.activeLoans}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                Currently circulating
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-orange-500/20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Top Borrower
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                {statsData.topBorrowerLoans}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {statsData.topBorrower}
              </p>
            </div>
            <Award className="w-12 h-12 text-yellow-500/20" />
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {memberActivity.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {item.activity}
            </p>
            <div className="flex items-baseline gap-2 mt-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
              <span
                className={`text-xs font-semibold text-${item.color}-600 dark:text-${item.color}-400`}
              >
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Members Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Top Members
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Member Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Total Loans
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Outstanding Fine
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {topMembers.map((member) => (
                <tr key={member.rank} className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full text-xs font-bold">
                      {member.rank}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {member.loans}
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-semibold">
                    {member.fine > 0 ? (
                      <span className="text-red-600 dark:text-red-400">
                        UGX {member.fine.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Clear
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-sm">
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retention Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Retention Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">
              Member Retention Rate
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-emerald-600">91%</p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">+3%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Compared to last year
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">
              Churn Rate
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-orange-600">9%</p>
              <span className="text-xs text-red-600 dark:text-red-400">-2%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Members who left
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">
              Engagement Rate
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-blue-600">87%</p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">+5%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Active users this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberStatsPage = () => {
  return (
    <MainLayout>
      <MemberStatsPageContent />
    </MainLayout>
  );
};

export default MemberStatsPage;
