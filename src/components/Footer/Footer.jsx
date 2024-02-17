import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Footer.module.css';
import logo from '../Header/logo/E-Logo.png';
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
            <div className={styles.logo}>
                <img src={logo} alt="SHC Logo" className={styles.logoImage} /> 
            </div>
                <div className={styles.aboutCompany}>
                    <h3>About Us</h3>
                    <p>Information about the company...</p>
                </div>
                <div className={styles.quickLinks}>
                    <h3>Quick Links</h3>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/services">Services</Link>

                </div>
                <div className={styles.socialMedia}>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2024 SHC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;


