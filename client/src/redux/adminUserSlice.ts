import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminUser } from "../types";
import Cookies from "js-cookie";

interface AdminUserState {
  adminUser: AdminUser | null;
}

const adminUserFromCookies = Cookies.get("adminUser");
const initialState: AdminUserState = {
  adminUser: adminUserFromCookies ? JSON.parse(adminUserFromCookies) : null,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    setAdminUser(state, action: PayloadAction<AdminUser | null>) {
      state.adminUser = action.payload;
      action.payload
        ? Cookies.set("adminUser", JSON.stringify(action.payload), {
            expires: 21,
          })
        : Cookies.remove("adminUser");
    },
  },
});

export const { setAdminUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
