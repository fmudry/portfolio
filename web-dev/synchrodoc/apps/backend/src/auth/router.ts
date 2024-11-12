import {Router} from "express";
import passport from "passport";
import {User} from "../repositories/user/types";
import {authController} from "./controller";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", passport.authenticate("local"), authController.login);

authRouter.get("/logout", passport.session(), (req, res, next) => {
    req.logout(
        {
            keepSessionInfo: false,
        },
        (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).end();
        }
    );
});

passport.serializeUser((user_, callback) => {
    process.nextTick(() => {
        const user = user_ as User;
        return callback(null, {
            id: user.id,
            name: user.name,
        });
    });
});

passport.deserializeUser((user, callback) => {
    process.nextTick(() => {
        return callback(null, user!);
    });
});
