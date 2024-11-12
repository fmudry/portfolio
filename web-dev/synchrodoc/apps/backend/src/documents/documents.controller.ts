import {documentRepository} from "../repositories/document/document.repository";
import {Request, Response} from "express";
import {
    addDocumentTagSchema,
    addDocumentUrlSchema,
    changeShareSchema,
    createDocumentSchema,
    deleteDocumentSchema,
    deleteShareSchema,
    getDocumentSharesSchema,
    getDocumentTagsSchema,
    getDocumetsSchema,
    getSharedDocumentsSchema,
    removeDocumentTagSchema,
    renameDocumentSchema,
    shareDocumentSchema,
} from "./validationSchemas";
import {validate} from "../validationSchemas";
import {userRepository} from "../repositories/user/user.repository";
import {Document, DocumentShare, SharedDocument, TagId} from "./types";
import {Permissions, User} from "../repositories/user/types";
import {tagRepository} from "../repositories/tag/tag.repository";

const getUserDocuments = async (req: Request, res: Response) => {
    const request = await validate(getDocumetsSchema, req, res);
    if (request === null) return;

    const userId = req.session.passport.user.id;
    const pagination = request.query;

    const result = await userRepository.getOwnDocuments(userId, pagination);

    if (result.isOk) {
        const documents: Document[] = result.value.map((doc) => {
            return {
                id: doc.id,
                title: doc.title,
                automergeUrl: doc.automergeUrl,
                updatedAt: doc.updated_at,
                owner: doc.owner.name,
                tags: doc.tags.map((tags) => tags.tag),
            };
        });

        res.status(200).json({items: documents, message: "fetched user docs."});
    } else {
        console.log(result);
        res.status(500).send("Unable to get user's documents.");
        return;
    }
};

const getUserSharedDocuments = async (req: Request, res: Response) => {
    const request = await validate(getSharedDocumentsSchema, req, res);
    if (request === null) return;

    const userId = req.session.passport.user.id;
    const pagination = request.query;

    const result = await userRepository.getSharedDocuments(userId, pagination);

    if (result.isOk) {
        const sharedDocuments: SharedDocument[] = result.value.map((doc) => {
            return {
                id: doc.document_id,
                title: doc.document.title,
                owner: doc.document.owner.name,
                automergeUrl: doc.document.automergeUrl,
                permissions: doc.permissions,
                updatedAt: doc.document.updated_at,
                tags: doc.document.tags.map((tags) => tags.tag),
            };
        });

        res.status(200).json({
            items: sharedDocuments,
            message: "Fetch user shared documents.",
        });
    } else {
        res.send(500).send("Unable to get shared documents.");
        return;
    }
};

const createDocument = async (req: Request, res: Response) => {
    const request = await validate(createDocumentSchema, req, res);

    if (request === null) return;

    const ownerId = req.session.passport.user.id;
    const title = request.body.title;

    const result = await documentRepository.create({title, owner_id: ownerId});

    if (result.isOk) {
        const createdDocument: Document = {
            id: result.value.id,
            title: result.value.title,
            automergeUrl: result.value.automergeUrl,
            updatedAt: result.value.updated_at,
        };
        res.status(201).json({
            item: createdDocument,
            message: "Created document",
        });
    } else {
        res.status(500).send("Unable to create document.");
    }
};

const getDocumentShares = async (req: Request, res: Response) => {
    const request = await validate(getDocumentSharesSchema, req, res);
    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const result = await documentRepository.getShares(request.params.id, {});

    if (result.isOk) {
        const documentShares: DocumentShare[] = result.value.map((share) => {
            return {
                userEmail: share.user.name,
                permissions: share.permissions,
            };
        });

        res.status(200).json({
            items: documentShares,
            messge: "Fetched document shares.",
        });
    } else {
        res.status(500).send("Unable to retrieve document shares.");
    }
};

const deleteDocument = async (req: Request, res: Response) => {
    const request = await validate(deleteDocumentSchema, req, res);
    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const result = await documentRepository.delete(request.params.id);

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to delete document.");
    }
};

const renameDocument = async (req: Request, res: Response) => {
    const request = await validate(renameDocumentSchema, req, res);

    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const newTitle = request.body.newTitle;
    const id = request.params.id;

    const result = await documentRepository.update(id, {title: newTitle});

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to rename document.");
    }
};

const shareDocument = async (req: Request, res: Response) => {
    const request = await validate(shareDocumentSchema, req, res);

    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const user = await userRepository.getByEmail(request.body.shareWith);
    let user_: User;

    if (user.isOk) {
        if (user.value.id === req.session.passport.user.id) {
            res.status(403).send("Cannot share own document with yourself.");
            return;
        }
        user_ = user.value;
    } else {
        res.status(500).send("Specified user does not exist.");
        return;
    }

    const result = await documentRepository.addShare(
        request.params.id,
        user_.id,
        request.body.permissions as Permissions
    );

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to share document.");
    }
};

