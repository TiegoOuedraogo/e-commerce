// src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register } from '../features/user/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.userRole);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const loginUser = (credentials) => {
    dispatch(login(credentials));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const registerUser = (userData) => {
    dispatch(register(userData));
  };

  return {
    user,
    token,
    userRole,
    status,
    error,
    loginUser,
    logoutUser,
    registerUser,
  };
};

