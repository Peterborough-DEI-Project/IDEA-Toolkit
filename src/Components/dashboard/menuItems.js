import {
  Menu as MenuIcon,
  Assessment,
  Dashboard as DashboardIcon,
  Person,
  School,
  ExitToApp,
} from "@mui/icons-material";

import Assessments from "./Main Views/Assessments.jsx";
import Overview from "./Main Views/Overview.jsx";
import Profile from "./Main Views/Profile.jsx";

const menuItems = [
  {
    label: "Overview",
    icon: DashboardIcon,
    route: "/dashboard/overview",
    component: Overview,
  },
  {
    label: "Assessments",
    icon: Assessment,
    route: "/dashboard/assessments",
    component: Assessments,
  },
  {
    label: "Profile",
    icon: Person,
    route: "/dashboard/profile",
    component: Profile,
  },
];

export default menuItems;
