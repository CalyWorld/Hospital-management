import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "./adminUserSlice";
import doctorAndPatientReducer from "../redux/doctorAndPatientSlice";
import doctorAndPatientDetailReducer from "../redux/doctorAndPatientDetailsSlice";
import doctorAndPatientAppointmentsReducer from "../redux/appointmentsSlice";
import doctorAndPatientTreatmentsReducer from "../redux/treamentSlice";
import healthRecordsReducer from "../redux/healthRecordsSlice";
import actionFormReducer from "../redux/actionFormSlice";
const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
    doctorAndPatientUser: doctorAndPatientReducer,
    doctorAndPatientDetail: doctorAndPatientDetailReducer,
    doctorAndPatientAppointments: doctorAndPatientAppointmentsReducer,
    doctorAndPatientTreatments: doctorAndPatientTreatmentsReducer,
    healthRecords: healthRecordsReducer,
    actionForm: actionFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
