# HoodiesBus

A web platform for designing custom hoodies in real-time 3D, with an AI design assistant and automatic manufacturing sheets.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Overview

HoodiesBus lets customers build a hoodie in the browser and see it update live in 3D. An optional local AI assistant (Ollama) suggests styles, colors and fabrics. The backend generates manufacturing PDFs so a factory can produce exactly what was designed.

## Features

| Feature | Status |
| --- | --- |
| Real-time 3D hoodie designer (Three.js / React Three Fiber) | Available |
| Five hoodie base meshes: pullover, zip-up, oversized, cropped, athletic | Available |
| PBR materials, colors and fabrics | Available |
| 2D design canvas | Available |
| AI design assistant (Ollama, runs locally) | Available |
| REST API with health check and AI endpoints | Available |
| Manufacturing PDF generation (Puppeteer) | In progress |
| Authentication, orders and payments (PayPal, Razorpay) | Planned |
| Design gallery, marketplace and manufacturer dashboard | Planned |
| Real-time collaboration (Socket.io) and AR preview | Planned |

## Tech stack

- **Frontend:** Next.js 15 (App Router), React 19, Three.js, React Three Fiber, Tailwind CSS 4, Zustand, Framer Motion
- **Backend:** Node.js, Express 5, TypeScript, Mongoose (MongoDB), Socket.io, Puppeteer
- **AI:** Ollama (self-hosted, free)
- **Patterns:** FreeSewing for parametric sewing patterns

## Getting started

### Prerequisites

- Node.js 20 or newer
- [Ollama](https://ollama.com) (optional, for the AI assistant)
- MongoDB (optional, the API starts without it)

### Install

```bash
git clone https://github.com/l2f9/HoodiesBus.git
cd HoodiesBus

cd backend && npm install
cd ../frontend && npm install
```

### Configure

```bash
cp backend/.env.example backend/.env
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > frontend/.env.local
```

Edit `backend/.env` and set at least `JWT_SECRET`. See [`backend/.env.example`](backend/.env.example) for every option. Never commit real credentials.

To enable the AI assistant:

```bash
ollama pull llama3.2
```

### Run

```bash
# Terminal 1: API on http://localhost:5000
cd backend && npm run dev

# Terminal 2: web app on http://localhost:3000
cd frontend && npm run dev
```

| URL | What |
| --- | --- |
| http://localhost:3000 | Home |
| http://localhost:3000/designer | 3D designer |
| http://localhost:5000/api/health | API health check |

## API

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | | Service and database status |
| `POST` | `/api/ai/chat` | `{ "message": string, "history": [] }` | Chat with the design assistant |
| `POST` | `/api/ai/suggest` | `{ "description": string }` | Get design suggestions |

## Project structure

```
HoodiesBus/
├── frontend/              Next.js app
│   ├── app/               Routes (home, designer)
│   └── components/        3D meshes, 2D canvas, UI
├── backend/               Express API
│   └── src/
│       ├── config/        Database configuration
│       ├── models/        Mongoose models (User, Design, Order)
│       ├── services/      AI and PDF services
│       └── server.ts      Entry point
└── docs/                  Architecture, 3D system and deployment guides
```

## Documentation

- [Architecture vision](docs/architecture-vision.md)
- [Free-tier hosting architecture](docs/free-hosting-architecture.md)
- [3D system](docs/3d-system.md) and [sourcing 3D models](docs/3d-models.md)
- Deployment: [Vercel (frontend)](docs/deployment/vercel.md), [Render (API)](docs/deployment/render.md), [Railway (API)](docs/deployment/railway.md)

## Troubleshooting

- **AI assistant not responding:** check Ollama is running (`curl http://localhost:11434`) and the model is pulled (`ollama list`).
- **MongoDB connection error:** confirm `MONGODB_URI` in `backend/.env`. The API still starts without a database, but persistence is disabled.
- **3D canvas is blank:** check the browser console for WebGL errors. Chrome and Edge have the best support.
- **Port already in use:** change `PORT` in `backend/.env`, or stop the process using ports 3000 and 5000.

## Contributing

1. Fork the repository and create a branch (`git checkout -b feature/my-change`)
2. Make your change and make sure `npm run build` passes in `frontend/` and `backend/`
3. Open a pull request describing the change

## License

Released under the [MIT License](LICENSE).
