import React, { useState } from 'react'
import { Button, Label, TextInput, Alert } from 'flowbite-react'
import homeBanner from '../assets/ptbo.jpg'
import { motion } from 'framer-motion'
import HomeNav from '../Components/HomeNav'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/AuthContext'

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const { session, signUpNewUser, signInWithGoogle } = useAuth();
    console.log(session);
    console.log(email, password);

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signUpNewUser(email, password);

            if(result.success){
                navigate('/verify-email', {state: {email}});
            }
        } catch(err){
            setError("an error occured");
        } finally{
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { success, error } = await signInWithGoogle();
            
            if (!success) {
                throw error;
            }
            // Successful sign-in will automatically redirect through Supabase OAuth flow
        } catch (err) {
            setError("Failed to sign in with Google");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <img 
                src={homeBanner}
                alt="Background"
                className="absolute w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            <HomeNav />

            {/* SignUp Form Container */}
            <div className="relative h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
                    <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSignUp}
                    >
                        <div>
                            <Label
                                htmlFor="email" 
                                value="Email Address"
                                className="text-white mb-2 block"
                            />
                            <TextInput
                                id="email" 
                                type="email" 
                                placeholder="name@company.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label 
                                htmlFor="password" 
                                value="Password"
                                className="text-white mb-2 block"
                            />
                            <TextInput
                                id="password" 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label 
                                htmlFor="confirmPassword" 
                                value="Confirm Password"
                                className="text-white mb-2 block"
                            />
                            <TextInput
                                id="confirmPassword" 
                                type="password" 
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                className='w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 mt-4'
                                type="submit"
                                disabled={loading}
                                isProcessing={loading}
                            >
                                Sign Up
                            </Button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </motion.div>

                        {/* Add Google Sign In Button */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300/30"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 py-1 text-white bg-black/20 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="button"
                                className="w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                            >
                                <svg className="w-5 h-5 mx-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </Button>
                        </motion.div>

                        <p className="text-white text-center mt-4">
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-300 hover:text-indigo-400 transition-colors duration-300">
                                Sign in
                            </a>
                        </p>
                        {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                    className="mt-4"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className={`p-4 rounded-lg shadow-lg border-l-4 ${
                                            message.type === 'success' 
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'bg-red-100 border-red-500 text-red-700'
                                        } flex items-center space-x-3`}
                                    >
                                        {message.type === 'success' ? (
                                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                        <span className="font-medium">{message.text}</span>
                                    </motion.div>
                                </motion.div>
                            )}
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default SignUp