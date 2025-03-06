import React, { useState } from 'react'
import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import homeBanner from '../assets/ptbo.jpg'
import { motion } from 'framer-motion'
import HomeNav from '../Components/HomeNav'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isResetMode, setIsResetMode] = useState(false)
    const { signInUser } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { session, error } = await signInUser(email, password); // Use your signIn function
    
        if (error) {
            setError(error.message || "Failed to sign in");
            setMessage({ type: 'failure', text: error.message || "Failed to sign in" });
            setLoading(false);
    
          // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
          setTimeout(() => {
            setError("");
            setMessage({ type: '', text: '' });
          }, 10000);
        } else {
          // Redirect or perform any necessary actions after successful sign-in
          setMessage({ type: 'success', text: 'Login successful!' });
          navigate("/dashboard");
        }
    
        if (session) {
          closeModal();
          setError(""); // Reset the error when there's a session
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

            {/* Login Form Container */}
            <div className="relative h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        Welcome Back
                    </h2>
                    
                    <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSignIn}
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
                        <div className="flex justify-center">
                            <button 
                                type="button"
                                className="text-indigo-300 hover:text-indigo-400 transition-colors duration-300 text-sm bg-transparent"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                className='w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 mt-4'
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner size="sm" light={true} />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                            {/* Display error message if any */}
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
                        </motion.div>
                        <p className="text-white text-center mt-4">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-indigo-300 hover:text-indigo-400 transition-colors duration-300">
                                Sign up
                            </a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Login