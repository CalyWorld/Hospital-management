import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DoctorUser, PatientUser } from "../types";
import Cookies from "js-cookie";
import { buildApiUrl } from "../config/api";
interface DoctorAndPatientDetailState {
  doctor: DoctorUser | null;
  patient: PatientUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorAndPatientDetailState = {
  doctor: null,
  patient: null,
  loading: false,
  error: null,
};

const fetchDoctor = async (doctorId: string): Promise<DoctorUser> => {
  const token = Cookies.get("token");
  const response = await fetch(
    buildApiUrl(`/api/admin/doctor/${doctorId}`),
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
    throw new Error("failed to fetch doctor");
  }
  return response.json();
};

const fetchPatient = async (patientId: string): Promise<PatientUser> => {
  const token = Cookies.get("token");
  const response = await fetch(
    buildApiUrl(`/api/admin/patient/${patientId}`),
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
    throw new Error("failed to fetch patient");
  }
  return response.json();
};

// Naming the thunk more clearly
export const fetchDoctorThunk = createAsyncThunk<DoctorUser, string>(
  "doctor/:doctorId",
  async (doctorId: string) => {
    return await fetchDoctor(doctorId);
  },
);

export const fetchPatientThunk = createAsyncThunk<PatientUser, string>(
  "patient/:patientId",
  async (patientId: string) => {
    return await fetchPatient(patientId);
  },
);

const doctorAndPatientDetailSlice = createSlice({
  name: "doctorAndPatientDetail",
  initialState,
  reducers: {
    setDoctor(state, action: PayloadAction<DoctorUser>) {
      state.doctor = action.payload;
    },
    setPatient(state, action: PayloadAction<PatientUser>) {
      state.patient = action.payload;
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
      .addCase(fetchDoctorThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDoctorThunk.fulfilled,
        (state, action: PayloadAction<DoctorUser>) => {
          let index = 0;
          state.doctor = { ...action.payload, id: ++index };
          state.loading = false;
        },
      )
      .addCase(fetchDoctorThunk.rejected, (state, action) => {
        state.error = action.error.message || "failed to fetch doctor detail";
        state.loading = false;
      })
      .addCase(fetchPatientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPatientThunk.fulfilled,
        (state, action: PayloadAction<PatientUser>) => {
          let index = 0;
          state.patient = { ...action.payload, id: ++index };
          state.loading = false;
        },
      )
      .addCase(fetchPatientThunk.rejected, (state, action) => {
        state.error = action.error.message || "failed to fetch patient detail";
        state.loading = false;
      });
  },
});

export const { setDoctor, setPatient } = doctorAndPatientDetailSlice.actions;
export default doctorAndPatientDetailSlice.reducer;
