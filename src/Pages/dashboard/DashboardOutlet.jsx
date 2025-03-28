import React from "react";
import { NotificationsNoneOutlined as Notifications, SpaceDashboardOutlined as DashboardIcon} from "@mui/icons-material";
import Sidebar from "../../Components/features/dashboard/Sidebar.jsx";
import {Outlet} from "react-router";
import {Button} from 'flowbite-react'

function DashboardOutlet({role}) {

    return (
        <div className="flex">
            <Sidebar role={role}/>
            <div className="flex flex-col h-16 w-full  bg-white ">
            <div className="fixed flex justify-between items-center min-h-16 max-h-16 border-b bg-white px-4 top-0 min-w-full">
                <Button className="flex flex-wrap text-black bg-white">
                    <DashboardIcon />
                </Button>
                <Button className="flex flex-wrap text-black bg-white">
                    <Notifications/>
                </Button>
            </div>
            <div
                className="w-full mt-16 relative">
                <Outlet/>
            </div>
            </div>
        </div>
    );
}

export default DashboardOutlet;
