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
import BorrowingDashboard from './pages/BorrowingDashboard';
import AdminBorrowingManagement from './pages/AdminBorrowingManagement';
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
import BorrowingOverview from './pages/BorrowingOverview';

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
            <Route path="/manage-users" element={<ProtectedRoute roles={['librarian', 'member']}><UsersPage /></ProtectedRoute>} />
            <Route path="/manage-categories" element={<ProtectedRoute roles={['librarian']}><ManageCategories /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={['librarian']}><ReportsPage /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute roles={['librarian', 'member']}><BrowseBooks /></ProtectedRoute>} />
            <Route path="/books/:id" element={<ProtectedRoute roles={['librarian', 'member']}><BookDetails /></ProtectedRoute>} />
            <Route path="/my-library" element={<ProtectedRoute roles={['librarian', 'member']}><MyLibrary /></ProtectedRoute>} />
            <Route path="/books-library" element={<ProtectedRoute roles={['librarian']}><BooksPage /></ProtectedRoute>} />
            
            {/* Old Routes */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            
            {/* Unified Member Portal */}
            <Route path="/member-portal" element={<MemberPortal />} />
            
            {/* Phase 1 - New Pages - Now Public */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/borrowing-history" element={<BorrowingHistoryPage />} />
            
            {/* Borrowing Management Routes */}
            <Route path="/borrowing" element={<ProtectedRoute><BorrowingDashboard /></ProtectedRoute>} />
            <Route path="/admin/borrowing" element={<ProtectedRoute roles={['librarian']}><AdminBorrowingManagement /></ProtectedRoute>} />
            <Route path="/borrowing-overview" element={<ProtectedRoute roles={['librarian']}><BorrowingOverview /></ProtectedRoute>} />
            
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
