require('dotenv').config();

const express = require('express');
const http    = require('http');
const cors    = require('cors');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);
const PORT   = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// ── Socket.IO ─────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// ── Routes ────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ message: '🐱 RockyCat Backend is running' });
});

// ── Start ─────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`✅ Express server running  → http://localhost:${PORT}`);
  console.log(`✅ Socket.IO server ready  → ws://localhost:${PORT}`);
});

// additional routes and socket event handlers can be added here as needed
io.on('connection', (socket) => {
  console.log('🔥 A fighter has entered the Rockycat arena!', socket.id);
});