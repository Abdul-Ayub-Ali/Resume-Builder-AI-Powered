import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      
      // Data ko persistent banane ke liye storage mein daala
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      
      // Logout par clean up
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;