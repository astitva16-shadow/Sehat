# 🚀 Sehat App - Quick Start Guide

## Prerequisites Check
✅ Node.js v16+ installed
✅ MongoDB installed and running
✅ A code editor (VS Code recommended)

## 1️⃣ Installation (5 minutes)

```bash
# Clone and navigate to project
cd PBL

# Install all dependencies
npm run install:all
```

## 2️⃣ Configure Environment (2 minutes)

The `.env` file is already created in the `backend` folder. Just make sure MongoDB is running!

## 3️⃣ Seed Database (1 minute)

```bash
cd backend
node seed.js
```

**✅ You should see:**
- ✅ Connected to MongoDB
- 🗑️ Cleared existing data
- 🏥 Seeded hospitals
- 👥 Seeded users
- 📧 Demo credentials displayed

## 4️⃣ Start the Application (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `🚀 Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: Local server URL (usually http://localhost:3000)

## 5️⃣ Open Browser & Login

Navigate to: **http://localhost:3000**

**Demo Login:**
- Email: `patient@example.com`
- Password: `password123`

## 🎯 What to Try First

1. **Home Page** - Explore the beautiful landing page
2. **Symptom Checker** - Try typing "fever and cough"
3. **Find Hospitals** - Allow location access to see nearby hospitals
4. **Book Appointment** - Schedule a consultation
5. **Emergency** - Check emergency services
6. **Dark Mode** - Toggle dark mode from header

## 🐛 Common Issues

### MongoDB not running?
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port 5000 already in use?
Change `PORT=5001` in `backend/.env`

### Port 3000 already in use?
Vite will automatically suggest 3001

## 📱 Mobile Testing

The app is fully responsive! Try:
- Opening in mobile browser
- Using Chrome DevTools mobile emulator
- Resizing browser window

## 🎨 Features Checklist

- ✅ User authentication (signup/login)
- ✅ Find nearby hospitals with map
- ✅ Symptom checker with health tips
- ✅ Book appointments
- ✅ View appointment history
- ✅ Emergency services
- ✅ Dark mode
- ✅ Responsive design
- ✅ Download consultation reports

## 🔥 Pro Tips

1. **Enable Location** - For best experience, allow browser location access
2. **Try Dark Mode** - Click moon icon in header
3. **Emergency Button** - Red button in bottom-right corner
4. **Multiple Accounts** - Sign up with different emails to test patient flow
5. **Doctor Account** - Login as doctor to see appointment management

## 📊 Database Info

After seeding, you'll have:
- **8 hospitals** across major Indian cities
- **2 users** (1 patient, 1 doctor)
- **Multiple specialties** (Cardiology, Neurology, etc.)

## 🆘 Need Help?

Check the full README.md for:
- Detailed API documentation
- Troubleshooting guide
- Architecture overview
- Future enhancement ideas

---

**That's it! You're all set! 🎉**

Start exploring Sehat App - Your Smart Health Companion
