import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  BookOpen,
  Bell,
  ChevronDown,
  GraduationCap,
  Book,
  Settings,
  History,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

const MemberLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountOpen]);

  // Deeply normalize user extraction to support varying backend responses
  const currentUser = user?.user?.user || user?.user || user;
  const memberDetails = {
    studentId: currentUser?.student_id || currentUser?.id || "N/A",
    program: currentUser?.program || "Unassigned Program",
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "dark" : ""} bg-slate-50 dark:bg-slate-950 font-outfit`}
    >
      {/* Persistent Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              LMS
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-sky-600" />
              )}
            </button>
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
                  {currentUser?.username?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">
                  {currentUser?.username}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${isAccountOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAccountOpen && (
                <div
                  ref={accountDropdownRef}
                  className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="p-6 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                      Student Account
                    </p>
                    <h3 className="text-lg font-bold">
                      {currentUser?.first_name} {currentUser?.last_name}
                    </h3>
                    <p className="text-sm opacity-90 truncate">{currentUser?.email}</p>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Loans
                        </p>
                        <p className="text-lg font-bold text-sky-600">
                          {currentUser?.active_loans_count || 0}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Fines
                        </p>
                        <p className="text-lg font-bold text-rose-600">{currentUser?.total_fines ? `Shs ${currentUser.total_fines}` : '0'}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-2 text-sm text-slate-600 dark:text-slate-400">
                        <GraduationCap className="w-4 h-4 flex-shrink-0" />{" "}
                        <span className="font-medium">
                          {memberDetails.studentId}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 text-sm text-slate-600 dark:text-slate-400">
                        <Book className="w-4 h-4 flex-shrink-0" />{" "}
                        <span className="leading-snug font-medium">
                          {memberDetails.program}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                      >
                        <Settings className="w-4 h-4" /> Account Settings
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          navigate("/login");
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

      <div className="pt-16">{children}</div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
                  L
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  LMS
                </span>
              </Link>
              <p className="text-sm text-muted leading-relaxed">
                The standard for library management in Uganda. Professional,
                academic, and community-focused.
              </p>
            </div>
            {["Product", "Company", "Legal"].map((cat) => (
              <div key={cat}>
                <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
                  {cat}
                </h3>
                <ul className="space-y-4">
                  {["Features", "Pricing", "About", "Contact"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted hover:text-sky-600 transition-smooth"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted">
              &copy; 2026 LMS Uganda. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs text-muted">
              <a href="#" className="hover:text-sky-600 transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-sky-600 transition-smooth">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MemberLayout;
