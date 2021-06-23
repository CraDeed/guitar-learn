import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
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

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
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
    yield call(logOutAPI);
    yield put(logoutSuccess());
  } catch (error) {
    console.error(error);
    yield put(logoutFailure(error.response.data));
  }
}

function loginCheckAPI(data) {
  return axios.post('/user/check', data);
}

function* loginCheck(action) {
  if (action.payload) {
    try {
      const result = yield call(loginCheckAPI, action.payload);
      yield put(loginCheckSuccess(result.data));
    } catch (error) {
      console.error(error);
      yield put(loginCheckError(error.response.data));
    }
  } else {
    console.log('빈객체');
  }
}

function signUpAPI(data) {
  return axios.post('/user/register', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);
    yield put(signUpSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(signUpFailure(error.response.data));
  }
}

function pimageUploadAPI(data) {
  return axios.post('/user/image', data);
}

function* pimageUpload(action) {
  try {
    const result = yield call(pimageUploadAPI, action.payload.data);
    yield put(PImageUploadSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(PImageUploadFailure(error.response.data));
  }
}

function updateProfileAPI(data) {
  return axios.patch('/user/update/profile', data);
}

function* updateProfile(action) {
  try {
    const result = yield call(updateProfileAPI, action.payload);
    yield put(UpdateProfileSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(UpdateProfileFailure(error.response.data));
  }
}

function addPlaylistAPI(data) {
  return axios.post(`/user/playlist/${data.post.key}`, data);
}

function* addPlaylist(action) {
  try {
    const result = yield call(addPlaylistAPI, action.payload);
    yield put(AddPlayListSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(AddPlayListFailure(error.response.data));
  }
}

function removePlaylistAPI(data) {
  return axios.delete(`/user/unplaylist/${data.postKey}`, { data: data });
}

function* removePlaylist(action) {
  try {
    const result = yield call(removePlaylistAPI, action.payload);
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
