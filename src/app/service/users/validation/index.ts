import z from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email('Please enter the validate email'),
    address: z.object({
        st: z.string('Street is requried'),
        city: z.string('City is requried'),
        country: z.string('Country is requried'),
    }),
    skills: z.array(z.string()).optional()
});