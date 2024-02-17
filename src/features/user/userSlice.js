// Redux Toolkit imports for creating slices and asynchronous thunks
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import the user API service that interacts with the backend
import userApi from '../../api/userApi';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'; 

// Asynchronous thunk for logging in
export const login = createAsyncThunk(`${API_URL}/api/users/login`,
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("line 12 user slice")
      // Attempt to log in with provided credentials
      const response = await userApi.login(credentials);
      // Store the token and userRole in localStorage for session persistence
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.userRole);
      // Return the response for further processing
      return response;
    } catch (err) {
      // If an error occurs, pass it to the reducer
      return rejectWithValue(err.message);
    }
  }
);

// Asynchronous thunk for logging out
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    // Clear user information from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    // Return an empty object as the response
    return {};
  } catch (err) {
    // If an error occurs, pass it to the reducer
    return rejectWithValue(err.message);
  }
});

// Asynchronous thunk for user registration
export const register = createAsyncThunk(
  `${API_URL}/api/users/register`,
  async (userData, { rejectWithValue }) => {
    try {
      // Attempt to register the user with provided data
      const response = await userApi.register(userData);
      // Store the token and userRole in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', response.user.userRole);
      // Return the response for further processing
      return response;
    } catch (err) {
      console.log("user role err ",err)
      // If an error occurs, pass it to the reducer
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state of the user slice
const initialState = {
  user: null, 
  isAuth: !!localStorage.getItem('authToken'), 
  userRole: localStorage.getItem('userRole') || null, 
  token: localStorage.getItem('authToken') || null, 
  status: 'idle', 
  error: null, 
};


// User slice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //clear the error message
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for registration
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      // Handle successful registration
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = localStorage.getItem('authToken');
        state.userRole = action.payload.user.role;
        state.isAuth = true;  
      })
      // Handle registration failure
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle login and logout in a similar manner
      .addCase(login.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
        state.userRole = action.payload.user.role;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.userRole = null;
        state.status = 'idle';
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

