# 🚀 HoodiesBus FREE Deployment Guide

## Step-by-Step Deployment (100% FREE)

---

## ✅ STEP 1: Deploy Frontend to Vercel (FREE)

### Prerequisites:
- GitHub account (free)
- Vercel account (free) - Sign up at vercel.com

### Option A: Deploy via Vercel Dashboard (Easiest - 5 minutes)

1. **Push code to GitHub**:
   ```bash
   # Create new repo on github.com first, then:
   cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus
   git remote add origin https://github.com/YOUR_USERNAME/hoodiesbus.git
   git push -u origin master
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `hoodiesbus` repo
   - Set Root Directory: `frontend`
   - Click "Deploy"
   - ✅ Done! Your site is live at `https://hoodiesbus.vercel.app`

### Option B: Deploy via CLI (Faster for experts)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy frontend
cd frontend
vercel --prod

# 4. Follow prompts:
# - Link to existing project? No
# - Project name? hoodiesbus
# - Directory: ./ (current)
# - Override settings? No

# ✅ Done! Note the URL: https://hoodiesbus.vercel.app
```

**What you get FREE**:
- ✅ 100GB bandwidth/month
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS
- ✅ Auto-deploy on GitHub push

---

## ✅ STEP 2: Deploy Backend to Railway (FREE)

### Prerequisites:
- GitHub account (already have it)
- Railway account (free) - Sign up at railway.app

### Deployment Steps (10 minutes):

1. **Prepare backend for deployment**:
   ```bash
   cd backend

   # Add build script to package.json (if not exists)
   # We'll create this file
   ```

2. **Push to GitHub** (if not done yet):
   ```bash
   # Already done in Step 1!
   ```

3. **Deploy on Railway**:
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select `hoodiesbus` repo
   - Click "Add variables" and add:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://mvvx98:IGYHxZvm5ss7ckEg@hoodiesbus.wgxpear.mongodb.net/
     OLLAMA_HOST=http://localhost:11434
     OLLAMA_MODEL=llama3.2
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
     NODE_ENV=production
     ```
   - Set Root Directory: `backend`
   - Click "Deploy"
   - ✅ Done! Note your Railway URL: `https://hoodiesbus-production.up.railway.app`

4. **Update Frontend Environment Variable**:
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://hoodiesbus-production.up.railway.app`
   - Redeploy frontend

**What you get FREE**:
- ✅ $5 credit/month (enough for API)
- ✅ 512MB RAM
- ✅ Auto-deploy on GitHub push
- ✅ HTTPS included

---

## ✅ STEP 3: Setup Cloudflare R2 Storage (FREE 10GB)

### Sign up (5 minutes):

1. **Create Cloudflare account**:
   - Go to https://dash.cloudflare.com/sign-up
   - Sign up (free)

