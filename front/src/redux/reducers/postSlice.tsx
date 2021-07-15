import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PostArray,
  SearchPostlistType,
} from '../../guitarlearn-type/guitarlearn';

interface PostState {
  post: PostArray | null;
  postLoading: boolean;
  postError: Error | null;
  searchPostLoading: boolean;
  searchPostError: Error | null;
  searchText: string;
}

const initialState: PostState = {
  post: null,
  postLoading: false,
  postError: null,
  searchPostLoading: false,
  searchPostError: null,
  searchText: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPostsRequest: (state) => {
      state.postLoading = true;
    },
    loadPostsSuccess: (state, action: PayloadAction<PostArray>) => {
      state.post = action.payload;
      state.postLoading = false;
      state.postError = null;
    },
    loadPostsFailure: (state, action: PayloadAction<Error>) => {
      state.post = null;
      state.postLoading = false;
      state.postError = action.payload;
    },
    searchPostsRequest: (state, action: PayloadAction<SearchPostlistType>) => {
      state.searchPostLoading = true;
    },
    searchPostsSuccess: (state, action: PayloadAction<PostArray>) => {
      state.post = action.payload;
      state.searchPostLoading = false;
      state.searchPostError = null;
    },
    searchPostsFailure: (state, action: PayloadAction<Error>) => {
      state.post = null;
      state.searchPostLoading = false;
      state.searchPostError = action.payload;
    },
    searchInnerPost: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  searchPostsRequest,
  searchPostsSuccess,
  searchPostsFailure,
  searchInnerPost,
} = postSlice.actions;

export default postSlice.reducer;
