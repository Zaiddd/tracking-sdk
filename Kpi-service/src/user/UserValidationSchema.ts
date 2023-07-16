import {z} from "nestjs-zod/z";

export const UserValidationSchema = z.object({
    username: z.string({
        invalid_type_error: "You must provide a valid username",
        required_error: "Username is required"
    }).min(3, {"message": "Username must be at least 3 characters long"}),

    email: z.string({
        required_error: "The email is required"
    }).email(),

    password: z.string({
        required_error: "The password is required"
    })
        .min(6, {"message": "Password must be at least 6 characters long"})
        .max(50, {"message": "Password must be at most 50 characters long"}),
});
