import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Button, Label, TextInput } from 'flowbite-react';
import { motion } from 'framer-motion';
import homeBanner from '../assets/ptbo.jpg';
import HomeNav from '../Components/HomeNav';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Check if we have a hash fragment in the URL (from password reset email)
        const hash = window.location.hash;
        if (hash && hash.includes('type=recovery')) {
            // The recovery token is automatically handled by Supabase
            // We just need to show the password reset form
            console.log('Password reset flow detected');
        } else {
            // If no hash, user might have navigated here directly
            setMessage({ 
                type: 'failure', 
                text: 'Invalid password reset link. Please request a new one.' 
            });
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Reset message
        setMessage({ type: '', text: '' });
        
        // Validate passwords match
        if (password !== confirmPassword) {
            setMessage({ type: 'failure', text: 'Passwords do not match' });
            return;
        }
        
        // Validate password strength (at least 6 characters)
        if (password.length < 6) {
            setMessage({ type: 'failure', text: 'Password must be at least 6 characters long' });
            return;
        }
        
        setLoading(true);
        
        try {
            // Update the password
            const { error } = await supabase.auth.updateUser({
                password: password
            });
            
            if (error) {
                throw error;
            }
            
            setMessage({ 
                type: 'success', 
                text: 'Password updated successfully! Redirecting to login...' 
            });
            
            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage({ 
                type: 'failure', 
                text: error.message || 'Failed to reset password. Please try again.' 
            });
        } finally {
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

            {/* Reset Password Form Container */}
            <div className="relative h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
                    
                    <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <Label
                                htmlFor="password" 
                                value="New Password"
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
                                className='w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg py-2.5 mt-4'
                                type="submit"
                                disabled={loading}
                                isProcessing={loading}
                            >
                                Reset Password
                            </Button>
                        </motion.div>
                        
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
                                            ? 'bg-green-100/90 border-green-500 text-green-700'
                                            : 'bg-red-100/90 border-red-500 text-red-700'
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
    );
};

export default ResetPassword;