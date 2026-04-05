# 🔴 CRITICAL FAILURE ANALYSIS - Image Upload System

## Executive Summary
**Found 5 CRITICAL issues that will cause the upload to fail silently or with unclear errors.**

---

## ⚠️ ISSUE #1: JWT Token Property Name Mismatch (CRITICAL - PRIORITY 1)

### The Problem
There is a **naming inconsistency** between how the JWT token is created and how it's used.

### Location & Evidence

**JWT Creation** (`backend/src/utils/helpers.js` line 18):
```javascript
const generateToken = (userId, email, role) => {
  return jwt.sign(
    { user_id: userId, email, role },  // ← Uses UNDERSCORE: user_id
    config.JWT.SECRET,
    { expiresIn: config.JWT.EXPIRE }
  );
};
```

**JWT Usage in Reset Password** (`backend/src/controllers/AuthController.js` line 38):
```javascript
const userId = req.user.user_id;  // ← Correctly uses UNDERSCORE: user_id
```

**JWT Usage in Upload** (`backend/src/controllers/UserController.js` line 62):
```javascript
const userId = req.user.userId;  // ❌ WRONG: Uses CAMELCASE: userId
```

### Why This Breaks Upload
1. Frontend sends file with request
2. Backend middleware adds `req.user` from decoded JWT
3. Decoded JWT has `user_id` property (underscore)
4. But controller looks for `req.user.userId` (camelCase)
5. `req.user.userId` returns `undefined`
6. ImageUrl becomes `/uploads/profile-images/undefined-.jpg`
7. Database update tries to use `undefined` as userId
8. Fails silently or returns nonsensical file paths

### The Fix
Change line 62 in UserController.js from:
```javascript
const userId = req.user.userId;  // WRONG
```
To:
```javascript
const userId = req.user.user_id;  // CORRECT
```

**Impact**: HIGH - This is why uploads fail and create weird filenames

---

## ⚠️ ISSUE #2: Token Storage Inconsistency (PRIORITY 1)

### The Problem
Frontend uses **multiple token storage keys** inconsistently.

### Location & Evidence

**API Interceptor** (`frontend/src/services/api.js`):
```javascript
const token = Cookies.get('authToken') || localStorage.getItem('authToken');
// Looks for 'authToken' in BOTH Cookie and localStorage
```

**Sidebar Upload Handler** (`frontend/src/pages/Sidebar.jsx` line 164):
```javascript
const token = localStorage.getItem('token');  // ❌ Looks for 'token', not 'authToken'!
```

**AuthContext** (`frontend/src/context/AuthContext.jsx`):
```javascript
localStorage.setItem('authToken', token);  // Saves as 'authToken'
```

### Why This Breaks Upload
1. User logs in → token saved as `authToken`
2. API interceptor finds token via `authToken` ✓
3. But Sidebar looks for `token` (wrong key) ✗
4. `localStorage.getItem('token')` returns `null`
5. Request sent without token
6. Backend returns 401 Unauthorized
7. Frontend shows: "No authentication token found"

### The Fix
Change line 164 in Sidebar.jsx from:
```javascript
const token = localStorage.getItem('token');  // WRONG KEY
```
To:
```javascript
const token = localStorage.getItem('authToken');  // CORRECT KEY
```

**Impact**: CRITICAL - This causes "No token found" error

---

## ⚠️ ISSUE #3: Database Schema Migration Not Applied (PRIORITY 1)

### The Problem
The `profile_image_url` column migration exists but **may not be applied to the database**.

### Evidence

Migration file exists:
```bash
$ grep -r "profile_image_url" backend/database/
backend/database/schema_update_profile_images.sql
```

But main schema doesn't have it:
```sql
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  role ENUM('admin', 'librarian', 'member') DEFAULT 'member',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  // ❌ NO profile_image_url COLUMN HERE!
);
```

