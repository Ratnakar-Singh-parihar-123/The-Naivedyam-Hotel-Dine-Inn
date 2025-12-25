import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

/* ==============================
   Database & Cloudinary
============================== */
connectDB();
connectCloudinary();

/* ==============================
   Middlewares (ORDER IMPORTANT)
============================== */

// ✅ CORS — allow both local & deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // local dev
      "https://resturant-app-peach.vercel.app", // production
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

/* ==============================
   Routes
============================== */
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

/* ==============================
   Server
============================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
