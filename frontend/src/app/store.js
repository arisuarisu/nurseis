import { configureStore } from '@reduxjs/toolkit';
//import menuReducer from  '../features/layout/menuSlice';
import clientsReducer from  '../features/pages/clientsSlice';
import teamsReducer from  '../features/pages/teamsSlice';
import employeesReducer from  '../features/pages/employeesSlice';
import attendanceReducer from  '../features/pages/attendanceSlice';
import diagnosisReducer from  '../features/pages/diagnosisSlice';
import roleReducer from  '../features/pages/roleSlice';

export default configureStore({
  reducer: {
    //menu: menuReducer,
    employees: employeesReducer,
    clients: clientsReducer,
    teams: teamsReducer,
    attendance: attendanceReducer,
    diagnosis: diagnosisReducer,
    role: roleReducer
  },
  devTools: true
});
