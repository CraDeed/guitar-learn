import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PostArray,
  SearchPostlistType,
} from '../../guitarlearn-type/guitarlearn';

interface PostState {
  post: PostArray;
  postLoading: boolean;
  postError: Error | null;
  searchPostLoading: boolean;
  searchPostError: Error | null;
  searchText: string;
  hasMorePosts: boolean;
}

const initialState: PostState = {
  post: [],
  postLoading: false,
  postError: null,
  searchPostLoading: false,
  searchPostError: null,
  searchText: '',
  hasMorePosts: true,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPostsRequest: (state, action: PayloadAction<string>) => {
      state.postLoading = true;
    },
    loadPostsSuccess: (state, action: PayloadAction<PostArray>) => {
      state.postLoading = false;
      state.postError = null;
      state.post = state.post.concat(action.payload);
      state.hasMorePosts = action.payload.length === 12;
    },
    loadPostsFailure: (state, action: PayloadAction<Error>) => {
      state.post = [];
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
      state.post = [];
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
