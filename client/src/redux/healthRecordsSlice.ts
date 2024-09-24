import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HealthRecords } from "../types";
import Cookies from "js-cookie";
interface HealthRecordsState {
  healthRecords: HealthRecords[];
  loading: boolean;
  error: string | null;
}

const initialState: HealthRecordsState = {
  healthRecords: [],
  loading: false,
  error: null,
};
const token = Cookies.get("token");

const fetchHealthRecords = async (
  patientId: string,
): Promise<HealthRecords[]> => {
  const response = await fetch(
    `http://localhost:3000/api/admin/patient/records/${patientId}`,
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
    throw new Error("failed to fetch patient health records");
  }
  return response.json();
};

export const fetchHealthRecordsThunk = createAsyncThunk<
  HealthRecords[],
  string
>("patient/records/:patientId", async (patientId: string) => {
  return await fetchHealthRecords(patientId);
});

const healthRecordsSlice = createSlice({
  name: "healthRecords",
  initialState,
  reducers: {
    setHealthRecords(state, action: PayloadAction<HealthRecords[]>) {
      state.healthRecords = action.payload;
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
      .addCase(fetchHealthRecordsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchHealthRecordsThunk.fulfilled,
        (state, action: PayloadAction<HealthRecords[]>) => {
          state.healthRecords = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchHealthRecordsThunk.rejected, (state, action) => {
        state.error = action.error.message || "failed to fetch health records";
        state.loading = false;
      });
  },
});

export const { setHealthRecords } = healthRecordsSlice.actions;
export default healthRecordsSlice.reducer;
