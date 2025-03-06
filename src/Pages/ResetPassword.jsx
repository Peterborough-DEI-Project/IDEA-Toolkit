import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { motion } from 'framer-motion';
import homeBanner from '../assets/ptbo.jpg';
import HomeNav from '../Components/HomeNav';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Get tokens from location state (passed from AuthCallback)
    const accessToken = location.state?.accessToken;
    const refreshToken = location.state?.refreshToken;

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
            // First set the session with the tokens
            if (accessToken && refreshToken) {
                await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });
            }
            
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
                text: error.message || 'An error occurred while resetting your password. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    }

    // If no tokens are available, show an error
    if (!accessToken || !refreshToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                    <Alert color="failure">
                        Invalid or expired reset link. Please request a new password reset.
                    </Alert>
                    <div className="mt-6 text-center">
                        <Button onClick={() => navigate('/login')}>
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>
        );
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
                    
                    {message.text && (
                        <Alert color={message.type} className="mb-4">
                            {message.text}
                        </Alert>
                    )}
                    
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
                                value="Confirm New Password"
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
                                Reset Password
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ResetPassword;