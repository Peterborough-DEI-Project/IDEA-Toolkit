import React, { useState, useEffect } from 'react';
import {Home, Dashboard, Login, DEI, Blog, About, } from '../Pages/pages';
import { BrowserRouter as Router, Route, Outlet, Routes, Navigate } from 'react-router';
import { supabase } from '../../supabase';
import { Spinner } from 'flowbite-react';

const Routing = ({ session, setSession }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if(session){
                
            }
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
                <Route path="/home"element={<Home/>}/>
                <Route path="/login" element={session ? <Navigate to="/dashboard"/> : <Login/> }/>
                <Route path="/about"element={<About/>}/>
                <Route path="/dei"element={<DEI/>}/>
                <Route path="/blog"element={<Blog/>}/>

                <Route element={<ProtectedRoutes session={session}/>} path="/">
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Navigate to="/dashboard"/>} path="/*" />
                </Route>
            </Routes>
    );
};

const ProtectedRoutes = ({session}) => {
    if (!session) {
        return <Navigate to="/home" />;
    }
    return <Outlet />;
}
export default Routing;