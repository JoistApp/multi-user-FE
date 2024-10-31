import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signUp, login } from '../../modules/apiRequests';

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.tabs = action.payload.tabs;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.tabs = action.payload.tabs;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
  },
})

export default userSlice.reducer