import React from 'react';
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import aboutBanner from '../assets/ptbo.jpg'; // Replace with your about banner image
import inclusionImage from '../assets/inclusion.png';
const About = () => {
    

    const timeline = [
        {
            year: "2019",
            title: "Report CLSHR19-005",
            description: "The adoption of Report CLSHR19-005, which outlined the City’s initial steps toward DEI implementation."
        },
        {
            year: "2021",
            title: "Report CSD21-017",
            description: "Report CSD21-017, which provided an in-depth assessment of the City’s DEI efforts and proposed actionable recommendations."
        },
        {
            year: "Ongoing",
            title: "IntelliDEI",
            description: "Development of IntelliDEI to offer City staff an accessible, structured way to engage with IDEA principles in their roles."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-full">
                <HomeNav />
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
                    <h1 className="text-6xl font-bold mb-6 text-center">The City's DEI Journey</h1>
              
                </motion.div>
            </div>
            {/* Background Section */}
                        <div className="py-20">
                            <div className="container mx-auto px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                                >
                                    <h2 className="text-4xl font-bold mb-4">Some Background</h2>
                                    <p className="text-xl text-gray-600 w-full text-center mb-4">
                                   
                  
                <a href="https://en.ccunesco.ca/networks/coalition-of-inclusive-municipalities" target = "_blank" className="text-blue-500 hover:underline"> The Coalition of Inclusive Municipalities (Coalition) </a> is a network that brings municipalities together to improve policies against racism, discrimination, exclusion, and intolerance, to undertake initiatives to eliminate all forms of discrimination, and to build open and inclusive societies. </p>
            
            <p className="text-xl text-gray-600 w-full text-center mb-4"> On November 25, 2019, as per the recommendation outlined in <a href="https://pub-peterborough.escribemeetings.com/filestream.ashx?DocumentId=25998" target = "_blank" className="text-blue-500 hover:underline"> Report CLSHR19-005</a> , City Council unanimously endorsed the Declaration to join the Coalition. On December 9, 2019, Human Rights Day, Mayor Diane Therrien signed the Declaration on behalf of the City of Peterborough making it the 22nd municipality to join the Coalition. Further, on December 14, 2020, as per the recommendation outlined in <a href="https://pub-peterborough.escribemeetings.com/filestream.ashx?DocumentId=28075" target = "_blank" className="text-blue-500 hover:underline"> Report CSSS20-016 </a>, City Council approved that staff hire a DEI Officer using funds from the Community Development Program Reserve. The DEI Officer, now the DEI Advisor, was tasked with developing the City’s first DEI Plan, embedding a DEI lens in City operations, and supporting the City in advancing the Coalition’s Ten Common Commitments. 
                </p> 
                <p className="text-xl text-gray-600 w-full text-center mb-4">
            When a municipal council signs the declaration to join the Coalition, it endorses the Coalition’s Ten Common Commitments and agrees to develop a Plan of Action (DEI Plan), which once adopted, becomes integrated into the municipality’s visions, strategies, and policies. The Coalition’s Ten Common Commitments are structured around three areas of municipal responsibilities that see the municipality: as a guardian that respects public interest; as an organization that upholds human rights; and as a community that promotes diversity. 
            
            Collectively, the Commitments urge the municipality to drive action against racism and discrimination to build a more inclusive community. This means collaborating with, and empowering Indigenous and racialized communities to help the City work toward: becoming a more inclusive employer, service provider, and contractor; supporting the efforts of community partners, particularly in the policing service, labour market sector, housing, and education sector in challenging and dismantling systemic racism and discrimination; and developing initiatives that promote diversity and create equal opportunities. </p>
            <p className="text-xl text-gray-600 w-full text-center mb-4">
            The DEI Advisor provided an interim report to Council, <a href="https://pub-peterborough.escribemeetings.com/filestream.ashx?DocumentId=30294" target = "_blank" className="text-blue-500 hover:underline"> Report CSD21-017</a> with <a href="https://pub-peterborough.escribemeetings.com/filestream.ashx?DocumentId=30295" target = "_blank" className="text-blue-500 hover:underline"> Appendix A</a> , on December 6, 2021 with a framework for moving forward on the City DEI Plan. An update was provided to Council, Report CSD23-005, on March 13, 2023.
            
                                        </p>
                                </motion.div>
                            </div>
                        </div>
{/* The City's Inclusion Framework Section */}
<div className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl font-bold text-center mb-6">The City’s Inclusion Framework</h2>

                        {/* Image and Text Section */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            {/* Image on the left */}
                            <img 
                                src={inclusionImage} 
                                alt="Inclusion Framework" 
                                className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
                            />

                            {/* Text on the right */}
                            <div className="text-xl text-gray-600 md:w-2/3">
                                <p className="mb-4">
                                    The City’s Inclusion Framework is a tool developed by the DEI Advisor to support staff in using a DEI lens and measuring its impacts on their work.
                                </p>
                                <ul className="list-disc list-inside mb-4">
                                    <li>A flexible “container” for staff contributions.</li>
                                    <li>Short-term and long-term outcomes and actions.</li>
                                    <li>Built-in opportunities for reflection and self-awareness.</li>
                                    <li>A structure supporting collective reporting and accountability.</li>
                                </ul>
                                <p>
                                    The Framework is complemented by ongoing recommendations for resource allocation and succession planning. It allows staff to pace their work and engage meaningfully.
                                </p>
                            </div>
                        </div>
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
                        The City’s Commitment to DEI
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