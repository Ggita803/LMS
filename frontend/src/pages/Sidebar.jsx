import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
// import img from "../"
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
  Clock,
  Tag,
  CheckCircle2,
  Copy,
  MessageSquare,
  LogOut,
  Bell,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Upload,
  Download,
  Search,
  UserCheck,
  UserX,
  BarChart3,
  Wrench,
  HardDrive,
  Lock,
  Globe,
  Package,
  ListTodo,
  Navigation,
  Zap,
  Shield,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isLibrarian = user?.role === 'librarian';

  // Comprehensive Librarian Menu - Organized by Major Functions
  const librarianItems = [
    // ============ DASHBOARD & OVERVIEW ============
    { icon: LayoutDashboard, label: 'Dashboard', path: '/librarian', section: 'overview', badge: null },
    { icon: BarChart3, label: 'Analytics & Reports', path: '/reports', section: 'overview', badge: null },
    { icon: TrendingUp, label: 'Statistics', path: '/statistics', section: 'overview', badge: null },
    
    // ============ BOOK MANAGEMENT ============
    { icon: Database, label: 'All Books', path: '/books-library', section: 'books' },
    { icon: Plus, label: 'Add New Book', path: '/add-book', section: 'books' },
    { icon: Edit2, label: 'Edit Books', path: '/edit-books', section: 'books' },
    { icon: Search, label: 'Search Books', path: '/search-books', section: 'books' },
    { icon: BookOpen, label: 'Book Catalog', path: '/book-catalog', section: 'books' },
    { icon: Tag, label: 'Manage Categories', path: '/manage-categories', section: 'books' },
    { icon: Copy, label: 'Book Duplicates', path: '/book-duplicates', section: 'books' },
    { icon: Upload, label: 'Bulk Import Books', path: '/bulk-import', section: 'books' },
    { icon: Package, label: 'Book Collections', path: '/book-collections', section: 'books' },
    { icon: Eye, label: 'ISBN Management', path: '/isbn-management', section: 'books' },
    { icon: CheckCircle2, label: 'Pending Approvals', path: '/pending-approvals', section: 'books' },
    
    // ============ USER & MEMBER MANAGEMENT ============
    { icon: Users, label: 'All Members', path: '/manage-users', section: 'members' },
    { icon: Plus, label: 'Add New Member', path: '/add-member', section: 'members' },
    { icon: UserCheck, label: 'Active Members', path: '/active-members', section: 'members' },
    { icon: UserX, label: 'Suspended Members', path: '/suspended-members', section: 'members', color: 'text-red-600' },
    { icon: Search, label: 'Search Members', path: '/search-members', section: 'members' },
    { icon: User, label: 'Member Profiles', path: '/member-profiles', section: 'members' },
    { icon: Shield, label: 'Member Roles & Permissions', path: '/member-roles', section: 'members' },
    { icon: BarChart3, label: 'Member Statistics', path: '/member-stats', section: 'members' },
    { icon: Mail, label: 'Send Notifications', path: '/send-notifications', section: 'members' },
    
    // ============ BORROWING & RETURNS ============
    { icon: BarChart3, label: 'Borrowing Overview', path: '/borrowing-overview', section: 'borrowing' },
    { icon: BookMarked, label: 'Active Borrowings', path: '/active-borrowings', section: 'borrowing' },
    { icon: AlertCircle, label: 'Overdue Items', path: '/overdue-management', section: 'borrowing', color: 'text-red-600', badge: '12' },
    { icon: Clock, label: 'Due Soon', path: '/due-soon', section: 'borrowing' },
    { icon: History, label: 'Borrowing History', path: '/borrowing-history', section: 'borrowing' },
    { icon: CheckCircle2, label: 'Process Return', path: '/process-return', section: 'borrowing' },
    { icon: Zap, label: 'Renew Books', path: '/renew-books', section: 'borrowing' },
    
    // ============ RESERVATIONS ============
    { icon: Bookmark, label: 'All Reservations', path: '/reservations', section: 'reservations' },
    { icon: Plus, label: 'New Reservation', path: '/new-reservation', section: 'reservations' },
    { icon: AlertCircle, label: 'Pending Reservations', path: '/pending-reservations', section: 'reservations' },
    { icon: CheckCircle2, label: 'Ready for Pickup', path: '/ready-pickup', section: 'reservations' },
    { icon: Trash2, label: 'Expired Reservations', path: '/expired-reservations', section: 'reservations' },
    
    // ============ FINES & PAYMENTS ============
    { icon: DollarSign, label: 'Fine Collection', path: '/fine-management', section: 'fines', color: 'text-emerald-600' },
    { icon: DollarSign, label: 'Outstanding Fines', path: '/outstanding-fines', section: 'fines' },
    { icon: CheckCircle2, label: 'Paid Fines', path: '/paid-fines', section: 'fines' },
    { icon: FileText, label: 'Fine Reports', path: '/fine-reports', section: 'fines' },
    
    // ============ COMMUNICATIONS & NOTIFICATIONS ============
    { icon: Bell, label: 'Notifications', path: '/admin-notifications', section: 'communications' },
    { icon: Mail, label: 'Send Messages', path: '/send-messages', section: 'communications' },
    { icon: MessageSquare, label: 'Member Feedback', path: '/member-feedback', section: 'communications' },
    
    // ============ SYSTEM & ADMINISTRATION ============
    { icon: ShieldCheck, label: 'System Audit Log', path: '/audit-log', section: 'admin' },
    { icon: HardDrive, label: 'Backup & Restore', path: '/backup-restore', section: 'admin' },
    { icon: Wrench, label: 'System Maintenance', path: '/maintenance', section: 'admin' },
    { icon: Lock, label: 'Security Settings', path: '/security-settings', section: 'admin' },
    { icon: Download, label: 'Export Data', path: '/export-data', section: 'admin' },
    { icon: Globe, label: 'System Configuration', path: '/system-config', section: 'admin' },
  ];

  const memberItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/librarian' },
    { icon: Users, label: 'Members', path: '/manage-users' },
    { icon: BookOpen, label: 'Books', path: '/books-library'},
    { icon: Database, label: 'Categories', path: '/manage-categories' },
    { icon: BookMarked, label: 'Borrowings', path: '/borrowing' },
    // { icon: History, label: 'Borrowing History', path: '/borrowing-history' },
    { icon: BarChart3, label: 'Analytics & Reports', path: '/reports' },
    { icon: HelpCircle, label: 'Help & FAQ', path: '/faq' },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();
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

      {/* Quick Stats Section - For Librarians Only */}
      {isLibrarian && (
        <div className="px-4 py-3 space-y-2 border-b border-slate-200 dark:border-slate-800">
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/books-library" className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-center">
              <p className="text-2xl font-bold text-purple-600">1.2k</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Books</p>
            </Link>
            <Link to="/manage-users" className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors text-center">
              <p className="text-2xl font-bold text-cyan-600">452</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Members</p>
            </Link>
            <Link to="/manage-categories" className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors text-center">
              <p className="text-2xl font-bold text-pink-600">24</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Categories</p>
            </Link>
            <Link to="/active-borrowings" className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors text-center">
              <p className="text-2xl font-bold text-amber-600">145</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Borrowed</p>
            </Link>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {isLibrarian ? (
          <>
            {/* Quick Management Links - Main Actions */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-3">Quick Links</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Link to="/add-book" className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-center text-sm flex flex-col items-center gap-1">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Add Book</span>
              </Link>
              <Link to="/add-member" className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-center text-sm flex flex-col items-center gap-1">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Add Member</span>
              </Link>
              <Link to="/admin/borrowing" className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-center text-sm flex flex-col items-center gap-1">
                <BookMarked className="w-5 h-5" />
                <span className="text-xs">Borrowing</span>
              </Link>
              <Link to="/process-return" className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-bold text-center text-sm flex flex-col items-center gap-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs">Returns</span>
              </Link>
            </div>

            {/* Display Sections - Main Management Areas */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">Manage Content</p>
            
            {/* Books Display Section */}
            <div className="mb-2 p-3 rounded-xl border-l-4 border-l-purple-600 bg-purple-50 dark:bg-purple-900/10">
              <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-2">📚 Books Inventory</p>
              <div className="space-y-1">
                <NavLink to="/books-library" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-purple-200 text-purple-700 font-bold' : 'text-slate-600 hover:text-purple-600'}`}>
                  • View All Books (1.2k)
                </NavLink>
                <NavLink to="/add-book" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-purple-200 text-purple-700 font-bold' : 'text-slate-600 hover:text-purple-600'}`}>
                  • Add New Book
                </NavLink>
                <NavLink to="/manage-categories" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-purple-200 text-purple-700 font-bold' : 'text-slate-600 hover:text-purple-600'}`}>
                  • Categories (24)
                </NavLink>
              </div>
            </div>

            {/* Members Display Section */}
            <div className="mb-2 p-3 rounded-xl border-l-4 border-l-cyan-600 bg-cyan-50 dark:bg-cyan-900/10">
              <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-2">👥 Members Management</p>
              <div className="space-y-1">
                <NavLink to="/manage-users" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-cyan-200 text-cyan-700 font-bold' : 'text-slate-600 hover:text-cyan-600'}`}>
                  • All Members (452)
                </NavLink>
                <NavLink to="/add-member" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-cyan-200 text-cyan-700 font-bold' : 'text-slate-600 hover:text-cyan-600'}`}>
                  • Add New Member
                </NavLink>
                <NavLink to="/suspended-members" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-cyan-200 text-cyan-700 font-bold' : 'text-slate-600 hover:text-cyan-600'}`}>
                  • Suspended (3)
                </NavLink>
              </div>
            </div>

            {/* Borrowing Display Section */}
            <div className="mb-2 p-3 rounded-xl border-l-4 border-l-amber-600 bg-amber-50 dark:bg-amber-900/10">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">📖 Borrowing & Returns</p>
              <div className="space-y-1">
                <NavLink to="/borrowing-overview" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-amber-200 text-amber-700 font-bold' : 'text-slate-600 hover:text-amber-600'}`}>
                  • 📊 Overview & Statistics
                </NavLink>
                <NavLink to="/active-borrowings" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-amber-200 text-amber-700 font-bold' : 'text-slate-600 hover:text-amber-600'}`}>
                  • Active Borrowings (145)
                </NavLink>
                <NavLink to="/overdue-management" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-red-200 text-red-700 font-bold' : 'text-red-600 hover:text-red-700 font-bold'}`}>
                  • 🔴 Overdue Items (12)
                </NavLink>
                <NavLink to="/process-return" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-amber-200 text-amber-700 font-bold' : 'text-slate-600 hover:text-amber-600'}`}>
                  • Process Returns
                </NavLink>
              </div>
            </div>

            {/* Reservations Display Section */}
            <div className="mb-2 p-3 rounded-xl border-l-4 border-l-pink-600 bg-pink-50 dark:bg-pink-900/10">
              <p className="text-xs font-bold text-pink-700 dark:text-pink-400 mb-2">📌 Reservations</p>
              <div className="space-y-1">
                <NavLink to="/reservations" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-pink-200 text-pink-700 font-bold' : 'text-slate-600 hover:text-pink-600'}`}>
                  • All Reservations (28)
                </NavLink>
                <NavLink to="/pending-reservations" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-pink-200 text-pink-700 font-bold' : 'text-slate-600 hover:text-pink-600'}`}>
                  • Pending (8)
                </NavLink>
                <NavLink to="/ready-pickup" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-pink-200 text-pink-700 font-bold' : 'text-slate-600 hover:text-pink-600'}`}>
                  • Ready for Pickup (5)
                </NavLink>
              </div>
            </div>

            {/* Fines Display Section */}
            <div className="mb-2 p-3 rounded-xl border-l-4 border-l-emerald-600 bg-emerald-50 dark:bg-emerald-900/10">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">💰 Fines & Revenue</p>
              <div className="space-y-1">
                <NavLink to="/fine-management" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-emerald-200 text-emerald-700 font-bold' : 'text-slate-600 hover:text-emerald-600'}`}>
                  • Fine Collection
                </NavLink>
                <NavLink to="/outstanding-fines" className={({ isActive }) => `text-xs px-3 py-2 rounded-lg transition-smooth block ${isActive ? 'bg-emerald-200 text-emerald-700 font-bold' : 'text-slate-600 hover:text-emerald-600'}`}>
                  • Outstanding Fines (Shs 250k)
                </NavLink>
              </div>
            </div>

            {/* Full Navigation - Expandable */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">All Features</p>
            {/* Overview Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-3">Dashboard</p>
            {librarianItems.filter(item => item.section === 'overview').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Book Management Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">📚 Book Management</p>
            {librarianItems.filter(item => item.section === 'books').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* User & Member Management Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">👥 Members</p>
            {librarianItems.filter(item => item.section === 'members').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20' : item.color ? item.color + ' dark:text-slate-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Borrowing & Returns Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">📖 Borrowing</p>
            {librarianItems.filter(item => item.section === 'borrowing').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' : item.color ? item.color + ' dark:text-slate-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Reservations Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">📌 Reservations</p>
            {librarianItems.filter(item => item.section === 'reservations').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Fines & Payments Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">💰 Fines & Payments</p>
            {librarianItems.filter(item => item.section === 'fines').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : item.color ? item.color + ' dark:text-slate-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Communications Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">💬 Communications</p>
            {librarianItems.filter(item => item.section === 'communications').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}

            {/* Administration Section */}
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">⚙️ Administration</p>
            {librarianItems.filter(item => item.section === 'admin').map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative ${isActive ? 'bg-slate-200 text-slate-900 dark:bg-slate-700' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
                {item.badge && <span className="absolute right-3 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">{item.badge}</span>}
              </NavLink>
            ))}
          </>
        ) : (
          <>
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-2">Navigation</p>
            {memberItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group ${isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-xs">{item.label}</span>
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;