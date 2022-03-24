import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const getLast = createAsyncThunk('attendance/getLast', async () => {
  const res = await axios.get("/attendance/last").then(res => res.data)
  return res;
  })

export const getAtt = createAsyncThunk('attendance/get', async (att, {dispatch}) => {
    const res = await axios.get("/attendance/", { params: {
      date: att.date 
 }}).then(res => res.data)
 console.log('vypisujem getAtt time', att.date)
    return res;
    })
  

export const writeArrival = createAsyncThunk('attendance/writeArr', async (arr, {dispatch}) => {
  const res = await axios.post("/attendance/arr", {
    datetime: arr.datetime
}).then(res => res.data)
console.log(arr.datetime, "vypisujem redux arrival")
dispatch(getLast());
  return res;
  })

  export const writeDeparture = createAsyncThunk('attendance/writeDep', async (dep, {dispatch}) => {
    const res = await axios.post("/attendance/dep", {
      datetime: dep.datetime,
      reason: dep.reason
 }).then(res => res.data)
 console.log(dep.datetime, "vypisujem redux departure")
 dispatch(getLast());
    return res;
    })

  //   export const GetLastAction = createAsyncThunk('attendance/getAction', async () => {
  //     const res = await axios.post("/attendance").then(res => res.data)
  //     return res;
  //     })

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { attendance: [], loading: true, last: '' },
  reducers: {
  },
  extraReducers: {
    [getAtt.fulfilled]: (state, action) => {
      state.attendance=action.payload
      // state.clients=action.payload
    },
    [getLast.fulfilled]: (state, action) => {
      state.last=action.payload
      // state.clients=action.payload
    },
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

export const selectLast = state => state.attendance.last;
export const selectAttendance = state => state.attendance.attendance;
export const selectLoading = state => state.attendance.loading;

export default attendanceSlice.reducer;