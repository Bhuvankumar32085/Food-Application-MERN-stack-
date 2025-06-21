// src/lib/userSchema.ts
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LogingType = z.infer<typeof loginSchema>;

// Signup Schema
export const signupSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  contact: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian contact number"),
});

export type SignupType = z.infer<typeof signupSchema>;
