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
import UnauthorizedPage from './pages/UnauthorizedPage';
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
import ReservationsPage from './pages/Reservations/ReservationsPage';

// Borrowing Pages
import ActiveBorrowingsPage from './pages/Borrowings/ActiveBorrowingsPage';
import OverdueManagementPage from './pages/Borrowings/OverdueManagementPage';
import DueSoonPage from './pages/Borrowings/DueSoonPage';
import ProcessReturnPage from './pages/Borrowings/ProcessReturnPage';
import RenewBooksPage from './pages/Borrowings/RenewBooksPage';

// Fine Pages
import FineManagementPage from './pages/Fines/FineManagementPage';
import OutstandingFinesPage from './pages/Fines/OutstandingFinesPage';
import PaidFinesPage from './pages/Fines/PaidFinesPage';
import FineReportsPage from './pages/Fines/FineReportsPage';

// Member Pages
import ActiveMembersPage from './pages/Members/ActiveMembersPage';
import SuspendedMembersPage from './pages/Members/SuspendedMembersPage';
import MemberStatsPage from './pages/Members/MemberStatsPage';

// Admin Pages
import StatisticsPage from './pages/Admin/StatisticsPage';
import AuditLogPage from './pages/Admin/AuditLogPage';
import NotificationsAdminPage from './pages/Admin/NotificationsPage';
import SendNotificationsPage from './pages/Admin/SendNotificationsPage';

