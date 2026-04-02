# 🎯 Complete Borrowing System Implementation Guide

## **Features Implemented**

### ✅ 1. Confirmation Modal with Due Date Preview
- **File:** `frontend/src/components/BorrowConfirmationModal.jsx`
- **Features:**
  - Shows book title and author
  - 14-day return due date
  - Late fee calculation (daily rate)
  - Max fine warning
  - Terms & conditions checkbox
  - Loading state during processing

### ✅ 2. Frontend Integration
- **Updated:** `BookDetails.jsx`
- **Changes:**
  - Import BorrowConfirmationModal
  - handleBorrow() shows modal instead of direct request
  - handleConfirmBorrow() calls API endpoint
  - Redirect to /borrowing on success
  - Error handling with toast notifications

### ✅ 3. Email Notifications (Nodemailer)
- **File:** `backend/src/services/EmailService.js`
- **Emails Sent:**
  ✉️ **Borrow Request Received** - User confirmation
  ✉️ **Borrow Approved** - Ready for pickup
  ✉️ **Borrow Rejected** - With rejection reason

**Setup Gmail SMTP:**
```bash
1. Enable 2-Factor Authentication on Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy 16-character password
5. Add to .env:
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=16_char_app_password
```

### ✅ 4. Overdue Books Scheduler
- **File:** `backend/src/utils/ScheduleJobs.js`
- **Features:**
  - Runs daily at 2 AM automatically
  - Marks late books as "overdue"
  - Calculates and records fines
  - Uses node-cron for scheduling

**How it works:**
```
1. Check all active borrowings with past return dates
2. Status: active → overdue
3. Calculate days overdue
4. Record fine: days_overdue × fine_per_day
5. Create entry in fine_payments table
```

### ✅ 5. Waitlist System
- **Model:** `backend/src/models/WaitlistModel.js`
- **Features:**
  - Add user to waitlist for unavailable books
  - Prevent duplicates
  - Notify next in line when book becomes available
  - Track notification status
  - User can view their waitlist

**Waitlist Status Flow:**
```
waiting → notified (when book available) → fulfilled (when borrowed) / cancelled
```

---

## **Step-by-Step Installation & Setup**

### **Step 1: Database Migration**
```bash
# Run in MySQL:
mysql -u root -p lms_database < backend/database/schema_update_waitlist_and_fines.sql

# This creates:
- waitlist table
- fine_payments table
- Performance indexes
```

### **Step 2: Install Dependencies**
```bash
# Backend
cd backend
npm install nodemailer node-cron
npm list  # Verify installed

# Frontend already has axios and react-router
```

### **Step 3: Configure Email (.env)**
```bash
# Copy example
cp .env.example .env

# Edit .env with your Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_password_16_chars
```

### **Step 4: Update server.js to Initialize Scheduler**
```javascript
// Add at top of backend/src/server.js:
const { scheduleOverdueChecker } = require('./utils/ScheduleJobs');

// Add after app initialization:
scheduleOverdueChecker();
console.log('✅ Scheduled jobs initialized');
```

### **Step 5: Update BorrowingService.js**
Add email notifications when approving/rejecting:
```javascript
const { sendEmail } = require('./EmailService');

// In approveBorrow():
await sendEmail(user.email, 'borrow_approved', {
  userName: user.username,
  bookTitle: book.title,
  dueDate: formattedDueDate,
  lateFine: book.fine_per_day || 500
});

// In rejectBorrow():
await sendEmail(user.email, 'borrow_rejected', {
  userName: user.username,
  bookTitle: book.title,
  reason: rejection_reason
});
```

---

## **API Endpoints**

### **Borrow Request**
```
POST /borrowing/request
{
  "book_id": 5,
  "user_id": 3
}
Response:
{
  "success": true,
  "message": "Borrow request created",
  "data": { "borrowing_id": 12, "status": "pending_approval" }
}
```

