import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import About from "./Pages/About";
import DEI from "./Pages/DEI";
import Blog from "./Pages/Blog";
import Profile from "./Pages/Profile";
import BlogEdit from "./Pages/BlogEdit";
import Assessment from "./Pages/Assessment";
import VerifyEmail from "./Pages/VerifyEmail";
import Leaderboard from "./Pages/Leaderboard";
import ResetPassword from "./Pages/ResetPassword";
import { useAuth } from "./Components/AuthContext";

// We need to create a wrapper component that passes the session to the About component
const AboutWithSession = () => {
  const { session } = useAuth();
  return <About session={session} />;
};

// Adding wrapper components for DEI and Blog pages
const DEIWithSession = () => {
    const { session } = useAuth();
    return <DEI session={session} />;
};
  
const BlogWithSession = () => {
    const { session } = useAuth();
    return <Blog session={session} />;
};
  



export const router = createBrowserRouter(
[
  { path: "/", element: <App /> },
  { path: "/home", element: <App /> },
  { path: "/about", element: <AboutWithSession /> },
  { path: "/dei", element: <DEIWithSession /> },
  { path: "/blog", element: <BlogWithSession /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/dashboard", element:<PrivateRoute>  <Dashboard />{" "} </PrivateRoute> ,},
  { path: "/leaderboard", element: <PrivateRoute> <Leaderboard />{" "} </PrivateRoute> },
  { path: "/profile", element:<PrivateRoute> <Profile />{" "} </PrivateRoute>},
  { path: "/blog-edit", element:<PrivateRoute> <BlogEdit />{" "} </PrivateRoute>},
  { path: "/assessment", element:<PrivateRoute> <Assessment />{" "} </PrivateRoute>}
]

);