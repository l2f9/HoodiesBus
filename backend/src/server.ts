import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { connectDatabase } from './config/database';
import aiService from './services/ai.service';

// Load environment variables
dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Basic routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🚍 Welcome to HoodiesBus API',
    version: '1.0.0',
    status: 'running',
  });
});

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const ollamaStatus = await aiService.healthCheck();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        ollama: ollamaStatus ? 'connected' : 'disconnected',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: 'Service check failed',
    });
  }
});

// AI Chat endpoint
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await aiService.chat(message, history || []);

    res.json({
      success: true,
      response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'AI service error',
    });
  }
});

// AI Design suggestions
app.post('/api/ai/suggest', async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const suggestions = await aiService.generateDesignSuggestions(description);

    res.json({
      success: true,
      suggestions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate suggestions',
    });
  }
});

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join design room
  socket.on('join-design', (designId: string) => {
    socket.join(`design-${designId}`);
    console.log(`User ${socket.id} joined design room: ${designId}`);
  });

  // Broadcast design changes
  socket.on('design-update', (data) => {
    socket.to(`design-${data.designId}`).emit('design-changed', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Check Ollama connection
    const ollamaHealthy = await aiService.healthCheck();
    if (ollamaHealthy) {
      console.log('✅ Ollama AI service is running');
      const models = await aiService.getAvailableModels();
      console.log(`📦 Available models: ${models.join(', ')}`);
    } else {
      console.warn('⚠️  Ollama is not running. AI features will be unavailable.');
      console.warn('💡 Install Ollama from: https://ollama.ai');
      console.warn('💡 Run: ollama pull llama3.2');
    }

    // Start listening
    server.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      console.log(`\n📋 API Endpoints:`);
      console.log(`   GET  /api/health       - Health check`);
      console.log(`   POST /api/ai/chat      - AI chat assistant`);
      console.log(`   POST /api/ai/suggest   - Design suggestions`);
      console.log(`\n✨ HoodiesBus is ready!`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
