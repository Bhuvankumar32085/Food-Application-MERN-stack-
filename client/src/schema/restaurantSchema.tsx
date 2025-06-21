import { z } from "zod";

export const restaurantFromSchema = z.object({
  restaurantName: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters")
    .nonempty({ message: " Restaurant name must be required" }),
  city: z.string().nonempty({ message: "City name must be required" }),
  country: z.string().nonempty({ message: "country name must be required" }),
  deliveryTime:z.number().min(0, {message:"Delivery time can not be negative"}),
  cuisines: z.array(z.string()),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size != 0, { message: "Image file is required" }),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFromSchema>;
