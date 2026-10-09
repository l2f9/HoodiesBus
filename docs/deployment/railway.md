# 🚂 Deploy Backend to Railway - Step by Step

## ✅ What You Have Ready:
- ✅ Backend code with Railway config (`railway.toml`, `Procfile`)
- ✅ Code pushed to GitHub: https://github.com/l2f9/HoodiesBus
- ✅ Frontend live on Vercel: https://hoodiesbus.vercel.app/
- ✅ AI service with graceful fallbacks

---

## 🎯 Step 1: Create Railway Account (2 minutes)

1. **Go to**: https://railway.app/
2. **Click**: "Start a New Project"
3. **Sign in with GitHub** (use your l2f9 account)
4. **Authorize Railway** to access your repos

---

## 🚀 Step 2: Deploy from GitHub (3 minutes)

### After you're logged in:

1. **Click**: "New Project" (+ button in top right)
2. **Select**: "Deploy from GitHub repo"
3. **Choose**: `HoodiesBus` repository
4. **Important**: Railway will detect it's a monorepo. Configure:
   - **Root Directory**: `backend` ⚠️ **CRITICAL**
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

5. **Click**: "Deploy"

---

## ⚙️ Step 3: Set Environment Variables (5 minutes)

After deployment starts, click on your service → **Variables** tab:

### Required Variables:

```bash
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://hoodiesbus.vercel.app
JWT_SECRET=hoodiesbus_super_secret_jwt_key_2025_change_in_prod
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### For MongoDB (we'll set this up next):
```bash
MONGODB_URI=<we'll add this after MongoDB Atlas setup>
```

### Optional (leave empty for now):
```bash
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_MODE=sandbox
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

**Click "Add" for each variable**

---

## 💾 Step 4: Setup MongoDB Atlas (FREE) (5 minutes)

### Create MongoDB Database:

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with Google or GitHub
3. **Choose**:
   - Free tier (M0 Sandbox)
   - Cloud provider: AWS
   - Region: **US East (N. Virginia)** (closest to Railway)
4. **Cluster Name**: `HoodiesBus`
5. **Click**: "Create Cluster" (takes 1-3 minutes)

### Get Connection String:

6. **Click**: "Database Access" (left sidebar)
7. **Add New Database User**:
   - Username: `hoodiesbus`
   - Password: **Generate secure password** (copy it!)
   - Database User Privileges: `Read and write to any database`
   - Click "Add User"

8. **Click**: "Network Access" (left sidebar)
9. **Add IP Address**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

10. **Click**: "Database" (left sidebar)
11. **Click**: "Connect" on your cluster
12. **Select**: "Connect your application"
13. **Copy** the connection string:
```
mongodb+srv://hoodiesbus:<password>@hoodiesbus.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

14. **Replace** `<password>` with the password you copied in step 7
15. **Add database name** at the end:
```
mongodb+srv://hoodiesbus:YOUR_PASSWORD@hoodiesbus.xxxxx.mongodb.net/hoodiesbus?retryWrites=true&w=majority
```

---

## 🔗 Step 5: Add MongoDB to Railway

1. **Go back to Railway**
2. **Click**: Your backend service → **Variables** tab
3. **Add new variable**:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://hoodiesbus:YOUR_PASSWORD@hoodiesbus.xxxxx.mongodb.net/hoodiesbus?retryWrites=true&w=majority`
4. **Click**: "Add"

Railway will automatically redeploy with the new variable!

---

## 🌐 Step 6: Get Your Backend URL

1. **Click**: "Settings" tab in your Railway service
2. **Scroll to**: "Domains" section
3. **Click**: "Generate Domain"
4. Railway will give you a URL like: `https://hoodiesbus-production-xxxx.up.railway.app`

**COPY THIS URL** - you'll need it for the frontend!

---

## 🎯 Step 7: Test Your Backend

Open your browser or use curl:

```bash
https://YOUR-RAILWAY-URL.up.railway.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-17T...",
  "services": {
    "database": "connected",
    "ollama": "disconnected"
  }
}
```

✅ **"disconnected" for Ollama is EXPECTED and OK!** The fallback messages will work.

---

## ✅ What's Working:

- ✅ Express server running
- ✅ MongoDB connected
- ✅ API endpoints live
- ✅ Socket.io ready
- ✅ CORS configured for your Vercel frontend
- ✅ AI service with fallback responses

---

## 🚨 Common Issues:

### "Application failed to respond"
→ Check that Root Directory is set to `backend`
→ Check that `PORT` environment variable is set to `5000`

### "Failed to connect to MongoDB"
→ Make sure you added the IP whitelist (0.0.0.0/0)
→ Check that password in connection string is correct
→ Make sure connection string has the database name at the end

### "Build failed"
→ Check the build logs in Railway
→ Make sure all dependencies are in `package.json`

---

## 📊 Railway Free Tier Limits:

- ✅ **500 hours/month** (enough for 24/7 hosting!)
- ✅ **100GB bandwidth**
- ✅ **512MB RAM**
- ✅ **1GB storage**

**Perfect for your HoodiesBus platform!** 🎉

---

## 🎉 Next Steps:

After backend is deployed:
1. Update frontend environment variables in Vercel
2. Connect frontend to backend
3. Test the full application
4. Celebrate! 🚀

---

**Need help?** Tell me:
- What step you're on
- What you see in Railway dashboard
- Any error messages
