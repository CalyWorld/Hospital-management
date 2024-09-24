import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminUser } from "../types";
import Cookies from "js-cookie";

interface AdminUserState {
  adminUser: AdminUser | null;
  token: string | null;
}

const adminUserFromCookies = Cookies.get("adminUser");
const tokenFromCookies = Cookies.get("token");

const initialState: AdminUserState = {
  adminUser: adminUserFromCookies ? JSON.parse(adminUserFromCookies) : null,
  token: tokenFromCookies ? tokenFromCookies : null,
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
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 21 });
      } else {
        Cookies.remove("token");
      }
    },
  },
});

export const { setAdminUser, setToken } = adminUserSlice.actions;
export default adminUserSlice.reducer;
