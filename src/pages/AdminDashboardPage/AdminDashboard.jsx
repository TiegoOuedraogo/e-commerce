// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import styles from './AdminDashboard.module.css';

// const AdminDashboard = () => {
//     return (
//         <div className={styles.dashboard}>
//             <h1>Admin Dashboard</h1>
//             <nav>
//                 <ul className={styles.navList}>
//                     <li className={styles.navItem}>
//                         <Link to="products" className={styles.navLink}>Product Management</Link>
//                     </li>
//                     <li className={styles.navItem}>
//                         <Link to="users" className={styles.navLink}>User Management</Link>
//                     </li>
//                     <li className={styles.navItem}>
//                         <Link to="orders" className={styles.navLink}>Order Management</Link>
//                     </li>
//                     <li className={styles.navItem}>
//                         <Link to="category" className={styles.navLink}>Category Management</Link>
//                     </li>
//                 </ul>
//             </nav>
//             <Outlet />
//         </div>
//     );
// };

// export default AdminDashboard;


import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const goToProductManagement = () => navigate('/admin/products');

    const goToUserManagement = () => navigate('/admin/users');

    const goToOrderManagement = () => navigate('/admin/orders');

    const goToCategoryManagement = () => navigate('/admin/categories');

    return (
        <div className={styles.dashboard}>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem} onClick={goToProductManagement}>Product Management</li>
                    <li className={styles.navItem} onClick={goToUserManagement}>User Management</li>
                    <li className={styles.navItem} onClick={goToOrderManagement}>Order Management</li>
                    <li className={styles.navItem} onClick={goToCategoryManagement}>Category Management</li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default AdminDashboard;

