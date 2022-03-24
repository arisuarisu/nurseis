import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchEmployees = createAsyncThunk('employees/getemployees', async () => {
  const res = await axios.get("/employees").then(res => res.data)
  return res;
  })

  export const newEmployee = createAsyncThunk('employees/new', async (employee, {dispatch}) => {
    const res = await axios.post("/employees/new", {
      firstname: employee.firstname,
      lastname: employee.lastname,
      //img: employee.img
    }).then(res => res.data)
    dispatch(fetchEmployees())
    return res;
    })

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { employees: [] },
  reducers: {
  },
  extraReducers: {
    [fetchEmployees.fulfilled]: (state, action) => {
      state.employees=action.payload
    },
  },
})

export const selectEmployees = state => state.employees.employees

export default employeesSlice.reducer;