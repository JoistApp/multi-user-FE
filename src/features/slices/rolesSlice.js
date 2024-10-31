import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../../modules/apiRequests';

const initialState = {
  roles: [],
  errors: [],
}

export const fetchRoles = createAsyncThunk(
  'user/roles/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user: userData } = getState().user;
      const { roles } = await fetchData(userData, 'roles');
      return roles.roles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const userSlice = createSlice({
  name: 'roles',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.errors = [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
  },
})

export default userSlice.reducer