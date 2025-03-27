import React, {useEffect, useState} from "react";
import {About, Assessment, Blog, BlogEdit, Dashboard, DEI, Home, Login,} from "../Pages/pages";
import {Navigate, Outlet, Route, Routes,} from "react-router";
import {supabase} from "../../supabase";
import {Spinner} from "flowbite-react";
import Assessments from "../Components/dashboard/Views/Admin/Assessments/Assessments.jsx";
import Overview from "../Components/dashboard/Views/Admin/Overview/Overview.jsx";
import Profile from "../Components/dashboard/Views/Admin/Profile/Profile.jsx";
import AssessmentsTable from "../Components/dashboard/Views/Admin/Assessments/components/AssessmentsTable.jsx";
import Responses from "../Components/dashboard/Views/Admin/Assessments/components/Responses.jsx";
import FormDashboard from "../Components/FormBuilder/components/pages/FormDashboard.jsx";
import EmployeeAssessments from "../Components/dashboard/Views/Employee/Assessments/Assessments.jsx";
import EmployeeAssessmentsTable
  from "../Components/dashboard/Views/Employee/Assessments/components/AvailableAssessments.jsx";
import SubmitAssessment from "../Components/dashboard/Views/Employee/Assessments/utils/SubmitAssessment.jsx";
import views from "../Components/dashboard/Navigation/views.js";

const Routing = ({session, setSession}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      try {
        // Fetch session and set it
        const {
          data: {session: currentSession},
        } = await supabase.auth.getSession();
        setSession(currentSession);

        // Fetch user and role if session exists
        if (currentSession) {
          const {
            data: {user: currentUser},
          } = await supabase.auth.getUser();
          setUser(currentUser);

          const {data: roles, error} = await supabase
              .from("roles")
              .select("role")
              .eq("user_id", currentUser.id)
              .single();
          if (error) {
            // console.error("Error fetching user role:", error);
            setRole('employee')
          } else {
            setRole(roles.role);
          }
        }
      } catch (error) {
        console.error("Error fetching session, user, or role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndUser();

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        const {
          data: {user: updatedUser},
        } = await supabase.auth.getUser();
        setUser(updatedUser);

        const {data: roles, error} = await supabase
            .from("roles")
            .select("role")
            .eq("auth_id", updatedUser.id)
            .single();
        if (error) {
          console.error("Error fetching user role:", error);
        } else {
          setRole(roles.role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  if (loading) {
    return <Spinner/>;
  }
  return (
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route
            path="/login"
            element={session ? <Navigate to="/dashboard"/> : <Login/>}
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/dei" element={<DEI/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blogedit" element={<BlogEdit/>}/>
        <Route path="/assessment" element={<Assessment/>}/>

        {role === "admin" ? (
            <Route element={<ProtectedRoutes session={session}/>} path="/dashboard/">
              <Route path="/dashboard/" element={<Dashboard role={role} />}>

                  {
                    views.adminViews.map((view, index) => (
                        <Route key={view+index} path={view.route} component={view.component} />
                    ))
                  }
                  {/*<Route*/}
                  {/*    path="/dashboard/assessments/table"*/}
                  {/*    element={<AssessmentsTable/>}*/}
                  {/*/>*/}
                  {/*<Route*/}
                  {/*    path="/dashboard/assessments/responses"*/}
                  {/*    element={<Responses/>}*/}
                  {/*/>*/}

              </Route>
            </Route>
        ) : (
            <Route element={<ProtectedRoutes session={session}/>} path="/dashboard/">
              <Route path="/dashboard/" element={<Dashboard role={role} />}>
                  {
                    views.employeeViews.map((view, index) => (
                        <Route key={view+index} path={view.route} component={view.component} />
                    ))
                  }

              </Route>
            </Route>
        )}
      </Routes>
  );
};

const ProtectedRoutes = ({session}) => {
  if (!session) {
    return <Navigate to="/login"/>;
  }
  return <Outlet/>;
};
export default Routing;
