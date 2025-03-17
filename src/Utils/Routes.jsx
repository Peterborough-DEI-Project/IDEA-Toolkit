import React, { useState, useEffect } from "react";
import {
  Home,
  Dashboard,
  Login,
  DEI,
  Blog,
  About,
  BlogEdit,
  Assessment,
} from "../Pages/pages";
import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
  Navigate,
} from "react-router";
import { supabase } from "../../supabase";
import { Spinner } from "flowbite-react";
import Assessments from "../Components/dashboard/Views/Assessments.jsx";
import Overview from "../Components/dashboard/Views/Overview.jsx";
import Profile from "../Components/dashboard/Views/Profile.jsx";
import AssessmentsTable from "../Components/dashboard/Views/Assessments/components/AssessmentsTable.jsx";
import Responses from "../Components/dashboard/Views/Assessments/components/Responses.jsx";
import FormDashboard from "../Components/FormBuilder/components/pages/FormDashboard.jsx";

const Routing = ({ session, setSession }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={session ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/dei" element={<DEI />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogedit" element={<BlogEdit />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route path="/dashboard/assessments" element={<Assessments />}>
          <Route
            path="/dashboard/assessments/edit/:id"
            element={<FormDashboard />}
          />
          <Route
            path="/dashboard/assessments/edit/new"
            element={<FormDashboard />}
          />
          <Route
            path="/dashboard/assessments/responses"
            element={<Responses />}
          />
          <Route path="/dashboard/assessments/" element={<AssessmentsTable />} />
        </Route>
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoutes session={session} />} path="/">
        <Route element={<Navigate to="/dashboard" />} path="/*" />
      </Route>
    </Routes>
  );
};

const ProtectedRoutes = ({ session }) => {
  if (!session) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};
export default Routing;
