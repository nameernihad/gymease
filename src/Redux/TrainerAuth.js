import { createSlice } from "@reduxjs/toolkit";

export const TrainerAuth = createSlice({
  name: "Trainer",
  initialState: {
    Token: null,
  },
  reducers: {
    TrainerauthLogin(state, action) {
      state.Token = action.payload.token;
    },
    TrainerauthLogout(state, action) {
      state.Token = "";
    },
  },
});
export const { TrainerauthLogin, TrainerauthLogout } = TrainerAuth.actions;
export default TrainerAuth.reducer;
