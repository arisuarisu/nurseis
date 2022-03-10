import { configureStore } from '@reduxjs/toolkit';
//import menuReducer from  '../features/layout/menuSlice';
import clientsReducer from  '../features/pages/clientsSlice';
import employeesReducer from  '../features/pages/employeesSlice';
import attendanceReducer from  '../features/pages/attendanceSlice';

export default configureStore({
  reducer: {
    //menu: menuReducer,
    employees: employeesReducer,
    clients: clientsReducer,
    attendance: attendanceReducer
  },
  devTools: true
});