### **Approve Borrow**
```
PUT /borrowing/:id/approve
Response: Sends email to user
```

### **Reject Borrow**
```
PUT /borrowing/:id/reject
{
  "rejection_reason": "Book reserved by another member"
}
Response: Sends rejection email
```

### **Join Waitlist**
```
POST /waitlist/join
{
  "book_id": 5,
  "user_id": 3
}
```

### **Get User Waitlist**
```
GET /waitlist/user/:userId
```

---

## **User Experience Flow**

### **For Regular Members:**
```
1. Browse books
2. Click "Borrow This Book"
3. Modal shows:
   - Book details
   - Due date (14 days)
   - Late fees (Shs 500/day)
   - Terms checkbox
4. Click "Confirm Borrow"
5. Receive email: "Request Received"
6. Status appears in dashboard: "Pending Approval"
```

### **For Librarians:**
```
1. Go to /admin/borrowing
2. See "Pending Requests" tab
3. Click request → Modal shows details
4. Approve or Reject
5. System sends email to member
6. Book status updates in real-time
```

### **For Members with Overdue Books:**
```
1. After due date:
   - Scheduler marks book as overdue (2 AM)
   - Fine recorded automatically
   - User notified (via dashboard)
2. Member can:
   - Pay fine online
   - Return book to reduce fine
   - View fine history
```

### **For Unavailable Books:**
```
1. Member tries to borrow unavailable book
2. Button changes to "Join Waitlist"
3. Added to waitlist queue
4. When book returns:
   - Next in line notified
   - Email: "Book now available for you"
   - They can borrow it
```

---

## **Testing Checklist**

- [ ] Email sends on borrow request (check Gmail)
- [ ] Email sends on approval (with due date)
- [ ] Email sends on rejection (with reason)
- [ ] Modal displays correct due date
- [ ] Modal calculates max fine correctly
- [ ] Confirmation required (checkbox)
- [ ] Scheduler runs at 2 AM (check logs)
- [ ] Overdue books marked with fines
- [ ] Waitlist adds/removes users
- [ ] Waitlist notification sent when book available
- [ ] User receives all emails correctly

---

## **Troubleshooting**

### **Emails not sending?**
```bash
1. Check .env has correct EMAIL_USER and EMAIL_PASSWORD
2. Gmail app password must be 16 characters
3. Check Gmail "Less secure apps" setting (if not using app password)
4. Test in backend console:
   const { sendEmail } = require('./services/EmailService');
   sendEmail('test@gmail.com', 'borrow_request', {...})
```

### **Scheduler not running?**
```bash
1. Verify scheduleOverdueChecker() called in server.js
2. Check server logs for "Scheduled jobs initialized"
3. Verify MySQL has fine_payments table
4. Check borrowings table has status column
```

### **Modal not appearing?**
```bash
1. Verify BorrowConfirmationModal imported in BookDetails.jsx
2. Check showBorrowModal state is being toggled
3. Verify book object has required fields
4. Check browser console for errors
```

---

## **Future Enhancements**

- SMS notifications for overdue books
- Automatic fine payment reminders
- Bulk approve/reject for librarians
- Excel export of borrowing reports
- Renewal requests before due date
- Book recommendations based on borrowing history
- Multi-day digital access for e-books
- Waitlist priority based on membership level

---

## **Files Created/Modified**

**Frontend:**
- ✅ Created: `components/BorrowConfirmationModal.jsx`
- ✅ Modified: `pages/BookDetails.jsx`

**Backend:**
- ✅ Created: `services/EmailService.js`
- ✅ Created: `utils/ScheduleJobs.js`
- ✅ Created: `models/WaitlistModel.js`
- ✅ Created: `database/schema_update_waitlist_and_fines.sql`
- ✅ Modified: `services/BorrowingService.js` (pending email integration)

**Configuration:**
- ✅ Created: `.env.example`

---

**Support:** For issues, check logs and verify all .env variables are set correctly!
