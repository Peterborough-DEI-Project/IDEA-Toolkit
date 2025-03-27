import React from "react";
import {Link,} from "react-router";
// TODO: Render based on user role
import views from "./views.js";
import logo2 from "../../../assets/logo2.svg";
import {useLocation} from "react-router";
import {Sidebar as FlowbiteSidebar} from "flowbite-react";
import SidebarTheme from "../../Generic/Themes/SidebarTheme.js";
import {signOut} from "../../../../supabase.js";
import Btn from "../../Generic/Btn.jsx";

const theme=SidebarTheme({baseWidth: "w-[300px]"});

function Sidebar({role, activeWindow}) {
    const location = useLocation();
    let myViews;
    if(role === 'admin'){
        myViews = views.adminViews;
    }
    else{
        myViews = views.employeeViews;
    }
    return (
        <>
            <FlowbiteSidebar theme={theme} className="h-[100vh]  z-10 max-w-[300px]  px-5 border-r s "
            >
                <div className=" flex justify-start items-start h-16 p-1 mt-3" >
                    <img className="h-full " src={logo2} alt="logo"/>
                </div>
                <div className="mt-6">
                    <FlowbiteSidebar.Items >
                        <FlowbiteSidebar.ItemGroup>
                            <>
                                {myViews.map((item, index) => (
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
                        <FlowbiteSidebar.ItemGroup className="w-full">
                            <FlowbiteSidebar.Item
                                className="w-full"
                                as={Btn}
                                variant="outline"
                                onClick={()=>{
                                signOut().then(()=>window.location.reload());

                            }}>
                                Sign Out
                            </FlowbiteSidebar.Item>
                        </FlowbiteSidebar.ItemGroup>

                    </FlowbiteSidebar.Items>

                </div>
            </FlowbiteSidebar>
        </>
    );
}

export default Sidebar;
