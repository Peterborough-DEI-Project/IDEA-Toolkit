import React from 'react';
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import aboutBanner from '../assets/ptbo.jpg'; // Replace with your about banner image

const About = ({ session }) => {
    const navigate = useNavigate();
    
    const stats = [
        { number: "200K+", label: "Residents" },
        { number: "1825", label: "Founded" },
        { number: "150+", label: "Local Businesses" },
        { number: "50+", label: "Annual Events" }
    ];

    const timeline = [
        {
            year: "1825",
            title: "City Foundation",
            description: "Peterborough was founded as a settlement for Irish immigrants."
        },
        {
            year: "1904",
            title: "Industrial Growth",
            description: "The city became a major manufacturing hub with the arrival of General Electric."
        },
        {
            year: "1964",
            title: "Educational Milestone",
            description: "Trent University was established, marking a new era of education."
        },
        {
            year: "2024",
            title: "Modern Innovation",
            description: "Leading the way in sustainable development and technology."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-full">
                <HomeNav session={session}/>
                <img 
                    src="https://thekawarthas.ca/wp-content/uploads/2019/04/Nature-Lovers-lift-lock-960x640.jpg"
                    alt="About Banner" 
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white px-4"
                >
                    <h1 className="text-7xl font-bold mb-6 text-center">Our Story</h1>
                    <p className="text-xl max-w-2xl text-center">Discover the rich history and vibrant community that makes Peterborough unique.</p>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-gradient-to-b from-blue-600 to-blue-800">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                                <p className="text-blue-200">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Our Journey Through Time
                    </motion.h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
                        
                        {/* Timeline items */}
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className={`flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} mb-16 relative`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                                    <h3 className="text-2xl font-bold text-blue-600 mb-2">{item.year}</h3>
                                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-20 bg-gray-50"
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8">Our Vision for Tomorrow</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Building a sustainable, inclusive, and prosperous community that celebrates its heritage while embracing innovation and growth.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Join Our Journey
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default About;