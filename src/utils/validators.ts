import { z } from "zod";

export const menuId = z.object({
  menuId: z.number().positive(),
});
export const categoryId = z.object({
  categoryId: z.number().positive(),
});
export const restaurantId = z.object({
  restaurantId: z.number().positive(),
});
export const id = z.object({
  id: z.number().positive(),
});

export const categoryInput = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name cannot be longer than 30 characters"),
});
export const menuInput = z.object({
  availableTime: z
    .string()
    .trim()
    .max(20, "Available time cannot be longer than 20 characters"),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name cannot be longer than 30 characters"),
});
export const menuItemInput = z.object({
  description: z
    .string()
    .trim()
    .max(185, "Description cannot be longer than 185 characters"),
  imageBase64: z.string().optional(),
  imagePath: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name cannot be longer than 50 characters"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .max(12, "Price cannot be longer than 12 characters"),
});
export const restaurantInput = z.object({
  phone: z.union([
    z
      .string()
      .trim()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
        "Invalid contact number",
      ),
    z.literal(""),
  ]),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .max(75, "Location cannot be longer than 75 characters"),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(40, "Name cannot be longer than 40 characters"),
  email: z
    .string()
    .email("Invalid email")
    .trim()
    .min(1, "Email is required")
    .max(256, "Email cannot be longer than 256 characters"),
  isPublished: z.boolean().default(false).optional(),
});

export const bannerInput = z.object({
  imageBase64: z.string().min(1, "Image is required"),
  restaurantId: z.string().cuid(),
});
