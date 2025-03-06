import React, { useState } from 'react';
import { Navbar, Button } from 'flowbite-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import logo from '../assets/logo.svg';

const HomeNav = ({ session }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Custom classes for NavLink - active and inactive states
    const getLinkClass = ({ isActive }) => {
        return isActive 
            ? "text-black bg-gray-300 rounded-full px-3 md:px-6 py-2 font-medium font-semibold text-base md:text-lg w-full md:w-auto text-center"
            : "text-black hover:bg-white/10 rounded-full hover:text-gray-800 hover:scale-105 px-3 md:px-6 py-2 text-base md:text-lg w-full md:w-auto text-center";
    };

    return (
        <Navbar className="absolute top-0 w-full z-10 bg-transparent py-3 md:py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Logo Section */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <NavLink to="/home" className="flex items-center">
                        <div className="text-white text-2xl md:text-4xl font-light flex items-center">
                            <img src={logo} alt="Logo" className="h-16 md:h-24" />
                        </div>
                    </NavLink>
                    
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white bg-white/10 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation Links Container */}
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-2 bg-white/90 p-3 md:p-2 rounded-[20px] md:rounded-full mt-4 md:mt-0 w-full md:w-auto`}>
                    <NavLink to="/home" className={getLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={getLinkClass}>
                        About
                    </NavLink>
                    <NavLink to="/DEI" className={getLinkClass}>
                        DEI
                    </NavLink>
                    <NavLink to="/blog" className={getLinkClass}>
                        Blog
                    </NavLink>
                    
                    {session && (
                        <>
                            <NavLink to="/dashboard" className={getLinkClass}>
                                Dashboard
                            </NavLink>
                        </>
                    )}
                    
                    {/* Login Button */}
                    {session ? (
                        <Button 
                            onClick={handleSignOut}
                            className="bg-blue-700 text-white hover:bg-blue-800 rounded-full px-3 md:px-6 py-1 font-semibold text-base md:text-lg hover:scale-105 w-full md:w-auto"
                        >
                            Log Out
                        </Button>
                    ) : (
                        <NavLink to="/login" className="w-full md:w-auto">
                            <Button className="bg-blue-700 text-white hover:bg-blue-800 rounded-full px-3 md:px-6 py-1 font-bold text-base md:text-lg hover:scale-105 w-full">
                                Login
                            </Button>
                        </NavLink>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

export default HomeNav;