import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userLoading: false,
    userError: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.userLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    logoutRequest: (state, action) => {
      state.userLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.userLoading = false;
      state.userError = null;
      localStorage.removeItem('user');
    },
    logoutFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    loginCheckRequest: (state, action) => {
      state.userLoading = true;
    },
    loginCheckSuccess: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    loginCheckError: (state, action) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    tempSetUser: (state, action) => {
      state.user = action.payload;
    },
    signUpRequest: (state, action) => {
      state.userLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    signUpFailure: (state, action) => {
      state.user = null;
      state.userLoading = false;
      state.userError = action.payload;
    },
    PImageUploadRequest: (state, action) => {
      state.userLoading = true;
    },
    PImageUploadSuccess: (state, action) => {
      state.user.image = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    PImageUploadFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    UpdateProfileRequest: (state, action) => {
      state.userLoading = true;
    },
    UpdateProfileSuccess: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    UpdateProfileFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    AddPlayListRequset: (state, action) => {
      state.userLoading = false;
    },
    AddPlayListSuccess: (state, action) => {
      state.user.post = action.payload;
      state.userLoading = false;
      state.userError = null;
    },
    AddPlayListFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    RemovePlayListRequset: (state, action) => {
      state.userLoading = false;
    },
    RemovePlayListSuccess: (state, action) => {
      state.user.post = state.user.post.filter(
        (v) => v.key !== action.payload.postKey,
      );
      state.userLoading = false;
      state.userError = null;
    },
    RemovePlayListFailure: (state, action) => {
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
