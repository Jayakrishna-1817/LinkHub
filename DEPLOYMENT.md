# Deployment Guide for LinkHub

## 🚀 Backend Deployment (Render/Railway)

### Option 1: Deploy to Render (Recommended)

1. **Create a Render Account**: Go to [render.com](https://render.com) and sign up

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository or use "Public Git repository"
   - Repository URL: Point to your backend folder

3. **Configure Service**:
   - **Name**: linkhub-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables**:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://jksmart1817_db_user:jk@link.vcng8o0.mongodb.net/linkfind
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=production
   ```

5. **Deploy**: Click "Create Web Service"

6. **Get Backend URL**: After deployment, copy your service URL (e.g., `https://linkhub-backend.onrender.com`)

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (same as above)
5. Railway will auto-deploy

---

## 🌐 Frontend Deployment (Vercel/Netlify)

### Option 1: Deploy to Vercel (Recommended)

1. **Create a Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `web` folder as root directory

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual Render backend URL)

5. **Deploy**: Click "Deploy"

6. **Access Your Site**: Vercel will provide a URL like `https://linkhub.vercel.app`

### Option 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select repository
4. Configure:
   - **Base directory**: `web`
   - **Build command**: `npm run build`
   - **Publish directory**: `web/dist`
5. Add environment variable `VITE_API_URL`
6. Deploy

---

## 📱 Mobile App Deployment

### For Android (Google Play Store)

1. **Build APK**:
   ```bash
   cd mobile
   eas build --platform android
   ```

2. **Create Google Play Developer Account**: ($25 one-time fee)

3. **Upload to Play Console**:
   - Create new app
   - Upload APK/AAB
   - Fill in store listing details
   - Submit for review

### For iOS (Apple App Store)

1. **Build IPA**:
   ```bash
   cd mobile
   eas build --platform ios
   ```

2. **Apple Developer Account**: ($99/year)

3. **Upload to App Store Connect**:
   - Create new app
   - Upload build
   - Submit for review

### Testing (Expo Go - No Account Needed)

For quick testing without app store deployment:

1. **Publish to Expo**:
   ```bash
   cd mobile
   npx expo publish
   ```

2. **Share via QR Code**: Users scan QR code with Expo Go app

---

## ⚙️ Configuration Checklist

### Backend Configuration
- ✅ MongoDB Atlas IP whitelist (0.0.0.0/0 for production)
- ✅ Strong JWT_SECRET in production
- ✅ CORS configured for frontend domain
- ✅ Environment variables set

### Frontend Configuration
- ✅ VITE_API_URL pointing to backend
- ✅ Build command configured
- ✅ Output directory set to `dist`

### Mobile Configuration
- ✅ API URL updated in mobile/src/services/api.js
- ✅ App name and bundle ID configured
- ✅ Icons and splash screen added

---

## 🔧 Quick Deploy Commands

### Push to GitHub (if not already)
```bash
cd C:\Users\smano\OneDrive\Desktop\LinkFind
git init
git add .
git commit -m "Initial commit - LinkHub project"
git branch -M main
git remote add origin https://github.com/yourusername/linkhub.git
git push -u origin main
```

### Update Frontend API URL
After backend is deployed, update:
```bash
# Create .env file in web folder
echo VITE_API_URL=https://your-backend-url.onrender.com > web\.env
```

---

## 📊 Cost Breakdown

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Render** | 750 hours/month | From $7/month |
| **Vercel** | Unlimited hobby projects | From $20/month |
| **MongoDB Atlas** | 512MB storage | From $9/month |
| **Expo (Mobile)** | Free for testing | $29/month for teams |
| **Google Play** | $25 one-time | - |
| **Apple Developer** | - | $99/year |

**Total for Free Tier**: $0 (web only)
**Total with App Stores**: $124 (first year)

---

## 🆘 Troubleshooting

### Backend Issues
- **MongoDB Connection Failed**: Check IP whitelist in MongoDB Atlas
- **Environment Variables Missing**: Verify all variables in Render dashboard
- **Build Failed**: Check Node version compatibility

### Frontend Issues
- **API Calls Failing**: Verify VITE_API_URL is correct
- **Build Error**: Clear cache and rebuild: `npm run build`
- **CORS Error**: Check backend CORS settings

### Mobile Issues
- **API Not Connecting**: Update BASE_URL in mobile/src/services/api.js
- **Build Failed**: Run `npx expo doctor` to check dependencies

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Expo Docs**: https://docs.expo.dev
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas

---

## 🎉 After Deployment

1. Test all features on live site
2. Share your link: `https://your-app.vercel.app`
3. Monitor logs in Render/Vercel dashboards
4. Set up custom domain (optional)
5. Enable analytics (optional)

**Your LinkHub app is now live! 🚀**
