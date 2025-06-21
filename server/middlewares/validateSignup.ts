import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const signupSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  contact: z.number()
});

export type SignupInput = z.infer<typeof signupSchema>;

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors });
  }
};
