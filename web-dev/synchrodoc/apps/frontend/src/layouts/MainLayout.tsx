import HomeNavbar from "@/components/base/HomeNavbar/home-navbar";
import {Outlet} from "react-router-dom";

export function MainLayout() {
    return (
        <>
            <HomeNavbar />
            <Outlet />
        </>
    );
}

export default MainLayout;
