import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchEmployees = createAsyncThunk('employees/getemployees', async () => {
  const res = await axios.get("/employees").then(res => res.data)
  return res;
  })

  export const fetchNurseNames = createAsyncThunk('employees/nnames', async () => {
    const res = await axios.get("/employees/names").then(res => res.data)
    return res;
    })

  export const newEmployee = createAsyncThunk('employees/new', async (employee, {dispatch}) => {
    const res = await axios.post("/employees/new", {
      firstname: employee.firstname,
      lastname: employee.lastname,
      phone: employee.phone,
      //img: employee.img,
      contractf: employee.contractf, 
      contractt: employee.contractt, 
      gdpr: employee.gdpr, 
      vaccine: employee.vaccine,
    }).then(res => res.data)
    dispatch(fetchEmployees())
    return res;
    })

    export const searchEmployees = createAsyncThunk('employees/search', async (employee, {dispatch}) => {
      const res = await axios.post("/employees/search", {
        lastname: employee.lastname,
        //img: employee.img
      }).then(res => res.data)
      //dispatch(fetchEmployees())
      return res;
      })

    export const editEmployee = createAsyncThunk('employee/edit', async (employee, {dispatch}) => {
      const res = await axios.post("/employees/edit", {
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        phone: employee.phone,
        //img: client.img,
        contractf: employee.contractf, 
      contractt: employee.contractt, 
      gdpr: employee.gdpr, 
      vaccine: employee.vaccine,
      }).then(res => res.data)
      dispatch(fetchEmployees())
      return res;
      })

      export const deleteEmployee = createAsyncThunk('employees/deleteemployee', async (employee) => {
        const res = await axios.post("/employees/delete", {id: employee.id}).then(res => res.data)
        return res;
        })

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { employees: [], searchemployees: [], nurseNames: [], loading: false },
  reducers: {
  },
  extraReducers: {
    [fetchEmployees.pending]: (state, action) => {
      state.loading=true
    },
    [fetchEmployees.fulfilled]: (state, action) => {
      state.employees=action.payload
      state.loading=false
    },
    [searchEmployees.fulfilled]: (state, action) => {
      state.searchemployees=action.payload
    },
    [fetchNurseNames.fulfilled]: (state, action) => {
      state.nurseNames=action.payload
    },
  },
})

export const selectEmployees = state => state.employees.employees
export const selectNurseNames = state => state.employees.nurseNames
export const selectSearchEmployees = state => state.employees.searchemployees

export default employeesSlice.reducer;