import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActionFormState {
  openActionForm: string;
  selectedId: string;
}

const initialState: ActionFormState = {
  openActionForm: "",
  selectedId: "",
};

const actionFormSlice = createSlice({
  name: "actionForm",
  initialState,
  reducers: {
    setOpenActionForm(state, action: PayloadAction<string>) {
      state.openActionForm = action.payload;
    },
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    resetActionForm(state) {
      state.openActionForm = "";
      state.selectedId = "";
    },
  },
});

export const { setOpenActionForm, setSelectedId, resetActionForm } =
  actionFormSlice.actions;
export default actionFormSlice.reducer;
