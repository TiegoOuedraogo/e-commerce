import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import logo from './logo/E-Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import ProductFilter from '../ProductFilter/ProductFilter';
import styles from './Header.module.css';

// ReactModal.setAppElement('#root');

const Header = () => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { isAuth, userRole } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [key, setKey] = useState(0); 

    useEffect(() => {
        if (isAuth && userRole === 'admin') {
            navigate('/admin');
        }

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef, isAuth, userRole, navigate]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('authToken');
        navigate('/');
        setKey(prevKey => prevKey + 1);
    };

    return (
        <header key={key} className={styles.header}>
        <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={styles.logoImage} />
                </Link>
            </div>
            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.navLinks}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </nav>
                <div className={styles.searchBar}>
                    <form>
                        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <button onClick={toggleFilter} className={styles.filterButton}>Filter Products</button>
                <ReactModal isOpen={isFilterOpen} onRequestClose={toggleFilter} contentLabel="Product Filter">
                    <ProductFilter />
                    <button onClick={toggleFilter}>Close</button>
                </ReactModal>

                <div className={styles.accountMenu} ref={menuRef}>
                    <button className={styles.btn} onClick={toggleMenu}>Account</button>
                    {isOpen && (
                        <div className={styles.dropdownOptions}>
                            {!isAuth ? (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/profile">Profile</Link>
                                    {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                                    <div onClick={handleLogout} className={styles.logoutOption}>Logout</div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

