// @ts-check
import fs from "fs";
import express from "express";
import {WebSocketServer} from "ws";
import {Repo} from "@automerge/automerge-repo";
import {NodeWSServerAdapter} from "@automerge/automerge-repo-network-websocket";
import {NodeFSStorageAdapter} from "@automerge/automerge-repo-storage-nodefs";
import os from "os";

export class SyncServer {
    #socket: WebSocketServer;

    #server: ReturnType<import("express").Express["listen"]>;

    #readyResolvers: ((value: any) => void)[] = [];

    #isReady = false;

    #repo: Repo;

    constructor(app: any) {
        const dir = process.env.DATADIR;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        var hostname = os.hostname();

        this.#socket = new WebSocketServer({noServer: true});

        const PORT =
            process.env.BACKEND_PORT !== undefined
                ? parseInt(process.env.BACKEND_PORT)
                : 3030;
        app.use(express.static("public"));

        const config = {
            network: [new NodeWSServerAdapter(this.#socket)],
            storage: new NodeFSStorageAdapter(dir),
            /** @ts-ignore @type {(import("@automerge/automerge-repo").PeerId)}  */
            peerId: `storage-server-${hostname}` as PeerId,
            // Since this is a server, we don't share generously — meaning we only sync documents they already
            // know about and can ask for by ID.
            sharePolicy: async () => false,
        };
        this.#repo = new Repo(config);

        this.#server = app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
            this.#isReady = true;
            this.#readyResolvers.forEach((resolve) => resolve(true));
        });

        this.#server.on("upgrade", (request, socket, head) => {
            console.log("new connection");
            this.#socket.handleUpgrade(request, socket, head, (socket) => {
                this.#socket.emit("connection", socket, request);
            });
        });
    }

    async ready() {
        if (this.#isReady) {
            return true;
        }

        console.log("in ready");

        return new Promise((resolve) => {
            this.#readyResolvers.push(resolve);
        });
    }

    close() {
        this.#socket.close();
        this.#server.close();
    }
}
