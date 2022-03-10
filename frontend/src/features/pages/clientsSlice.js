import { TransactionOutlined } from '@ant-design/icons';
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
  initialState: { clients: [], loading: true },
  reducers: {
  },
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.loading=false
      state.clients=action.payload
    },
    [fetchClients.rejected]: (state, action) => {
      //console.log('we are rejected');
      //fetchClients()
    },
  },
})

export const selectClients = state => state.clients.clients;
export const selectLoading = state => state.clients.loading;

export default clientsSlice.reducer;