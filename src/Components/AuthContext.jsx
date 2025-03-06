import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(null);


    //sign up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            console.error("There was an error!", error);
            return {success: false, error};
        }
        return {success: true, data};
    };


    // sign in
    const signInUser = (email, password) => {
        try{
            const {data, error} = supabase.auth.signInWithPassword({
                email: email,
                password: password,
                options:{
                    emailRedirectTo: window.location.origin + "/dashboard",
                }
            });
            if (error){
                console.error("There was a sign in error!", error);
            }
            console.log("sing-in success!!!", data);
            return {success: true, data};
        }
        catch(error){
            console.error("There was an error!", error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


    //sign out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out:", error);
                return { success: false, error };
            }
            return { success: true };
        } catch (error) {
            console.error("Exception during sign out:", error);
            return { success: false, error };
        }
    }


    // leaderboard 
    // Function to get leaderboard data
    const getLeaderboard = async () => {
        try {
            const { data, error } = await supabase
                .from('test_scores')
                .select(`
                    id,
                    score,
                    test_name,
                    created_at,
                    user_id,
                    profiles:user_id(email)
                `)
                .order('score', { ascending: false })
                .limit(10);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    };

    // Function to add a test score for the current user
    const addTestScore = async (score, testName) => {
        try {
            if (!session?.user?.id) {
                throw new Error('User not authenticated');
            }
            
            const { data, error } = await supabase
                .from('test_scores')
                .insert([
                    {
                        user_id: session.user.id,
                        score: score,
                        test_name: testName
                    }
                ]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error adding test score:', error);
            return { success: false, error };
        }
    };

    return(
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut, getLeaderboard, addTestScore}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}