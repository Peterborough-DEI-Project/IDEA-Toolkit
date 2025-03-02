import React from 'react';
import { Link } from 'react-router';
import {Avatar, Dropdown, Navbar} from 'flowbite-react';
import { Navigate } from 'react-router';

const HomeNav = () => {
    const [currentPage, setCurrentPage] = React.useState('');

    React.useEffect(() => {
        setCurrentPage(window.location.pathname);
    }, []);

    return (
        <Navbar>
            <Navbar fluid rounded>
                <Navbar.Link as={Link} to="/home">
                    Home
                </Navbar.Link>
            </Navbar>
        </Navbar>
    );
};

export default HomeNav;