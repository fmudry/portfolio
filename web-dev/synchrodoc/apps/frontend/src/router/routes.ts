import {RouteObject} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import MainLayout from "@/layouts/MainLayout";
import {lazy} from "react";

const SignInPage = lazy(() => import("../pages/SignInPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DocsPage = lazy(() => import("../pages/DocsPageHome"));
const DocsPageShared = lazy(() => import("../pages/DocsPageShared"));
const DocsPageBin = lazy(() => import("../pages/DocsPageBin"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicy"));
const EditorPage = lazy(() => import("../pages/EditorPage"));

const MainLayoutRoutes: RouteObject[] = [
    {
        index: true,
        Component: HomePage,
    },
    {
        path: "sign-in",
        Component: SignInPage,
    },
    {
        path: "register",
        Component: RegisterPage,
    },
    {
        path: "docs",
        Component: DocsPage,
    },
    {
        path: "docs-shared",
        Component: DocsPageShared,
    },
    {
        path: "docs-bin",
        Component: DocsPageBin,
    },
    {
        path: "privacy-policy",
        Component: PrivacyPolicyPage,
    },
    {
        path: "editor",
        Component: EditorPage,
    },
];

const routes: RouteObject[] = [
    {
        path: "/",
        Component: MainLayout,
        children: MainLayoutRoutes,
    },
    {
        path: "*",
        Component: NotFound,
    },
];

export default routes;
