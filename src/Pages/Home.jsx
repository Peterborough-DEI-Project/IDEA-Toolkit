import React from 'react';
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import banner from '../assets/ptbo.jpg';
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Reflection Process",
            description: "Interactive tools to help identify and address exclusion in workflows",
            icon: "🔍",
            color: "from-blue-500/10 to-blue-600/10",
            link: "/dei"
        },
        {
            title: "Assessment Tools",
            description: "Real-time feedback and evaluation of IDEA implementation",
            icon: "✅",
            color: "from-purple-500/10 to-purple-600/10",
            link: "/dei"
        },
        {
            title: "Annual Reporting",
            description: "Track and visualize your progress in embedding IDEA principles",
            icon: "📊",
            color: "from-indigo-500/10 to-indigo-600/10",
            link: "/dei"
        }
    ];

    const highlights = [
        {
            number: "100+",
            label: "Staff Members Engaged",
            description: "Join our growing community of IDEA champions"
        },
        {
            number: "3",
            label: "Pilot Areas",
            description: "Successfully implementing the Inclusion Framework"
        },
        {
            number: "6",
            label: "Key Work Areas",
            description: "Comprehensive approach to inclusion"
        }
    ];

    return (
        <div className="relative">
            <HomeNav />
            
            {/* Hero Section */}
            <div className="relative h-screen">
                <img 
                    src={banner}
                    alt="Banner" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white px-4"
                >
                    <h1 className="text-6xl font-bold mb-4 text-center">Welcome to Peterborough</h1>
                    <p className="text-xl mb-8 max-w-2xl text-center">Discover the heart of Ontario's Kawarthas - where nature meets culture in perfect harmony.</p>
                    <NavLink to='/About'>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                        >
                            Explore More
                        </motion.button>
                    </NavLink>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Key Features</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Tools and resources designed to make embedding IDEA principles intuitive and engaging
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                onClick={() => navigate(feature.link)}
                                className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl cursor-pointer group backdrop-blur-sm border border-gray-200/20 hover:border-gray-200/40 transition-all duration-300`}
                            >
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                                    {item.number}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                                <p className="text-gray-600">{item.description}</p>
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
                className="py-20 bg-gradient-to-r from-purple-600 to-blue-600"
            >
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Approach?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join us in creating a more inclusive, diverse, equitable, and accessible workplace.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/login')}
                        className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Get Started Today
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;