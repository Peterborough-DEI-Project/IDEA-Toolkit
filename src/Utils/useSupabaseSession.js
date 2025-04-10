import {useEffect} from "react";
import {supabase} from "../../supabase.js";

const useSupabaseSession = (setSession, setUser) => {
    useEffect(() => {
        const fetchSession = async () => {
            try {
                // Get the current session from Supabase
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                // Set session state
                setSession(session);


                // If session exists, fetch user details
                if (session) {
                    setUser(session.user);
                } else {
                    setUser(null); // No user logged in
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                setSession(null);
                setUser(null);
            }
        };

        fetchSession();

        // Listen for auth state changes (e.g., login, logout)
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                if (session) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
            }
        );

        // Cleanup listener on component unmount
        return () => {
            listener.subscription.unsubscribe();
        };
    }, [setSession, setUser]);
};

export default useSupabaseSession;