import {Tag, Document} from "@/types/src/index";

const tags1: Tag[] = [
    {
        id: "uuid1",
        name: "work",
        color: "blue",
    },
    {
        id: "uuid2",
        name: "schoolaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        color: "orange",
    },
    {
        id: "uuid5",
        name: "kitchen",
        color: "black",
    },
];

const tags2: Tag[] = [
    {
        id: "uuid3",
        name: "club",
        color: "yellow",
    },
    {
        id: "uuid4",
        name: "mentoring",
        color: "blue",
    },
];

export const docsData: Document[] = [
    {
        id: "uuid-lol",
        title: "Some title 1",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Some title 2",
        owner: "marian@kotleba.deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
    {
        id: "uuid-lol",
        title: "Some title 1",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Tralalala",
        owner: "maros@gmail.sk",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Maros",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Juraj",
        owner: "peter@gmail.de",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
    {
        id: "uuid-lol",
        title: "Some long title that wont fit lol",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Nie",
        owner: "Nie",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
    {
        id: "uuid-lol",
        title: "No title",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Some title 15",
        owner: "gulas@long-email-address-wont-fit.cz",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
    {
        id: "uuid-lol",
        title: "Muka na pekaci",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Mam rad jablko",
        owner: "jablko@gmail.le",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
    {
        id: "uuid-lol",
        title: "Poliefka - film",
        owner: "Me",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags1,
    },
    {
        id: "uuid-lol",
        title: "Some secret script lol",
        owner: "secret@secret.sk",
        updatedAt: new Date("2024-06-14T12:00:00Z"),
        tags: tags2,
    },
];
