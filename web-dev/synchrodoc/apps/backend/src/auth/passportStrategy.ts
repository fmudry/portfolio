import {Strategy as LocalStrategy} from "passport-local";
import {userRepository} from "../repositories/user/user.repository";
import argon2 from "argon2";

export const strategy = () =>
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            const user = await userRepository.getByEmail(email);

            if (user.isErr) {
                return done(user.error);
            }

            const value = user.unwrap();

            if (!value) {
                return done(null, false, {
                    message: "Incorrect email or password",
                });
            }

            const correctPassword = await argon2.verify(
                value.password,
                password
            );

            if (!correctPassword) {
                return done(null, false, {
                    message: "Incorrect email or password",
                });
            }

            return done(null, value);
        }
    );
