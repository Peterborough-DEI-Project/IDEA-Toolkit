import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Outlet, Routes, Navigate } from 'react-router';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import { supabase } from '../../supabase';
import { Spinner } from 'flowbite-react';

const Routing = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check the current session on component mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for authentication state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
            console.log(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <Spinner />;
    }
console.log(window.location.pathname);
    return (
        <Router>
            <Routes>
                <Route
                    path="/home"
                    element={<Home/>}
                />
                <Route path="/login" element={session ? <Navigate to="/dashboard"/> : <Login/> }
                />
                <Route element={<ProtectedRoutes session={session}/>} path="/">
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Navigate to="/dashboard"/>} path="/*" />
                </Route>
            </Routes>
        </Router>
    );
};

const ProtectedRoutes = ({session}) => {
    if (!session) {
        return <Navigate to="/home" />;
    }
    return <Outlet />;
}
export default Routing;