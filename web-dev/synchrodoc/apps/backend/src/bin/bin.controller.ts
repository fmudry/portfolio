import {Request, Response} from "express";
import {documentRepository} from "../repositories/document/document.repository";
import {userRepository} from "../repositories/user/user.repository";
import {validate} from "../validationSchemas";
import {
    getDeletedDocumentsSchema,
    restoreDocumentSchema,
} from "./validationSchemas";
import {DeletedDocument} from "./types";

const getDeletedDocuments = async (req: Request, res: Response) => {
    const request = await validate(getDeletedDocumentsSchema, req, res);
    if (request === null) return;

    const userId = req.session.passport.user.id;
    const pagination = request.query;

    const result = await userRepository.getDeletedDocuments(userId, pagination);

    if (result.isOk) {
        const deletedDocuments: DeletedDocument[] = result.value.map((doc) => {
            return {
                id: doc.id,
                title: doc.title,
                deletedAt: doc.deleted_at,
            };
        });

        res.status(200).json({
            items: deletedDocuments,
            message: "All deleted documents fetched.",
        });
    } else {
        res.status(500).send("Unable to retrieve deleted documents.");
    }
};

const restoreDocument = async (req: Request, res: Response) => {
    const request = await validate(restoreDocumentSchema, req, res);

    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document");
            return;
        }
        if (doc.value.deleted_at === null) {
            res.status(400).send("Document is not deleted.");
        }
    } else {
        res.status(500).send("Unable to find specified document.");
        return;
    }

    const result = await documentRepository.undelete(doc.value.id);

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to restore document.");
    }
};

export const binController = {
    getDeletedDocuments,
    restoreDocument,
};
