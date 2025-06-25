import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB'; 
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler';
// rounter
import userRoute from './route/user.route'
import menuRoutes from './route/menu.route'
import orderRoutes from './route/order.route'
import restaurantRoutes from './route/restaurant.route'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));


app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:'10mb'}))
app.use(express.json({ limit: '10mb' }));


//api
app.use('/api/v1/user',userRoute)
app.use("/api/v1/restaurant", restaurantRoutes);
app.use('/api/v1/menu',menuRoutes)
app.use('/api/v1/order',orderRoutes)


//Erroe Handler 
app.use(errorHandler);

const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer(); 
