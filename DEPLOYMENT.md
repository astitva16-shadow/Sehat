# 🚀 Sehat App - Deployment Guide

This guide covers deploying Sehat App to production environments.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database seeded with production data
- [ ] Security review completed
- [ ] Build process tested
- [ ] API endpoints documented

## 🌐 Deployment Options

### Option 1: Separate Hosting (Recommended)

**Frontend:** Vercel / Netlify  
**Backend:** Heroku / Railway / Render  
**Database:** MongoDB Atlas  

### Option 2: VPS Hosting

**Platform:** DigitalOcean / AWS EC2 / Linode  
**Server:** Full-stack on single server  

### Option 3: Containerized

**Platform:** Docker + Kubernetes  
**Registry:** Docker Hub / AWS ECR  

---

## 🗄️ Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster (M0 Free)

### Step 2: Configure Network Access
1. Go to Network Access
2. Add IP Address: `0.0.0.0/0` (allow from anywhere)
3. Or add specific IPs for security

### Step 3: Create Database User
1. Go to Database Access
2. Add New Database User
3. Username: `sehat-app-user`
4. Password: Generate strong password
5. Database User Privileges: `Read and write to any database`

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string:
```
mongodb+srv://sehat-app-user:<password>@cluster0.xxxxx.mongodb.net/sehat-app?retryWrites=true&w=majority
```
4. Replace `<password>` with actual password

### Step 5: Seed Production Database
```bash
# Update backend/.env with Atlas connection string
MONGODB_URI=mongodb+srv://sehat-app-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sehat-app

# Run seed script
cd backend
node seed.js
```

---

## 🔧 Backend Deployment

### Option A: Railway (Easiest)

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login & Initialize**
```bash
railway login
cd backend
railway init
```

3. **Add Environment Variables**
```bash
railway variables set MONGODB_URI="mongodb+srv://..."
railway variables set JWT_SECRET="your-production-secret-key"
railway variables set NODE_ENV="production"
```

4. **Deploy**
```bash
railway up
```

5. **Get URL**
```bash
railway domain
# Note down the URL: https://your-app.railway.app
```

### Option B: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login & Create App**
```bash
heroku login
cd backend
heroku create sehat-app-backend
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your-production-secret-key"
heroku config:set NODE_ENV="production"
```

4. **Deploy**
```bash
git push heroku main
```

### Option C: Render

1. Go to [render.com](https://render.com)
2. Connect GitHub repository
3. Create Web Service
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables in dashboard

---

## 🎨 Frontend Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Configure API URL**
Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

3. **Deploy**
```bash
cd frontend
vercel --prod
```

4. **Configure in Dashboard**
- Add environment variable: `VITE_API_URL`
- Set build command: `npm run build`
- Set output directory: `dist`

### Option B: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build Project**
```bash
cd frontend
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

4. **Configure Environment**
- Go to Site settings > Environment variables
- Add `VITE_API_URL=https://your-backend-url`

### Option C: GitHub Pages

1. **Install gh-pages**
```bash
cd frontend
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/sehat-app"
}
```

3. **Deploy**
```bash
npm run deploy
```

---

## 🔒 Production Security

### 1. Environment Variables

**Never commit these to Git!**

```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sehat-app
JWT_SECRET=<use-strong-random-string-min-32-chars>
NODE_ENV=production
```

```env
# Frontend (.env.production)
VITE_API_URL=https://api.sehatapp.com
```

### 2. JWT Secret Generation
```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. CORS Configuration

Update `backend/server.js`:
```javascript
const corsOptions = {
  origin: ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com'],
  credentials: true
};
app.use(cors(corsOptions));
```

### 4. Rate Limiting

Install:
```bash
npm install express-rate-limit
```

Add to `backend/server.js`:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 5. Helmet Security Headers

Install:
```bash
npm install helmet
```

Add to `backend/server.js`:
```javascript
import helmet from 'helmet';
app.use(helmet());
```

---

## 🐳 Docker Deployment

### 1. Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongo
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
  
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### 3. Deploy
```bash
docker-compose up -d
```

---

## 🌍 Custom Domain Setup

### 1. Purchase Domain
- Namecheap, GoDaddy, or Google Domains

### 2. Configure DNS

**For Vercel/Netlify:**
- Add A record: `@` → `76.76.21.21` (example)
- Add CNAME: `www` → `your-app.vercel.app`

**For Backend:**
- Add CNAME: `api` → `your-backend.railway.app`

### 3. SSL Certificate
Most platforms (Vercel, Netlify, Railway) provide free SSL automatically.

---

## 📊 Monitoring & Logging

### 1. Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/node
```

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});

app.use(Sentry.Handlers.errorHandler());
```

### 2. Logging

**Winston Logger:**
```bash
npm install winston
```

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 3. Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🧪 Post-Deployment Testing

1. **Health Check**
```bash
curl https://your-api.com/api/health
```

2. **Test Endpoints**
- Signup: POST /api/auth/signup
- Login: POST /api/auth/login
- Get Hospitals: GET /api/hospitals

3. **Frontend Test**
- Load homepage
- Test all navigation
- Try signup/login
- Book appointment
- Check responsive design

4. **Performance Test**
- Google PageSpeed Insights
- GTmetrix
- Lighthouse

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend && npm ci
        cd ../backend && npm ci
    
    - name: Build frontend
      run: cd frontend && npm run build
    
    - name: Deploy to Vercel
      run: cd frontend && vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Scaling Considerations

### 1. Database
- Enable MongoDB Atlas auto-scaling
- Add read replicas for high traffic
- Implement caching (Redis)

### 2. Backend
- Use PM2 for cluster mode
- Add load balancer
- Implement horizontal scaling

### 3. Frontend
- Use CDN (Cloudflare)
- Optimize images
- Implement lazy loading

---

## 🆘 Troubleshooting

### Issue: CORS Errors
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Issue: MongoDB Connection Timeout
- Check Network Access in MongoDB Atlas
- Verify connection string
- Ensure IP whitelist includes deployment server

### Issue: Build Fails
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify all environment variables

---

## 📝 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with production data
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and connected to backend
- [ ] Environment variables set correctly
- [ ] SSL certificates active
- [ ] Custom domain configured (optional)
- [ ] CORS properly configured
- [ ] Error tracking enabled
- [ ] Monitoring set up
- [ ] All features tested in production
- [ ] Performance optimized
- [ ] Security headers implemented
- [ ] Rate limiting enabled
- [ ] Backup strategy in place

---

## 🎉 Success!

Your Sehat App is now live and ready to help users with their healthcare needs!

**Next Steps:**
1. Share the URL with users
2. Gather feedback
3. Monitor performance
4. Plan feature updates
5. Scale as needed

---

**Need help?** Check the main README.md or open an issue.
