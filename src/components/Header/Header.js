import React from 'react';
import './Header.css';
import header from '../../images/header.png';
import Navbar from '../Navbar/Navbar';



const Header = () => {
  
    return (
        // <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${header})` }} className="header">
    <div>
        <Navbar></Navbar>

    </div>
    );
};

export default Header;