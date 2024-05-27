import React from 'react';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return <>
        <footer className="footer">
            <p>COPYRIGHTS &copy; 2021 - {currentYear} ALL RIGHTS RESERVED</p>
        </footer>
    </>
}

export default Footer;