import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Introduce un email válido").max(255),
  phone: z.string().trim().min(9, "Introduce un teléfono válido").max(30),
  serviceType: z.enum([
    "photos",
    "documents",
    "large_format",
    "binding",
    "stickers",
    "stationery",
    "other",
  ]),
  quantity: z.coerce.number().int().min(1, "La cantidad mínima es 1").max(10000),
  size: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Introduce un email válido").max(255),
  subject: z.string().trim().min(3, "El asunto es demasiado corto").max(200),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
