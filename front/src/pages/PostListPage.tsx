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
import { RootState } from '../redux/reducers';
import { RouteComponentProps } from 'react-router-dom';

const PostListBlock = styled.div``;

const PostCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 960px) {
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

const PostList = ({ history, match, location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { post, searchPostLoading, searchText, hasMorePosts, postLoading } =
    useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    if (match.path === '/') {
      dispatch(loadPostsRequest(''));
    }
    if (location.pathname === '/search') {
      const artist = location.search.split('=')[1].split('&')[0];
      const music = location.search.split('=')[2];
      dispatch(searchPostsRequest({ artist, music }));
    }
  }, [dispatch, location.pathname, location.search, match.path]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !postLoading) {
          const lastId = post[post.length - 1]._id;
          if (lastId) {
            dispatch(loadPostsRequest(lastId));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePosts, post, postLoading]);

  //TODO: 반응형 다시 하기

  return (
    <PostListBlock>
      <SearchMusic history={history} />
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
