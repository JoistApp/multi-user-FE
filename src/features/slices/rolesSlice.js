import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData, postData } from '../../modules/apiRequests';

const initialState = {
  rolesData: null,
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

export const addRole = createAsyncThunk(
  'user/roles/add',
  async (role, { rejectWithValue, getState }) => {
    try {
      const { user: userData } = getState().user;
      const response = await postData(userData, role, 'roles');
      return response;
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
        state.rolesData = action.payload;
        state.errors = [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.rolesData.roles = [...state.rolesData.roles, action.payload.role];
        state.errors = [];
      })
      .addCase(addRole.rejected, (state, action) => {
        state.errors.push(action.payload);
      })
  },
})

export default userSlice.reducer