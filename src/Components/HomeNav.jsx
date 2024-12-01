import React from 'react';
import {Avatar, Dropdown, Navbar, Button} from 'flowbite-react';
import { NavLink } from 'react-router';
import { signOut } from '../../supabase';

const HomeNav = ({ session, setSession }) => {
    const [currentPage, setCurrentPage] = React.useState('');

    const handleSignOut = async () => {
        await signOut();
        setSession(null);
    };


    return (
        <Navbar >
            <Navbar fluid rounded>
                <NavLink to="/home">
                    Home
                </NavLink>
                <NavLink to="/About">
                About
                </NavLink>
                <NavLink to="/blog">
                Blog
                </NavLink>
                <NavLink to="/DEI">
                DEI
                </NavLink>
                {session ? (
                    <Button className="text-indigo-500" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                ) : (
                    <NavLink to="/login">
                        <Button className="text-indigo-500">Sign In</Button>
                    </NavLink>
                )}
            </Navbar>
        </Navbar>
    );
};

export default HomeNav;