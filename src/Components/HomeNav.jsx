import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { NavLink } from 'react-router';
import { signOut } from '../../supabase';
import logo from '../assets/logo.svg';

const HomeNav = ({ session, setSession }) => {
    const [currentPage, setCurrentPage] = React.useState('');

    const handleSignOut = async () => {
        await signOut();
        setSession(null);
    };

    // Custom classes for NavLink - active and inactive states
    const getLinkClass = ({ isActive }) => {
        return isActive 
            ? "text-black bg-gray-300 rounded-full px-6 py-2 font-medium font-semibold text-lg"
            : "text-black hover:bg-white/10 rounded-full hover:text-blue-700 hover:scale-105 px-6 py-2 transition-colors duration-200 text-lg";
    };

    return (
        <Navbar className="absolute top-0 w-full z-10 bg-transparent py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo Section */}
                <NavLink to="/home" className="flex items-center">
                    <div className="text-white text-4xl font-light flex items-center">
                        {/* <span className="text-4xl mr-2">≈</span>
                        <span className="font-extralight tracking-wide">peterborough</span> */}
                        <img src={logo} alt="Logo" className="h-22" />
                    </div>
                </NavLink>

                {/* Navigation Links Container */}
                <div className="flex items-center gap-2 bg-white p-1 rounded-full">
                    <NavLink to="/home" className={getLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/About" className={getLinkClass}>
                        About
                    </NavLink>
                    <NavLink to="/DEI" className={getLinkClass}>
                        DEI
                    </NavLink>
                    <NavLink to="/blog" className={getLinkClass}>
                        Blog
                    </NavLink>
                    
                    {/* Login Button */}
                    {session ? (
                        <Button 
                            onClick={handleSignOut}
                            className="bg-blue-700 text-white hover:bg-blue-800 rounded-full px-6 py-1 font-semibold text-lg hover:scale-105"
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <NavLink to="/login">
                            <Button className="bg-blue-700 text-white hover:bg-blue-800 rounded-full px-6 py-1 font-bold text-lg hover:scale-105">
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