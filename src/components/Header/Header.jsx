import React, { useState,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import logo from './logo/E-Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import ProductFilter from '../ProductFilter/ProductFilter';
import styles from './Header.module.css';


ReactModal.setAppElement('#root');

const Header = () => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const dispatch = useDispatch();
    const { isAuth, userRole } = useSelector((state) => state.user);
    const menuRef = useRef(null);
    console.log("auth is:",isAuth, "user role is: ",userRole)
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const handleLogout = () => {
    //     dispatch(logout());
    // };

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="SHC Logo" className={styles.logoImage} />
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
                                    <Link to="/register">Register</Link>
                                    <Link to="/login">Login</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/profile">UserProfile</Link>
                                    {/* <button onClick={handleLogout}>Logout</button> */}
                                    {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
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


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import ReactModal from 'react-modal'; 
// import logo from './logo/E-Logo.png';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../features/user/userSlice';
// import ProductFilter from '../ProductFilter/ProductFilter';
// import styles from './Header.module.css';

// ReactModal.setAppElement('#root'); 

// const Header = () => {
//     const [search, setSearch] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [isFilterOpen, setIsFilterOpen] = useState(false); 
//     const dispatch = useDispatch();
//     const { isAuth, userRole } = useSelector((state) => state.user);

//     console.log({ isAuth, userRole });

//     const toggleMenu = () => {
//         console.log("Toggling menu");
//         setIsOpen(!isOpen)
//     };
//     const handleLogout = () => {
//         dispatch(logout());
//     };

//     const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

//     return (
//         <header className={styles.header}>
//             <div className={styles.logo}>
//                 <img src={logo} alt="SHC Logo" className={styles.logoImage} />
//             </div>
//             <div className={styles.navContainer}>
//                 <nav>
//                 <ul className={styles.navLinks}>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/products">Products</Link></li>
//                         <li><Link to="/services">Services</Link></li>
//                         <li><Link to="/contact">Contact</Link></li>
//                         <li><Link to="/cart">Cart</Link></li>
//                     </ul>
//                 </nav>
//                 <div className={styles.searchBar}>
//                     <form>
//                         <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
//                         <button type="submit">Search</button>
//                     </form>
//                 </div>
//                 <button onClick={toggleFilter} className={styles.filterButton}>Filter Products</button>
//                 <ReactModal isOpen={isFilterOpen} onRequestClose={toggleFilter} contentLabel="Product Filter">
//                     <ProductFilter />
//                     <button onClick={toggleFilter}>Close</button>
//                 </ReactModal>

//                 <div className={styles.accountMenu}>
//                 <button className={styles.btn} onClick={toggleMenu}>Account</button>
//                 {isOpen && (
//                     <div className={styles.dropdownOptions}>
//                         {!isAuth ? (
//                             <>
//                                 <Link to="/register">Register</Link>
//                                 <Link to="/login">Login</Link>
//                             </>
//                         ) : (
//                             <>
//                                 {userRole === 'admin' ? (
//                                     <>
//                                         <Link to="/admin">Admin Dashboard</Link>
//                                     </>
//                                 ) : null}
//                                 <button onClick={handleLogout}>Logout</button>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </div>
//             </div>
//         </header>
//     );
// };

// export default Header;



{/* <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
<Link to="/products" style={{ textDecoration: 'none' }}>Products</Link>
<Link to="/services" style={{ textDecoration: 'none' }}>Services</Link>
<Link to="/contact" style={{ textDecoration: 'none' }}>Contacts</Link>
<Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link> */}