### Why This Breaks Upload
1. Backend query tries to UPDATE `profile_image_url`
2. Column doesn't exist in database
3. MySQL returns error: "Unknown column 'profile_image_url'"
4. UserModel.updateProfileImage() throws database error
5. Error handler catches it but response might fail
6. Frontend receives 500 error or malformed response

### Verification Commands
```bash
# Check if column exists in database
mysql -h localhost -u root -p lms_database -e "DESC users;" | grep profile_image_url
# Should show: profile_image_url | varchar(500)

# Apply migration if not exists
mysql -h localhost -u root -p lms_database < backend/database/schema_update_profile_images.sql
```

### The Fix
Run the migration:
```bash
# From LMS root directory
mysql -h [HOST] -u [USER] -p [DATABASE] < backend/database/schema_update_profile_images.sql
```

**Impact**: CRITICAL - Database rejects the update

---

## ⚠️ ISSUE #4: File Upload Directory Permissions (PRIORITY 2)

### The Problem
The upload directory was just created but **may have incorrect permissions**.

### Evidence
```bash
$ mkdir -p /home/wambogo/Public/LMS/backend/uploads/profile-images
$ # Directory created but permissions may be restrictive
```

### Potential Issues
1. Directory exists but **not writable** by Node.js process
2. Multer can't write files to the directory
3. Returns error: "EACCES: permission denied"
4. Frontend receives 400 error from multer

### Verification Commands
```bash
# Check directory exists and permissions
ls -la /home/wambogo/Public/LMS/backend/uploads/profile-images

# Should output something like:
# drwxrwxr-x  2 user user  4096 Apr  5 12:00 .

# If not writable, fix permissions
chmod 755 /home/wambogo/Public/LMS/backend/uploads/profile-images

# Test write permission
touch /home/wambogo/Public/LMS/backend/uploads/profile-images/test.txt && \
rm /home/wambogo/Public/LMS/backend/uploads/profile-images/test.txt && \
echo "✅ Directory is writable"
```

### The Fix
```bash
chmod 755 /home/wambogo/Public/LMS/backend/uploads/profile-images
```

**Impact**: HIGH - Multer fails to save files

---

## ⚠️ ISSUE #5: Static Route Configuration Issue (PRIORITY 2)

### The Problem
The static route was added but **may not serve files correctly**.

### Evidence

**Server.js** has:
```javascript
app.use('/uploads/profile-images', express.static(path.join(__dirname, '../uploads/profile-images')));
```

### Potential Issues
1. Path may be incorrect due to `__dirname` in different module context
2. `__dirname` in server.js points to `/backend/src` not `/backend`
3. So `../uploads/profile-images` becomes `/backend/src/../uploads/profile-images`
4. Which resolves to `/backend/uploads/profile-images` ✓ (works by accident)
5. But if code structure changes, it breaks

### Verification Commands
```bash
# Check actual path being served
node -e "
const path = require('path');
const __dirname = path.join('/home/wambogo/Public/LMS/backend/src');
console.log('Path served:', path.join(__dirname, '../uploads/profile-images'));
"

# Should output: /home/wambogo/Public/LMS/backend/uploads/profile-images

# Verify files are accessible
curl -I http://localhost:5000/uploads/profile-images/
# Should return 404 (if no files) or list directory/file

# Or test with a real file after upload
curl http://localhost:5000/uploads/profile-images/1-1234567890.jpg
```

### Current Status
✓ This is currently working by accident (path resolves correctly)
⚠️ But fragile - could break with refactoring

**Impact**: MEDIUM - Currently works, but fragile

---

## 🔍 TEST MATRIX - What Fails Where

| Issue | Symptom | Where It Fails | Response |
|-------|---------|----------------|----------|
| #1: userId mismatch | Image saves as "undefined-..." | UserModel.updateProfileImage | 500 or odd filename |
| #2: token key wrong | No token sent | Sidebar.handleFileChange | 401 Unauthorized |
| #3: DB column missing | Database error | UserModel.updateProfileImage | 500 Internal Error |
| #4: Dir permissions | Can't write file | Multer storage | 400 Permission denied |
| #5: Static route issue | Can't fetch image | Browser GET /uploads/... | 404 Not Found |

