import React, {useEffect, useState} from "react";
import {About, __deleteme__Assessment, Blog, BlogEdit, DashboardOutlet, DEI, Home, Login,} from "../Pages/pages";
import {Navigate, Outlet, Route, Routes,} from "react-router";
import {supabase} from "../../supabase";
import {Spinner} from "flowbite-react";
import views from "../Components/features/dashboard/views.js";
import {AssessmentOutlined, DashboardOutlined as DashboardIcon, PersonOutlined} from "@mui/icons-material";
import AdminOverview from "../Pages/dashboard/dashboard-views/Admin/Overview/Overview.jsx";
import AdminAssessments from "../Pages/dashboard/dashboard-views/Admin/Assessments/Assessments.jsx";
import AdminProfile from "../Pages/dashboard/dashboard-views/Admin/Profile/Profile.jsx";
import EmployeeAssessments from "../Pages/dashboard/dashboard-views/Employee/Assessments/Assessments.jsx";
import FormBuilderDashboard from "../Components/features/form/form-builder/form-builder-views/FormBuilderDashboard.jsx";
import FormSubmitter from "../Components/features/form/form-consumer/form-consumer-views/FormSubmitter.jsx";
import SubmitAssessment from "../Pages/dashboard/dashboard-views/Employee/Assessments/utils/SubmitAssessment.jsx";


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
            <Route path="/assessment" element={<__deleteme__Assessment/>}/>
            {
                role === "admin" && (
                    <Route element={<DashboardOutlet role={role}/>} path="/dashboard/">
                        <Route path="/dashboard/overview" element={<AdminOverview/>}/>
                        <Route path="/dashboard/assessments/*" element={<AdminAssessments/>}/>
                        <Route path="/dashboard/assessments/edit/:id" element={<FormBuilderDashboard/>}/>
                        <Route path="/dashboard/profile" element={<AdminProfile/>}/>
                    </Route>)
            }

            {(role === "employee" || session && role !== "admin") && (
                <Route element={<DashboardOutlet role={role}/>} path="/dashboard/">
                    <Route path="/dashboard/overview/*" element={<AdminOverview/>}/>
                    <Route path="/dashboard/assessments/*" element={<EmployeeAssessments/>}/>
                    <Route path="/dashboard/assessments/submit/:id" element={<SubmitAssessment/>}/>
                    <Route path="/dashboard/profile/*" element={<AdminProfile/>}/>
                </Route>
            )}
            <Route path="/*" element={<Navigate to="/home"/>}/>
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
