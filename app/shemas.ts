import { z } from "zod";

export const email = z.string().email('Your email is not correct');
export const  password= z.string().min(8, 'The password is at least eight characters').max(20, 'The password is maximum of eight characters');