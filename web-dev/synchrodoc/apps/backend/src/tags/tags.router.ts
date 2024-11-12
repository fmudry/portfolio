import {Router} from "express";
import passport from "passport";
import {isAuthenticated} from "../auth/middleware";
import {tagController} from "./tags.controller";

export const tagRouter = Router();

tagRouter.get(
    "/",
    passport.session(),
    isAuthenticated,
    tagController.getUserTags
);

tagRouter.post(
    "/",
    passport.session(),
    isAuthenticated,
    tagController.createTag
);
tagRouter.put(
    "/:id",
    passport.session(),
    isAuthenticated,
    tagController.updateTag
);
tagRouter.delete(
    "/:id",
    passport.session(),
    isAuthenticated,
    tagController.deleteTag
);
