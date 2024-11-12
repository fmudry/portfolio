import {Router} from "express";
import {documentController} from "./documents.controller";
import passport from "passport";
import {isAuthenticated} from "../auth/middleware";

export const documentRouter = Router();

documentRouter.get(
    "/",
    passport.session(),
    isAuthenticated,
    documentController.getUserDocuments
);

documentRouter.post(
    "/",
    passport.session(),
    isAuthenticated,
    documentController.createDocument
);

documentRouter.put(
    "/:id",
    passport.session(),
    isAuthenticated,
    documentController.renameDocument
);

documentRouter.delete(
    "/:id",
    passport.session(),
    isAuthenticated,
    documentController.deleteDocument
);

documentRouter.post(
    "/bind/:id",
    passport.session(),
    isAuthenticated,
    documentController.addDocumentUrl
);

documentRouter.get(
    "/shared",
    passport.session(),
    isAuthenticated,
    documentController.getUserSharedDocuments
);

documentRouter.get(
    "/share/:id",
    passport.session(),
    isAuthenticated,
    documentController.getDocumentShares
);

documentRouter.post(
    "/share/:id",
    passport.session(),
    isAuthenticated,
    documentController.shareDocument
);

documentRouter.put(
    "/share/:id",
    passport.session(),
    isAuthenticated,
    documentController.changeShare
);

documentRouter.delete(
    "/share/:id",
    passport.session(),
    isAuthenticated,
    documentController.deleteShare
);

documentRouter.get(
    "/tags/:id",
    passport.session(),
    isAuthenticated,
    documentController.getDocumentTags
);

documentRouter.post(
    "/tags/:id",
    passport.session(),
    isAuthenticated,
    documentController.addDocumentTag
);

documentRouter.delete(
    "/tags/:id",
    passport.session(),
    isAuthenticated,
    documentController.removeDocumentTag
);
