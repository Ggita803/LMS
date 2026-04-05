# Profile Image Upload - Complete Troubleshooting Guide

## Prerequisites Checklist

### 1. Backend Must Be Running
```bash
cd backend
npm start
# You should see the server running on port (usually 5000 or 8000)
```

### 2. Frontend Must Be Running  
```bash
cd frontend
npm run dev
# Server running on http://localhost:5173
```

### 3. Upload Directory Must Exist & Be Writable
```bash
# Verify directory exists:
ls -la backend/uploads/profile-images/

# If missing, create it:
mkdir -p backend/uploads/profile-images

# Check permissions:
chmod 755 backend/uploads/profile-images
```

---

## Step-by-Step Upload Testing

### Step 1: Check Browser Console
1. Open browser DevTools: **F12** or **Right-click → Inspect**
2. Go to **Console** tab
3. Click avatar in sidebar
4. Look for console messages like:
   - ✅ "Avatar clicked, opening file picker..."
   - ✅ "File selected, starting upload process..."
   - ✅ "File details: {name, size, type}"

### Step 2: Check Network Tab
1. Open DevTools → **Network** tab
2. Click avatar and select an image
3. Look for POST request to `/api/users/profile/image`
4. Check the response:
   - Should be a 200 status
   - Response body should be JSON like:
   ```json
   {
     "success": true,
     "message": "Profile image uploaded successfully",
     "data": {
       "user": {...},
       "imageUrl": "/uploads/profile-images/123-1712368800000.jpg"
     }
   }
   ```

### Step 3: Verify Backend Received File
In backend terminal, look for logs:
```
✓ File upload request received
✓ File saved to: uploads/profile-images/123-1234567890.jpg
```

### Step 4: Check Image File Exists
```bash
# List uploaded files:
ls -la backend/uploads/profile-images/

# Should show files like: 123-1712368800000.jpg
```

---

## Common Issues & Fixes

### Issue 1: "Nothing Happens" When Clicking Avatar

**Solution A: Hard Refresh Browser**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Solution B: Restart Both Servers**
```bash
# Terminal 1:
cd backend && npm start

# Terminal 2:
cd frontend && npm run dev
```

**Solution C: Clear Browser Cache**
- DevTools → Application → Clear storage → Clear all

---

### Issue 2: File Input Opens But Upload Doesn't Work

**Check 1: Verify Token**
```
Open DevTools Console and run:
localStorage.getItem('token')

Should return a long JWT token string, not null
```

**Check 2: Login Again**
If token is null, logout and login again:
1. Click **Logout**
2. Login with credentials
3. Try upload again

---

### Issue 3: 400 Error - "No file uploaded"

**Cause:** Form data not being sent correctly

**Fix:** Check that file is being selected:
```javascript
// In Console, verify file selection works:
fileInputRef.current?.click() // Should open file picker
```

---

### Issue 4: 400 Error - "Only image files allowed"

**Cause:** File MIME type doesn't match allowed types

**What's Allowed:**
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)

**What's NOT Allowed:**
- ❌ PDF, Word, Excel
- ❌ SVG
- ❌ Raw files without extension

---

### Issue 5: 413 Error - "File too large"

**Cause:** File exceeds 5MB limit

**Solution:** Compress image before uploading
- Use: https://tinypng.com/ or similar

---

### Issue 6: 500 Error - "Internal Server Error"

**Check Backend Logs:**
Look at terminal where backend is running for error messages

**Common Causes:**
1. Database connection issue
2. User not found
3. File write permission denied

**Fix Permission Issues:**
```bash
chmod 755 backend/uploads/profile-images
chmod 755 backend/uploads
```

---

## Complete Flow Verification

### Frontend Flow:
```
1. User clicks avatar
   ↓
2. File picker opens (check: fileInputRef.current?.click())
   ↓
3. User selects image
   ↓
4. handleFileChange() runs
   ↓
5. File validation (type & size)
   ↓
6. FormData created with file
   ↓
7. POST to /api/users/profile/image with Bearer token
   ↓
8. Response parsed as JSON
   ↓
9. Image URL saved to state
   ↓
10. Avatar updates with new image
```

### Backend Flow:
```
1. Request received by /api/users/profile/image
   ↓
2. Authenticate middleware checks token
   ↓
3. Multer processes file upload
   ↓
4. File validation (MIME type)
   ↓
5. File saved to /uploads/profile-images/
   ↓
6. Database updated with image URL
   ↓
7. JSON response sent back with imageUrl
```

---

## Console Messages Guide

### ✅ Success Messages:
```
Avatar clicked, opening file picker...
File selected, starting upload process...
File details: {name: "photo.jpg", size: 125000, type: "image/jpeg"}
Token found, sending request...
Response status: 200
Response data: {...}
Upload successful, updating UI with image...
Profile image upload completed successfully
```

### ⚠️ Warning Messages:
```
No file selected  → User didn't select file
No authentication token found → Need to login again
Failed to parse JSON response → Backend didn't return valid JSON
```

### ❌ Error Messages:
```
Invalid file type: ... → Wrong file format
File too large: ... → File exceeds 5MB
File input ref not found → Component refs broken
```

---

## Manual Testing Steps

### Test 1: File Selection Works
```javascript
// In browser console:
document.querySelector('input[type="file"]').click()
// Should open file picker
```

### Test 2: API Endpoint Works
```bash
# Using curl (in terminal):
curl -X POST http://localhost:5000/api/users/profile/image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "profileImage=@/path/to/image.jpg"

# Should return JSON with imageUrl
```

### Test 3: Image File Exists
```bash
# SSH into server and check:
ls -lah /path/to/lms/backend/uploads/profile-images/
# Should show your uploaded file
```

---

## Quick Reset (If Still Not Working)

```bash
# 1. Kill all running processes
ps aux | grep node
kill -9 <PID>

# 2. Clear upload directory
rm -rf backend/uploads/profile-images/*

# 3. Recreate directory
mkdir -p backend/uploads/profile-images

# 4. Restart backend & frontend
cd backend && npm start
# In another terminal:
cd frontend && npm run dev

# 5. Refresh browser
# DevTools → Network → Check uploads work
```

---

## If Still Having Issues

1. **Check backend console** for actual error messages
2. **Check browser console** (F12 → Console tab)
3. **Check Network tab** for request/response details
4. **Restart everything** - often fixes mysterious issues
5. **Clear browser cache** - can cause stale data issues

---

## Expected Behavior

✅ **Correct Behavior:**
1. Click avatar → file picker opens
2. Select image → "please wait" spinner shows
3. File uploads → "Profile image updated successfully!" alert
4. Avatar updates immediately with new image
5. Sidebar shows new image
6. Profile page shows new image

❌ **Wrong Behavior:**
- Nothing happens (check file input ref)
- Error alert appears (check console for details)
- Image doesn't display (check `/uploads/profile-images/` folder)
