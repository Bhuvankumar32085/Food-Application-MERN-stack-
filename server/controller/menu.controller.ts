import { Response, Request } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Multer } from "multer";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "image is required",
    });
  }
  const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
  const menu:any = await Menu.create({
    name,
    description,
    price,
    image: imageUrl,
  });

  const restaurant = await Restaurant.findOne({ user: req.id });
  if (restaurant) {
    (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
    await restaurant.save()
  }

  return res.status(201).json({
    success: true,
    message: "Menu added successfully",
    menu,
  });
};

export const editMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "image is required",
    });
  }
  const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(400).json({
      success: false,
      message: "Menu not found",
    });
  }

  if (name) menu.name = name;
  if (description) menu.description = description;
  if (price) menu.price = price;
  if (imageUrl) menu.image = imageUrl;

  await menu.save();

  return res.status(201).json({
    success: true,
    message: "Menu added successfully",
    menu,
  });
};
