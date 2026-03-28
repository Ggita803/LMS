import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  Users, 
  Settings, 
  Database, 
  History,
  ShieldCheck,
  Heart,
  Bookmark,
  HelpCircle,
  User,
  AlertCircle,
  DollarSign,
  TrendingUp,
  BookMarked,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isLibrarian = user?.role === 'librarian';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Catalog', path: '/books' },
    { icon: Library, label: 'My Library', path: '/my-library' },
    { icon: History, label: 'History', path: '/borrowing-history' },
  ];

  const memberItems = [
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Bookmark, label: 'Reservations', path: '/reservations' },
    { icon: HelpCircle, label: 'FAQ', path: '/faq' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/librarian' },
    { icon: Database, label: 'Manage Stock', path: '/manage-books' },
    { icon: BookMarked, label: 'Borrowings', path: '/active-borrowings' },
    { icon: AlertCircle, label: 'Overdue Books', path: '/overdue-management', color: 'text-red-600' },
    { icon: DollarSign, label: 'Fine Collection', path: '/fine-management', color: 'text-emerald-600' },
    { icon: Users, label: 'Members', path: '/manage-users' },
    { icon: TrendingUp, label: 'Reports', path: '/reports' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 z-40 hidden lg:flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-blue-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">LMS</span>
        </Link>
      </div>

      {/* Profile Section - Top */}
      <div className="px-4 py-4">
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
          {/* Avatar */}
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
              {user?.username?.[0].toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>

          {/* Username */}
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{user?.username}</p>

          {/* Email */}
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-full mb-3">{user?.email || 'member@library.local'}</p>

          {/* Role Badge */}
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${
            isLibrarian 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLibrarian ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
            {isLibrarian ? 'Librarian' : 'Member'}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-2">Main</p>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group ${isActive ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">Library</p>
        {memberItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group ${isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        {isLibrarian && (
          <div className="pt-4">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Library Management</p>
            {adminItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : item.color ? item.color + ' dark:text-slate-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;