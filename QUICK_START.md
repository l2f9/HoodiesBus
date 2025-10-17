# ⚡ Quick Start Guide - Get Live in 30 Minutes!

## 🎯 What We're Doing:

1. ✅ Push code to GitHub (5 min)
2. ✅ Deploy frontend to Vercel (5 min)
3. ✅ Deploy backend to Railway (10 min)
4. ✅ Test your live site! (5 min)
5. (Optional) Setup local GPU workers later

---

## STEP 1: Push to GitHub (5 minutes)

### If you DON'T have GitHub repo yet:

1. Go to https://github.com/new
2. Create repo named: `hoodiesbus`
3. **DON'T** initialize with README (we already have code!)
4. Click "Create repository"

### Then run these commands:

```bash
# Make sure you're in the HoodiesBus directory
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus

# Add GitHub remote (replace YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/hoodiesbus.git

# Push to GitHub
git push -u origin master
```

**✅ Done!** Your code is on GitHub. Refresh the page to see it!

---

## STEP 2: Deploy Frontend to Vercel (5 minutes)

### Easy Way (Recommended):

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Find and select your `hoodiesbus` repository
4. **Important Settings**:
   - Framework Preset: Next.js (auto-detected ✅)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
5. Click "Deploy"
6. Wait 2-3 minutes...
7. **✅ DONE!** Your site is live!

**Your URL**: https://hoodiesbus-xxxxx.vercel.app (copy this!)

---

## STEP 3: Deploy Backend to Railway (10 minutes)

### Step A: Sign up for Railway

1. Go to https://railway.app/
2. Click "Start a New Project"
3. Sign up with GitHub (free)
4. Verify email if needed

### Step B: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your `hoodiesbus` repository
4. Railway will auto-detect both frontend and backend
5. **Select the `backend` service** (not frontend - we already deployed that!)

### Step C: Configure Backend

1. Click on the backend service
2. Go to "Settings"
3. Set Root Directory: `backend`
4. Go to "Variables" tab
5. Add these environment variables (click "+ New Variable" for each):

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://mvvx98:IGYHxZvm5ss7ckEg@hoodiesbus.wgxpear.mongodb.net/
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2
JWT_SECRET=hoodiesbus_secret_key_2024
FRONTEND_URL=https://hoodiesbus-xxxxx.vercel.app
```

⚠️ **IMPORTANT**: Replace `FRONTEND_URL` with YOUR Vercel URL from Step 2!

6. Click "Deploy"
7. Wait 3-5 minutes for build...
8. **✅ DONE!** Backend is live!

### Step D: Get Backend URL

1. Go to "Settings" tab
2. Find "Domains" section
3. Click "Generate Domain"
4. Your URL: `https://hoodiesbus-production-xxxx.up.railway.app`
5. **Copy this URL!**

---

## STEP 4: Connect Frontend to Backend (2 minutes)

Now we need to tell your frontend where the backend is!

1. Go back to Vercel dashboard
2. Select your `hoodiesbus` project
3. Go to "Settings" → "Environment Variables"
4. Click "Add"
5. Add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://hoodiesbus-production-xxxx.up.railway.app` (your Railway URL)
6. Click "Save"
7. Go to "Deployments" tab
8. Click "..." on latest deployment → "Redeploy"
9. Wait 2 minutes...

**✅ DONE!** Frontend and backend are connected!

---

## STEP 5: Test Your Live Site! 🎉

1. Go to your Vercel URL: `https://hoodiesbus-xxxxx.vercel.app`
2. Click "Get Started" or "Designer"
3. Try customizing a hoodie!
4. Try the AI chat assistant!

**🎉 YOUR SITE IS LIVE!**

---

## What's Working Now:

- ✅ Frontend hosted on Vercel (fast global CDN)
- ✅ Backend API on Railway (auto-scales)
- ✅ MongoDB database connected
- ✅ AI chat with Ollama (basic features)
- ✅ 3D hoodie designer with color picker
- ✅ Beautiful galactic UI

---

## What's NOT Working Yet (Need Local GPU):

- ⚠️ AI photorealistic rendering (need ComfyUI)
- ⚠️ 3D cloth simulation (need Blender)
- ⚠️ Virtual try-on (need GPU workers)

**These features need your PC's GPU** - we'll set them up next!

---

## NEXT: Setup Local GPU Workers (Optional - Do Later)

Follow the detailed steps in `DEPLOYMENT_STEPS.md`:
- Step 5: Install ComfyUI (20 min)
- Step 6: Install Blender (10 min)
- Step 7: Expose with Cloudflare Tunnel (5 min)

**Or skip for now and add later!** Your site is already live and functional!

---

## Troubleshooting:

### Frontend build failing?
- Check that Root Directory is set to `frontend`
- Check Node version is 18.x or higher

### Backend not starting?
- Check environment variables are set correctly
- Check MongoDB URI is correct
- View logs in Railway dashboard → "Deployments" → "View Logs"

### CORS errors?
- Make sure `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Make sure `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL exactly

---

## 🎉 Congrats! Your Site Is Live!

**Frontend**: https://hoodiesbus-xxxxx.vercel.app
**Backend**: https://hoodiesbus-production-xxxx.up.railway.app
**Cost**: $0/month 🆓

Share your site with friends and start getting feedback!

---

## Want to Add Custom Domain?

### Free .com Domain:
- Use Freenom (free .tk, .ml, .ga domains)
- Or buy on Namecheap ($10/year)

### Connect to Vercel:
1. Vercel → Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Wait 10 minutes...
5. Done! Site available at yourdomain.com

---

## What's Next?

1. ✅ Test all features on your live site
2. ✅ Get feedback from users
3. ✅ Setup local GPU workers when ready
4. ✅ Add more features!
5. ✅ Launch to the world! 🚀

**Need help? Check DEPLOYMENT_STEPS.md for detailed guides!**
