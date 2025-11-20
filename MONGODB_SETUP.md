# ⚠️ MongoDB Not Installed - Quick Fix Guide

## Current Situation
MongoDB is not installed on your system. The Sehat App requires MongoDB to store data (hospitals, appointments, users).

## 🎯 Quick Solutions

### Option 1: Install MongoDB (Recommended - 10 minutes)

#### Download & Install
1. Go to: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer (.msi file)
4. Choose "Complete" installation
5. **Important:** Check "Install MongoDB as a Service"
6. Click Install

#### Verify Installation
```powershell
mongod --version
```

#### Start MongoDB
```powershell
net start MongoDB
```

#### Then Run Seed Script
```powershell
cd C:\Users\Dell\OneDrive\Desktop\PBL\backend
node seed.js
```

---

### Option 2: Use MongoDB Atlas (Cloud - 5 minutes)

#### Free Cloud Database
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster (M0)
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sehat-app
   ```

---

### Option 3: View Frontend Only (2 minutes)

You can still see the beautiful UI and frontend features:

```powershell
cd C:\Users\Dell\OneDrive\Desktop\PBL\frontend
npm run dev
```

**What works without MongoDB:**
- ✅ See the beautiful home page
- ✅ View all page layouts
- ✅ Test responsive design
- ✅ Try dark mode
- ✅ Navigate all pages

**What needs MongoDB:**
- ❌ Login/Signup (needs database)
- ❌ Book appointments (needs database)
- ❌ View hospitals (needs database)
- ❌ Symptom checker (backend API)

---

## 🚀 Recommended Next Steps

### For Full Experience:
1. **Install MongoDB** (Option 1 above)
2. **Seed database:** `node seed.js`
3. **Start backend:** `npm run dev`
4. **Start frontend:** `npm run dev` (in frontend folder)
5. **Login with:** patient@example.com / password123

### For Quick UI Preview:
1. **Start frontend only:** 
   ```powershell
   cd frontend
   npm run dev
   ```
2. Open browser: http://localhost:3000
3. Explore the beautiful UI design

---

## 💡 Why MongoDB?

MongoDB is needed to store:
- 🏥 Hospital information (8 hospitals across India)
- 👥 User accounts (patients & doctors)
- 📅 Appointments and bookings
- 💊 Prescriptions and consultations
- 📍 Location data for maps

---

## 🆘 Need Help?

**Installation Issues?**
- Check: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

**Quick Questions?**
- MongoDB installs to: `C:\Program Files\MongoDB\Server\7.0\bin\`
- Data stored in: `C:\data\db\` (created automatically)

---

## ✅ What to Do Right Now

**Choose your path:**

**Path A - Full Setup (Best Experience):**
```powershell
# 1. Install MongoDB from mongodb.com
# 2. Then run:
cd C:\Users\Dell\OneDrive\Desktop\PBL\backend
node seed.js
npm run dev

# In new terminal:
cd C:\Users\Dell\OneDrive\Desktop\PBL\frontend
npm run dev
```

**Path B - UI Preview Only:**
```powershell
cd C:\Users\Dell\OneDrive\Desktop\PBL\frontend
npm run dev
# Open: http://localhost:3000
```

---

**I'll start the frontend now so you can see the UI!** 🎨
