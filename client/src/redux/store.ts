import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "./adminUserSlice";
import doctorAndPatientReducer from "../redux/doctorAndPatientSlice";
import actionFormReducer from "../redux/actionFormSlice";
const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
    doctorAndPatientUser: doctorAndPatientReducer,
    actionForm: actionFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
