import {Request, Response} from "express";
import {tagRepository} from "../repositories/tag/tag.repository";
import {userRepository} from "../repositories/user/user.repository";
import {Tag} from "./types";
import {validate} from "../validationSchemas";
import {
    createTagSchema,
    deleteTagSchema,
    updateTagSchema,
} from "./validationSchemas";

const getUserTags = async (req: Request, res: Response) => {
    const userId = req.session.passport.user.id;
    const result = await userRepository.getTags(userId);

    if (result.isOk) {
        const tags: Tag[] = result.value.map((tag) => {
            return {
                id: tag.id,
                name: tag.name,
                color: tag.color,
            };
        });
        res.status(200).json({tags});
    } else {
        res.status(500).send("Unable to retrieve tags.");
    }
};

const createTag = async (req: Request, res: Response) => {
    const request = await validate(createTagSchema, req, res);
    if (request === null) return;

    const userId = req.session.passport.user.id;

    const {name, color} = request.body;

    const result = await tagRepository.create({name, color, owner_id: userId});

    if (result.isOk) {
        const {name, id, color} = result.value;

        res.status(201).json({
            item: {name, id, color},
            message: "Tag created.",
        });
    } else {
        res.status(500).send("Unable to create new tag.");
    }
};

const updateTag = async (req: Request, res: Response) => {
    const request = await validate(updateTagSchema, req, res);
    if (request === null) return;

    const tag = await tagRepository.read(request.params.id);

    if (tag.isOk) {
        if (tag.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified tag.");
    }

    const {name, color} = request.body;

    const result = await tagRepository.update(request.params.id, {
        name,
        color,
    });

    if (result.isOk) {
        res.status(201).end();
    } else {
        res.status(500).send("Unable to update tag.");
    }
};

const deleteTag = async (req: Request, res: Response) => {
    const request = await validate(deleteTagSchema, req, res);
    if (request === null) return;

    const tag = await tagRepository.read(request.params.id);

    if (tag.isOk) {
        if (tag.value.owner_id !== req.session.passport.user.id) {
            res.status(401).send("No access to specified document.");
            return;
        }
    } else {
        res.send(500).send("Unable to find specified tag.");
    }

    const result = await tagRepository.delete(request.params.id);

    if (result.isOk) {
        res.status(200).end();
    } else {
        res.status(500).send("Unable to delete tag.");
    }
};

export const tagController = {
    getUserTags,
    createTag,
    updateTag,
    deleteTag,
};
