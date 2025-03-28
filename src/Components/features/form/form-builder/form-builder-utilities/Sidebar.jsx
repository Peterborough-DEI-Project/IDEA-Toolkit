
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {Sidebar as FlowbiteSidebar} from "flowbite-react";
import {Link} from "react-router";
import React from "react";
import SidebarTheme from "../../../../../shared/Themes/SidebarTheme.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FieldsEditor from "../../form-builder-views/form-editor/FormEditor.jsx";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import FormSubmitter from "../../../form-consumer/FormSubmitter.jsx";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ComingSoon from "../../../../../shared/Fallbacks/ComingSoon.jsx";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

const subViews = [
    {
        id: 0,
        label: "Editor",
        icon: EditOutlinedIcon,
        component: FieldsEditor,
    },
    {
        id: 1,
        label: "Preview",
        icon: WysiwygIcon,
        component: FormSubmitter,
    },
    {
        id: 2,
        label: "Rewards",
        icon: WorkspacePremiumOutlinedIcon,
        component: ComingSoon,
    },
    {
        id: 3,
        label: "Settings",
        icon: BuildOutlinedIcon,
        component: ComingSoon,
    },
];

Sidebar.propTypes = {
    activeView: PropTypes.number.isRequired,
    onNavigate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired,
};

const theme = SidebarTheme({baseWidth: "w-[300px]", centerItems: true});


function Sidebar({activeView, onNavigate, onSave, onPublish}) {
    return (

        <FlowbiteSidebar theme={theme} className="border-l z-10 p-6 h-[calc(100vh-64px)]  "
        >
            <FlowbiteSidebar.Items className="flex flex-col justify-between min-h-full ">
                <FlowbiteSidebar.ItemGroup>
                    <div className="flex flex-col gap-3 w-full">
                        {subViews.map((item) => (

                            <FlowbiteSidebar.Item
                                key={item.id}
                                as={Link}
                                to={item.route}
                                active={activeView === item.id}
                                onClick={() => onNavigate(item.id)}
                                icon={item.icon}

                            >
                                {item.label}
                            </FlowbiteSidebar.Item>
                        ))}
                    </div>
                </FlowbiteSidebar.ItemGroup>
                <FlowbiteSidebar.ItemGroup>
                    <FlowbiteSidebar.Item
                        className="cursor-pointer border"
                        active={false}
                        onClick={onSave}
                        icon={SaveIcon}>
                        Save
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                        className="cursor-pointer"
                        active={true}
                        onClick={onPublish}
                    >
                        Publish
                        <RocketLaunchIcon/>
                    </FlowbiteSidebar.Item>
                </FlowbiteSidebar.ItemGroup>

            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
}


export default Sidebar;
