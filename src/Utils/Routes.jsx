import React, {useEffect, useState} from "react";
import {__deleteme__Assessment, Blog, BlogEdit, DashboardOutlet, DEI, Home, Login,} from "../Pages/pages";
import {Navigate, Outlet, Route, Routes,} from "react-router";
import {supabase} from "../../supabase";
import {Spinner} from "flowbite-react";
import views from "../Components/features/dashboard/views.js";
import PropTypes from "prop-types";
import useSupabaseSession from "./useSupabaseSession.js";
import FormSubmitter from "../Components/features/form/form-consumer/form-consumer-views/FormSubmitter.jsx";
import SubmitAssessment from "../Pages/dashboard/dashboard-views/Employee/Assessments/utils/SubmitAssessment.jsx";
import About from "../Pages/static-pages/About.jsx";



const Routing = ({session, setSession}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  useSupabaseSession(setSession, setUser);


  if (loading) {
    return <Spinner/>;
  }

  return (
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route
            path="/login"
            element={user ?  <Navigate to="/dashboard" /> : <Login/> }
        />
         <Route path="/about" element={<About/>}/>
        <Route path="/dei" element={<DEI/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blogedit" element={<BlogEdit/>}/>

        {role === "admin" ? (
            <Route element={<ProtectedRoutes user={user}/>} path="/dashboard/">
              <Route path="/dashboard/" element={<DashboardOutlet role={role} />}>
                  {
                    views.adminViews.map((view, index) => (
                        <Route key={view+index} path={view.route} element={<view.component/>} />
                    ))
                  }

              </Route>
            </Route>
        ) : (
            <Route element={<ProtectedRoutes user={user}/>} path="/dashboard/">
              <Route path="/dashboard/" element={<DashboardOutlet role={role} />}>
                  {
                    views.employeeViews.map((view, index) => (
                        <Route key={view+index} path={view.route} element={<view.component/>} />
                    ))
                  }
                  <Route path="/dashboard/assessments/submit/:id" element={<SubmitAssessment />} />
              </Route>
            </Route>
        )}
      </Routes>
  );
};

Routing.propTypes = {
  session: PropTypes.any,
  setSession: PropTypes.any,
};

const ProtectedRoutes = ({user}) => {
  if (!user) {
    return <Navigate to="/login"/>;
  }
  return <Outlet/>;
};



export default Routing;