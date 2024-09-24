import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Appointments } from "../types";
import Cookies from "js-cookie";
interface AppointmentState {
  doctorsAppointment: Appointments[];
  patientsAppointment: Appointments[];
  loading: boolean;
  error: string | null;
}
const initialState: AppointmentState = {
  doctorsAppointment: [],
  patientsAppointment: [],
  loading: false,
  error: null,
};
const token = Cookies.get("token");

const fetchDoctorAppointments = async (
  doctorId: string,
): Promise<Appointments[]> => {
  const response = await fetch(
    `http://localhost:3000/api/admin/doctor/appointments/${doctorId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT here
      },
      credentials: "include", // Include this if using cookies
    },
  );
  if (!response.ok) {
    throw new Error("failed to fetch doctor appointments");
  }
  return response.json();
};

const fetchPatientAppointments = async (
  patientId: string,
): Promise<Appointments[]> => {
  const response = await fetch(
    `http://localhost:3000/api/admin/patient/appointments/${patientId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT here
      },
      credentials: "include", // Include this if using cookies
    },
  );
  if (!response.ok) {
    throw new Error("failed to fetch doctor appointments");
  }
  return response.json();
};

export const fetchDoctorAppointmentsThunk = createAsyncThunk<
  Appointments[],
  string
>("doctor/appointments/:doctorId", async (doctorId: string) => {
  return await fetchDoctorAppointments(doctorId);
});

export const fetchPatientAppointmentsThunk = createAsyncThunk<
  Appointments[],
  string
>("patient/appointments/:patientId", async (patientId: string) => {
  return await fetchPatientAppointments(patientId);
});

const doctorAndPatientAppointmentsSlice = createSlice({
  name: "doctorAndPatientAppointments",
  initialState,
  reducers: {
    setDoctorAppointments(state, action: PayloadAction<Appointments[]>) {
      state.doctorsAppointment = action.payload;
    },
    setPatientAppointments(state, action: PayloadAction<Appointments[]>) {
      state.patientsAppointment = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDoctorAppointmentsThunk.fulfilled,
        (state, action: PayloadAction<Appointments[]>) => {
          state.doctorsAppointment = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchDoctorAppointmentsThunk.rejected, (state, action) => {
        state.error =
          action.error.message || "failed to fetch doctor appointments";
        state.loading = false;
      })
      .addCase(fetchPatientAppointmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPatientAppointmentsThunk.fulfilled,
        (state, action: PayloadAction<Appointments[]>) => {
          state.patientsAppointment = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchPatientAppointmentsThunk.rejected, (state, action) => {
        state.error =
          action.error.message || "failed to fetch patient appointments";
        state.loading = false;
      });
  },
});

export const { setDoctorAppointments, setPatientAppointments } =
  doctorAndPatientAppointmentsSlice.actions;
export default doctorAndPatientAppointmentsSlice.reducer;
