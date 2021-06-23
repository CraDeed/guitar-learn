import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  loadPostsFailure,
  loadPostsRequest,
  loadPostsSuccess,
  searchPostsFailure,
  searchPostsRequest,
  searchPostsSuccess,
} from '../reducers/postSlice';

function loadPostsAPI() {
  return axios.get('/post');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(loadPostsFailure(error.response.data));
  }
}

function searchPostsAPI(data) {
  return axios.post(`/post/search?artist=${data.artist}&music=${data.music}`);
}

function* searchPosts(action) {
  try {
    const result = yield call(searchPostsAPI, action.payload);
    yield put(searchPostsSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(searchPostsFailure(error.response.data));
  }
}

function* watchLoadPosts() {
  yield takeLatest(loadPostsRequest.type, loadPosts);
}

function* watchSearchPosts() {
  yield takeLatest(searchPostsRequest.type, searchPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchSearchPosts)]);
}
