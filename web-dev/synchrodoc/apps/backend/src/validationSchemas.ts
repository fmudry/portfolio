import {ZodSchema, ZodTypeDef, z} from "zod";
import {fromZodError} from "zod-validation-error";
import {Request, Response} from "express";

export const registerSchema = z.object({
    body: z
        .object({
            email: z.string().email("Not a valid email"),
            password: z
                .string()
                .min(8, {message: "Has to be at least 8 characters long"}),
            confirmPassword: z
                .string()
                .min(8, {message: "Has to be at least 8 characters long"}),
        })
        .refine(
            (schema) => {
                return schema.password === schema.confirmPassword;
            },
            {message: "Passwords do not match"}
        ),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Not a valid email."),
        password: z
            .string()
            .min(8, "All passwords have to be at least 8 characters long"),
    }),
});

export const paginationSchema = z.object({
    items: z.coerce.number().optional(),
    lastId: z.string().optional(),
});

export const validate = async <
    Out,
    Def extends ZodTypeDef = ZodTypeDef,
    Input = Out,
>(
    schema: ZodSchema<Out, Def, Input>,
    req: Request,
    res: Response
) => {
    const parsed = await schema.safeParseAsync(req);

    if (!parsed.success) {
        const error = fromZodError(parsed.error);
        res.status(400).send({
            name: "ValidationError",
            message: error.message,
            cause: error.details,
        });
        return null;
    }

    return parsed.data;
};
