import express from "express";
import { createReaturent, getReataurant, getRestaurantOrder, getSingleRestaurant, searchRestaursnt, updateOrderStatus, updateRestauran } from "../controller/restaurant.controller";
import asyncWrapper from "../middlewares/asyncWrapper";
import multer from "multer";
import { isAuthenticated } from "../middlewares/isAuthenticates";
import upload from "../middlewares/multer";

const router = express.Router();

router
  .route("/")
  .post(
    isAuthenticated,
    upload.single("imageFile"),
    asyncWrapper(createReaturent)
  );
router
  .route("/")
  .get(
    isAuthenticated,
    asyncWrapper(getReataurant)
  );
router
  .route("/")
  .put(
    isAuthenticated,
    upload.single("imageFile"),
    asyncWrapper(updateRestauran)
  );
router
  .route("/order")
  .get(
    isAuthenticated,
    asyncWrapper(getRestaurantOrder)
  );
router
  .route("/order/:orderId/status")
  .put(
    isAuthenticated,
    asyncWrapper(updateOrderStatus)
  );
router
  .route("/search/:searchText")
  .get(
    isAuthenticated,
    asyncWrapper(searchRestaursnt)
  );
router
  .route("/:id")
  .get(
    isAuthenticated,
    asyncWrapper(getSingleRestaurant)
  );

export default router;
