import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const writeArrival = createAsyncThunk('attendance/writeArr', async () => {
  const res = await axios.post("/attendance").then(res => res.data)
  return res;
  })

  export const writeDeparture = createAsyncThunk('attendance/writeDep', async () => {
    const res = await axios.post("/attendance").then(res => res.data)
    return res;
    })

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { attendance: [], loading: true },
  reducers: {
  },
  extraReducers: {
    [writeArrival.fulfilled]: (state, action) => {
      // state.loading=false
      // state.clients=action.payload
    },
    [writeDeparture.fulfilled]: (state, action) => {
      //console.log('we are rejected');
      //fetchClients()
    },
  },
})

export const selectAttendance = state => state.attendance.attendance;
export const selectLoading = state => state.attendance.loading;

export default attendanceSlice.reducer;