import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Ingresá un email válido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Ingresá tu nombre")
      .max(60, "El nombre es demasiado largo"),
    email: z.email("Ingresá un email válido"),
    password: z
      .string()
      .min(8, "Usá al menos 8 caracteres")
      .max(128, "La contraseña es demasiado larga"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });