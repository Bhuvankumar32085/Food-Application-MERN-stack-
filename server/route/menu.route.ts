import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import { isAuthenticated } from "../middlewares/isAuthenticates";
import { addMenu, editMenu } from "../controller/menu.controller";
import upload from "../middlewares/multer";
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("image"), asyncWrapper(addMenu));
router
  .route("/:id")
  .put(isAuthenticated, upload.single("image"), asyncWrapper(editMenu));
export default router;
