import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, AlertCircle, Plus, FileText, Database, History, TrendingUp, Banknote, Settings, BarChart3, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import * as dashboardService from '../services/dashboardService';


const LibrarianDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState([
    { label: 'Total Books', value: '-', icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Active Members', value: '-', icon: Users, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Pending Returns', value: '-', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Monthly Growth', value: '-', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]);
  const [categoryData, setCategoryData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'];

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      dashboardService.getDashboardOverview(),
      dashboardService.getCategoryStats(),
      dashboardService.getBorrowingActivity(7),
      dashboardService.getCollectionGrowth(7),
      dashboardService.getOverdueBooks(),
      dashboardService.getMemberStats(),
    ])
      .then(([overviewData, categories, activity, growth, overdueBooks, memberStats]) => {
        setOverview(overviewData || {});
        setStats([
          { label: 'Total Books', value: overviewData?.total_books?.toLocaleString() ?? '0', icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Active Members', value: overviewData?.total_members?.toLocaleString() ?? '0', icon: Users, color: 'text-accent-600', bg: 'bg-accent-50' },
          { label: 'Pending Returns', value: overdueBooks?.overdueBooks?.length ?? '0', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Monthly Growth', value: overviewData?.monthlyGrowth !== undefined ? `+${overviewData.monthlyGrowth}%` : '+0%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          // { label: 'Active Categories', value: overviewData?.total_categories?.toLocaleString() ?? '0', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
        ]);
        setCategoryData(categories?.stats?.map(cat => ({ name: cat.category_name, value: cat.total_books })) ?? []);
        // Borrowing trends: fallback to flat zero if no data
        let trends = activity?.activity?.map(item => ({ name: item.month || item.date, borrows: item.count })) ?? [];
        if (!trends.length) {
          // Generate last 6 months as fallback
          const now = new Date();
          trends = Array.from({ length: 6 }).map((_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            const label = d.toLocaleString('default', { month: 'short' });
            return { name: label, borrows: 0 };
          });
        }
        setChartData(trends);
        setRevenueData(growth?.growth ?? []);
      })
      .catch((err) => {
        setError('Failed to load dashboard data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <span className="text-lg text-sky-600 font-semibold">Loading dashboard...</span>
        </div>
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <span className="text-lg text-red-600 font-semibold">{error}</span>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <WelcomeBanner 
          userName={user?.username || 'Librarian'}
          primaryText="Content Management Center"
          secondaryText="Organize your library collection, manage categories, and track inventory"
        />

        <div className="flex flex-wrap gap-3 mb-10">
          <Link to="/manage-books" className="px-6 py-3 bg-sky-600 text-white rounded-lg flex items-center gap-2 hover:bg-sky-700 transition-smooth font-semibold shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" /> Add New Book
          </Link>
          <Link to="/manage-categories" className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-smooth font-semibold">
            <Database className="w-5 h-5" /> Manage Categories
          </Link>
          <Link to="/reports" className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth font-semibold">
            <FileText className="w-5 h-5" /> View Reports
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="card bg-white dark:bg-slate-900 border-none shadow-subtle relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-50 dark:bg-sky-900/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 relative z-10 text-slate-900 dark:text-white">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <Link to="/manage-books" className="card group hover:border-sky-500 hover:shadow-lg transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-sky-100 dark:bg-sky-900/20 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-smooth">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Book Inventory</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add, update, and manage the book catalog</p>
              </div>
            </div>
          </Link>
          <Link to="/manage-categories" className="card group hover:border-blue-500 hover:shadow-lg transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-smooth">
                <Database className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Categories</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Create and organize book categories</p>
              </div>
            </div>
          </Link>
          <Link to="/manage-users" className="card group hover:border-accent-500 hover:shadow-lg transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-accent-100 dark:bg-accent-900/20 rounded-xl group-hover:bg-accent-600 group-hover:text-white transition-smooth">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Members</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage member accounts and roles</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Content Management Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="card border-l-4 border-l-sky-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Pending Tasks</p>
                <h3 className="text-4xl font-bold text-sky-600">{overview?.pending_tasks ?? 0}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Books waiting for approval</p>
              </div>
              <BookOpen className="w-12 h-12 text-sky-100 dark:text-sky-900/30" />
            </div>
          </div>
          <div className="card border-l-4 border-l-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Active Categories</p>
                <h3 className="text-4xl font-bold text-blue-600">{overview?.total_categories ?? 0}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Well-organized collection</p>
              </div>
              <Database className="w-12 h-12 text-blue-100 dark:text-blue-900/30" />
            </div>
          </div>
          <div className="card border-l-4 border-l-emerald-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Content Quality</p>
                <h3 className="text-4xl font-bold text-emerald-600">{
                  overview?.total_books
                    ? `${Math.round((Number(overview.available_books) / Number(overview.total_books)) * 100)}%`
                    : '0%'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Catalog completeness</p>
              </div>
              <TrendingUp className="w-12 h-12 text-emerald-100 dark:text-emerald-900/30" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
          {/* Borrowing Trends Chart */}
          <div className="lg:col-span-2 card bg-white dark:bg-slate-900 p-6">
            <h3 className="font-bold text-lg mb-8 text-slate-900 dark:text-white">Monthly Borrowing Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="borrows" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#0ea5e9' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Collection Distribution Pie Chart */}
          <div className="card bg-white dark:bg-slate-900 p-6">
            <h3 className="font-bold text-lg mb-8 text-slate-900 dark:text-white">Collection by Category</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Fine Collection Revenue Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
          <div className="lg:col-span-3 card bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Fine Collection Revenue</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tracking total income in Ugandan Shillings</p>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <Banknote className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `Shs ${value / 1000}k`} />
                  <Tooltip 
                    formatter={(value) => [`Shs ${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="books_added" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Transactions</h3>
              <History className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-6">
              {[
                { user: "Musa K.", action: "borrowed", book: "Clean Code", time: "2 hours ago", status: "Active" },
                { user: "Sarah A.", action: "returned", book: "The Great Gatsby", time: "5 hours ago", status: "Completed" },
                { user: "John D.", action: "reserved", book: "React Design Patterns", time: "1 day ago", status: "Pending" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-sky-600">{item.user.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">
                      {item.user} <span className="font-normal text-slate-500 dark:text-slate-400">{item.action}</span> "{item.book}"
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/transactions" 
              className="mt-6 block text-center text-sm font-semibold text-sky-600 hover:text-sky-700 transition-smooth"
            >
              View Full History
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LibrarianDashboard;
