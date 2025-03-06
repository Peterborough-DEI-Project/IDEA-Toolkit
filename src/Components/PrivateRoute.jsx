import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

const PrivateRoute = ({children}) => {
    const { session } = useAuth();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Set a timeout to ensure the loader doesn't show indefinitely
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds max loading time
        
        // If session is defined, stop loading immediately
        if (session !== undefined) {
            setLoading(false);
            clearTimeout(timer);
        }
        
        return () => clearTimeout(timer);
    }, [session]);

    if(session === undefined && loading){
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-opacity-50 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-50 z-50">
                <div className="relative w-16 h-16 md:w-24 md:h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    return <>{session ? <>{children}</> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;