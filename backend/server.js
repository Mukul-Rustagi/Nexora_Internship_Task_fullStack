const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import configuration and services
const connectDB = require("./config/database");
const productService = require("./services/productService");
const userService = require("./services/userService");

// Import routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

// Import error handling middleware
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Seed initial data (controlled by environment variables)
const autoSeedProducts = process.env.AUTO_SEED_PRODUCTS !== "false";
const autoSeedUsers = process.env.AUTO_SEED_USERS !== "false";

if (autoSeedProducts) {
  productService.seedProducts();
}

if (autoSeedUsers) {
  userService.seedMockUsers();
}

// ==================== API ROUTES ====================

// Mount routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Vibe Commerce API is running",
    timestamp: new Date().toISOString(),
  });
});

// Favicon handler - prevents 404 errors for favicon requests
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// ==================== ERROR HANDLING ====================

// 404 handler - must be after all routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log(`🚀 Server running in ${NODE_ENV.toUpperCase()} mode`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log("=".repeat(50) + "\n");
});
