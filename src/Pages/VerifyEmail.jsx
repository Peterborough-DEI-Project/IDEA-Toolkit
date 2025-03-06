import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeBanner from '../assets/ptbo.jpg';
import HomeNav from '../Components/HomeNav';

const VerifyEmail = () => {
    const location = useLocation();
    const email = location.state?.email || "your email";

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

            {/* Verification Message Container */}
            <div className="relative h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <div className="text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Verify Your Email</h2>
                        <p className="text-white/90 mb-6">
                            We've sent a verification link to <span className="font-semibold">{email}</span>. 
                            Please check your inbox and click the link to verify your account.
                        </p>
                        <div className="mt-8 space-y-4">
                            <p className="text-white/80 text-sm">
                                Didn't receive the email? Check your spam folder or try again in a few minutes.
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <a href="/login" className="text-indigo-300 hover:text-indigo-400 transition-colors duration-300">
                                    Return to login
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VerifyEmail;