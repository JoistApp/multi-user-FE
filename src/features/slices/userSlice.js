import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signUp, login, fetchData } from '../../modules/apiRequests';

const initialState = {
  user: null,
  tabs: [],
  errors: [],
}

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signUp(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchRoles = createAsyncThunk(
  'user/roles/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userData = state.user.user;
      const response = await fetchData(userData, 'roles');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.tabs = action.payload.tabs;
        state.errors = [];
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.tabs = action.payload.tabs;
        state.errors = [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
  },
})

export default userSlice.reducer