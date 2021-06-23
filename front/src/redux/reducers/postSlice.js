const { createSlice } = require('@reduxjs/toolkit');

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    postLoading: false,
    postError: null,
    searchPostLoading: false,
    searchPostError: null,
    searchText: '',
  },
  reducers: {
    loadPostsRequest: (state, action) => {
      state.postLoading = true;
    },
    loadPostsSuccess: (state, action) => {
      state.post = action.payload;
      state.postLoading = false;
      state.postError = null;
    },
    loadPostsFailure: (state, action) => {
      state.post = null;
      state.postLoading = false;
      state.postError = action.payload;
    },
    searchPostsRequest: (state, action) => {
      state.searchPostLoading = true;
    },
    searchPostsSuccess: (state, action) => {
      state.post = action.payload;
      state.searchPostLoading = false;
      state.searchPostError = null;
    },
    searchPostsFailure: (state, action) => {
      state.post = null;
      state.searchPostLoading = false;
      state.searchPostError = action.payload;
    },
    searchInnerPost: (state, action) => {
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
  tempSetPost,
} = postSlice.actions;

export default postSlice.reducer;
