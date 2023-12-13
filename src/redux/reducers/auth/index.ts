import { IActionWithPayload, IAuthReducer, IForgetPasswordPayload, ILoginPayload, IResetPasswordPayload, ISignUpPayload, ISignUpResponse } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthReducer = {
  isFetching: false,
  isAuthenticated: false,
  userInfo: {},
  currentUser: {
    username: "",
    jwtToken:""
  },
  isMailSent: false,
  resetPasswordMessage: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpRequest: (state: IAuthReducer, _action: IActionWithPayload<ISignUpPayload>) => {
      state.isFetching = true;
      state.error = "";
    },
    signUpResponse: (state: IAuthReducer, action: IActionWithPayload<ISignUpResponse>) => {
      state.isFetching = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = "";
    },
    signUpFailure: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.currentUser = initialState.currentUser;
      state.error = action.payload;
    },
    loginRequest: (state: IAuthReducer, action: IActionWithPayload<ILoginPayload>) => {
      state.isFetching = true;
      state.userInfo = action.payload;
      state.error = "";
    },
    loginResponse: (state: IAuthReducer, action: IActionWithPayload<ISignUpResponse>) => {
      state.isFetching = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = "";
    },
    loginFailure: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state: IAuthReducer, _action: IActionWithPayload<IForgetPasswordPayload>) => {
      state.isFetching = true;
      state.error = "";
    },
    forgetPasswordResponse: (state: IAuthReducer, _action: IActionWithPayload<boolean>) => {
      state.isFetching = false;
      state.isMailSent = true;
      state.error = "";
    },
    forgetPasswordFailure: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state: IAuthReducer, _action: IActionWithPayload<IResetPasswordPayload>) => {
      state.isFetching = true;
      state.error = "";
    },
    resetPasswordResponse: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.resetPasswordMessage = action.payload;
      state.error = "";
    },
    resetPasswordFailure: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetState: (state: IAuthReducer) => {
      state.isMailSent = false;
    },
    logout: () => initialState,
  },
});

export const {
  signUpRequest,
  signUpResponse,
  signUpFailure,
  loginRequest,
  loginResponse,
  loginFailure,
  forgetPasswordRequest,
  forgetPasswordResponse,
  forgetPasswordFailure,
  resetPasswordRequest,
  resetPasswordResponse,
  resetPasswordFailure,
  resetState,
  logout
} = authSlice.actions;

export const authReducer = authSlice.reducer;
