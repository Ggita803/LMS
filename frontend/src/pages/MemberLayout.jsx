import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  BookOpen, 
  Bell, 
  ChevronDown, 
  GraduationCap, 
  Book, 
  Settings, 
  History, 
  LogOut 
} from 'lucide-react';

const MemberLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountBtnRef = useRef(null);
  const accountDropdownRef = useRef(null);

  useEffect(() => {
    if (!isAccountOpen) return;
    function handleClickOutside(event) {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(event.target)
      ) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccountOpen]);

  const memberDetails = {
    studentId: user?.studentId || "240080737",
    program: user?.program || "Bachelor of Science in Computer Science",
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 font-outfit`}>
      {/* Persistent Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">LMS</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="relative">
              <button
                ref={accountBtnRef}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                  {user?.username?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">{user?.username}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isAccountOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAccountOpen && (
                <div
                  ref={accountDropdownRef}
                  className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in"
                  style={{ borderRadius: '8px' }}
                >
                  <div className="p-6 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Student Account</p>
                    <h3 className="text-lg font-bold">{user?.first_name} {user?.last_name}</h3>
                    <p className="text-sm opacity-90 truncate">{user?.email}</p>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Loans</p>
                        <p className="text-lg font-bold text-sky-600">3</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Fines</p>
                        <p className="text-lg font-bold text-rose-600">2.5k</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-2 text-sm text-slate-600 dark:text-slate-400">
                        <GraduationCap className="w-4 h-4 flex-shrink-0" /> <span className="font-medium">{memberDetails.studentId}</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 text-sm text-slate-600 dark:text-slate-400">
                        <Book className="w-4 h-4 flex-shrink-0" /> <span className="leading-snug font-medium">{memberDetails.program}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <Link to="/settings" className="flex items-center gap-3 p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        <Settings className="w-4 h-4" /> Account Settings
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 p-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {children}
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <p>© 2024 LMS - Global Academic Resource Center</p>
        <div className="flex gap-6">
          <Link to="/faq" className="hover:text-sky-600">Help Center</Link>
          <Link to="/terms" className="hover:text-sky-600">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-sky-600">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default MemberLayout;