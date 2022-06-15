import { TransactionOutlined } from '@ant-design/icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

// export const fetchTeams = createAsyncThunk('teams/getteams', async (team) => {
//   const res = await axios.get("/teams", {date: team.date}).then(res => res.data)
//   //console.log('fetchujem teams')
//   return res;
//   })

export const fetchTeamCount = createAsyncThunk('teams/teamcount', async () => {
  const res = await axios.get("/teams/count").then(res => res.data)
  console.log('TEAM COUNT THUNK')
  return res;
  })

export const fetchNurses = createAsyncThunk('teams/getnurses', async () => {
  const res = await axios.get("/teams/nursenames").then(res => res.data)
  return res;
  })

  export const fetchClients = createAsyncThunk('teams/getclients', async () => {
    const res = await axios.get("/teams/clientnames").then(res => res.data)
    return res;
    })

export const fetchTeamMembers = createAsyncThunk('teams/tmem', async (members) => {
  console.log('vypisujem selected time: ', members.date)
  const res = await axios.post("/teams/tmem", {year: members.year, month: members.month}).then(res => res.data)
  console.log('vypisujem selected time: ', members.date)
  return res;
  })

  export const fetchMembers = createAsyncThunk('teams/mem', async (members) => {
    const res = await axios.post("/teams/mem", {year: members.year, month: members.month}).then(res => res.data)
    //console.log('fetchujem teams')
    return res;
    })

    export const fetchTeamPatients = createAsyncThunk('teams/tpat', async (patients) => {
      console.log('vypisujem selected time: ', patients.date)
      const res = await axios.post("/teams/tpat", {id_team: patients.id_team, year: patients.year, month: patients.month}).then(res => res.data)
      console.log('vypisujem selected time: ', patients.date)
      return res;
      })
    
      export const fetchPatients = createAsyncThunk('teams/pat', async (patients) => {
        const res = await axios.post("/teams/pat", {year: patients.year, month: patients.month}).then(res => res.data)
        //console.log('fetchujem teams')
        return res;
        })

    // export const fetchTeamPatients = createAsyncThunk('teams/tpat', async (patients) => {
    //   const res = await axios.post("/teams/tpat", {date: patients.date}).then(res => res.data)
    //   //console.log('fetchujem teams')
    //   return res;
    //   })

    // export const fetchPatients = createAsyncThunk('teams/pat', async (patients) => {
    //   const res = await axios.post("/teams/pat", {date: patients.date}).then(res => res.data)
    //   //console.log('fetchujem teams')
    //   return res;
    //   })

  export const newTeam = createAsyncThunk('teams/new', async (team, {dispatch}) => {
    const res = await axios.post("/teams/new", {
      members: [...team.members],
      //img: client.img
    }).then(res => res.data)
    //dispatch(fetchTeams())
    return res;
    })

    export const editTeam = createAsyncThunk('teams/edit', async (team, {dispatch}) => {
        const res = await axios.post("/teams/edit", {
            id: team.id,
          members: [...team.members],
          //img: client.img
        }).then(res => res.data)
        //dispatch(fetchTeams())
        return res;
        })

        export const addTeam = createAsyncThunk('teams/teamadd', async (_, {dispatch}) => {
          const res = await axios.post("/teams/teamadd", {
              name: 'asdas'
          }).then(res => res.data)
          dispatch(fetchTeamMembers())
          return res;
          })

          export const deleteTeam = createAsyncThunk('teams/delete', async (team, {dispatch}) => {
            const res = await axios.post("/teams/delete", {
                id: team.id
            }).then(res => res.data)
            //dispatch(fetchTeamMembers())
            return res;
            })

        export const addMember = createAsyncThunk('teams/memadd', async (member, {dispatch}) => {
          const res = await axios.post("/teams/memadd", {
              id_team: member.id_team,
              id_employee: member.id_employee,
              mem_from: member.mem_from,
              mem_to: member.mem_to
            //members: [...team.members],
            //img: client.img
          }).then(res => res.data)
          //dispatch(fetchTeams())
          return res;
          })

          export const editMember = createAsyncThunk('teams/memedit', async (member, {dispatch}) => {
            const res = await axios.post("/teams/memedit", {
                id: member.id,
                id_team: member.id_team,
                id_employee: member.id_employee,
                mem_from: member.mem_from,
                mem_to: member.mem_to
              //members: [...team.members],
              //img: client.img
            }).then(res => res.data)
            //dispatch(fetchTeams())
            return res;
            })

            export const deleteMember = createAsyncThunk('teams/memdelete', async (member, {dispatch}) => {
              const res = await axios.post("/teams/memdelete", {
                  id: member.id,
                  mem_from: member.mem_from,
                  mem_to: member.mem_to
              }).then(res => res.data)
              //dispatch(fetchTeams())
              return res;
              })

            export const addPatient = createAsyncThunk('teams/patadd', async (patient, {dispatch}) => {
              const res = await axios.post("/teams/patadd", {
                  id_nurse: patient.nurse,
                  id_client: patient.client,
                  pat_range: patient.pat_range,
                  time_from: patient.time_from,
                  time_to: patient.time_to,
                  shift: patient.shift
                //members: [...team.members],
                //img: client.img
              }).then(res => res.data)
              //dispatch(fetchTeams())
              return res;
              })
    
              export const editPatient = createAsyncThunk('teams/patedit', async (patient, {dispatch}) => {
                const res = await axios.post("/teams/patedit", {
                    id: patient.id,
                    id_nurse: patient.nurse,
                    id_client: patient.client,
                    pat_date: patient.pat_date,
                  time_from: patient.time_from,
                  time_to: patient.time_to,
                  shift: patient.shift
                  //members: [...team.members],
                  //img: client.img
                }).then(res => res.data)
                //dispatch(fetchTeams())
                return res;
                })

                export const deletePatient = createAsyncThunk('teams/patdelete', async (patient, {dispatch}) => {
                  const res = await axios.post("/teams/patdelete", {
                      id: patient.id,
                      // pat_from: patient.pat_from,
                      // pat_to: patient.pat_to
                  }).then(res => res.data)
                  //dispatch(fetchTeams())
                  return res;
                  })

                  export const fetchCalendar = createAsyncThunk('teams/cal', async (cal) => {
                    const res = await axios.post("/teams/cal", {id_team: cal.id_team, year: cal.year, month: cal.month}).then(res => res.data)
                    //console.log('fetchujem teams')
                    return res;
                    })

