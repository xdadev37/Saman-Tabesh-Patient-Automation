import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import bcrypt from "bcryptjs";

interface IProps {
  Username: string;
  password: string;
  hashedPassword: Promise<string> | string;
}

const initialState: IProps = {
  Username: "",
  password: "",
  hashedPassword: "",
};

const hashingPassword = async (arg: string) => {
  let hashedPass = "";
  await bcrypt.hash(arg, 10).then((res) => (hashedPass = res));
  return hashedPass;
};

export const userPassSlice = createSlice({
  name: "userPassSlice",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.Username = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    hashedPass: (state) => {
      state.hashedPassword = hashingPassword(state.password);
    },
  },
});

export const { setUsername, setPassword } = userPassSlice.actions;

export const selectUsername = (state: RootState) => state.userPass.Username;
export const selectPass = (state: RootState) => state.userPass.password;
export const selectPassword = (state: RootState) =>
  state.userPass.hashedPassword;

export default userPassSlice.reducer;
