import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  role: 'admin' | 'member' | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  email: null,
  role: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string, email: string; role: any }>) => {

      state.id = action.payload.id
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      console.log("Store User" + JSON.stringify(state));
    },
    logoutUser: (state) => {
      state.id = null;
      state.email = null;
      state.role = null;
      state.isLoggedIn = false;
      console.log("Store User" + JSON.stringify(state));
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
export type { UserState }