// Unified Member Portal
import MemberPortal from './pages/MemberPortal';

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

            {/* Member: Only member-portal. Librarian: Only dashboard. */}
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['librarian']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/member-portal" element={
              <ProtectedRoute roles={['member']}>
                <MemberPortal />
              </ProtectedRoute>
            } />

            {/* Librarian Only: All other sensitive routes */}
            <Route path="/librarian" element={<ProtectedRoute roles={['librarian']}><LibrarianDashboard /></ProtectedRoute>} />
            <Route path="/content-management" element={<ProtectedRoute roles={['librarian']}><LibrarianDashboard /></ProtectedRoute>} />
            <Route path="/manage-books" element={<ProtectedRoute roles={['librarian']}><ManageBooks /></ProtectedRoute>} />
            <Route path="/manage-users" element={<ProtectedRoute roles={['librarian']}><UsersPage /></ProtectedRoute>} />
            <Route path="/manage-categories" element={<ProtectedRoute roles={['librarian']}><ManageCategories /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={['librarian']}><ReportsPage /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute roles={['librarian']}><BrowseBooks /></ProtectedRoute>} />
            <Route path="/books/:id" element={<ProtectedRoute roles={['librarian']}><BookDetails /></ProtectedRoute>} />
            <Route path="/my-library" element={<ProtectedRoute roles={['librarian']}><MyLibrary /></ProtectedRoute>} />
            <Route path="/books-library" element={<ProtectedRoute roles={['librarian']}><BooksPage /></ProtectedRoute>} />
            <Route path="/add-book" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">➕ Add New Book</h1><p className="mt-4 text-slate-600">Add new book form (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/edit-books" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✏️ Edit Books</h1><p className="mt-4 text-slate-600">Edit books page (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/search-books" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔍 Search Books</h1><p className="mt-4 text-slate-600">Advanced book search (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/book-catalog" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📖 Book Catalog</h1><p className="mt-4 text-slate-600">Complete catalog view (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/book-duplicates" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📋 Book Duplicates</h1><p className="mt-4 text-slate-600">Find duplicate entries (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/bulk-import" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📥 Bulk Import Books</h1><p className="mt-4 text-slate-600">Import from CSV/Excel (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/book-collections" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📦 Book Collections</h1><p className="mt-4 text-slate-600">Manage book collections (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/isbn-management" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🏷️ ISBN Management</h1><p className="mt-4 text-slate-600">Manage ISBN entries (Coming Soon)</p></div></ProtectedRoute>} />
            <Route path="/pending-approvals" element={<ProtectedRoute roles={['librarian']}><div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Pending Approvals</h1><p className="mt-4 text-slate-600">Approve new submissions (Coming Soon)</p></div></ProtectedRoute>} />
            
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
            <Route path="/active-members" element={<ActiveMembersPage />} />
            <Route path="/suspended-members" element={<SuspendedMembersPage />} />
            <Route path="/search-members" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔍 Search Members</h1><p className="mt-4 text-slate-600">Advanced member search (Coming Soon)</p></div>} />
            <Route path="/member-profiles" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">👤 Member Profiles</h1><p className="mt-4 text-slate-600">Detailed member information (Coming Soon)</p></div>} />
            <Route path="/member-roles" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🛡️ Member Roles & Permissions</h1><p className="mt-4 text-slate-600">Manage roles and permissions (Coming Soon)</p></div>} />
            <Route path="/member-stats" element={<MemberStatsPage />} />
            <Route path="/send-notifications" element={<SendNotificationsPage />} />
            
            {/* Borrowing Management Routes */}
            <Route path="/active-borrowings" element={<ActiveBorrowingsPage />} />
            <Route path="/overdue-management" element={<OverdueManagementPage />} />
            <Route path="/due-soon" element={<DueSoonPage />} />
            <Route path="/process-return" element={<ProcessReturnPage />} />
            <Route path="/renew-books" element={<RenewBooksPage />} />
            <Route path="/borrowing-history" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📖 Borrowing History</h1><p className="mt-4 text-slate-600">Complete borrowing records (Coming Soon)</p></div>} />
            
            {/* Reservation Routes */}
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/new-reservation" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">➕ New Reservation</h1><p className="mt-4 text-slate-600">Create reservation (Coming Soon)</p></div>} />
            <Route path="/pending-reservations" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⏳ Pending Reservations</h1><p className="mt-4 text-slate-600">View pending reservations (Coming Soon)</p></div>} />
            <Route path="/ready-pickup" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">✅ Ready for Pickup</h1><p className="mt-4 text-slate-600">Books ready for member pickup (Coming Soon)</p></div>} />
            <Route path="/expired-reservations" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⏱️ Expired Reservations</h1><p className="mt-4 text-slate-600">Manage expired reservations (Coming Soon)</p></div>} />
            
            {/* Fine Management Routes */}
            <Route path="/fine-management" element={<FineManagementPage />} />
            <Route path="/outstanding-fines" element={<OutstandingFinesPage />} />
            <Route path="/paid-fines" element={<PaidFinesPage />} />
            <Route path="/fine-reports" element={<FineReportsPage />} />
            
            {/* Communications Routes */}
            <Route path="/admin-notifications" element={<NotificationsAdminPage />} />
            <Route path="/send-messages" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💌 Send Messages</h1><p className="mt-4 text-slate-600">Send messages to members (Coming Soon)</p></div>} />
            <Route path="/member-feedback" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💬 Member Feedback</h1><p className="mt-4 text-slate-600">View member reviews (Coming Soon)</p></div>} />
            
            {/* Administration Routes */}
            <Route path="/audit-log" element={<AuditLogPage />} />
            <Route path="/backup-restore" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">💾 Backup & Restore</h1><p className="mt-4 text-slate-600">Database backup options (Coming Soon)</p></div>} />
            <Route path="/maintenance" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔧 System Maintenance</h1><p className="mt-4 text-slate-600">Maintenance tasks (Coming Soon)</p></div>} />
            <Route path="/security-settings" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">🔐 Security Settings</h1><p className="mt-4 text-slate-600">System security (Coming Soon)</p></div>} />
            <Route path="/export-data" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">📤 Export Data</h1><p className="mt-4 text-slate-600">Export to PDF/Excel (Coming Soon)</p></div>} />
            <Route path="/system-config" element={<div className="p-8 min-h-screen"><h1 className="text-3xl font-bold">⚙️ System Configuration</h1><p className="mt-4 text-slate-600">System settings (Coming Soon)</p></div>} />
            <Route path="/statistics" element={<StatisticsPage />} />
            
            {/* Old Routes */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            
            {/* Unified Member Portal */}
            <Route path="/member-portal" element={<MemberPortal />} />
            
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

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
