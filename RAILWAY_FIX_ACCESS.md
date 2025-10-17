# 🔧 Fix Railway GitHub Access

## Problem: "No repositories found"

Railway doesn't have permission to see your repos. Here's how to fix it:

---

## ✅ Solution 1: Grant Railway Access to GitHub

### Step 1: Configure GitHub App Permissions

1. **In Railway**, when you see "No repositories found":
   - Look for a link that says **"Configure GitHub App"** or **"Install GitHub App"**
   - Click it

2. **You'll be redirected to GitHub**:
   - Select: **"Only select repositories"**
   - Choose: ✅ `HoodiesBus`
   - Click: **"Install & Authorize"**

3. **Return to Railway**:
   - Refresh the page
   - Your `HoodiesBus` repo should now appear!

---

## ✅ Solution 2: Use Railway CLI Instead (FASTER!)

If the GitHub integration isn't working, use Railway CLI:

### Step 1: Install Railway CLI

**Open PowerShell or Command Prompt:**

```bash
# Install Railway CLI via npm
npm install -g @railway/cli

# Or download from: https://docs.railway.app/develop/cli
```

### Step 2: Login to Railway

```bash
railway login
```

This opens your browser to authenticate. Click "Authorize".

### Step 3: Initialize Your Project

```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus\backend

railway init
```

**Select**: "Create a new project"
**Name**: `hoodiesbus-backend`

### Step 4: Link and Deploy

```bash
# Link to Railway
railway link

# Deploy your backend
railway up
```

**That's it!** Railway CLI will:
- Build your TypeScript code
- Deploy to Railway
- Give you a URL

### Step 5: Set Environment Variables

```bash
# Add environment variables
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://hoodiesbus.vercel.app
railway variables set JWT_SECRET=hoodiesbus_secret_2025
```

### Step 6: Generate Domain

```bash
railway domain
```

This generates a public URL for your backend!

---

## 📊 About the Trial

> "30 days or $5.00 Limited Trial"

**Good news**: Railway's trial gives you:
- ✅ **$5 of free credits** (enough for 1-2 months of light usage)
- ✅ **30 days** to use those credits
- ✅ **No credit card required** during trial

**After trial**: Railway has a **Hobby Plan ($5/month)** that includes:
- $5 of usage credits included
- Most small apps use < $5/month
- You only pay if you exceed the $5 credit

**For FREE forever**: Use Railway's new **"Starter" plan** (if available) which gives you 500 hours/month free!

---

## 🎯 Which Method Should You Use?

### **Use GitHub Integration** if:
- You want automatic deploys on git push
- You like web UI

### **Use Railway CLI** if:
- GitHub integration isn't working
- You prefer command line
- You want faster setup

---

## 🆘 Still Stuck?

**Tell me**:
1. Did Railway CLI install successfully?
2. Are you able to run `railway login`?
3. What error (if any) do you see?

I'll guide you through it! 🚀