---

## 📋 Complete Verification Checklist

### Frontend Checks
- [ ] Token stored as `authToken` (not `token`)
  ```javascript
  localStorage.getItem('authToken')  // Should exist
  localStorage.getItem('token')      // Should be null
  ```

### Backend Checks
- [ ] JWT token property uses `user_id` (underscore)
  ```javascript
  req.user.user_id  // Should exist
  req.user.userId   // Should be undefined (unless added elsewhere)
  ```

- [ ] Database column exists
  ```bash
  mysql> DESC users LIKE 'profile_image_url';
  ```

- [ ] Upload directory has correct permissions
  ```bash
  ls -la backend/uploads/profile-images/
  # Should show: drwxrwxr-x or drwxr-xr-x
  ```

- [ ] Static route works
  ```bash
  curl -I http://localhost:5000/uploads/profile-images/
  ```

### Integration Checks
- [ ] Backend logs show `req.user.user_id` not undefined
- [ ] Backend logs show file being saved with numeric userId
- [ ] Database update succeeds
- [ ] Image URL stores correctly in DB

---

## 🚨 Recommended Fix Queue (Priority Order)

### MUST FIX NOW (Blocks Uploads)
1. ✅ Fix token key in Sidebar.jsx (`token` → `authToken`)
2. ✅ Fix userId property in UserController.js (`userId` → `user_id`)
3. ✅ Apply database migration for `profile_image_url` column
4. ✅ Fix directory permissions (755)

### SHOULD FIX (Improves Reliability)
5. Verify static route path is robust
6. Add error handling for schema migration check
7. Add logging for token property name at auth time

---

## 🧪 Test After Fixes

### Step 1: Backend Restart
```bash
cd /home/wambogo/Public/LMS/backend
npm start
# Should see: "Server running on port 5000"
```

### Step 2: Test Upload with Console Logs
1. Open DevTools (F12)
2. Go to Console tab
3. Click avatar in sidebar
4. Select image file
5. Expected output:
```
Avatar clicked, opening file picker...
File selected, starting upload process...
File details: {name: "...", size: ..., type: "image/jpeg"}
Token found, sending request...  ← Should NOT say "No auth token"
Response status: 200            ← Should NOT be 401 or 500
Response data: {success: true, data: {user: {...}, imageUrl: "..."}}
Upload successful...
✅ Profile image updated successfully!
```

### Step 3: Verify Database
```bash
mysql> SELECT user_id, profile_image_url FROM users WHERE user_id = 1;
# Should show image URL like: /uploads/profile-images/1-1234567890.jpg
```

### Step 4: Verify File System
```bash
ls -la /home/wambogo/Public/LMS/backend/uploads/profile-images/
# Should show uploaded files with pattern: 1-1234567890.jpg
```

---

## Summary Table

| # | Issue | Severity | Status | Fix |
|---|-------|----------|--------|-----|
| 1 | JWT userId property | CRITICAL | ❌ NOT FIXED | Change `req.user.userId` → `req.user.user_id` |
| 2 | Token storage key | CRITICAL | ❌ NOT FIXED | Change `localStorage.getItem('token')` → `localStorage.getItem('authToken')` |
| 3 | DB schema migration | CRITICAL | ❌ NOT CHECKED | Run schema_update_profile_images.sql |
| 4 | Dir permissions | HIGH | ⚠️ UNCERTAIN | chmod 755 /backend/uploads/profile-images |
| 5 | Static route path | MEDIUM | ✅ WORKS | Monitor, currently functional |

**Files to be fixed:**
- `/backend/src/controllers/UserController.js`
- `/frontend/src/pages/Sidebar.jsx`
- Database (run migration)
- File system (check permissions)
