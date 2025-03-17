import React from "react";
import {
    Box,
    Drawer,
    Icon,
    ListItemIcon,
    ListItemText,
    MenuList,
    Toolbar,
} from "@mui/material";
import {Link,} from "react-router";
import dashboardViews from "./dashboardViews.js";
import logo2 from "../../../assets/logo2.svg";
import {useLocation} from "react-router";
import {Sidebar as FlowbiteSidebar} from "flowbite-react";
import {HiArrowSmRight} from "react-icons/hi";
import SidebarTheme from "../../Generic/Themes/SidebarTheme.js";

const theme=SidebarTheme({baseWidth: "w-[300px]"});

function Sidebar({activeWindow}) {
    const location = useLocation();
    return (
        <>
            <FlowbiteSidebar theme={theme} className="h-[100vh]  z-10 max-w-[300px]  px-5 border-r s "
            >
                <div className=" flex justify-start items-start h-16 p-1 mt-3" >
                    <img className="h-full " src={logo2} alt="logo"/>
                </div>
                <div className="mt-6">
                    <FlowbiteSidebar.Items>
                        <FlowbiteSidebar.ItemGroup>
                            <>
                                {dashboardViews.map((item, index) => (
                                    <FlowbiteSidebar.Item
                                        as={Link}
                                        to={item.route}
                                        active={location.pathname.startsWith(item.route)}
                                        key={item.route}
                                        icon={item.icon}
                                    >
                                        {item.label}
                                    </FlowbiteSidebar.Item>
                                ))}
                            </>
                        </FlowbiteSidebar.ItemGroup>
                    </FlowbiteSidebar.Items>
                </div>
            </FlowbiteSidebar>
        </>
    );
}

export default Sidebar;
