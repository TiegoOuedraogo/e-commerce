import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminUserManagementApi from '../../api/adminUserManagementApi';


export const fetchUsers = createAsyncThunk('adminUser/fetchUsers', async () => {
  const response = await adminUserManagementApi.getUsers();
  return response;
});

export const addUser = createAsyncThunk('adminUser/addUser', async (userData) => {
  const response = await adminUserManagementApi.addUser(userData);
  return response;
});

export const updateUser = createAsyncThunk('adminUser/updateUser', async ({ userId, userData }) => {
  const response = await adminUserManagementApi.updateUserById(userId, userData);
  return response;
});

export const deleteUser = createAsyncThunk('adminUser/deleteUser', async (userId) => {
  await adminUserManagementApi.deleteUserById(userId);
  return userId;
});


const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    users: [],
    status: 'idle', 
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },

  
});

export default adminUserSlice.reducer;

