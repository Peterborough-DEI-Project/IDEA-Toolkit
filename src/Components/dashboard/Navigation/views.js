import {
    AssessmentOutlined,
    DashboardOutlined as DashboardIcon,
    PersonOutlined,
} from "@mui/icons-material";

import AdminAssessments from "../Views/Admin/Assessments/Assessments.jsx";
import AdminOverview from "../Views/Admin/Overview/Overview.jsx";
import AdminProfile from "../Views/Admin/Profile/Profile.jsx";

import EmployeeAssessments from '../Views/Employee/Assessments/Assessments.jsx'

const views = {
    adminViews:
        [
            {
                label: "Overview",
                icon: DashboardIcon,
                route: "/dashboard/overview",
                component: AdminOverview,
            },
            {
                label: "Assessments",
                icon:
                AssessmentOutlined,
                route:
                    "/dashboard/assessments",
                component:
                AdminAssessments,
            },
            {
                label: "Profile",
                icon:
                PersonOutlined,
                route:
                    "/dashboard/profile",
                component:
                AdminProfile,
            },
        ],
    employeeViews: [
        {
            label: "Assessments",
            icon: AssessmentOutlined,
            route: "/dashboard/assessments",
            component: EmployeeAssessments,
        },
        {
            label: "Profile",
            icon: PersonOutlined,
            route: "/dashboard/profile",
            component: AdminProfile,
        },
    ]

};


export default views;
