import express from "express";
import cors from "cors";
import passport from "passport";
import {strategy} from "./auth/passportStrategy";
import session from "express-session";
import RedisStore from "connect-redis";
import {redisClient} from "./redisClient";
import {authRouter} from "./auth/router";
import {documentRouter} from "./documents/documents.router";
import {binRouter} from "./bin/bin.router";
import {tagRouter} from "./tags/tags.router";
import fs from "node:fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";
import {SyncServer} from "./sync-server";

const app = express();

const swaggerYaml = fs.readFileSync("./api-documentation/swagger.yml", "utf8");
const swaggerDocument = yaml.parse(swaggerYaml);
if (process.env.NODE_ENV !== "production") {
    app.use(
        "/api-documentation",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
    );
}
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(strategy());
app.use(
    session({
        secret: "I fucking hate javascript",
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false, httpOnly: true},
        store: new RedisStore({client: redisClient, prefix: "x-session:"}),
    })
);
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/bin", binRouter);
app.use("/documents", documentRouter);
app.use("/tags", tagRouter);

// default response
app.use((_req, res) => {
    res.status(404).send("Not found.");
});

new SyncServer(app);
