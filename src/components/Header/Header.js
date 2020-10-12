import React from 'react';
// import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
// import logo from '../../images/icons/logo.png';
import Navbar from '../Navbar/Navbar';
// import Cards from '../Cards/Cards';


const Header = () => {
  
    return (
        // <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${header})` }} className="header">
    <div>
        <Navbar></Navbar>

    </div>
    );
};

export default Header;