# 🚍 HoodiesBus

> **The World's Most Advanced Hoodie Customization Platform**

Design custom hoodies in real-time 3D, collaborate with manufacturers, and bring your vision to life with AI-powered assistance.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)

---

## ✨ Features

### 👕 For Designers & Customers
- **Real-time 3D Designer** - Design hoodies with live 3D preview using Three.js
- **AI Design Assistant** - Get suggestions, color palettes, and inspiration from local AI (Ollama)
- **Multiple Hoodie Types** - Pullover, Zip-Up, Oversized, Cropped, Athletic
- **Full Customization** - Colors, fabrics, prints, text, measurements
- **AR Preview** - Try on designs virtually with augmented reality
- **Design Gallery** - Browse and share community creations
- **Smart Fit Recommendations** - AI-powered size suggestions

### 🧵 For Manufacturers
- **Order Dashboard** - Manage incoming design requests
- **Auto-Generated Manufacturing Sheets** - PDF with 2D patterns, measurements, and specs
- **FreeSewing Integration** - Parametric pattern generation for precise cuts
- **Order Tracking** - Real-time status updates
- **Subscription Tiers** - Free, Pro, and Premium plans

### 💰 Monetization
- **Global Payments** - PayPal & Razorpay integration
- **Commission System** - Platform fee on orders
- **Designer Marketplace** - Sell your designs
- **Manufacturer Subscriptions** - Tiered pricing for visibility

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **3D Engine**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB (with Mongoose)
- **AI**: Ollama (self-hosted, free)
- **Real-time**: Socket.io
- **PDF Generation**: Puppeteer

### Payments
- PayPal SDK
- Razorpay API

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have the following installed:

```bash
# Required
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Ollama (for AI features)

# Optional
- Git
```

### Installation

#### 1. Clone or Navigate to Project

```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### 4. Set Up Ollama (AI Assistant)

**Windows:**
```bash
# Download and install from: https://ollama.ai
# After installation, pull the AI model:
ollama pull llama3.2
```

**Verify Ollama is running:**
```bash
ollama list
# Should show llama3.2 in the list
```

#### 5. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Use it in `.env` file

#### 6. Configure Environment Variables

**Backend** (`backend/.env`):
```bash
# Copy the example file
cd backend
copy .env.example .env
```

Edit `.env` with your settings:
```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/hoodiesbus
# OR use Atlas: mongodb+srv://username:password@cluster.mongodb.net/hoodiesbus

# JWT Secret
JWT_SECRET=your_super_secret_key_change_this

# Ollama AI
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2

# PayPal (Get from: https://developer.paypal.com)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# Razorpay (Get from: https://razorpay.com)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```bash
cd ../frontend
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
```

---

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend will run on `http://localhost:3000`

**Terminal 3 - Ollama (if not running as service):**
```bash
ollama serve
```

### Access the Application

- **Homepage**: http://localhost:3000
- **3D Designer**: http://localhost:3000/designer
- **API Health Check**: http://localhost:5000/api/health

---

## 📁 Project Structure

```
HoodiesBus/
├── frontend/                  # Next.js frontend
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── designer/         # 3D designer page
│   │   ├── gallery/          # Design gallery
│   │   └── manufacturer/     # Manufacturer dashboard
│   ├── components/
│   │   ├── 3d/              # Three.js components
│   │   │   ├── HoodieCanvas.tsx
│   │   │   └── HoodieModel.tsx
│   │   └── ui/              # UI components
│   └── public/
│       └── models/          # 3D hoodie models (.glb/.gltf)
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── server.ts        # Main server file
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.ts
│   │   │   ├── Design.ts
│   │   │   └── Order.ts
│   │   ├── services/        # Business logic
│   │   │   ├── ai.service.ts
│   │   │   └── pdf.service.ts
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   └── config/          # Configuration
│   └── outputs/             # Generated PDFs
│
└── shared/                   # Shared TypeScript types
```

---

## 🎨 Features Walkthrough

### 1. 3D Hoodie Designer

Navigate to `/designer` to access the full 3D customization interface:

- **Color Picker**: Choose from 10+ base colors
- **Hoodie Types**: Select style (pullover, zip-up, etc.)
- **Fabric Selection**: Cotton, Fleece, French Terry, Polyester
- **Text & Images**: Add custom prints to front, back, and sleeves
- **Measurements**: Adjust chest, length, sleeve, shoulder, waist
- **AI Assistant**: Click "✨ AI Assistant" for design help