const changeShare = async (req: Request, res: Response) => {
    const request = await validate(changeShareSchema, req, res);

    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const user = await userRepository.getByEmail(request.body.shareWith);
    let user_: User;

    if (user.isOk) {
        if (user.value.id === req.session.passport.user.id) {
            res.status(403).send("Cannot share own document with yourself.");
            return;
        }
        user_ = user.value;
    } else {
        res.status(500).send("Specified user does not exist.");
        return;
    }

    const result = await documentRepository.addShare(
        request.params.id,
        user_.id,
        request.body.permissions as Permissions
    );

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to change shared document.");
    }
};

const deleteShare = async (req: Request, res: Response) => {
    const request = await validate(deleteShareSchema, req, res);

    if (request === null) return;

    const doc = await documentRepository.read(request.params.id);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    const user = await userRepository.getByEmail(request.body.shareWith);
    let user_: User;

    if (user.isOk) {
        if (user.value.id === req.session.passport.user.id) {
            res.status(403).send("Cannot un-share own document with yourself.");
            return;
        }
        user_ = user.value;
    } else {
        res.status(500).send("Specified user does not exist.");
        return;
    }

    const result = await documentRepository.removeShare(undefined, {
        document_id: request.params.id,
        user_id: user_.id,
    });

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to delete document.");
    }
};

const getDocumentTags = async (req: Request, res: Response) => {
    const request = await validate(getDocumentTagsSchema, req, res);
    if (request === null) return;

    const userId = req.session.passport.user.id;

    const result = await documentRepository.getTags(request.params.id, userId);

    if (result.isOk) {
        const tagIds: TagId[] = result.value.map((tag) => {
            return {
                id: tag.id,
                color: tag.color,
                name: tag.name,
            };
        });

        res.status(200).json({items: tagIds, messge: "Fetch doc tags"});
    } else {
        res.status(500).send("Unable to read document tags.");
    }
};

const addDocumentTag = async (req: Request, res: Response) => {
    const request = await validate(addDocumentTagSchema, req, res);
    if (request === null) return;

    const tagId = request.body.tagId;
    const docId = request.params.id;

    const doc = await documentRepository.read(docId);
    const tag = await tagRepository.read(tagId);
    const tags = await documentRepository.getTags(
        docId,
        req.session.passport.user.id
    );
    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    if (tag.isOk) {
        if (tag.value.owner_id !== req.session.passport.user.id) {
            res.status(403).send("Tag does not belong to the current user.");
            return;
        }
    } else {
        res.status(500).send("Unable to find specified tag.");
        return;
    }

    if (tags.isOk) {
        if (tags.value.find((x) => x.id === tagId) !== undefined) {
            res.status(403).send("Unable to add same tag twice.");
            return;
        }
    } else {
        res.status(500).send("Unable to retrieve document tags.");
    }

    const result = await documentRepository.addTag(
        docId,
        req.session.passport.user.id,
        tagId
    );

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to add tag to document.");
    }
};

const removeDocumentTag = async (req: Request, res: Response) => {
    const request = await validate(removeDocumentTagSchema, req, res);
    if (request === null) return;

    const tagId = request.body.tagId;
    const docId = request.params.id;

    const doc = await documentRepository.read(docId);
    const tag = await tagRepository.read(tagId);
    const tags = await documentRepository.getTags(
        docId,
        req.session.passport.user.id
    );
    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified document.");
        return;
    }

    if (tag.isOk) {
        if (tag.value.owner_id !== req.session.passport.user.id) {
            res.status(403).send("Tag does not belong to the current user.");
            return;
        }
    } else {
        res.status(500).send("Unable to find specified tag.");
        return;
    }

    if (tags.isOk) {
        if (tags.value.find((x) => x.id === tagId) === undefined) {
            res.status(403).send("Tag not found on document.");
            return;
        }
    } else {
        res.status(500).send("Unable to retrieve document tags.");
    }

    const result = await documentRepository.removeTag(null, {
        document_id: docId,
        user_id: req.session.passport.user.id,
        tag_id: tagId,
    });

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to remove document tag.");
    }
};

export const addDocumentUrl = async (req: Request, res: Response) => {
    const request = await validate(addDocumentUrlSchema, req, res);

    if (request === null) return;

    const docId = request.params.id;
    const url = request.body.automergeUrl;

    const doc = await documentRepository.read(docId);

    if (doc.isOk) {
        if (doc.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
        if (doc.value.automergeUrl !== null) {
            res.status(400).send("Document already has a URL.");
        }
    } else {
        res.status(500).send("Unable to retrieve specified document.");
    }

    const result = await documentRepository.addUrl(docId, url);

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500);
    }
};

export const documentController = {
    getUserDocuments,
    getUserSharedDocuments,
    getDocumentShares,
    createDocument,
    deleteDocument,
    renameDocument,
    shareDocument,
    changeShare,
    deleteShare,
    addDocumentTag,
    removeDocumentTag,
    getDocumentTags,
    addDocumentUrl,
};
