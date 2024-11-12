import {Router} from "express";
import passport from "passport";
import {isAuthenticated} from "../auth/middleware";
import {binController} from "./bin.controller";

export const binRouter = Router();

binRouter.get(
    "/",
    passport.session(),
    isAuthenticated,
    binController.getDeletedDocuments
);

binRouter.post(
    "/:id",
    passport.session(),
    isAuthenticated,
    binController.restoreDocument
);
