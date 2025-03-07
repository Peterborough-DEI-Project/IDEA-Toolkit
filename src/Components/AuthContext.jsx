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
    const signInUser = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password,
          });
    
          // Handle Supabase error explicitly
          if (error) {
            console.error("Sign-in error:", error.message); // Log the error for debugging
            return { success: false, error: error.message }; // Return the error
          }
    
          // If no error, return success
          console.log("Sign-in success:", data);
          return { success: true, data }; // Return the user data
        } catch (error) {
          // Handle unexpected issues
          console.error("Unexpected error during sign-in:", err.message);
          return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
          };
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


    // Google sign in
    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) {
                console.error("Google sign-in error:", error.message);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error("Unexpected error during Google sign-in:", error);
            return {
                success: false,
                error: "An unexpected error occurred during Google sign-in."
            };
        }
    };

    // Send password reset email
    const sendPasswordResetEmail = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                console.error("Password reset email error:", error.message);
                return { success: false, error };
            }
            return { success: true };
        } catch (error) {
            console.error("Exception during password reset email:", error);
            return { success: false, error };
        }
    };

    // Update password
    const updatePassword = async (newPassword) => {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                console.error("Password update error:", error.message);
                return { success: false, error };
            }
            return { success: true };
        } catch (error) {
            console.error("Exception during password update:", error);
            return { success: false, error };
        }
    };

    return(
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut, getLeaderboard, addTestScore, signInWithGoogle, sendPasswordResetEmail, updatePassword}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}