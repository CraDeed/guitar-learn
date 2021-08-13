import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  PostArray,
  SearchPostlistType,
} from '../../guitarlearn-type/guitarlearn';
import {
  loadPostsFailure,
  loadPostsRequest,
  loadPostsSuccess,
  searchPostsFailure,
  searchPostsRequest,
  searchPostsSuccess,
} from '../reducers/postSlice';

function loadPostsAPI(lastId: string): Promise<AxiosResponse<PostArray>> {
  return axios.get(`/post?lastId=${lastId}`);
}

function* loadPosts(action: PayloadAction<string>) {
  try {
    const result: AxiosResponse<PostArray> = yield call(
      loadPostsAPI,
      action.payload,
    );
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(loadPostsFailure(error.response.data));
  }
}

function searchPostsAPI(
  data: SearchPostlistType,
): Promise<AxiosResponse<PostArray>> {
  return axios.post(`/post/search?artist=${data.artist}&music=${data.music}`);
}

function* searchPosts(action: PayloadAction<SearchPostlistType>) {
  try {
    const result: AxiosResponse<PostArray> = yield call(
      searchPostsAPI,
      action.payload,
    );
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
