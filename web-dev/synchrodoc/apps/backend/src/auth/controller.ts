import {Request, Response} from "express";
import {userRepository} from "../repositories/user/user.repository";
import {registerSchema, validate} from "../validationSchemas";
import argon2 from "argon2";
import {UniqueDuplicateError} from "../errors";

const login = async (req: Request, res: Response) => {
    res.status(200).json(req.session.passport.user);
};

const register = async (req: Request, res: Response) => {
    const validatedRequest = await validate(registerSchema, req, res);

    if (validatedRequest === null) return;

    const {email, password} = validatedRequest.body;

    const password_ = await argon2.hash(password);

    const result = await userRepository.create({
        email,
        password: password_,
        name: email,
    });

    if (result.isErr) {
        if (result.error instanceof UniqueDuplicateError) {
            res.status(409).send("Email already exists");
        } else {
            res.status(500).end();
        }
        return;
    }

    return res.status(201).end();
};

export const authController = {
    login,
    register,
};
