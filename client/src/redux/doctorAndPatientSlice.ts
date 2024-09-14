import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DoctorUser, PatientUser } from "../types";

// Define the initial state
interface DoctorAndPatientState {
  doctors: DoctorUser[];
  patients: PatientUser[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorAndPatientState = {
  doctors: [],
  patients: [],
  loading: false,
  error: null,
};

// Fetch functions
const fetchDoctors = async (): Promise<DoctorUser[]> => {
  const response = await fetch("http://localhost:3000/api/admin/doctor");
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  return response.json();
};

const fetchPatients = async (): Promise<PatientUser[]> => {
  const response = await fetch("http://localhost:3000/api/admin/patient");
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

// Thunks
export const fetchDoctorsThunk = createAsyncThunk<DoctorUser[], void>(
  "doctorAndPatientUser/fetchDoctors",
  async () => {
    return fetchDoctors();
  },
);

export const fetchPatientsThunk = createAsyncThunk<PatientUser[], void>(
  "doctorAndPatientUser/fetchPatients",
  async () => {
    return fetchPatients();
  },
);

// Slice
const doctorAndPatientSlice = createSlice({
  name: "doctorAndPatientUser",
  initialState,
  reducers: {
    setDoctors(state, action: PayloadAction<DoctorUser[]>) {
      state.doctors = action.payload;
    },
    setPatients(state, action: PayloadAction<PatientUser[]>) {
      state.patients = action.payload;
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
      .addCase(fetchDoctorsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDoctorsThunk.fulfilled,
        (state, action: PayloadAction<DoctorUser[]>) => {
          let index = 0;
          state.doctors = action.payload.map((doctor) => ({
            ...doctor,
            id: ++index, // Adding an incremental ID here
          }));
          state.loading = false;
        },
      )
      .addCase(fetchDoctorsThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch doctors";
        state.loading = false;
      })
      .addCase(fetchPatientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPatientsThunk.fulfilled,
        (state, action: PayloadAction<PatientUser[]>) => {
          let index = 0;
          state.patients = action.payload.map((patient) => ({
            ...patient,
            id: ++index, // Adding an incremental ID here
          }));
          state.loading = false;
        },
      )
      .addCase(fetchPatientsThunk.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch patients";
        state.loading = false;
      });
  },
});

export const { setDoctors, setPatients } = doctorAndPatientSlice.actions;
export default doctorAndPatientSlice.reducer;
