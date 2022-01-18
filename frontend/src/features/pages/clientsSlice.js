import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchClients = createAsyncThunk('clients/getclients', async () => {
  const res = await axios.get("/clients").then(res => res.data)
  return res;
  })

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { clients: [] },
  reducers: {
  },
  extraReducers: {
    [fetchClients.fulfilled]: (state, action) => {
      state.clients=action.payload
    },
  },
})

export const selectClients = state => state.clients.clients;

export default clientsSlice.reducer;