import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Treatments } from "../types";
import Cookies from "js-cookie";
import { buildApiUrl } from "../config/api";
interface TreatmentState {
  doctorTreatments: Treatments[];
  patientTreatments: Treatments[];
  loading: boolean;
  error: string | null;
}

const initialState: TreatmentState = {
  doctorTreatments: [],
  patientTreatments: [],
  loading: false,
  error: null,
};

const fetchDoctorTreatments = async (
  doctorId: string,
): Promise<Treatments[]> => {
  const token = Cookies.get("token");
  const response = await fetch(
    buildApiUrl(`/api/admin/doctor/treatments/${doctorId}`),
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
    throw new Error("failed to fetch doctor treatments");
  }
  return response.json();
};

const fetchPatientTreatments = async (
  patientId: string,
): Promise<Treatments[]> => {
  const token = Cookies.get("token");
  const response = await fetch(
    buildApiUrl(`/api/admin/patient/treatments/${patientId}`),
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
    throw new Error("failed to fetch patient treatments");
  }
  return response.json();
};

export const fetchDoctorTreatmentsThunk = createAsyncThunk<
  Treatments[],
  string
>("doctor/treatments/:doctorId", async (doctorId: string) => {
  return await fetchDoctorTreatments(doctorId);
});

export const fetchPatientTreatmentsThunk = createAsyncThunk<
  Treatments[],
  string
>("patient/treatments/:patientId", async (patientId: string) => {
  return await fetchPatientTreatments(patientId);
});

const doctorAndPatientTreatmentsSlice = createSlice({
  name: "doctorAndPatientTreatments",
  initialState,
  reducers: {
    setDoctorTreatments(state, action: PayloadAction<Treatments[]>) {
      state.doctorTreatments = action.payload;
    },
    setPatientTreatments(state, action: PayloadAction<Treatments[]>) {
      state.patientTreatments = action.payload;
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
      .addCase(fetchDoctorTreatmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDoctorTreatmentsThunk.fulfilled,
        (state, action: PayloadAction<Treatments[]>) => {
          state.doctorTreatments = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchDoctorTreatmentsThunk.rejected, (state, action) => {
        state.error =
          action.error.message || "failed to fetch doctor treatments";
        state.loading = false;
      })
      .addCase(fetchPatientTreatmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPatientTreatmentsThunk.fulfilled,
        (state, action: PayloadAction<Treatments[]>) => {
          state.patientTreatments = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchPatientTreatmentsThunk.rejected, (state, action) => {
        state.error = action.error.message || "failed to fetch treatments";
        state.loading = false;
      });
  },
});

export const { setDoctorTreatments, setPatientTreatments } =
  doctorAndPatientTreatmentsSlice.actions;
export default doctorAndPatientTreatmentsSlice.reducer;
