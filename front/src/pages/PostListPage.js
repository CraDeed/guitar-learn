import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import SearchPostList from '../components/Search/SearchPostList';
import PostCard from '../components/post/PostCard';
import SearchMusic from '../components/Search/SearchMusic';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPostsRequest,
  searchPostsRequest,
} from '../redux/reducers/postSlice';
import LoadSearch from '../components/load/LoadSearch';

const PostListBlock = styled.div``;

const PostCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NoContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const PostList = (props) => {
  const dispatch = useDispatch();
  const { post, searchPostLoading, searchText } = useSelector(
    (state) => state.postReducer,
  );

  useEffect(() => {
    if (props.match.path === '/') {
      return dispatch(loadPostsRequest());
    }
    if (props.location.pathname === '/search') {
      const artist = props.location.search.split('=')[1].split('&')[0];
      const music = props.location.search.split('=')[2];
      dispatch(searchPostsRequest({ artist, music }));
    }
  }, [dispatch, props, props.history, props.match.path]);

  return (
    <PostListBlock>
      <SearchMusic props={props} />
      <SearchPostList />
      {searchPostLoading ? (
        <LoadSearch />
      ) : post && post.length > 0 ? (
        <PostCardContainer>
          {post &&
            post
              .filter((c) => {
                return (
                  c.title.indexOf(searchText) > -1 ||
                  c.youtuber.toLowerCase().indexOf(searchText) > -1
                );
              })
              .map((v) => <PostCard key={v.key} post={v} />)}
        </PostCardContainer>
      ) : (
        <NoContentBlock>
          <h3>데이터가 없습니다!</h3>
          <h2>가수와 노래제목을 정확히 입력해주세요!</h2>
        </NoContentBlock>
      )}
    </PostListBlock>
  );
};

export default PostList;
