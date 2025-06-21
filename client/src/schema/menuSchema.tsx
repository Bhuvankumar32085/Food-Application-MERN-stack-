import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "name is require" }),
  description: z.string().nonempty({ message: "description is require" }),
  price: z.number().min(0, { message: "price can not be negative" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size != 0, { message: "Image file is required" }),
});

export type MenuSchema = z.infer<typeof menuSchema>;
