import React from 'react';
import { Link } from 'react-router';
import {Avatar, Dropdown, Navbar} from 'flowbite-react';

const HomeNav = () => {
    const [currentPage, setCurrentPage] = React.useState('');

    React.useEffect(() => {
        setCurrentPage(window.location.pathname);
    }, []);

    return (
        <Navbar>
            <Navbar fluid rounded>
                <Navbar.Link href="/home"
               className='text-black'
                >
                Home
                </Navbar.Link>
            </Navbar>
        </Navbar>
    );
};

export default HomeNav;