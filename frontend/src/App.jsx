import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages (will be created)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import Dashboard from './pages/Dashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BrowseBooks from './pages/BrowseBooks';
import MyLibrary from './pages/MyLibrary';
import BookDetails from './pages/BookDetails';
import ManageBooks from './pages/ManageBooks';
import ManageUsers from './pages/ManageUsers';
import ManageCategories from './pages/ManageCategories';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import FAQPage from './pages/FAQPage';
import BorrowingHistoryPage from './pages/BorrowingHistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import WishlistPage from './pages/WishlistPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import ReservationPage from './pages/ReservationPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './pages/ScrollToTop';

// New Admin Pages
import UsersPage from './pages/Users/UsersPage';
import BooksPage from './pages/Books/BooksPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            {/* Protected Routes - Now Public */}
            <Route path="/dashboard" element={<LibrarianDashboard/>} />
            <Route path="/librarian" element={<LibrarianDashboard />} />
            <Route path="/content-management" element={<LibrarianDashboard />} />
            <Route path="/books" element={<BrowseBooks />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/my-library" element={<MyLibrary />} />
            
            {/* Librarian Only Routes - Now Public */}
            <Route path="/manage-books" element={<ManageBooks />} />
            <Route path="/manage-users" element={<UsersPage />} />
            <Route path="/manage-categories" element={<ManageCategories />} />
            <Route path="/reports" element={<ReportsPage />} />
            
            {/* New Book Management Routes */}
            <Route path="/books-library" element={<BooksPage />} />
            <Route path="/add-book" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">➕ Add New Book</h1><p className="mt-4 text-slate-600">Add new book form (Coming Soon)</p></div>} />
            <Route path="/edit-books" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✏️ Edit Books</h1><p className="mt-4 text-slate-600">Edit books page (Coming Soon)</p></div>} />
            <Route path="/search-books" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔍 Search Books</h1><p className="mt-4 text-slate-600">Advanced book search (Coming Soon)</p></div>} />
            <Route path="/book-catalog" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📖 Book Catalog</h1><p className="mt-4 text-slate-600">Complete catalog view (Coming Soon)</p></div>} />
            <Route path="/book-duplicates" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📋 Book Duplicates</h1><p className="mt-4 text-slate-600">Find duplicate entries (Coming Soon)</p></div>} />
            <Route path="/bulk-import" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📥 Bulk Import Books</h1><p className="mt-4 text-slate-600">Import from CSV/Excel (Coming Soon)</p></div>} />
            <Route path="/book-collections" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📦 Book Collections</h1><p className="mt-4 text-slate-600">Manage book collections (Coming Soon)</p></div>} />
            <Route path="/isbn-management" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🏷️ ISBN Management</h1><p className="mt-4 text-slate-600">Manage ISBN entries (Coming Soon)</p></div>} />
            <Route path="/pending-approvals" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Pending Approvals</h1><p className="mt-4 text-slate-600">Approve new submissions (Coming Soon)</p></div>} />
            
            {/* New Member Management Routes */}
            <Route path="/add-member" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">➕ Add New Member</h1><p className="mt-4 text-slate-600">Member registration form (Coming Soon)</p></div>} />
            <Route path="/active-members" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Active Members</h1><p className="mt-4 text-slate-600">View active members (Coming Soon)</p></div>} />
            <Route path="/suspended-members" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🚫 Suspended Members</h1><p className="mt-4 text-slate-600">Manage suspended accounts (Coming Soon)</p></div>} />
            <Route path="/search-members" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔍 Search Members</h1><p className="mt-4 text-slate-600">Advanced member search (Coming Soon)</p></div>} />
            <Route path="/member-profiles" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">👤 Member Profiles</h1><p className="mt-4 text-slate-600">Detailed member information (Coming Soon)</p></div>} />
            <Route path="/member-roles" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🛡️ Member Roles & Permissions</h1><p className="mt-4 text-slate-600">Manage roles and permissions (Coming Soon)</p></div>} />
            <Route path="/member-stats" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📊 Member Statistics</h1><p className="mt-4 text-slate-600">Member analytics (Coming Soon)</p></div>} />
            <Route path="/send-notifications" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📧 Send Notifications</h1><p className="mt-4 text-slate-600">Mass notification system (Coming Soon)</p></div>} />
            
            {/* Borrowing Management Routes */}
            <Route path="/active-borrowings" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📚 Active Borrowings</h1><p className="mt-4 text-slate-600">Track active loans (Coming Soon)</p></div>} />
            <Route path="/overdue-management" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🚨 Overdue Items</h1><p className="mt-4 text-slate-600">Manage overdue books (Coming Soon)</p></div>} />
            <Route path="/due-soon" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⏰ Due Soon</h1><p className="mt-4 text-slate-600">Books due within 7 days (Coming Soon)</p></div>} />
            <Route path="/borrowing-history" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📖 Borrowing History</h1><p className="mt-4 text-slate-600">Complete borrowing records (Coming Soon)</p></div>} />
            <Route path="/process-return" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Process Return</h1><p className="mt-4 text-slate-600">Handle book returns (Coming Soon)</p></div>} />
            <Route path="/renew-books" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔄 Renew Books</h1><p className="mt-4 text-slate-600">Renew book loans (Coming Soon)</p></div>} />
            
            {/* Reservation Routes */}
            <Route path="/reservations" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📌 All Reservations</h1><p className="mt-4 text-slate-600">Manage reservations (Coming Soon)</p></div>} />
            <Route path="/new-reservation" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">➕ New Reservation</h1><p className="mt-4 text-slate-600">Create reservation (Coming Soon)</p></div>} />
            <Route path="/pending-reservations" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⏳ Pending Reservations</h1><p className="mt-4 text-slate-600">View pending reservations (Coming Soon)</p></div>} />
            <Route path="/ready-pickup" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Ready for Pickup</h1><p className="mt-4 text-slate-600">Books ready for member pickup (Coming Soon)</p></div>} />
            <Route path="/expired-reservations" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⏱️ Expired Reservations</h1><p className="mt-4 text-slate-600">Manage expired reservations (Coming Soon)</p></div>} />
            
            {/* Fine Management Routes */}
            <Route path="/fine-management" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💰 Fine Collection</h1><p className="mt-4 text-slate-600">Track fine collections (Coming Soon)</p></div>} />
            <Route path="/outstanding-fines" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⚠️ Outstanding Fines</h1><p className="mt-4 text-slate-600">View unpaid fines (Coming Soon)</p></div>} />
            <Route path="/paid-fines" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Paid Fines</h1><p className="mt-4 text-slate-600">View paid fines (Coming Soon)</p></div>} />
            <Route path="/fine-reports" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📊 Fine Reports</h1><p className="mt-4 text-slate-600">Fine analytics (Coming Soon)</p></div>} />
            
            {/* Communications Routes */}
            <Route path="/admin-notifications" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔔 Notifications</h1><p className="mt-4 text-slate-600">System notifications (Coming Soon)</p></div>} />
            <Route path="/send-messages" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💌 Send Messages</h1><p className="mt-4 text-slate-600">Send messages to members (Coming Soon)</p></div>} />
            <Route path="/member-feedback" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💬 Member Feedback</h1><p className="mt-4 text-slate-600">View member reviews (Coming Soon)</p></div>} />
            
            {/* Administration Routes */}
            <Route path="/audit-log" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📋 System Audit Log</h1><p className="mt-4 text-slate-600">System activity log (Coming Soon)</p></div>} />
            <Route path="/backup-restore" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💾 Backup & Restore</h1><p className="mt-4 text-slate-600">Database backup options (Coming Soon)</p></div>} />
            <Route path="/maintenance" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔧 System Maintenance</h1><p className="mt-4 text-slate-600">Maintenance tasks (Coming Soon)</p></div>} />
            <Route path="/security-settings" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔐 Security Settings</h1><p className="mt-4 text-slate-600">System security (Coming Soon)</p></div>} />
            <Route path="/export-data" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📤 Export Data</h1><p className="mt-4 text-slate-600">Export to PDF/Excel (Coming Soon)</p></div>} />
            <Route path="/system-config" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⚙️ System Configuration</h1><p className="mt-4 text-slate-600">System settings (Coming Soon)</p></div>} />
            <Route path="/statistics" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📊 Statistics</h1><p className="mt-4 text-slate-600">System statistics (Coming Soon)</p></div>} />
            
            {/* Old Routes */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            
            {/* Phase 1 - New Pages - Now Public */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/borrowing-history" element={<BorrowingHistoryPage />} />
            
            {/* Phase 2 - Advanced Features - Now Public */}
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/advanced-search" element={<AdvancedSearchPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            
            {/* Phase 3 - Static Pages & Legal */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
