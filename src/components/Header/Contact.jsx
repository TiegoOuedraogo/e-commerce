import React from 'react';
import styles from './Contact.module.css'; 
import whatsappLogo from './logo/E-Logo.png';
const ContactPage = () => {
    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.contactHeader}>Contact Us</h1>
            <ul className={styles.contactList}>
                <li>Email: <a href="mailto:support@example.com">support@shc.com</a></li>
                <li>Phone: <a href="tel:+123456789">+1 (234) 567-89</a></li>
                <li>WhatsApp: <a href="https://wa.me/123456789" target={whatsappLogo} rel="noopener noreferrer">Message us on WhatsApp</a></li>
            </ul>
            <div className={styles.addressContainer}>
                <h3>Address</h3>
                <ul className={styles.addressList}>
                    <li>building: 123 Main Street</li>
                    <li>City: Brooklyn</li>
                    <li>State: NY</li>
                    <li>Zip code: 12345</li>
                </ul>
            </div>
        </div>
    );
};

export default ContactPage;

