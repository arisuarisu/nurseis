import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);
    
const roleSlice = createSlice({
  name: 'role',
  initialState: { role: 'admin' }, //true je admin, false je nurse
  reducers: {
    changeRole(state, action) {
      console.log('vypisujem acion payload', action.payload)
        state.role = action.payload
      },
  },
  extraReducers: {
    
  },
})

export const { changeRole } = roleSlice.actions

export const selectRole = state => state.role.role;

export default roleSlice.reducer;