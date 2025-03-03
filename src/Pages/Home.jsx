import React from 'react';
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import banner from '../assets/ptbo.jpg';
import { NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import { useState } from "react";


const Home = () => {
    const navigate = useNavigate();
    const [openStep, setOpenStep] = useState(null);


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
    <h1 className="text-6xl font-bold mb-4 text-center">Welcome to IntelliDEI</h1>
    <p className="text-xl mb-8 max-w-2xl text-center">
    A tool designed to help City staff apply DEI principles effectively and meaningfully in their work.
    </p>
    <NavLink to='/About'>
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
        >
            Learn More
        </motion.button>
    </NavLink>
</motion.div>

            </div>

            

            {/* What is DEI and IIDEA Section */}
            <div className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">What is DEI and IIDEA?</h2>
                        <p className="text-xl text-gray-600 w-full text-center mb-4">
                        DEI is the acronym for Diversity, Equity, and Inclusion. IIDEA is a similar (but shuffled) acronym that incorporates Indigeneity and Accessibility. At the City of Peterborough, DEI, Accessibility, and Indigenous Relations are areas of work that are each given the respect and attention needed through their respective City Advisors. Together, the three Advisors work as the IIDEA Team to support City staff in applying a wider inclusion lens to their work. </p>
                        <p className="text-xl text-gray-600 w-full text-center mb-4">
Diversity is the presence of difference within a given setting. Differences can arise in our appearances, thoughts, likes and dislikes, values, and identities. Diversity may also relate to social categories such as relate to gender, race, ethnicity, religion, nationality, education, marital status, sexual orientation, ability, and socioeconomic status, to name a few.
While equality means sameness, equity means fairness – fair treatment, fair access, fair opportunity and fair advancement for all people. Equity is an approach that ensures everyone is supported in their personal and professional development. Unlike equality, equity does not aim to treat all individuals in the exact same way. Instead, equity recognizes that advantages and barriers exist, and that as a result, different people have different needs. Equity is therefore about ensuring that people have equal access to resources and benefits despite their individual circumstances.</p>
<p className="text-xl text-gray-600 w-full text-center mb-4">
Inclusion is the act of creating environments where people feel like they can bring their authentic selves. It means everyone feels valued, respected, and appreciated for their unique identities, even when they’re different from others. Inclusion outcomes are met when you, your institution, your policies and programs are truly inviting to all. And extends to the degree in which diverse individuals are able to participate in decision-making processes and development opportunities.
It is important to remember that Inclusion is not a natural consequence of diversity and that equity issues can often be invisible until we intentionally do the work to address them.

                        </p>
                    </motion.div>
                </div>
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

          {/* About the Tool Section */}
<div className="py-20">
    <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl font-bold mb-4">About the Tool</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                This tool is designed to help City staff apply a Diversity, Equity, and Inclusion (DEI) lens to their work. It provides structured guidance, reflective prompts, and reporting capabilities to enhance inclusive decision-making.
            </p>
            
            {/* Step-by-Step Interactive Process */}
            <div className="mt-10 max-w-2xl mx-auto text-left text-x1">
                {[
                    {
                        step: "1️⃣ Log In & Explore Modules",
                        details: "Access DEI learning modules designed for different municipal roles. Get personalized content based on department and job function."
                    },
                    {
                        step: "2️⃣ Engage with Reflection Prompts & Activities",
                        details: "Answer scenario-based prompts to think critically about DEI in daily tasks. Participate in exercises that challenge biases and encourage inclusivity."
                    },
                    {
                        step: "3️⃣ Track Progress & Generate Reports",
                        details: "Get insights on individual and departmental DEI engagement. Use data-driven reports to inform policies and decision-making."
                    },
                    {
                        step: "4️⃣ Apply Learnings in Real-World Contexts",
                        details: "Implement DEI best practices in municipal services, planning, and community engagement. Use IntelliDEI as a reference tool for projects and initiatives."
                    }
                ].map((item, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="border-b border-gray-300 py-4"
                    >
                        <button 
                            className="w-full text-left font-semibold text-lg text-blue-600 focus:outline-none text-x1" 
                            onClick={() => setOpenStep(openStep === index ? null : index)}
                        >
                            {item.step}
                        </button>
                        {openStep === index && (
                            <p className="text-2x1 mt-2">{item.details}</p>
                        )}
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-10 flex justify-center">
                <NavLink to='/Login'>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                    >
                        IntelliDEI
                    </motion.button>
                </NavLink>
            </div>
        </motion.div>
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
                                <h3 className="text-xl font-semibold text-gray-700">{item.label}</h3>
                                <p className="text-lg text-gray-500">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
