import React, { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { signIn } from '../../supabase'
import homeBanner from '../assets/ptbo.jpg'
import { motion } from 'framer-motion'
import HomeNav from '../Components/HomeNav'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await signIn(email, password)
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

            {/* Login Form Container */}
            <div className="relative h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                    <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
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
                                onChange={e => setPassword(e.target.value)}
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
                            >
                                Sign In
                            </Button>
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