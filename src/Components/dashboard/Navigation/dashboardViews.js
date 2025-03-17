import {
  AssessmentOutlined,
  DashboardOutlined as DashboardIcon,
  PersonOutlined,
} from "@mui/icons-material";

import Assessments from "../Views/Assessments.jsx";
import Overview from "../Views/Overview.jsx";
import Profile from "../Views/Profile.jsx";

const dashboardViews = [
  {
    label: "Overview",
    icon: DashboardIcon,
    route: "/dashboard/overview",
    component: Overview,
  },
  {
    label: "Assessments",
    icon: AssessmentOutlined,
    route: "/dashboard/assessments",
    component: Assessments,
  },
  {
    label: "Profile",
    icon: PersonOutlined,
    route: "/dashboard/profile",
    component: Profile,
  },
];

export default dashboardViews;
