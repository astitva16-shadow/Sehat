# 📝 NPM Commands Reference - Sehat App

## 🎯 Quick Reference Guide

This document lists all available npm commands for the Sehat App project.

---

## 📦 Root Directory Commands
*Run from: `PBL/`*

### Installation
```bash
# Install all dependencies (frontend + backend + root)
npm run install:all
```

### Development
```bash
# Start backend development server
npm run dev:backend

# Start frontend development server
npm run dev:frontend

# Start backend (alias)
npm run dev
```

### Build
```bash
# Build frontend for production
npm run build
```

---

## 🔧 Backend Commands
*Run from: `PBL/backend/`*

### Development
```bash
# Start with auto-reload (nodemon)
npm run dev

# Start without auto-reload
npm start
```

### Database
```bash
# Seed database with sample data
node seed.js
```

### Installation
```bash
# Install backend dependencies
npm install

# Install specific package
npm install <package-name>
```

---

## ⚛️ Frontend Commands
*Run from: `PBL/frontend/`*

### Development
```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Build
```bash
# Build for production (creates dist/ folder)
npm run build
```

### Preview
```bash
# Preview production build locally
npm run preview
```

### Installation
```bash
# Install frontend dependencies
npm install

# Install specific package
npm install <package-name>
```

---

## 🚀 Complete Workflow Commands

### First Time Setup
```bash
# 1. Navigate to project
cd PBL

# 2. Install all dependencies
npm run install:all

# 3. Configure environment (if needed)
# Edit backend/.env

# 4. Seed database
cd backend
node seed.js
cd ..
```

### Daily Development

**Terminal 1 (Backend):**
```bash
cd PBL
npm run dev:backend
# Backend runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd PBL
npm run dev:frontend
# Frontend runs on http://localhost:3000
```

### Production Build
```bash
# 1. Build frontend
cd PBL
npm run build

# 2. Start backend in production
cd backend
NODE_ENV=production npm start
```

---

## 🛠️ Additional Useful Commands

### Package Management

```bash
# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

### Cleaning

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Database Management

```bash
# Seed database
cd backend
node seed.js

# Clear and reseed (requires manual implementation)
# Option 1: Use MongoDB Compass
# Option 2: Add to seed.js script
```

---

## 🐛 Troubleshooting Commands

### Port Issues

```bash
# Check what's using port 5000 (backend)
# Windows
netstat -ano | findstr :5000
# macOS/Linux
lsof -i :5000

# Kill process on port
# Windows
taskkill /PID <PID> /F
# macOS/Linux
kill -9 <PID>

# Check what's using port 3000 (frontend)
# Windows
netstat -ano | findstr :3000
# macOS/Linux
lsof -i :3000
```

### MongoDB Commands

```bash
# Check MongoDB status
# Windows
net start MongoDB
# macOS
brew services list
# Linux
sudo systemctl status mongod

# Start MongoDB
# Windows
net start MongoDB
# macOS
brew services start mongodb-community
# Linux
sudo systemctl start mongod

# Stop MongoDB
# Windows
net stop MongoDB
# macOS
brew services stop mongodb-community
# Linux
sudo systemctl stop mongod
```

---

## 📋 Script Definitions

### Root `package.json` Scripts
```json
{
  "dev": "cd backend && npm run dev",
  "dev:frontend": "cd frontend && npm run dev",
  "dev:backend": "cd backend && npm run dev",
  "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install",
  "build": "cd frontend && npm run build"
}
```

### Backend `package.json` Scripts
```json
{
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

### Frontend `package.json` Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 🎯 Common Workflows

### Starting Fresh
```bash
cd PBL
npm run install:all
cd backend && node seed.js && cd ..
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

### Updating Dependencies
```bash
# Backend
cd backend
npm update
npm audit fix

# Frontend
cd frontend
npm update
npm audit fix
```

### Testing Different Features
```bash
# Just backend API
cd backend
npm run dev
# Test API at http://localhost:5000/api/health

# Just frontend
cd frontend
npm run dev
# View UI at http://localhost:3000
```

### Preparing for Production
```bash
# 1. Update environment variables
# Edit backend/.env

# 2. Build frontend
cd frontend
npm run build

# 3. Test production build
npm run preview

# 4. Deploy backend
cd ../backend
npm start
```

---

## 💡 Tips & Tricks

### Running Multiple Commands
```bash
# Using && (sequential)
cd backend && npm install && npm run dev

# Using semicolons (PowerShell)
cd backend; npm install; npm run dev
```

### Environment Variables
```bash
# Set environment variable (Linux/macOS)
PORT=5001 npm run dev

# Set environment variable (Windows)
set PORT=5001 && npm run dev
```

### Quick Restart
```bash
# Stop server: Ctrl+C
# Restart: Press Up Arrow + Enter
```

---

## 🔍 Verification Commands

### Check Installation
```bash
# Node.js version
node --version
# Should be v16+

# npm version
npm --version
# Should be v8+

# MongoDB version
mongod --version
# Should be v5+
```

### Check Project Health
```bash
# All dependencies installed?
npm list --depth=0

# Any vulnerabilities?
npm audit

# Backend running?
curl http://localhost:5000/api/health

# Frontend running?
curl http://localhost:3000
```

---

## 📊 Performance Commands

### Bundle Size Analysis
```bash
cd frontend
npm run build
# Check dist/ folder size
```

### Development Server Performance
```bash
# Frontend hot reload
# Automatic on file save

# Backend auto-restart
# Automatic with nodemon
```

---

## 🆘 Emergency Commands

### Complete Reset
```bash
# Delete everything and start fresh
cd PBL
rm -rf node_modules frontend/node_modules backend/node_modules
rm package-lock.json frontend/package-lock.json backend/package-lock.json
npm run install:all
```

### Database Reset
```bash
cd backend
node seed.js
# This clears and reseeds the database
```

---

## 📝 Custom Commands to Add

### Optional: Add to root `package.json`
```json
{
  "scripts": {
    "install:backend": "cd backend && npm install",
    "install:frontend": "cd frontend && npm install",
    "seed": "cd backend && node seed.js",
    "clean": "rm -rf node_modules frontend/node_modules backend/node_modules",
    "reset": "npm run clean && npm run install:all && npm run seed"
  }
}
```

---

## 🎓 Learning Commands

### Explore Project Structure
```bash
# List all files
tree -L 3

# Or
ls -R

# Count lines of code
find . -name "*.js" -o -name "*.jsx" | xargs wc -l
```

### View Running Processes
```bash
# See what's running
# Windows
tasklist | findstr node
# macOS/Linux
ps aux | grep node
```

---

## ✅ Quick Checklist

Before starting development:
- [ ] Node.js installed?
- [ ] MongoDB running?
- [ ] Dependencies installed? (`npm run install:all`)
- [ ] Database seeded? (`node seed.js`)
- [ ] Environment variables set? (backend/.env)

Starting development:
- [ ] Backend running? (`npm run dev:backend`)
- [ ] Frontend running? (`npm run dev:frontend`)
- [ ] Browser open? (http://localhost:3000)
- [ ] API working? (http://localhost:5000/api/health)

---

## 🎉 You're All Set!

Use this reference anytime you need to run a command. Happy coding! 🚀

**Pro tip:** Bookmark this file for quick access! 📌
