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
    const { session, signUpNewUser } = useAuth();
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