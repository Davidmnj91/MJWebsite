import { AuthProps } from '@mj-website/api-interfaces';
import { HttpError } from '@mj-website/http';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiState } from '../utils/ApiState';

type DoLoginAction = AuthProps;

type AuthState = {
  token?: string;
} & ApiState;

export const AuthSliceName = 'AUTH_SLICE';

const initialState: AuthState = {
  loading: false,
};

const tokenSelector = (state: AuthState): string | undefined => state.token;

const authSlice = createSlice({
  name: AuthSliceName,
  initialState,
  reducers: {
    doLogin: (state: AuthState, action: PayloadAction<DoLoginAction>) => {
      state.loading = true;
    },
    doLoginSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
    },
    doLoginError: (state: AuthState, action: PayloadAction<HttpError>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { doLogin, doLoginSuccess, doLoginError } = authSlice.actions;
export const authSelectors = { tokenSelector };

export const AuthReducer = authSlice.reducer;
