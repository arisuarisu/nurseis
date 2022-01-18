import { createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

const menuSlice = createSlice({
  name: 'menu',
  initialState: { selected: ['0'], open: ['sub0'] },
  reducers: {
    setSelectedKeys(state, action) {
        state.selected = action.payload
      },
    setOpenKeys(state, action) {
        state.open = action.payload
      },
  },
  extraReducers: {
  },
})

export const { setSelectedKeys, setOpenKeys } = menuSlice.actions

export const selectSelected = state => state.menu.selected;
export const selectOpen = state => state.menu.open;

export default menuSlice.reducer;