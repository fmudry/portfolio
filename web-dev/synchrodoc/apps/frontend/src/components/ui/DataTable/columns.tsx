import {ColumnDef} from "@tanstack/react-table";

import Actions from "./actions";
import TagsCell from "./Cells/Tags/tags-cell";

import {format} from "date-fns";
import {truncateString} from "../../utils";
import Cell from "./Cells/Cell/cell";
import Header from "./Headers/Header/header";
import {Document, DocumentDeleted, SharedDocument} from "@/models/document";
import {Link} from "react-router-dom";

const docsHomeColumns: ColumnDef<Document>[] = [
    {
        accessorKey: "title",
        header: () => (
            <Header disappearing={false} translation={"docs-table.title"} />
        ),
        cell: ({row}) => {
            console.log(row.original);
            return (
                <Link
                    to="/editor"
                    state={{
                        documentId: row.original.id,
                        automergeUrl: row.original.automergeUrl,
                    }}
                >
                    <Cell
                        disappearing={false}
                        value={truncateString(row.getValue("title"), 40)}
                        title={row.getValue("title")}
                        documentId={row.original.id}
                        automergeUrl={
                            row.original.automergeUrl
                                ? row.original.automergeUrl
                                : undefined
                        }
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "owner",
        header: () => (
            <Header disappearing={true} translation={"docs-table.owner"} />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={truncateString(row.getValue("owner"))}
                    title={row.getValue("owner")}
                />
            );
        },
    },
    {
        accessorKey: "updated-at",
        header: () => (
            <Header disappearing={true} translation={"docs-table.updated-at"} />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={
                        row.original.updatedAt
                            ? format(row.original.updatedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                    title={
                        row.original.updatedAt
                            ? format(row.original.updatedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                />
            );
        },
    },
    {
        accessorKey: "tags",
        header: () => (
            <Header disappearing={true} translation={"docs-table.tags"} />
        ),
        cell: ({row}) => {
            return <TagsCell tags={row.getValue("tags")} />;
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const id = row.original.id;
            const tags = row.original.tags;

            return <Actions tags={tags} documentId={id} />;
        },
    },
];

const docsSharedColumns: ColumnDef<SharedDocument>[] = [
    {
        accessorKey: "title",
        header: () => (
            <Header disappearing={false} translation={"docs-table.title"} />
        ),
        cell: ({row}) => {
            return (
                <Link
                    to="/editor"
                    state={{
                        documentId: row.original.id,
                        automergeUrl: row.original.automergeUrl,
                    }}
                >
                    <Cell
                        disappearing={false}
                        value={truncateString(row.getValue("title"), 40)}
                        title={row.getValue("title")}
                        documentId={row.original.id}
                        automergeUrl={
                            row.original.automergeUrl
                                ? row.original.automergeUrl
                                : undefined
                        }
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "owner",
        header: () => (
            <Header disappearing={true} translation={"docs-table.owner"} />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={truncateString(row.getValue("owner"))}
                    title={row.getValue("owner")}
                />
            );
        },
    },
    {
        accessorKey: "updated-at",
        header: () => (
            <Header disappearing={true} translation={"docs-table.updated-at"} />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={
                        row.original.updatedAt
                            ? format(row.original.updatedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                    title={
                        row.original.updatedAt
                            ? format(row.original.updatedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                />
            );
        },
    },
    {
        accessorKey: "permissions",
        header: () => (
            <Header
                disappearing={true}
                translation={"docs-table.permissions"}
            />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={row.original.permissions}
                    title={row.getValue("permissions")}
                />
            );
        },
    },
    {
        accessorKey: "tags",
        header: () => (
            <Header disappearing={true} translation={"docs-table.tags"} />
        ),
        cell: ({row}) => {
            return <TagsCell tags={row.getValue("tags")} />;
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const id = row.original.id;
            const tags = row.original.tags;

            return <Actions tags={tags} documentId={id} />;
        },
    },
];

const docsBinColumns: ColumnDef<DocumentDeleted>[] = [
    {
        accessorKey: "title",
        header: () => (
            <Header disappearing={false} translation={"docs-table.title"} />
        ),
        cell: ({row}) => {
            console.log(row.original);
            return (
                <Cell
                    disappearing={false}
                    value={truncateString(row.getValue("title"), 40)}
                    title={row.getValue("title")}
                />
            );
        },
    },
    {
        accessorKey: "deletedAt",
        header: () => (
            <Header disappearing={true} translation={"docs-table.deleted-at"} />
        ),
        cell: ({row}) => {
            return (
                <Cell
                    disappearing={true}
                    value={
                        row.original.deletedAt
                            ? format(row.original.deletedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                    title={
                        row.original.deletedAt
                            ? format(row.original.deletedAt, "dd.MM.yyyy HH:mm")
                            : "-"
                    }
                />
            );
        },
    },
];

export const columns = {
    docsHomeColumns,
    docsSharedColumns,
    docsBinColumns,
};
