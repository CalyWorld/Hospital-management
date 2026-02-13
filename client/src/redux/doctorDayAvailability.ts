import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { DoctorUser } from "../types";
import { buildApiUrl } from "../config/api";

interface DoctorDayAvailabilityState {
  doctors: DoctorUser[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorDayAvailabilityState = {
  doctors: [],
  loading: false,
  error: null,
};

const fetchDoctorsByAvailability = async (
  date: string,
): Promise<DoctorUser[]> => {
  const token = Cookies.get("token");
  const response = await fetch(buildApiUrl("/api/admin/doctor"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("failed to fetch doctor availability");
  }

  const doctors = (await response.json()) as DoctorUser[];
  const selectedDate = new Date(date);

  return doctors.filter((doctor) => {
    const startDate = new Date(doctor.startDate);
    const endDate = new Date(doctor.endDate);
    return startDate <= selectedDate && selectedDate <= endDate;
  });
};

export const fetchDoctorsByAvailabilityThunk = createAsyncThunk<
  DoctorUser[],
  string
>("doctor/availability/:date", async (date: string) => {
  return await fetchDoctorsByAvailability(date);
});

const doctorDayAvailabilitySlice = createSlice({
  name: "doctorDayAvailability",
  initialState,
  reducers: {
    setAvailableDoctors(state, action: PayloadAction<DoctorUser[]>) {
      state.doctors = action.payload;
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
      .addCase(fetchDoctorsByAvailabilityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDoctorsByAvailabilityThunk.fulfilled,
        (state, action: PayloadAction<DoctorUser[]>) => {
          let index = 0;
          state.doctors = action.payload.map((doctor) => ({
            ...doctor,
            id: ++index,
          }));
          state.loading = false;
        },
      )
      .addCase(fetchDoctorsByAvailabilityThunk.rejected, (state, action) => {
        state.error =
          action.error.message || "failed to fetch doctor availability";
        state.loading = false;
      });
  },
});

export const { setAvailableDoctors } = doctorDayAvailabilitySlice.actions;
export default doctorDayAvailabilitySlice.reducer;
