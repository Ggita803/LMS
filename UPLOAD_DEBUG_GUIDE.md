# Image Upload Debug Guide

## Quick Test - Browser DevTools Method

### Step 1: Open DevTools
- Press `F12` in your browser
- Go to **Console** tab

### Step 2: Check if Backend is Running
In the console, type:
```javascript
fetch('http://localhost:5000/api/books', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(d => console.log('Backend status:', d))
.catch(e => console.error('Backend error:', e))
```

You should see either data or an error. If you can't connect at all, backend isn't running on port 5000.

### Step 3: Clear Console & Click Avatar
1. Clear console messages: Right-click → Clear
2. In Sidebar, click on the avatar/profile image
3. Select a JPG or PNG image file

### Step 4: Check for Console Messages
You should see these messages in order:
```
Avatar clicked, opening file picker...
File selected, starting upload process...
File details: {name: "...", size: ..., type: "image/jpeg"}
Token found, sending request...
Response status: 200
Response data: {success: true, data: {user: {...}, imageUrl: "..."}}
Upload successful, updating UI...
✅ Profile image updated successfully!
```

### If Upload Fails - Debug Chart

#### Message: "No file selected"
- **Cause**: File input not triggering
- **Fix**: Try clicking avatar again or refresh browser (F5)

#### Message: "Invalid file type: ..."
- **Cause**: File is not JPG/PNG/GIF/WebP
- **Fix**: Use a .jpg, .png, .gif, or .webp image

#### Message: "No authentication token found"
- **Cause**: You're not logged in
- **Fix**: 
  ```javascript
  console.log('Token:', localStorage.getItem('token'))
  ```
  If empty, logout and login again

#### Message: "Response status: 401"
- **Cause**: Token is invalid or expired
- **Fix**: 
  1. Logout
  2. Login again
  3. Try upload again

#### Message: "Response status: 400"
- **Cause**: File validation error
- **Check**: What is `data.message` in console?
- If "File size": Use a smaller image
- If "Invalid file type": Use JPG/PNG
- If "No file uploaded": Try refresh & retry

#### Message: "Response status: 500"
- **Cause**: Server error
- **Debug**: 
  1. Check backend terminal for error messages
  2. Restart backend: `npm start` in `/backend` folder
  3. Try upload again

#### Message: "No image URL returned from server"
- **Cause**: Backend didn't send `data.data.imageUrl`
- **Check Backend**: Run this in your backend terminal:
  ```bash
  ls -la backend/uploads/profile-images/
  ```
  Does the directory exist and contain files?

---

## Manual Backend Test

### Test 1: Upload via cURL
```bash
cd /home/wambogo/Public/LMS/backend

# Get token (replace with your actual token)
TOKEN="your_jwt_token_here"

# Upload test image
curl -X POST http://localhost:5000/api/users/profile/image \
  -H "Authorization: Bearer $TOKEN" \
  -F "profileImage=@/path/to/image.jpg"
```

Expected response:
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "user": {...},
    "imageUrl": "/uploads/profile-images/1-1234567890.jpg"
  },
  "timestamp": "..."
}
```

### Test 2: Check Backend Logs
In backend terminal, watch for these logs when uploading:
```
uploadProfileImage called
req.file: {fieldname: 'profileImage', filename: '1-...', ...}
req.user: {userId: 1, username: '...', role: '...'}
Token found, sending request...
Uploading image for userId: 1
Image filename: 1-1234567890.jpg
Image URL: /uploads/profile-images/1-1234567890.jpg
Profile image uploaded successfully for userId: 1
```

### Test 3: Verify File Permissions
```bash
# Check upload directory exists
ls -la /home/wambogo/Public/LMS/backend/uploads/profile-images/

# Check permissions (should be readable/writable)
chmod 755 /home/wambogo/Public/LMS/backend/uploads/profile-images

# Check if files are being saved
ls -la /home/wambogo/Public/LMS/backend/uploads/profile-images/*.jpg
```

### Test 4: Verify Static Route
In browser console:
```javascript
// If image exists at this path, browser should fetch it
fetch('/uploads/profile-images/1-1234567890.jpg')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Can\'t fetch image:', e))
```

---

## Complete Debug Checklist

- [ ] **Backend Running**: `npm start` in `/backend` folder (should show port 5000)
- [ ] **Frontend Running**: Can access http://localhost:5173 or similar
- [ ] **Logged In**: Can see username and role in sidebar
- [ ] **Token Valid**: `localStorage.getItem('token')` returns a long string in console
- [ ] **Directory Exists**: `/backend/uploads/profile-images/` folder exists
- [ ] **Permissions OK**: Folder is readable and writable (`chmod 755`)
- [ ] **Server Restart**: Shut down backend with Ctrl+C, then `npm start` again
- [ ] **Browser Refresh**: Hard refresh with Ctrl+F5 or Cmd+Shift+R
- [ ] **Clear Cache**: DevTools → Application → Clear Storage → Clear All
- [ ] **Test File**: Use a small JPG or PNG image (under 5MB)

---

## If Still Not Working - Detailed Network Inspection

### Step 1: Open Network Tab
- Press F12 → **Network** tab
- Make sure "Preserve log" checkbox is checked

### Step 2: Upload Image & Inspect Request
- Click avatar to upload
- Find the POST request to `profile/image` in the Network tab
- Click on it and check:

**Request Headers:**
```
POST /api/users/profile/image HTTP/1.1
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
Should show `profileImage` field with file attached

**Response Status:**
Should be `200` (not 400, 401, 500)

**Response Body:**
Should be JSON like:
```json
{
  "success": true,
  "data": {
    "imageUrl": "/uploads/profile-images/..."
  }
}
```

### Step 3: Document the Response
If response is an error, copy the Response Body and share it with us to debug.

---

## Still Need Help?

### Provide This Information:
1. **Browser Console Log**: Paste the console output when you click avatar
2. **Network Response**: Copy the Response Body from Network tab
3. **Backend Terminal Log**: Copy any error messages from backend terminal
4. **File Exists Check**:
   ```bash
   ls -la /home/wambogo/Public/LMS/backend/uploads/profile-images/
   ```
   Share the output

### Commands to Share Output From:

Backend checks (run in `/backend` folder):
```bash
# Check Node version
node --version

# Check npm packages
npm list multer

# Check file directory
ls -lah uploads/

# Check permissions
stat uploads/profile-images
```
