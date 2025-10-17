# 🚀 Getting Started with HoodiesBus

**Ready to run HoodiesBus in 5 minutes!**

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Install Ollama (AI)
# Download from: https://ollama.ai
ollama pull llama3.2

# 2. Install & Run Backend
cd backend
npm install
copy .env.example .env
# Edit .env with your MongoDB URI
npm run dev

# 3. Install & Run Frontend (new terminal)
cd frontend
npm install
npm run dev

# 4. Open Browser
# http://localhost:3000
```

---

## 📋 Detailed Setup

### Step 1: Install Prerequisites

#### Windows

**Node.js & npm:**
```bash
# Download from: https://nodejs.org
# Choose LTS version (v18+)
# Verify installation:
node --version  # Should show v18+
npm --version
```

**MongoDB (Choose one option):**

**Option A: Local Installation**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Install and start service:
net start MongoDB

# Verify:
mongo --version
```

**Option B: MongoDB Atlas (Recommended for beginners)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Create account
4. Create a free cluster (takes 3-5 min)
5. Click "Connect" → "Connect your application"
6. Copy connection string (looks like: `mongodb+srv://...`)
7. Save for Step 3

**Ollama (AI Engine):**
```bash
# Download from: https://ollama.ai
# Run installer
# After installation:
ollama pull llama3.2

# Verify:
ollama list
# Should show: llama3.2
```

---

### Step 2: Install Dependencies

**Backend:**
```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus\backend
npm install
```

**Frontend:**
```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus\frontend
npm install
```

---

### Step 3: Configure Environment

**Backend Configuration:**
```bash
cd backend
copy .env.example .env
notepad .env
```

**Edit the `.env` file:**
```env
# Required - Change these:
MONGODB_URI=mongodb://localhost:27017/hoodiesbus
# OR if using Atlas:
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/hoodiesbus

JWT_SECRET=change_this_to_something_random_and_secure

# Optional - For payments (can add later):
PAYPAL_CLIENT_ID=your_paypal_id
RAZORPAY_KEY_ID=your_razorpay_id
```

**Frontend Configuration:**
```bash
cd ../frontend
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
```

---

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus\backend
npm run dev
```

✅ **Expected output:**
```
✅ MongoDB connected successfully
✅ Ollama AI service is running
📦 Available models: llama3.2
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus\frontend
npm run dev
```

✅ **Expected output:**
```
ready - started server on 0.0.0.0:3000
```

---

### Step 5: Test It Out!

Open your browser:

1. **Homepage**: http://localhost:3000
   - Click "🎨 Start Designing"

2. **3D Designer**: http://localhost:3000/designer
   - Change colors
   - Select hoodie type
   - Click "✨ AI Assistant" to chat

3. **API Health**: http://localhost:5000/api/health
   - Should show: `{"status":"healthy"}`

---

## 🎨 What You Can Do Now

### Design a Hoodie
1. Go to `/designer`
2. Pick a color from the palette
3. Select hoodie type (pullover, zip-up, etc.)
4. Choose fabric
5. Add text or upload image
6. Adjust measurements
7. Click "Save Design"

### Use AI Assistant
1. Click "✨ AI Assistant" button
2. Ask questions like:
   - "Suggest colors for a summer hoodie"
   - "What fabric is best for athletic wear?"
   - "Give me a streetwear design idea"
3. AI will respond with suggestions!

---

## 🐛 Common Issues & Fixes

### ❌ "Ollama is not running"

**Fix:**
```bash
# Start Ollama service
ollama serve

# In another terminal:
ollama pull llama3.2
```

### ❌ "MongoDB connection error"

**Fix:**
```bash
# If using local MongoDB:
net start MongoDB

# If using Atlas:
# - Check your connection string in .env
# - Make sure you whitelisted your IP in Atlas
# - Verify username/password are correct
```

### ❌ "Port 3000 already in use"

**Fix:**
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill it (replace <PID> with actual number)
taskkill /PID <PID> /F

# Or use different port:
# In frontend package.json, change:
# "dev": "next dev -p 3001"
```

### ❌ "Cannot find module '@react-three/fiber'"

**Fix:**
```bash
cd frontend
npm install @react-three/fiber @react-three/drei three
```

### ❌ "3D model not showing"

**Expected!** The placeholder uses basic shapes. To use real hoodie models:

1. Download free GLB model from:
   - [Sketchfab](https://sketchfab.com/search?q=hoodie&type=models&features=downloadable)
   - [Poly Pizza](https://poly.pizza/search/hoodie)

2. Place in `frontend/public/models/hoodie.glb`

3. Update `HoodieModel.tsx`:
   ```tsx
   // Uncomment this line:
   const { scene } = useGLTF('/models/hoodie.glb');

   // Replace placeholder mesh with:
   return <primitive object={scene} scale={1.5} />;
   ```

---

## 📦 What's Included?

### ✅ Working Features

- **3D Designer** with color picker
- **AI Assistant** (powered by Ollama)
- **Hoodie type selection**
- **Fabric selection**
- **Text customization**
- **Measurements input**
- **Manufacturing PDF generation**
- **Beautiful homepage**
- **Responsive design**

### 🚧 To Be Implemented

You'll need to add:
- User authentication
- Payment processing (PayPal/Razorpay)
- Order management
- Manufacturer dashboard
- Design gallery
- AR preview
- Real 3D hoodie models

---

## 🎯 Next Steps

### 1. Get Better 3D Models

**Free sources:**
- [Sketchfab](https://sketchfab.com/search?q=hoodie&type=models&features=downloadable)
- [Poly Pizza](https://poly.pizza/search/hoodie)
- [CGTrader Free](https://www.cgtrader.com/free-3d-models/clothing/hoodie)

**Tips:**
- Look for GLB or GLTF format
- Low-poly models (< 50k polygons) work best
- Check license (CC0 or CC-BY recommended)

### 2. Set Up Payments

**PayPal:**
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create app
3. Get Client ID & Secret
4. Add to backend `.env`

**Razorpay:**
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys
3. Add to backend `.env`

### 3. Deploy to Production

**Frontend (Vercel):**
```bash
cd frontend
npm install -g vercel
vercel
```

**Backend (Railway):**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Deploy backend
4. Add environment variables

---

## 🎓 Learn More

- [Three.js Tutorial](https://threejs.org/manual/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Next.js Learn](https://nextjs.org/learn)
- [Ollama Guide](https://ollama.ai/library)
- [MongoDB Tutorial](https://www.mongodb.com/basics)

---

## 💬 Need Help?

- Check `README.md` for full documentation
- Open an issue on GitHub
- Join our Discord community
- Email: support@hoodiesbus.com

---

**🎉 You're all set! Start designing amazing hoodies!**