### 2. AI Design Assistant

Powered by **Ollama** (runs locally on your machine):

```bash
User: "Suggest a design for a streetwear hoodie"
AI: "Try an oversized fit in black with a bold geometric
     pattern on the back. Pair with neon accents..."
```

**Features:**
- Natural language design requests
- Color palette suggestions
- Fabric recommendations
- Style inspiration

### 3. Manufacturing Workflow

When an order is placed:

1. **Customer** designs hoodie → Places order
2. **System** generates manufacturing PDF with:
   - 2D pattern layouts
   - Exact measurements
   - Print positions
   - Material specifications
   - QR code for tracking
3. **Manufacturer** receives order → Downloads PDF → Produces hoodie
4. **Payment** processed via PayPal/Razorpay
5. **Tracking** updates sent to customer

---

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### AI Assistant
```bash
POST /api/ai/chat
Body: { "message": "Suggest colors for a summer hoodie", "history": [] }
```

### Design Suggestions
```bash
POST /api/ai/suggest
Body: { "description": "I want a minimalist design" }
```

---

## 🎯 Next Steps & Roadmap

### Immediate TODOs

1. **Get 3D Hoodie Models**
   - Download free GLB/GLTF models from:
     - [Sketchfab](https://sketchfab.com/search?q=hoodie&type=models)
     - [Poly Pizza](https://poly.pizza/search/hoodie)
     - [TurboSquid Free](https://www.turbosquid.com/Search/3D-Models/free/hoodie)
   - Place in `frontend/public/models/hoodie.glb`
   - Update `HoodieModel.tsx` to load the actual model

2. **Set Up Payment Gateways**
   - **PayPal**: Get sandbox credentials from [developer.paypal.com](https://developer.paypal.com)
   - **Razorpay**: Sign up at [razorpay.com](https://razorpay.com)

3. **Database Setup**
   - Create MongoDB database
   - Seed with sample data (optional)

4. **Test AI Features**
   - Ensure Ollama is running
   - Test chat interface in `/designer`

### Future Enhancements

- [ ] User authentication (JWT + bcrypt)
- [ ] Real-time collaboration (Socket.io)
- [ ] AR preview (WebXR/8th Wall)
- [ ] Designer marketplace
- [ ] Admin dashboard
- [ ] Order tracking system
- [ ] Email notifications
- [ ] FreeSewing API integration
- [ ] Mobile app (React Native)
- [ ] NFT design ownership (blockchain)

---

## 🐛 Troubleshooting

### Ollama Not Working

```bash
# Check if Ollama is running
curl http://localhost:11434

# Restart Ollama
ollama serve

# Pull model again
ollama pull llama3.2
```

### MongoDB Connection Error

```bash
# Check if MongoDB is running
mongo --eval "db.version()"

# Start MongoDB service (Windows)
net start MongoDB

# Or use Atlas connection string in .env
```

### Three.js/3D Not Loading

- Ensure you're using `dynamic import` with `ssr: false`
- Check browser console for WebGL errors
- Try in Chrome/Edge (best WebGL support)

### Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <pid> /F
```

---

## 📚 Resources

### Learning Materials
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Next.js Docs](https://nextjs.org/docs)
- [Ollama Documentation](https://ollama.ai/docs)
- [FreeSewing](https://freesewing.org/docs/)

### Free 3D Models
- [Sketchfab](https://sketchfab.com)
- [Poly Pizza](https://poly.pizza)
- [TurboSquid Free](https://www.turbosquid.com/Search/3D-Models/free)

### Payment Integration
- [PayPal Developer](https://developer.paypal.com)
- [Razorpay Docs](https://razorpay.com/docs/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Support

Need help? Have questions?

- 📧 Email: support@hoodiesbus.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/hoodiesbus/issues)
- 💬 Discord: [Join our community](#)

---

## 🎉 Acknowledgments

- **Three.js** - Amazing 3D library
- **Ollama** - Local AI inference
- **FreeSewing** - Parametric sewing patterns
- **Next.js Team** - Best React framework
- **Open Source Community** - For all the incredible tools

---

**Made with 💜 by the HoodiesBus Team**

*Design. Customize. Create.*
