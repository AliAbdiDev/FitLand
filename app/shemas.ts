import { z } from "zod";
const fileSchema = z.custom((val) => val instanceof File, {
  message: 'Invalid Avatar file',
});

export const email = z.string().email('Your email is not correct');
export const  password= z.string().min(8, 'The password is at least eight characters').max(20, 'The password is maximum of eight characters');
export const avatar = z.union([
  z.string().url({ message: "Invalid Avatar url" }).optional(),
  fileSchema.optional(),
])