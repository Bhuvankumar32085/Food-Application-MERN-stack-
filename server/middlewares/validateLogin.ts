import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.format(),
    });
    return; 
  }
  next(); //If validation passed
};
