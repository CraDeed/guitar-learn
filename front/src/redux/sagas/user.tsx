import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  AddPlaylistType,
  PostArray,
  RemovePlaylistType,
  UpdateProfileType,
  UserLoginSignType,
  UserProfileType,
  UserType,
} from '../../guitarlearn-type/guitarlearn';
import {
  loginRequest,
  loginFailure,
  loginSuccess,
  logoutRequest,
  logoutFailure,
  logoutSuccess,
  loginCheckRequest,
  loginCheckSuccess,
  loginCheckError,
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
} from '../reducers/userSlice';

function logInAPI(data: UserLoginSignType): Promise<AxiosResponse<UserType>> {
  return axios.post('/user/login', data);
}

function* logIn(action: PayloadAction<UserLoginSignType>) {
  try {
    const result: AxiosResponse<UserType> = yield call(
      logInAPI,
      action.payload,
    );
    yield put(loginSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(loginFailure(error.response.data));
  }
}

function logOutAPI() {
  return axios.get('/user/logout');
}

function* logOut() {
  try {
    const d: AxiosResponse = yield call(logOutAPI);
    console.log(d);
    yield put(logoutSuccess());
  } catch (error) {
    console.error(error);
    yield put(logoutFailure(error.response.data));
  }
}

function loginCheckAPI(data: UserType): Promise<AxiosResponse<UserType>> {
  return axios.post('/user/check', data);
}

function* loginCheck(action: PayloadAction<UserType>) {
  if (action.payload) {
    try {
      const result: AxiosResponse<UserType> = yield call(
        loginCheckAPI,
        action.payload,
      );
      yield put(loginCheckSuccess(result.data));
    } catch (error) {
      console.error(error);
      yield put(loginCheckError(error.response.data));
    }
  } else {
    console.log('빈객체');
  }
}

function signUpAPI(data: UserLoginSignType): Promise<AxiosResponse<UserType>> {
  return axios.post('/user/register', data);
}

function* signUp(action: PayloadAction<UserLoginSignType>) {
  try {
    const result: AxiosResponse<UserType> = yield call(
      signUpAPI,
      action.payload,
    );
    yield put(signUpSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(signUpFailure(error.response.data));
  }
}

function pimageUploadAPI(
  data: UserProfileType,
): Promise<AxiosResponse<string>> {
  return axios.post('/user/image', data);
}

function* pimageUpload(action: PayloadAction<UserProfileType>) {
  try {
    const result: AxiosResponse<string> = yield call(
      pimageUploadAPI,
      action.payload,
    );
    yield put(PImageUploadSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(PImageUploadFailure(error.response.data));
  }
}

function updateProfileAPI(
  data: UpdateProfileType,
): Promise<AxiosResponse<UserType>> {
  return axios.patch('/user/update/profile', data);
}

function* updateProfile(action: PayloadAction<UpdateProfileType>) {
  try {
    const result: AxiosResponse<UserType> = yield call(
      updateProfileAPI,
      action.payload,
    );
    yield put(UpdateProfileSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(UpdateProfileFailure(error.response.data));
  }
}

function addPlaylistAPI(
  data: AddPlaylistType,
): Promise<AxiosResponse<PostArray>> {
  return axios.post(`/user/playlist/${data.post.key}`, data);
}

function* addPlaylist(action: PayloadAction<AddPlaylistType>) {
  try {
    const result: AxiosResponse<PostArray> = yield call(
      addPlaylistAPI,
      action.payload,
    );
    yield put(AddPlayListSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(AddPlayListFailure(error.response.data));
  }
}

function removePlaylistAPI(
  data: RemovePlaylistType,
): Promise<AxiosResponse<{ postKey: string }>> {
  return axios.delete(`/user/unplaylist/${data.postKey}`, { data: data });
}

function* removePlaylist(action: PayloadAction<RemovePlaylistType>) {
  try {
    const result: AxiosResponse<{ postKey: string }> = yield call(
      removePlaylistAPI,
      action.payload,
    );
    yield put(RemovePlayListSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(RemovePlayListFailure(error.response.data));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, logIn);
}

function* watchLogout() {
  yield takeLatest(logoutRequest.type, logOut);
}

function* watchLoginCheck() {
  yield takeLatest(loginCheckRequest.type, loginCheck);
}

function* watchSignUp() {
  yield takeLatest(signUpRequest.type, signUp);
}

function* watchPImageUpload() {
  yield takeLatest(PImageUploadRequest.type, pimageUpload);
}

function* watchUpdateProfile() {
  yield takeLatest(UpdateProfileRequest.type, updateProfile);
}

function* watchAddPlaylist() {
  yield takeLatest(AddPlayListRequset.type, addPlaylist);
}

function* watchRemovePlaylist() {
  yield takeLatest(RemovePlayListRequset.type, removePlaylist);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoginCheck),
    fork(watchSignUp),
    fork(watchPImageUpload),
    fork(watchUpdateProfile),
    fork(watchAddPlaylist),
    fork(watchRemovePlaylist),
  ]);
}
