import React from "react";
import { Box } from "@mui/material";
import Sidebar from "@/Component/Common/Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children, setTheme }) => {
    const router = useRouter();
    const hideLayoutRoutes = ["/login", "/signup"];

    if (hideLayoutRoutes.includes(router.pathname)) {
        return <>{children}</>;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar setTheme={setTheme} />
            <Box component="main" sx={{ flexGrow: 1, px: 3, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
