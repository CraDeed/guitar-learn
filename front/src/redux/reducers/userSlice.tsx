import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostArray, UserType } from '../../guitarlearn-type/guitarlearn';

interface UserState {
  user: UserType | null;
  userLoading: boolean;
  userError: Error | null;
}

const initialState: UserState = {
  user: null,
  userLoading: false,
  userError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.userLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    loginFailure: (state, action: PayloadAction<Error>) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    logoutRequest: (state) => {
      state.userLoading = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.userLoading = false;
      state.userError = null;
      localStorage.removeItem('user');
    },
    logoutFailure: (state, action: PayloadAction<Error>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    loginCheckRequest: (state) => {
      state.userLoading = true;
    },
    loginCheckSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    loginCheckError: (state, action: PayloadAction<Error>) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    tempSetUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    signUpRequest: (state) => {
      state.userLoading = true;
    },
    signUpSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    signUpFailure: (state, action: PayloadAction<Error>) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    PImageUploadRequest: (state) => {
      state.userLoading = true;
    },
    PImageUploadSuccess: (state, action: PayloadAction<string>) => {
      if (!state.user) {
        return;
      }
      state.user.image = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    PImageUploadFailure: (state, action: PayloadAction<Error>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    UpdateProfileRequest: (state) => {
      state.userLoading = true;
    },
    UpdateProfileSuccess: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    UpdateProfileFailure: (state, action: PayloadAction<Error>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    AddPlayListRequset: (state) => {
      state.userLoading = true;
    },
    AddPlayListSuccess: (state, action: PayloadAction<PostArray>) => {
      if (!state.user) {
        return;
      }
      state.user.post = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    AddPlayListFailure: (state, action: PayloadAction<Error>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    RemovePlayListRequset: (state) => {
      state.userLoading = true;
    },
    RemovePlayListSuccess: (
      state,
      action: PayloadAction<{ postKey: string }>,
    ) => {
      if (!state.user?.post) {
        return;
      }
      state.user.post = state.user.post.filter(
        (v) => v.key !== action.payload.postKey,
      );
      state.userLoading = false;
      state.userError = null;
    },
    RemovePlayListFailure: (state, action: PayloadAction<Error>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginFailure,
  loginSuccess,
  logoutRequest,
  logoutFailure,
  logoutSuccess,
  loginCheckRequest,
  loginCheckSuccess,
  loginCheckError,
  tempSetUser,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  PImageUploadRequest,
  PImageUploadSuccess,
  PImageUploadFailure,
  UpdateProfileRequest,
  UpdateProfileSuccess,
  UpdateProfileFailure,
  AddPlayListRequset,
  AddPlayListSuccess,
  AddPlayListFailure,
  RemovePlayListRequset,
  RemovePlayListSuccess,
  RemovePlayListFailure,
} = userSlice.actions;

export default userSlice.reducer;
