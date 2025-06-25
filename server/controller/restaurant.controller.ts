import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import cloudinary from "../utils/cloudinary";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.mode";

export const createReaturent = async (req: Request, res: Response) => {
  const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
  const file = req.file;
  const restaurant = await Restaurant.findOne({ uaer: req.id });
  if (restaurant) {
    return res.status(400).json({
      success: false,
      message: "Restaurant already exist for this user",
    });
  }
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }

  const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

  const newRestaurant = await new Restaurant({
    user: req.id,
    restaurantName,
    city,
    country,
    deliveryTime,
    cuisines: JSON.parse(cuisines),
    imageUrl,
  }).save();

  return res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    restaurant: newRestaurant,
  });
};

export const getReataurant = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.id }).populate(
    "menus"
  );
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      restaurant: [],
      message: "Restaurant not found",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Internal Server Error",
    restaurant,
  });
};

export const updateRestauran = async (req: Request, res: Response) => {
  const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
  const file = req.file;
  const restaurant = await Restaurant.findOne({ user: req.id });

  if (!restaurant) {
    return res.status(201).json({
      success: false,
      message: "Restaurant not found",
    });
  }
  let cuisinesArray: string[] = [];
  try {
    cuisinesArray =
      typeof cuisines === "string"
        ? JSON.parse(cuisines)
        : Array.isArray(cuisines)
        ? cuisines
        : [];
  } catch (error) {
    cuisinesArray = cuisines.split(","); // fallback if JSON.parse fails
  }

  restaurant.restaurantName = restaurantName;
  restaurant.city = city;
  restaurant.country = country;
  restaurant.deliveryTime = deliveryTime;
  restaurant.cuisines = cuisinesArray;
  if (file) {
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    restaurant.imageUrl = imageUrl;
  }

  await restaurant.save();

  return res.status(200).json({
    success: true,
    message: "Restaurant updated",
    restaurant,
  });
};

export const getRestaurantOrder = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.id });
  console.log(req.id)
  if (!restaurant) {
    return res.status(201).json({
      success: false,
      message: "Restaurant not found",
    });
  }

  const orders = await Order.find({ restaurant: restaurant._id })
    .populate("resturant")
    .populate("user");

  return res.status(200).json({
    success: true,
    orders,
  });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await Order.findById({ orderId });

  if (!order) {
    return res.status(201).json({
      success: false,
      message: "Order not found",
    });
  }

  order.status = status;
  order.save();

  return res.status(200).json({
    success: true,
    message: "status updated",
  });
  
};

export const searchRestaursnt = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
        const query: any = {};
      
        // console.log(searchQuery,selectedCuisines,searchText)
      
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }

        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        
        if(selectedCuisines.length > 0){
            query.cuisines = {$in:selectedCuisines}
        }
        
        const restaurants = await Restaurant.find(query);
        // console.log(restaurants)
        return res.status(200).json({
            success:true,
            data:restaurants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getSingleRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  const restaurant = await Restaurant.findById(restaurantId).populate({
    path: "menus",
    options: { createdAt: -1 },
  });

  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: "Restaurant not found",
    });
  }

  return res.status(200).json({
    success: true,
    restaurant,
  });
};
