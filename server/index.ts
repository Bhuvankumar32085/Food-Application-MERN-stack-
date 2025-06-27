import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
// rounter
import userRoute from "./route/user.route";
import menuRoutes from "./route/menu.route";
import orderRoutes from "./route/order.route";
import restaurantRoutes from "./route/restaurant.route";
import { stripeWebhook } from "./controller/order.controller";
import asyncWrapper from "./middlewares/asyncWrapper";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();
console.log(__dirname)

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post(
  "/api/v1/order/webhook",
  express.raw({ type: "application/json" }),
  asyncWrapper(stripeWebhook)
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);

// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// app.get('/*', (_, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
// });


//Erroe Handler
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