2. **Enable R2**:
   - Go to R2 Object Storage (in sidebar)
   - Click "Purchase R2 plan" (it's FREE up to 10GB!)
   - Create bucket: `hoodiesbus`

3. **Get API credentials**:
   - Go to R2 → Manage R2 API Tokens
   - Click "Create API Token"
   - Name: `hoodiesbus-backend`
   - Permissions: "Object Read & Write"
   - Copy:
     - Access Key ID
     - Secret Access Key
     - Endpoint (e.g., `https://xxxxx.r2.cloudflarestorage.com`)

4. **Add to Railway environment variables**:
   ```
   R2_ENDPOINT=https://xxxxx.r2.cloudflarestorage.com
   R2_ACCESS_KEY_ID=your_access_key
   R2_SECRET_ACCESS_KEY=your_secret
   R2_BUCKET_NAME=hoodiesbus
   ```

**What you get FREE**:
- ✅ 10GB storage (1000+ GLB models)
- ✅ 1 million reads/month
- ✅ 1 million writes/month
- ✅ Zero egress fees

---

## ✅ STEP 4: Setup Upstash Redis (FREE Queue)

### Sign up (3 minutes):

1. **Create Upstash account**:
   - Go to https://console.upstash.com/login
   - Sign up with GitHub (free)

2. **Create Redis database**:
   - Click "Create Database"
   - Name: `hoodiesbus-queue`
   - Type: Regional
   - Region: Choose closest to you
   - Click "Create"

3. **Get connection details**:
   - Copy REST URL: `https://xxxxx.upstash.io`
   - Copy REST Token: `AxxxxxxxxxxxX`

4. **Add to Railway environment variables**:
   ```
   UPSTASH_REDIS_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_TOKEN=AxxxxxxxxxxxX
   ```

**What you get FREE**:
- ✅ 10,000 commands/day (~300 jobs)
- ✅ 256MB storage
- ✅ REST API (works everywhere)

---

## ✅ STEP 5: Install ComfyUI on Your PC (AI Rendering)

### System Requirements:
- ✅ NVIDIA GPU (GTX 1060 6GB or better)
- ✅ 16GB RAM
- ✅ 50GB free space (for models)
- ✅ Windows 10/11

### Installation (20 minutes):

1. **Install Python 3.10**:
   - Download from https://www.python.org/downloads/release/python-31011/
   - ⚠️ Check "Add Python to PATH" during installation!
   - Verify: `python --version` (should show 3.10.x)

2. **Install Git** (if not installed):
   - Download from https://git-scm.com/download/win
   - Install with default settings

3. **Clone ComfyUI**:
   ```bash
   cd C:\
   git clone https://github.com/comfyanonymous/ComfyUI.git
   cd ComfyUI
   ```

4. **Install PyTorch with CUDA support**:
   ```bash
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
   ```

5. **Install ComfyUI dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

6. **Download Stable Diffusion XL model** (6.9GB - one-time):
   ```bash
   # Using Windows PowerShell:
   cd models\checkpoints
   curl -L -o sd_xl_base_1.0.safetensors https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
   cd ..\..
   ```

7. **Download ControlNet model** (2.5GB - one-time):
   ```bash
   cd models\controlnet
   curl -L -o control_lora_rank128_v11p_sd15_openpose.safetensors https://huggingface.co/comfyanonymous/ControlNet-v1-1_fp16_safetensors/resolve/main/control_lora_rank128_v11p_sd15_openpose_fp16.safetensors
   cd ..\..
   ```

8. **Start ComfyUI**:
   ```bash
   python main.py --listen 0.0.0.0 --port 8188
   ```

9. **Test in browser**:
   - Open http://localhost:8188
   - You should see the ComfyUI interface!

**Keep this running** - we'll expose it to the internet in Step 7.

---

## ✅ STEP 6: Install Blender (3D Simulation)

### Installation (10 minutes):

1. **Download Blender 4.0**:
   - Go to https://www.blender.org/download/
   - Download for Windows
   - Install to: `C:\Program Files\Blender Foundation\Blender 4.0`

2. **Add Blender to PATH**:
   ```bash
   # Add to Windows PATH:
   # 1. Search "Environment Variables" in Windows
   # 2. Edit "Path" in System Variables
   # 3. Add: C:\Program Files\Blender Foundation\Blender 4.0
   ```

3. **Test Blender CLI**:
   ```bash
   blender --version
   # Should output: Blender 4.0.0
   ```

4. **Test Python API**:
   ```bash
   blender --background --python-expr "import bpy; print('Blender Python works!')"
   ```

**What you get**:
- ✅ Industry-standard cloth physics
- ✅ Same quality as $500/month cloud GPUs
- ✅ Completely free!

---

## ✅ STEP 7: Expose Local Workers (Cloudflare Tunnel - FREE)

### Why?
Your Railway backend needs to call your PC's ComfyUI and Blender workers.

### Option A: Cloudflare Tunnel (Recommended - No bandwidth limits!)

1. **Download cloudflared**:
   - Go to https://github.com/cloudflare/cloudflared/releases
   - Download `cloudflared-windows-amd64.exe`
   - Rename to `cloudflared.exe`
   - Move to `C:\cloudflared\cloudflared.exe`

2. **Login to Cloudflare**:
   ```bash
   cloudflared tunnel login
   # Opens browser - login and authorize
   ```

3. **Create tunnel**:
   ```bash
   cloudflared tunnel create hoodiesbus-workers
   # Note the Tunnel ID
   ```

4. **Expose ComfyUI**:
   ```bash
   # Terminal 1: ComfyUI (already running from Step 5)

   # Terminal 2: Expose via tunnel
   cloudflared tunnel --url http://localhost:8188
   # Note the URL: https://xxxx-xxxx.trycloudflare.com
   ```

5. **Update Railway environment variable**:
   ```
   COMFYUI_URL=https://xxxx-xxxx.trycloudflare.com
   ```

**What you get FREE**:
- ✅ Unlimited bandwidth
- ✅ HTTPS included
- ✅ DDoS protection
- ✅ No account limits

### Option B: ngrok (Alternative - 40GB/month free)

```bash
# 1. Download ngrok
# Go to https://ngrok.com/download
# Sign up (free)

# 2. Install ngrok
# Extract to C:\ngrok\ngrok.exe

# 3. Authenticate
ngrok config add-authtoken YOUR_TOKEN

# 4. Expose ComfyUI
ngrok http 8188
# Note the URL: https://xxxx-xxxx-xxxx.ngrok-free.app
```

---

## ✅ STEP 8: Create Worker Scripts

### We'll create these scripts next to connect everything together!

---

## 🎉 FINAL CHECKLIST

After completing all steps, you should have:

- ✅ Frontend live on Vercel: `https://hoodiesbus.vercel.app`
- ✅ Backend API on Railway: `https://hoodiesbus-production.up.railway.app`
- ✅ MongoDB Atlas connected (already had this)
- ✅ Cloudflare R2 storage ready (10GB free)
- ✅ Upstash Redis queue ready
- ✅ ComfyUI running on your PC
- ✅ Blender installed on your PC
- ✅ Workers exposed via Cloudflare Tunnel

**Total Monthly Cost**: $0
**Quality**: Production-grade (same as CLO3D!)

---

## 🔧 Next Steps:

1. Test end-to-end workflow
2. Create worker scripts for job processing
3. Setup Google Colab backup (optional)
4. Add monitoring with UptimeRobot (free)

**Ready to test? Visit your Vercel URL and try designing a hoodie!**
