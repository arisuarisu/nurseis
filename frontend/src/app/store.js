import { configureStore } from '@reduxjs/toolkit';
import menuReducer from  '../features/layout/menuSlice';
import clientsReducer from  '../features/pages/clientsSlice';
import employeesReducer from  '../features/pages/employeesSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    employees: employeesReducer,
    clients: clientsReducer
  },
  devTools: true
});
