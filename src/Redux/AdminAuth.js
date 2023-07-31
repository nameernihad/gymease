import { createSlice } from "@reduxjs/toolkit";

export const AdminAuth = createSlice({
  name: "Admin",
  initialState: {
    Token: null,
  },
  reducers: {
    AdminauthLogin(state, action) {
      state.Token = action.payload.token;
    },
    AdminauthLogout(state, action) {
      state.Token = "";
    },
  },
});
export const { AdminauthLogin, AdminauthLogout } = AdminAuth.actions;
export default AdminAuth.reducer;
