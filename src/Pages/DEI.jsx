import React from 'react';
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import deiBanner from '../assets/DEI.jpg';

const DEI = ({ session }) => {
    const initiatives = [
        {
            title: "Inclusion",
            icon: "🤝",
            description: "Creating environments where everyone feels welcomed, valued, and empowered to fully participate in city services and programs."
        },
        {
            title: "Diversity",
            icon: "🌈",
            description: "Recognizing and celebrating the unique perspectives, experiences, and contributions of all community members."
        },
        {
            title: "Equity",
            icon: "⚖️",
            description: "Ensuring fair access to opportunities and resources while addressing systemic barriers."
        },
        {
            title: "Accessibility",
            icon: "♿",
            description: "Making city services and programs accessible to all residents, regardless of physical or cognitive abilities."
        }
    ];

    const frameworks = [
        {
            title: "Inclusion Framework",
            description: "Our comprehensive approach to embedding DEI in day-to-day operations",
            features: [
                "Three key outcomes",
                "Six areas of work",
                "Pilot implementation",
                "Staff engagement"
            ]
        },
        {
            title: "Assessment Tools",
            description: "Resources for evaluating and improving inclusivity",
            features: [
                "GDEIB benchmarks",
                "Equity Lens evaluation",
                "Framework assessment",
                "Progress tracking"
            ]
        },
        {
            title: "Staff Support",
            description: "Resources and guidance for implementing IDEA principles",
            features: [
                "DEI Advisory support",
                "Training programs",
                "Implementation guides",
                "Regular workshops"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-screen">
                <HomeNav session={session}/>
                <img 
                    src={deiBanner}
                    alt="DEI Banner" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-purple-600/50"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white px-4"
                >
                    <h1 className="text-6xl font-bold mb-6 text-center">Diversity, Equity & Inclusion</h1>
                    <p className="text-xl max-w-2xl text-center">
                        Building a stronger community through understanding, respect, and equal opportunity.
                    </p>
                </motion.div>
            </div>

            {/* Core Values Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {initiatives.map((initiative, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="text-6xl mb-4">{initiative.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 text-purple-800">{initiative.title}</h3>
                                <p className="text-gray-600">{initiative.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Framework Section */}
            <div className="py-20 bg-gradient-to-b from-purple-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Our Approach
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {frameworks.map((framework, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl shadow-lg"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-purple-800">{framework.title}</h3>
                                <p className="text-gray-600 mb-6">{framework.description}</p>
                                <ul className="space-y-3">
                                    {framework.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <span className="mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8">Join Our IDEA Journey</h2>
                    <p className="text-xl max-w-3xl mx-auto mb-12">
                        Help us create a more inclusive, diverse, equitable, and accessible Peterborough for everyone.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Get Started with IDEA
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default DEI;