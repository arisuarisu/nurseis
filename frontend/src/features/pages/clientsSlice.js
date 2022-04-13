import { TransactionOutlined } from '@ant-design/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchClients = createAsyncThunk('clients/getclients', async () => {
  const res = await axios.get("/clients").then(res => res.data)
  console.log('fetchujem clients')
  return res;
  })

  export const newClient = createAsyncThunk('clients/new', async (client, {dispatch}) => {
    const res = await axios.post("/clients/new", {
      firstname: client.firstname,
      lastname: client.lastname,
      address: client.address,
      diagnosis: [...client.diagnosis],
      //img: client.img
    }).then(res => res.data)
    dispatch(fetchClients())
    return res;
    })

    export const editClient = createAsyncThunk('clients/edit', async (client, {dispatch}) => {
      const res = await axios.post("/clients/edit", {
        id: client.id,
        firstname: client.firstname,
        lastname: client.lastname,
        address: client.address,
        diagnosis: [...client.diagnosis],
        //img: client.img
      }).then(res => res.data)
      dispatch(fetchClients())
      return res;
      })

      export const deleteClient = createAsyncThunk('clients/deleteclient', async (client, {dispatch}) => {
        const res = await axios.post("/clients/delete", {id: client.id}).then(res => res.data)
        //dispatch(fetchClients())
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
      //console.log('vypisujem action.payload v clientsslice extrareduceri', action.payload)
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