const teamsSlice = createSlice({
  name: 'teams',
  initialState: { nurses: [], clients: [], tmembers: [], members: [], patients: [], tpatients: [], calendar: [], loading: true, teamcount: 0 },
  reducers: {
  },
  extraReducers: {
    [fetchNurses.pending]: (state, action) => {
      state.loading=true
    },
    [fetchNurses.fulfilled]: (state, action) => {
      state.loading=false
      state.nurses=action.payload
    },
    [fetchNurses.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchClients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.loading=false
      state.clients=action.payload
    },
    [fetchClients.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchTeamMembers.pending]: (state, action) => {
      state.loading=true
    },
    [fetchTeamMembers.fulfilled]: (state, action) => {
      state.loading=false
      console.log('vypisujem action.payload v teams', action.payload)
      state.tmembers=action.payload
    },
    [fetchTeamMembers.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchTeamPatients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchTeamPatients.fulfilled]: (state, action) => {
      state.loading=false
      //console.log('vypisujem action.payload v teams', action.payload)
      state.tpatients=action.payload
    },
    [fetchTeamPatients.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchMembers.pending]: (state, action) => {
      state.loading=true
    },
    [fetchMembers.fulfilled]: (state, action) => {
      state.loading=false
      state.members=action.payload
    },
    [fetchMembers.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchPatients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.loading=false
      state.patients=action.payload
    },
    [fetchPatients.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchTeamPatients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchTeamPatients.fulfilled]: (state, action) => {
      state.loading=false
      console.log('vypisujem action.payload v teams', action.payload)
      state.tpatients=action.payload
    },
    [fetchTeamPatients.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchPatients.pending]: (state, action) => {
      state.loading=true
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.loading=false
      state.patient=action.payload
    },
    [fetchPatients.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchCalendar.pending]: (state, action) => {
      state.loading=true
    },
    [fetchCalendar.fulfilled]: (state, action) => {
      state.loading=false
      state.calendar=action.payload
    },
    [fetchCalendar.rejected]: (state, action) => {
        state.loading=false
    },
    [fetchTeamCount.pending]: (state, action) => {
      state.loading=true
    },
    [fetchTeamCount.fulfilled]: (state, action) => {
      state.loading=false
      state.teamcount=action.payload
    },
    [fetchTeamCount.rejected]: (state, action) => {
        state.loading=false
    },
  },
})

export const selectNurses = state => state.teams.nurses;
export const selectClients = state => state.teams.clients;
export const selectTmembers = state => state.teams.tmembers;
export const selectMembers = state => state.teams.members;
export const selectTpatients = state => state.teams.tpatients;
export const selectPatients = state => state.teams.patients;
export const selectCalendar = state => state.teams.calendar;
export const selectLoading = state => state.teams.loading;
export const selectTeamCount = state => state.teams.teamcount;

export default teamsSlice.reducer;