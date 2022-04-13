import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchDiagnosis = createAsyncThunk('diagnosis/getdiagnosis', async () => {
  const res = await axios.get("/diagnosis").then(res => res.data)
  return res;
  })

  export const newDiagnosis = createAsyncThunk('diagnosis/new', async (diagnosis, {dispatch}) => {
    const res = await axios.post("/diagnosis/new", {
      name: diagnosis.name,
      description: diagnosis.description,
      treatment: diagnosis.treatment
    }).then(res => res.data)
    dispatch(fetchDiagnosis())
    return res;
    })

    export const editDiagnosis = createAsyncThunk('diagnosis/edit', async (diagnosis, {dispatch}) => {
      const res = await axios.post("/diagnosis/edit", {
        id: diagnosis.id,
        name: diagnosis.name,
        lastname: diagnosis.lastname,
        description: diagnosis.description,
        treatment: diagnosis.treatment
      }).then(res => res.data)
      dispatch(fetchDiagnosis())
      return res;
      })

      export const deleteDiagnosis = createAsyncThunk('diagnosis/deletediagnosis', async (diagnosis) => {
        const res = await axios.post("/diagnosis/delete", {id: diagnosis.id}).then(res => res.data)
        return res;
        })

const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: { diagnosis: [], loading: false },
  reducers: {
  },
  extraReducers: {
    [fetchDiagnosis.pending]: (state, action) => {
      state.loading=true
    },
    [fetchDiagnosis.fulfilled]: (state, action) => {
      state.diagnosis=action.payload
      state.loading=false
    },
  },
})

export const selectDiagnosis = state => state.diagnosis.diagnosis
export const selectLoading = state => state.diagnosis.loading

export default diagnosisSlice.reducer;