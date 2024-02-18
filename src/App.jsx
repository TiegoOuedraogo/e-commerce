import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import page and component modules
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPages/ProductPage';
import ProductDetailPage from './pages/ProductPages/ProductDetailPage';
import OrderPage from './pages/OrderPage/OrderPage';
import DisplayCartPage from './pages/CartPages/DisplayCartPage';
import CheckOutPage from './pages/CheckOutPage/CheckOutPage';
import ContactPage from './components/Header/Contact';
import ServicesPage from './components/Header/Services';
import OrderSuccessPage from './pages/OrderPage/OrderSuccessPage';

//import components
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfileCard';
import Footer from './components/Footer/Footer';

// Admin components
import AdminDashboard from './pages/AdminDashboardPage/AdminDashboard';
import ProductManagement from './pages/AdminDashboardPage/ProductManagement';
import CategoryManagement from './pages/AdminDashboardPage/CategoryManagement'
import UserManagement from './pages/AdminDashboardPage/UserManagement';
import OrderManagement from './pages/AdminDashboardPage/OrderManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/cart" element={<DisplayCartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} /> 

            <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<p>Welcome to Admin Dashboard</p>} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            </Route>
            <Route path="/admin/*" element={<p>Admin section not found</p>} />

            
          </Routes>
        </div>
          <Footer />
      </Router>
    </Provider>
  );
}

export default App;

